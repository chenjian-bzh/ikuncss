"use strict";
const { log } = require('./lib/debug');
const findAtConfigPath = require('./lib/findAtConfigPath');
const processFeatures = require('./lib/processFeatures');
/**
 * @type {import('postcss').PluginCreator}
 */ module.exports = (config)=>{
    // Work with options here
    return {
        postcssPlugin: 'ikun',
        plugins: [
            function(root) {
                log('\n ---- ikun start compile!');
                console.time('TIME TOTAL');
                return root;
            },
            async function(root, result) {
                config = findAtConfigPath(config);
                await processFeatures(config, root, result);
            },
            function(root) {
                log('\n ---- ikun done.');
                console.timeEnd('TIME TOTAL');
                return root;
            }
        ]
    };
};
module.exports.postcss = true;
