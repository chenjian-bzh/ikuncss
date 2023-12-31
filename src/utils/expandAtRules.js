const { utilitiesName } = require('./normalizeDirectives');
// const { parseCandidateStrings, IO, Parsing } = require('../../oxide/crates/node');
const { parseCandidateStrings, IO, Parsing } = require('../oxide/index');
const { generateRules } = require('./generateRules');
const postcss = require('postcss');
const { log } = require('./debug')


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
        log('---- rule.name: ', rule.name)
        log('---- is ikuncss:', rule.name === 'ikuncss')

        if (rule.name === 'ikuncss') {
            layerNodes[rule.params] = rule;
        }
    });

    log('layerNodes:');
    log(layerNodes);

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
    const rules = await generateRules(sortCandidates, context);

    console.log(' ----- rules: ', rules)

    //添加原子类到最终结果
    if (layerNodes[utilitiesName]) {

        for (let rule of rules) {
            const rule_node = postcss.rule({ selector: rule.selector });

            rule.delcs.forEach(delc => {
                rule_node.append(delc);
            });

            layerNodes[utilitiesName].parent.append(rule_node);
        }

        layerNodes[utilitiesName].remove();
    }

};

module.exports = expandAtRules;