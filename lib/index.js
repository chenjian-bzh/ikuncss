"use strict";
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
                console.log('\nikun start compile!');
                console.time('TIME TOTAL');
                return root;
            },
            async function(root, result) {
                config = findAtConfigPath(config);
                await processFeatures(config, root, result);
            },
            function(root) {
                console.log('\nikun done.');
                console.timeEnd('TIME TOTAL');
                return root;
            }
        ]
    };
};
module.exports.postcss = true;
