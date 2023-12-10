"use strict";
function generateRules(candidates, context) {
    const { candidateRuleMap } = context;
    const utilities = [];
    for (let candidate of candidates){
        if (candidateRuleMap.has(candidate)) {
            utilities.push(candidateRuleMap.get(candidate));
        }
    }
    return {
        utilities
    };
}
module.exports = {
    generateRules
};
