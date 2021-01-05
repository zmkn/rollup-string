'use strict';

var pluginutils = require('@rollup/pluginutils');

/**
 * import 文件到字符串的插件
 */

var rollupString = function rollupString() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  options.include || (options.include = [/\.css/, /\.html/]);
  var filter = pluginutils.createFilter(options.include, options.exclude, {
    resolve: options.resolve
  });
  return {
    name: "rollupString",
    transform: function transform(code, id) {
      if (filter(id)) {
        return {
          map: {
            mappings: ""
          },
          code: "export default ".concat(JSON.stringify(code), ";")
        };
      }
    }
  };
};

module.exports = rollupString;
