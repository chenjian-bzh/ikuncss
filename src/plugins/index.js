/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  // Work with options here

  return {
    postcssPlugin: 'ikun',

    Rule(rule, { Declaration }) {
      console.log('rule: ', rule.selector);
      if (rule.selector === '.ikun') {
        const delc = new Declaration({ prop: 'background-color', value: 'red' });
        rule.append(delc);
      }
    }
  }
}

module.exports.postcss = true