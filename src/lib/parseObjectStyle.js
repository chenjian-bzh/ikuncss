const postcss = require('postcss');
const postcssNested = require('postcss-nested');
const postcssJs = require('postcss-js');

function parseObjectStyles(styles) {
    if (!Array.isArray(styles)) {
        return parseObjectStyles([styles])
    }

    return styles.flatMap((style) => {
        const a = postcss([
            postcssNested({
                bubble: ['screen'],
            }),
        ]).process(style, {
            parser: postcssJs,
        });

        return a.root.nodes
    })
}

module.exports = parseObjectStyles