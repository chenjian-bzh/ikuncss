const expandAtRules = require("./expandAtRules");
const { normalizeDirectives } = require("./normalizeDirectives");
const setupTrackingContext = require('./setupTrackingContext');

async function processFeatures(config, root, result) {

    //解析入口 css 文件引入的 ikuncss 指令集
    const ikunDirectives = await normalizeDirectives(root);

    // 初始化上下文context， 挂载基本数据：
    //1. changedContent: 读取需要解析的 html、jsx内容
    //2. candidateRuleMap: 根据 corePlugin 解析出全量的 ikuncss 工具类和转换函数
    const context = await setupTrackingContext(root, config, ikunDirectives,);

    // 1. changedContent 提取出 tokens
    // 2. tokens 解析， 生成 postcss Rule 、Delc
    await expandAtRules(context, root, result);
}

module.exports = processFeatures;
