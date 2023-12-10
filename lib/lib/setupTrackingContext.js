"use strict";
const { corePlugins } = require('../corePlugins.js');
const parseObjectStyles = require('./parseObjectStyle.js');
const { glob } = require('glob');
const { readFile } = require('fs/promises');
const { extname } = require('path');
async function resolveChangedContent(context, config) {
    let _c = config.content;
    const paths = await glob(_c);
    if (paths.length === 0) {
        _c = {
            content: _c,
            extension: 'html'
        };
        context.changedContent = Array.isArray(_c) ? _c : [
            _c
        ];
    } else {
        const _cs = await Promise.all(paths.map(async (p)=>{
            return {
                content: await readFile(p, 'utf-8'),
                extension: extname(p).replace('\.', '')
            };
        }));
        context.changedContent = _cs;
    }
    return context;
}
function resolveCadidateRuleMap(context) {
    const { candidateRuleMap } = context;
    Object.keys(corePlugins).forEach((key)=>{
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
 */ async function setupTrackingContext(root, config, ikunDirectives) {
    const context = {
        root,
        ikunDirectives,
        ikunConfig: config,
        candidateRuleMap: new Map(),
        changedContent: [],
        ruleCache: new Set()
    };
    await resolveChangedContent(context, config);
    resolveCadidateRuleMap(context);
    return context;
}
module.exports = setupTrackingContext;
