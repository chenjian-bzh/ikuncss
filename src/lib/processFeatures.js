const expandAtRules = require("./expandAtRules");
const { normalizeDirectives } = require("./normalizeDirectives");
const setupTrackingContext = require('./setupTrackingContext');

async function processFeatures(config, root, result) {

    const ikunDirectives = await normalizeDirectives(root);
    const context = setupTrackingContext(root, config, ikunDirectives,);
    await expandAtRules(context, root, result);

}

module.exports = processFeatures;
