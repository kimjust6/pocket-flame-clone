var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
    key = keys[i];
    if (!__hasOwnProp2.call(to, key) && key !== except) __defProp2(to, key, {
      get: ((k) => from[k]).bind(null, key),
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", {
  value: mod,
  enumerable: true
}) : target, mod));
const HOOKS_DIR = typeof __hooks !== "undefined" ? __hooks : ".";
const pocketbase_ejs = __toESM(require(HOOKS_DIR + "/lib/vendor/pocketbase-ejs/lib/ejs.js"));
const pocketbase_node = __toESM(require(HOOKS_DIR + "/lib/vendor/pocketbase-node.js"));
const pocketbase_stringify = __toESM(require(HOOKS_DIR + "/lib/vendor/pocketbase-stringify.js"));
const oldCompile = pocketbase_ejs.default.compile;
const oldResolveInclude = pocketbase_ejs.default.resolveInclude;
const oldIncludeFile = pocketbase_ejs.default.includeFile;
const VALID_CONFIG_KEYS = [
  "name",
  "extensions",
  "debug"
];
const ejsPluinFactory = (config, extra) => {
  const opts = __spreadValues({
    extensions: [".ejs"]
  }, extra);
  Object.keys(opts).forEach((key) => {
    if (!VALID_CONFIG_KEYS.includes(key)) throw new Error(`Invalid config key: ${key}`);
  });
  const { pagesRoot, dbg } = config;
  pocketbase_ejs.default.compile = function (template, options) {
    const newTemplate = template.replaceAll(/<script\s+server>([\s\S]*?)<\/script>/g, "<% $1 %>");
    return oldCompile(newTemplate, __spreadValues({}, options));
  };
  pocketbase_ejs.default.resolveInclude = function (includePath, templatePath, isDir) {
    dbg(`ejs resolveInclude ${includePath} from ${templatePath} <${isDir ? "dir" : "file"}>`);
    if (isDir) return pocketbase_node.path.resolve(pagesRoot, includePath);
    const tryExtensions = (basePath) => {
      if (pocketbase_node.fs.existsSync(basePath, "file")) {
        dbg(`found exact path ${basePath}`);
        return basePath;
      }
      for (const ext of opts.extensions) {
        const pathWithExt = basePath + ext;
        if (pocketbase_node.fs.existsSync(pathWithExt, "file")) {
          dbg(`found extension ${pathWithExt}`);
          return pathWithExt;
        }
      }
      return null;
    };
    let currentPath = pocketbase_node.path.dirname(templatePath);
    const triedPaths = [];
    while (currentPath.length >= pagesRoot.length) {
      const attemptPath = pocketbase_node.path.resolve(currentPath, `_private`, includePath);
      if (!attemptPath.startsWith(pagesRoot)) {
        dbg(`skipping ${attemptPath} in ${pagesRoot}`);
        break;
      }
      dbg(`trying ${attemptPath} in ${pagesRoot}`);
      const foundPath = tryExtensions(attemptPath);
      if (foundPath) return foundPath;
      triedPaths.push(attemptPath);
      if (currentPath === pagesRoot) break;
      currentPath = pocketbase_node.path.dirname(currentPath);
    }
    throw new Error(`No partial '${includePath}' found in any _private directory. Tried: ${triedPaths.join(", ")}`);
  };
  const _handles = (filePath) => {
    return opts.extensions.includes($filepath.ext(filePath));
  };
  const thisPlugin = {
    name: "ejs",
    handles: ({ filePath }) => {
      return _handles(filePath);
    },
    onRender: (renderContext) => {
      const { api, filePath, plugins } = renderContext;
      if (!_handles(filePath)) return renderContext.content;
      dbg(`onRender ${filePath}`);
      const content = pocketbase_ejs.default.renderFile(filePath, __spreadProps(__spreadValues({}, api), {
        api
      }), {
        prepend: `
            const echo = (...args) => {
              const result = args.map((arg) => {
                if (typeof arg === 'object') {
                  return JSON.stringify(arg)
                }
                return arg.toString()
              })
              return __append(result.join(' '))
            }
          `,
        compileDebug: true,
        async: false,
        cache: false,
        root: pagesRoot,
        includeFile: function (path$1, options) {
          dbg(`includeFile ${path$1}`);
          const renderFunc = oldIncludeFile(path$1, options);
          return (data) => {
            const rawRendered = renderFunc(data);
            return plugins.filter((otherPlugin) => otherPlugin.name !== thisPlugin.name).reduce((content$1, plugin) => {
              var _a, _b;
              dbg(`calling ${plugin.name}:onRender ${path$1}`);
              return (_b = (_a = plugin.onRender) == null ? void 0 : _a.call(plugin, __spreadProps(__spreadValues({}, renderContext), {
                api: data,
                content: content$1,
                filePath: pocketbase_ejs.default.resolveInclude(path$1, filePath, false)
              }))) != null ? _b : content$1;
            }, rawRendered);
          };
        }
      });
      if (typeof content !== "string") {
        if (content === void 0 || content === null) return "";
        return (0, pocketbase_stringify.stringify)(content);
      }
      return content;
    }
  };
  return thisPlugin;
};
var src_default = ejsPluinFactory;
module.exports = src_default;

