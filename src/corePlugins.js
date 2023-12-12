const parseObjectStyles = require("./utils/parseObjectStyle");

const corePlugins = {
    'ikun': ({ addUtilities }) => {
        return addUtilities({
            'background-image': 'url("https://camo.githubusercontent.com/8a687036337cf1ac2ead07a0027915a156105cd0b1bc8b478d1a2118e20f22da/68747470733a2f2f696b756e2d75692e6e65746c6966792e6170702f6c6f676f2e737667")',
            'width': '160px',
            'height': '160px'
        });
    },
}

const buildPluginApi = {
    addUtilities: (styleObj) => {
        const delcs = parseObjectStyles(styleObj);
        return delcs
    }
}

function resolvePlugins(context) {
    const { candidateRuleMap } = context;

    for (const matcher in corePlugins) {
        const delcs = corePlugins[matcher](buildPluginApi);
        candidateRuleMap.set(matcher, delcs);
    }
}

module.exports = {
    resolvePlugins
}