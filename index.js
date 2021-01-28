'use strict';

module.exports = function () {
  function alias(css) {

    var aliases = [];
    css.walkAtRules('alias', function(rule){

      rule.walkDecls(function(decl){
        aliases.push({ name: decl.prop, property: decl.value });
      });

      rule.remove();

    });

    /**
     * Alias expander, takes an alias and expands to the relevant decleration/value
     * @param  {string} alias The alias to expand
     */
    var expander = function(alias){

      css.walkDecls(function(decl){

        if (decl.prop === alias.name) {
          decl.replaceWith({ prop: alias.property, value: decl.value, important: decl.important });
        }

      });

    };

    // Loop over and expand every alias
    aliases.forEach(expander);

  };

  return {
    postcssPlugin: 'postcss-alias',
    Once: alias
  }
};

module.exports.postcss = true;
