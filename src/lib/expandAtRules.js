const { utilitiesName } = require('./normalizeDirectives');
// const { parseCandidateStrings, IO, Parsing } = require('../../oxide/crates/node');
const { parseCandidateStrings, IO, Parsing } = require('../oxide/index');
const { generateRules } = require('./generateRules');
const postcss = require('postcss');


function cloneNodes(nodes, source = undefined, raws = undefined) {
    return nodes.map((node) => {
        let cloned = node.clone()

        // We always want override the source map
        // except when explicitly told not to
        let shouldOverwriteSource = node.raws.tailwind?.preserveSource !== true || !cloned.source

        if (source !== undefined && shouldOverwriteSource) {
            cloned.source = source

            if ('walk' in cloned) {
                cloned.walk((child) => {
                    child.source = source
                })
            }
        }

        if (raws !== undefined) {
            cloned.raws.tailwind = {
                ...cloned.raws.tailwind,
                ...raws,
            }
        }

        return cloned
    })
}

/**
 * @param context
 * @param {import('postcss').Root} root
 * @param {import('postcss').Result} result
 */
async function expandAtRules(context, root, result) {
    const { ikunDirectives, changedContent } = context;

    let layerNodes = {
        [utilitiesName]: null
    };

    root.walkAtRules(rule => {
        console.log('---- rule.name: ', rule.name)
        console.log('---- is ikuncss:', rule.name === 'ikuncss')

        if (rule.name === 'ikuncss') {
            console.log(('---- rule.params : ', rule.params))
            layerNodes[rule.params] = rule;
            console.log(('---- layerNodes : ', layerNodes))
        }
    });


    if (Object.values(layerNodes).every(v => v === null)) {
        return root;
    }

    // 解析 html/js
    let candidates = [];

    if (changedContent.length > 0) {
        for (let candidate of parseCandidateStrings(changedContent, IO.Parallel | Parsing.Parallel)) {
            candidates.push(candidate)
        }
    };


    let sortCandidates = new Set(
        [...candidates.sort((a, z) => {
            if (a === z) return 0;
            if (a < z) return -1;
            return 1;
        })]
    );

    // 根据解析结果, 匹配出 ikun 原子类
    const styleSheet = generateRules(sortCandidates, context);

    //添加原子类到最终结果
    let {
        utilities: utilityNodes,
    } = styleSheet;

    if (layerNodes[utilitiesName]) {
        const r = postcss.rule({ selector: '.ikun' });

        utilityNodes.forEach(n => {
            r.append(n);
        })

        layerNodes[utilitiesName].before(r);
        // layerNodes[utilitiesName].before(cloneNodes([...utilityNodes], layerNodes.utilities.source, {
        //     layer: 'utilities',
        // }));
        layerNodes[utilitiesName].remove();
    }

};

module.exports = expandAtRules;