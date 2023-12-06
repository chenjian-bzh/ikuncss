/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  // Work with options here

  return {
    postcssPlugin: 'ikun',

    Rule(rule, { Declaration }) {
      if (rule.selector === '.ikun') {
        console.log('rule: ', rule.selector);
        const delc1 = new Declaration({ prop: 'background-color', value: 'red' });
        const delc2 = new Declaration({ prop: 'width', value: '200px' });
        const delc3 = new Declaration({ prop: 'height', value: '200px' });
        rule.append(delc1);
        rule.append(delc2);
        rule.append(delc3);
      }
    }
  }
}

module.exports.postcss = true