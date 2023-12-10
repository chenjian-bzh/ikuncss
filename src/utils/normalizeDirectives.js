const utilitiesName = 'utilities'

/**
 * 
 * @param {import("postcss").Root} root
 */
async function normalizeDirectives(root) {

    const ikunDirectives = new Set();

    root.walkAtRules(atRule => {
        if (atRule.name === 'ikuncss') {
            if (atRule.params === utilitiesName) {
                ikunDirectives.add(atRule.params)
            }
        }

        if (!ikunDirectives.has(utilitiesName)) {
            throw atRule.error(`@ikun utilities is missing.`)
        }
    });


    return ikunDirectives;
}

module.exports = {
    normalizeDirectives, utilitiesName
};