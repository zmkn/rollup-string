/**
 * import 文件到字符串的插件
 */

import { createFilter } from "@rollup/pluginutils";

const rollupString = (options = {}) => {
  options.include || (options.include = [/\.css/, /\.html/]);
  const filter = createFilter(options.include, options.exclude, {
    resolve: options.resolve
  });

  return {
    name: "rollupString",
    transform(code, id) {
      if (filter(id)) {
        return {
          map: { mappings: "" },
          code: `export default ${JSON.stringify(code)};`
        };
      }
    }
  };
};

export default rollupString;
