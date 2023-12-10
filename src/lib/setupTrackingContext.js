const { corePlugins } = require('../corePlugins.js');
const parseObjectStyles = require('./parseObjectStyle.js');

function resolveChangedContent(context, config) {
    context.changedContent = [{
        content: config.content,
        extension: 'html'
    }];
    return context;
}

function resolveCadidateRuleMap(context) {
    const { candidateRuleMap } = context;

    Object.keys(corePlugins).forEach(key => {
        const rule = parseObjectStyles(corePlugins[key]);
        candidateRuleMap.set(key, rule);
    });

    return context;
}

/**
 * 
 * @param {import('postcss').Root} root 
 * @param {*} config 
 * @param {*} ikunDirectives 
 * @returns 
 */
function setupTrackingContext(root, config, ikunDirectives) {
    const context = {
        root,
        ikunDirectives,
        ikunConfig: config,
        candidateRuleMap: new Map(), //存储 ikun 内置原子类和 css 类的映射
        changedContent: [], // html，js 字符串
        ruleCache: new Set(), //html或者 js 文件中使用到的 class
    };

    resolveChangedContent(context, config)
    resolveCadidateRuleMap(context)

    return context;
}

module.exports = setupTrackingContext