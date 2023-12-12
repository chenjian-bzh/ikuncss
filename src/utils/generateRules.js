//将特殊字符转义
function escapeSpecialChars(inputString) {
    return inputString.replace(/[-[\]:{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const pseudoClassList = [
    {
        name: 'hover',
        regx: /hover\:/
    },
    {
        name: 'active',
        regx: /active\:/
    }
];

function pseudoClassVariantsMatchs(rawSelector) {
    let selectors = [];
    let matcher = rawSelector;

    for (const pseudo of pseudoClassList) {
        if (matcher.match(pseudo.regx)) {
            selectors.push(`.${escapeSpecialChars(rawSelector)}:${pseudo.name}`);
            matcher = matcher.replace(pseudo.regx, '');
        }
    }

    if (selectors.length === 0) {
        selectors.push(`.${rawSelector}`)
    }

    return {
        matcher,
        selector: selectors.join(', ')
    }
}



/**
 * 返回形式如下：
 * ikun => { selector: '.ikun', rule: Rule }
 * hover:ikun => { selector: 'hover/:ikun:hover', rule: Rule}
 * active:hover:ikun => { selector: 'active/:hover/:ikun:hover, rule: Rule}
 * @param {*} candidates 
 * @param {*} context 
 * @returns 
 */
async function generateRules(candidates, context) {

    const { candidateRuleMap } = context;

    const ruleCache = new Map();


    const rules = [];

    for (let candidate of candidates) {
        const { matcher, selector } = await pseudoClassVariantsMatchs(candidate);

        if (candidateRuleMap.has(matcher)) {
            //按照 matcher 将 selector 缓存
            if (!ruleCache.get(matcher)) {
                ruleCache.set(matcher, {
                    selectors: [selector],
                    delcs: candidateRuleMap.get(matcher)
                });
            } else {
                ruleCache.get(matcher).selectors.push(selector);
            }
        }
    }


    ruleCache.forEach((value) => {
        rules.push({
            selector: value.selectors.join(', '),
            delcs: value.delcs
        })
    });


    return rules
}

module.exports = {
    generateRules,
    pseudoClassVariantsMatchs
};

