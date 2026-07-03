var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/pocketbase-ejs/node_modules/pocketbase-node/dist/index.js
var require_dist = __commonJS({
  "node_modules/pocketbase-ejs/node_modules/pocketbase-node/dist/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames3 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames3(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export(src_exports, {
      child_process: () => child_process_exports,
      fs: () => fs_exports,
      path: () => path_exports,
      process: () => process_exports
    });
    module2.exports = __toCommonJS(src_exports);
    var fs_exports = {};
    __export(fs_exports, {
      existsSync: () => existsSync,
      mkdirSync: () => mkdirSync,
      readFileSync: () => readFileSync,
      writeFileSync: () => writeFileSync
    });
    function byteArrayToUtf8(byteArray) {
      let utf8String = "";
      for (let i = 0; i < byteArray.length; i++) {
        utf8String += String.fromCharCode(byteArray[i]);
      }
      return decodeURIComponent(escape(utf8String));
    }
    var readFileSync = (path2, options) => {
      const res = $os.readFile(path2);
      if (typeof res === "string") {
        return res;
      }
      const s = byteArrayToUtf8(res);
      return s;
    };
    var existsSync = (path2, fileType = `file`) => {
      const isDir = (() => {
        try {
          $os.readDir(path2);
          return true;
        } catch {
          return false;
        }
      })();
      const isFile = (() => {
        if (isDir) {
          return false;
        }
        try {
          return $filesystem.fileFromPath(path2) !== null;
        } catch {
          return false;
        }
      })();
      return fileType === "file" ? isFile : fileType === "dir" ? isDir : isFile || isDir;
    };
    var writeFileSync = (path2, data, options) => {
      if (typeof path2 !== "string") {
        throw new Error("path must be a string");
      }
      if (typeof data !== "string") {
        throw new Error("data must be a string");
      }
      const mode = (() => {
        if (typeof options === "object" && "mode" in options) {
          return options.mode;
        }
        return 420;
      })();
      $os.writeFile(path2, data, mode);
    };
    function mkdirSync(path2, options) {
      const mode = (() => {
        if (typeof options === "object" && "mode" in options) {
          return options.mode;
        }
        return 493;
      })();
      $os.mkdirAll(path2.toString(), mode);
      return;
    }
    var path_exports = {};
    __export(path_exports, {
      basename: () => basename,
      delimiter: () => delimiter,
      dirname: () => dirname,
      extname: () => extname,
      format: () => format,
      isAbsolute: () => isAbsolute,
      join: () => join,
      normalize: () => normalize,
      parse: () => parse,
      relative: () => relative,
      resolve: () => resolve,
      sep: () => sep,
      win32: () => win32
    });
    function assertPath(path2) {
      if (typeof path2 !== "string") {
        throw new TypeError(
          "Path must be a string. Received " + JSON.stringify(path2)
        );
      }
    }
    function normalizeStringPosix(path2, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i = 0; i <= path2.length; ++i) {
        if (i < path2.length) code = path2.charCodeAt(i);
        else if (code === 47) break;
        else code = 47;
        if (code === 47) {
          if (lastSlash === i - 1 || dots === 1) {
          } else if (lastSlash !== i - 1 && dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = "";
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                  }
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0) res += "/..";
              else res = "..";
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0) res += "/" + path2.slice(lastSlash + 1, i);
            else res = path2.slice(lastSlash + 1, i);
            lastSegmentLength = i - lastSlash - 1;
          }
          lastSlash = i;
          dots = 0;
        } else if (code === 46 && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    }
    function _format(sep2, pathObject) {
      var dir = pathObject.dir || pathObject.root;
      var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
      if (!dir) {
        return base;
      }
      if (dir === pathObject.root) {
        return dir + base;
      }
      return dir + sep2 + base;
    }
    function resolve(...args) {
      var resolvedPath = "";
      var resolvedAbsolute = false;
      var cwd2;
      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path2;
        if (i >= 0) path2 = arguments[i];
        else {
          if (cwd2 === void 0) cwd2 = $os.getwd();
          path2 = cwd2;
        }
        assertPath(path2);
        if (path2.length === 0) {
          continue;
        }
        resolvedPath = path2 + "/" + resolvedPath;
        resolvedAbsolute = path2.charCodeAt(0) === 47;
      }
      resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
      if (resolvedAbsolute) {
        if (resolvedPath.length > 0) return "/" + resolvedPath;
        else return "/";
      } else if (resolvedPath.length > 0) {
        return resolvedPath;
      } else {
        return ".";
      }
    }
    function normalize(path2) {
      assertPath(path2);
      if (path2.length === 0) return ".";
      var isAbsolute2 = path2.charCodeAt(0) === 47;
      var trailingSeparator = path2.charCodeAt(path2.length - 1) === 47;
      path2 = normalizeStringPosix(path2, !isAbsolute2);
      if (path2.length === 0 && !isAbsolute2) path2 = ".";
      if (path2.length > 0 && trailingSeparator) path2 += "/";
      if (isAbsolute2) return "/" + path2;
      return path2;
    }
    function isAbsolute(path2) {
      assertPath(path2);
      return path2.length > 0 && path2.charCodeAt(0) === 47;
    }
    function join(...paths) {
      if (arguments.length === 0) return ".";
      var joined;
      for (var i = 0; i < arguments.length; ++i) {
        var arg = arguments[i];
        assertPath(arg);
        if (arg.length > 0) {
          if (joined === void 0) joined = arg;
          else joined += "/" + arg;
        }
      }
      if (joined === void 0) return ".";
      return normalize(joined);
    }
    function relative(from, to) {
      assertPath(from);
      assertPath(to);
      if (from === to) return "";
      from = resolve(from);
      to = resolve(to);
      if (from === to) return "";
      var fromStart = 1;
      for (; fromStart < from.length; ++fromStart) {
        if (from.charCodeAt(fromStart) !== 47) break;
      }
      var fromEnd = from.length;
      var fromLen = fromEnd - fromStart;
      var toStart = 1;
      for (; toStart < to.length; ++toStart) {
        if (to.charCodeAt(toStart) !== 47) break;
      }
      var toEnd = to.length;
      var toLen = toEnd - toStart;
      var length = fromLen < toLen ? fromLen : toLen;
      var lastCommonSep = -1;
      var i = 0;
      for (; i <= length; ++i) {
        if (i === length) {
          if (toLen > length) {
            if (to.charCodeAt(toStart + i) === 47) {
              return to.slice(toStart + i + 1);
            } else if (i === 0) {
              return to.slice(toStart + i);
            }
          } else if (fromLen > length) {
            if (from.charCodeAt(fromStart + i) === 47) {
              lastCommonSep = i;
            } else if (i === 0) {
              lastCommonSep = 0;
            }
          }
          break;
        }
        var fromCode = from.charCodeAt(fromStart + i);
        var toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 47) lastCommonSep = i;
      }
      var out = "";
      for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from.charCodeAt(i) === 47) {
          if (out.length === 0) out += "..";
          else out += "/..";
        }
      }
      if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
      else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47) ++toStart;
        return to.slice(toStart);
      }
    }
    function dirname(path2) {
      assertPath(path2);
      if (path2.length === 0) return ".";
      var code = path2.charCodeAt(0);
      var hasRoot = code === 47;
      var end = -1;
      var matchedSlash = true;
      for (var i = path2.length - 1; i >= 1; --i) {
        code = path2.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          matchedSlash = false;
        }
      }
      if (end === -1) return hasRoot ? "/" : ".";
      if (hasRoot && end === 1) return "//";
      return path2.slice(0, end);
    }
    function basename(path2, ext) {
      if (ext !== void 0 && typeof ext !== "string")
        throw new TypeError('"ext" argument must be a string');
      assertPath(path2);
      var start = 0;
      var end = -1;
      var matchedSlash = true;
      var i;
      if (ext !== void 0 && ext.length > 0 && ext.length <= path2.length) {
        if (ext.length === path2.length && ext === path2) return "";
        var extIdx = ext.length - 1;
        var firstNonSlashEnd = -1;
        for (i = path2.length - 1; i >= 0; --i) {
          var code = path2.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
            if (firstNonSlashEnd === -1) {
              matchedSlash = false;
              firstNonSlashEnd = i + 1;
            }
            if (extIdx >= 0) {
              if (code === ext.charCodeAt(extIdx)) {
                if (--extIdx === -1) {
                  end = i;
                }
              } else {
                extIdx = -1;
                end = firstNonSlashEnd;
              }
            }
          }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path2.length;
        return path2.slice(start, end);
      } else {
        for (i = path2.length - 1; i >= 0; --i) {
          if (path2.charCodeAt(i) === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
        }
        if (end === -1) return "";
        return path2.slice(start, end);
      }
    }
    function extname(path2) {
      assertPath(path2);
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var preDotState = 0;
      for (var i = path2.length - 1; i >= 0; --i) {
        var code = path2.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1) startDot = i;
          else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
      }
      return path2.slice(startDot, end);
    }
    function format(pathObject) {
      if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(
          'The "pathObject" argument must be of type Object. Received type ' + typeof pathObject
        );
      }
      return _format("/", pathObject);
    }
    function parse(path2) {
      assertPath(path2);
      var ret = { root: "", dir: "", base: "", ext: "", name: "" };
      if (path2.length === 0) return ret;
      var code = path2.charCodeAt(0);
      var isAbsolute2 = code === 47;
      var start;
      if (isAbsolute2) {
        ret.root = "/";
        start = 1;
      } else {
        start = 0;
      }
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var i = path2.length - 1;
      var preDotState = 0;
      for (; i >= start; --i) {
        code = path2.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1) startDot = i;
          else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
          if (startPart === 0 && isAbsolute2)
            ret.base = ret.name = path2.slice(1, end);
          else ret.base = ret.name = path2.slice(startPart, end);
        }
      } else {
        if (startPart === 0 && isAbsolute2) {
          ret.name = path2.slice(1, startDot);
          ret.base = path2.slice(1, end);
        } else {
          ret.name = path2.slice(startPart, startDot);
          ret.base = path2.slice(startPart, end);
        }
        ret.ext = path2.slice(startDot, end);
      }
      if (startPart > 0) ret.dir = path2.slice(0, startPart - 1);
      else if (isAbsolute2) ret.dir = "/";
      return ret;
    }
    var sep = "/";
    var delimiter = ":";
    var win32 = null;
    var child_process_exports = {};
    __export(child_process_exports, {
      execSync: () => execSync
    });
    var execSync = (cmdArr) => {
      const [cmd, ...args] = cmdArr;
      const _cmd = $os.cmd(cmd, ...args);
      const charOut = _cmd.output();
      const output = String.fromCharCode(...charOut);
      return output;
    };
    var process_exports = {};
    __export(process_exports, {
      cwd: () => cwd,
      env: () => env
    });
    var cwd = () => $os.getwd();
    var { env } = process;
  }
});

// node_modules/pocketbase-ejs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/pocketbase-ejs/lib/utils.js"(exports2) {
    "use strict";
    var regExpChars = /[|\\{}()[\]^$+*?.]/g;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasOwn = function(obj, key) {
      return hasOwnProperty.apply(obj, [key]);
    };
    exports2.escapeRegExpChars = function(string) {
      if (!string) {
        return "";
      }
      return String(string).replace(regExpChars, "\\$&");
    };
    var _ENCODE_HTML_RULES = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&#34;",
      "'": "&#39;"
    };
    var _MATCH_HTML = /[&<>'"]/g;
    function encode_char(c) {
      return _ENCODE_HTML_RULES[c] || c;
    }
    var escapeFuncStr = `var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
`;
    exports2.escapeXML = function(markup) {
      return markup == void 0 ? "" : String(markup).replace(_MATCH_HTML, encode_char);
    };
    function escapeXMLToString() {
      return Function.prototype.toString.call(this) + ";\n" + escapeFuncStr;
    }
    try {
      if (typeof Object.defineProperty === "function") {
        Object.defineProperty(exports2.escapeXML, "toString", { value: escapeXMLToString });
      } else {
        exports2.escapeXML.toString = escapeXMLToString;
      }
    } catch (err) {
      console.warn("Unable to set escapeXML.toString (is the Function prototype frozen?)");
    }
    exports2.shallowCopy = function(to, from) {
      from = from || {};
      if (to !== null && to !== void 0) {
        for (var p in from) {
          if (!hasOwn(from, p)) {
            continue;
          }
          if (p === "__proto__" || p === "constructor") {
            continue;
          }
          to[p] = from[p];
        }
      }
      return to;
    };
    exports2.shallowCopyFromList = function(to, from, list) {
      list = list || [];
      from = from || {};
      if (to !== null && to !== void 0) {
        for (var i = 0; i < list.length; i++) {
          var p = list[i];
          if (typeof from[p] != "undefined") {
            if (!hasOwn(from, p)) {
              continue;
            }
            if (p === "__proto__" || p === "constructor") {
              continue;
            }
            to[p] = from[p];
          }
        }
      }
      return to;
    };
    exports2.cache = {
      _data: {},
      set: function(key, val) {
        this._data[key] = val;
      },
      get: function(key) {
        return this._data[key];
      },
      remove: function(key) {
        delete this._data[key];
      },
      reset: function() {
        this._data = {};
      }
    };
    exports2.hyphenToCamel = function(str) {
      return str.replace(/-[a-z]/g, function(match) {
        return match[1].toUpperCase();
      });
    };
    exports2.createNullProtoObjWherePossible = (function() {
      if (typeof Object.create == "function") {
        return function() {
          return /* @__PURE__ */ Object.create(null);
        };
      }
      if (!({ __proto__: null } instanceof Object)) {
        return function() {
          return { __proto__: null };
        };
      }
      return function() {
        return {};
      };
    })();
    exports2.hasOwnOnlyObject = function(obj) {
      var o = exports2.createNullProtoObjWherePossible();
      for (var p in obj) {
        if (hasOwn(obj, p)) {
          o[p] = obj[p];
        }
      }
      return o;
    };
  }
});

// node_modules/pocketbase-ejs/package.json
var require_package = __commonJS({
  "node_modules/pocketbase-ejs/package.json"(exports2, module2) {
    module2.exports = {
      name: "pocketbase-ejs",
      description: "Embedded JavaScript templates",
      keywords: [
        "template",
        "engine",
        "ejs"
      ],
      version: "3.1.10006",
      author: "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",
      license: "Apache-2.0",
      main: "./lib/ejs.js",
      types: "./lib/ejs.d.ts",
      repository: {
        type: "git",
        url: "git://github.com/benallfree/pocketbase-ejs.git"
      },
      bugs: "https://github.com/benallfree/pocketbase-ejs/issues",
      homepage: "https://github.com/benallfree/pocketbase-ejs",
      devDependencies: {
        "@changesets/cli": "^2.27.11",
        browserify: "^16.5.1",
        eslint: "^6.8.0",
        "git-directory-deploy": "^1.5.1",
        jsdoc: "^4.0.2",
        "lru-cache": "^4.0.1",
        mocha: "^10.2.0",
        "uglify-js": "^3.3.16",
        jake: "^10.8.5"
      },
      engines: {
        node: ">=0.10.0"
      },
      scripts: {
        test: "npx jake test"
      },
      files: [
        "lib"
      ],
      dependencies: {
        "pocketbase-node": "^0.0.2"
      }
    };
  }
});

// node_modules/pocketbase-ejs/lib/ejs.js
var require_ejs = __commonJS({
  "node_modules/pocketbase-ejs/lib/ejs.js"(exports2) {
    "use strict";
    var { fs: fs2, path: path2 } = require_dist();
    var utils = require_utils();
    var scopeOptionWarned = false;
    var _VERSION_STRING = require_package().version;
    var _DEFAULT_OPEN_DELIMITER = "<";
    var _DEFAULT_CLOSE_DELIMITER = ">";
    var _DEFAULT_DELIMITER = "%";
    var _DEFAULT_LOCALS_NAME = "locals";
    var _NAME = "ejs";
    var _REGEX_STRING = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)";
    var _OPTS_PASSABLE_WITH_DATA = [
      "delimiter",
      "scope",
      "context",
      "debug",
      "compileDebug",
      "client",
      "_with",
      "rmWhitespace",
      "strict",
      "filename",
      "async"
    ];
    var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat("cache");
    var _BOM = /^\uFEFF/;
    var _JS_IDENTIFIER = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
    exports2.cache = utils.cache;
    exports2.fileLoader = fs2.readFileSync;
    exports2.localsName = _DEFAULT_LOCALS_NAME;
    exports2.promiseImpl = new Function("return this;")().Promise;
    exports2.resolveInclude = function(name, filename, isDir) {
      var dirname = path2.dirname;
      var extname = path2.extname;
      var resolve = path2.resolve;
      var includePath = resolve(isDir ? filename : dirname(filename), name);
      var ext = extname(name);
      if (!ext) {
        includePath += ".ejs";
      }
      return includePath;
    };
    function resolvePaths(name, paths) {
      var filePath;
      if (paths.some(function(v) {
        filePath = exports2.resolveInclude(name, v, true);
        return fs2.existsSync(filePath);
      })) {
        return filePath;
      }
    }
    function getIncludePath(path3, options) {
      var includePath;
      var filePath;
      var views = options.views;
      var match = /^[A-Za-z]+:\\|^\//.exec(path3);
      if (match && match.length) {
        path3 = path3.replace(/^\/*/, "");
        if (Array.isArray(options.root)) {
          includePath = resolvePaths(path3, options.root);
        } else {
          includePath = exports2.resolveInclude(path3, options.root || "/", true);
        }
      } else {
        if (options.filename) {
          filePath = exports2.resolveInclude(path3, options.filename);
          if (fs2.existsSync(filePath)) {
            includePath = filePath;
          }
        }
        if (!includePath && Array.isArray(views)) {
          includePath = resolvePaths(path3, views);
        }
        if (!includePath && typeof options.includer !== "function") {
          throw new Error('Could not find the include file "' + options.escapeFunction(path3) + '"');
        }
      }
      return includePath;
    }
    function handleCache(options, template) {
      var func;
      var filename = options.filename;
      var hasTemplate = arguments.length > 1;
      if (options.cache) {
        if (!filename) {
          throw new Error("cache option requires a filename");
        }
        func = exports2.cache.get(filename);
        if (func) {
          return func;
        }
        if (!hasTemplate) {
          template = fileLoader(filename).toString().replace(_BOM, "");
        }
      } else if (!hasTemplate) {
        if (!filename) {
          throw new Error("Internal EJS error: no file name or template provided");
        }
        template = fileLoader(filename).toString().replace(_BOM, "");
      }
      func = exports2.compile(template, options);
      if (options.cache) {
        exports2.cache.set(filename, func);
      }
      return func;
    }
    function fileLoader(filePath) {
      return exports2.fileLoader(filePath);
    }
    exports2.includeFile = function includeFile(path3, options) {
      var opts = utils.shallowCopy(utils.createNullProtoObjWherePossible(), options);
      opts.filename = getIncludePath(path3, opts);
      if (typeof options.includer === "function") {
        var includerResult = options.includer(path3, opts.filename);
        if (includerResult) {
          if (includerResult.filename) {
            opts.filename = includerResult.filename;
          }
          if (includerResult.template) {
            return handleCache(opts, includerResult.template);
          }
        }
      }
      return handleCache(opts);
    };
    function extractLineAndCol(stack) {
      const match = stack.match(/anonymous \(<eval>:(\d+):(\d+)/);
      if (match) {
        return {
          line: parseInt(match[1]),
          col: parseInt(match[2])
        };
      }
      return null;
    }
    function rethrow(err, str, flnm, lineno, esc, prependLines) {
      if (err instanceof BadRequestError) {
        throw err;
      }
      const { line, col } = extractLineAndCol(err.stack);
      const realLineNo = line - prependLines - lineno + 1;
      console.log(`lineno`, lineno, `prependLines`, prependLines, `line`, line, `realLineNo`, realLineNo);
      console.log(err.stack);
      var lines = str.split("\n");
      var start = Math.max(realLineNo - 30, 0);
      var end = Math.min(lines.length, realLineNo + 3);
      var filename = esc(flnm);
      var context = lines.slice(start, end).map(function(line2, i) {
        var curr = i + start + 1;
        return (curr == realLineNo ? " >> " : "    ") + curr + "| " + line2;
      }).join("\n");
      err.message = (filename || "ejs") + ":" + realLineNo + "\n" + context + "\n\n" + err.message;
      err.path = filename;
      err.originalError = err;
      throw err;
    }
    function stripSemi(str) {
      return str.replace(/;(\s*$)/, "$1");
    }
    exports2.compile = function compile(template, opts) {
      var templ;
      if (opts && opts.scope) {
        if (!scopeOptionWarned) {
          console.warn("`scope` option is deprecated and will be removed in EJS 3");
          scopeOptionWarned = true;
        }
        if (!opts.context) {
          opts.context = opts.scope;
        }
        delete opts.scope;
      }
      templ = new Template(template, opts);
      return templ.compile();
    };
    exports2.render = function(template, d, o) {
      var data = d || utils.createNullProtoObjWherePossible();
      var opts = o || utils.createNullProtoObjWherePossible();
      if (arguments.length == 2) {
        utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
      }
      return handleCache(opts, template)(data);
    };
    exports2.renderFile = function() {
      var args = Array.prototype.slice.call(arguments);
      var filename = args.shift();
      var cb;
      var opts = { filename };
      var data;
      var viewOpts;
      if (typeof arguments[arguments.length - 1] == "function") {
        cb = args.pop();
      }
      if (args.length) {
        data = args.shift();
        if (args.length) {
          utils.shallowCopy(opts, args.pop());
        } else {
          if (data.settings) {
            if (data.settings.views) {
              opts.views = data.settings.views;
            }
            if (data.settings["view cache"]) {
              opts.cache = true;
            }
            viewOpts = data.settings["view options"];
            if (viewOpts) {
              utils.shallowCopy(opts, viewOpts);
            }
          }
          utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
        }
        opts.filename = filename;
      } else {
        data = utils.createNullProtoObjWherePossible();
      }
      return handleCache(opts)(data);
    };
    exports2.Template = Template;
    exports2.clearCache = function() {
      exports2.cache.reset();
    };
    function Template(text, optsParam) {
      var opts = utils.hasOwnOnlyObject(optsParam);
      var options = utils.createNullProtoObjWherePossible();
      this.templateText = text;
      this.mode = null;
      this.truncate = false;
      this.currentLine = 1;
      this.source = "";
      options.includeFile = opts.includeFile || exports2.includeFile;
      options.prepend = opts.prepend || "";
      options.client = opts.client || false;
      options.escapeFunction = opts.escape || opts.escapeFunction || utils.escapeXML;
      options.compileDebug = opts.compileDebug !== false;
      options.debug = !!opts.debug;
      options.filename = opts.filename;
      options.openDelimiter = opts.openDelimiter || exports2.openDelimiter || _DEFAULT_OPEN_DELIMITER;
      options.closeDelimiter = opts.closeDelimiter || exports2.closeDelimiter || _DEFAULT_CLOSE_DELIMITER;
      options.delimiter = opts.delimiter || exports2.delimiter || _DEFAULT_DELIMITER;
      options.strict = opts.strict || false;
      options.context = opts.context;
      options.cache = opts.cache || false;
      options.rmWhitespace = opts.rmWhitespace;
      options.root = opts.root;
      options.includer = opts.includer;
      options.outputFunctionName = opts.outputFunctionName;
      options.localsName = opts.localsName || exports2.localsName || _DEFAULT_LOCALS_NAME;
      options.views = opts.views;
      options.async = opts.async;
      options.destructuredLocals = opts.destructuredLocals;
      options.legacyInclude = typeof opts.legacyInclude != "undefined" ? !!opts.legacyInclude : true;
      if (options.strict) {
        options._with = false;
      } else {
        options._with = typeof opts._with != "undefined" ? opts._with : true;
      }
      this.opts = options;
      this.regex = this.createRegex();
    }
    Template.modes = {
      EVAL: "eval",
      ESCAPED: "escaped",
      RAW: "raw",
      COMMENT: "comment",
      LITERAL: "literal"
    };
    Template.prototype = {
      createRegex: function() {
        var str = _REGEX_STRING;
        var delim = utils.escapeRegExpChars(this.opts.delimiter);
        var open = utils.escapeRegExpChars(this.opts.openDelimiter);
        var close = utils.escapeRegExpChars(this.opts.closeDelimiter);
        str = str.replace(/%/g, delim).replace(/</g, open).replace(/>/g, close);
        return new RegExp(str);
      },
      compile: function() {
        var src;
        var fn;
        var opts = this.opts;
        var prepended = opts.prepend;
        var appended = "";
        var escapeFn = opts.escapeFunction;
        var ctor;
        var sanitizedFilename = opts.filename ? JSON.stringify(opts.filename) : "undefined";
        if (!this.source) {
          this.generateSource();
          prepended += '  var __output = "";\n  function __append(s) { if (s !== undefined && s !== null) __output += s }\n';
          if (opts.outputFunctionName) {
            if (!_JS_IDENTIFIER.test(opts.outputFunctionName)) {
              throw new Error("outputFunctionName is not a valid JS identifier.");
            }
            prepended += "  var " + opts.outputFunctionName + " = __append;\n";
          }
          if (opts.localsName && !_JS_IDENTIFIER.test(opts.localsName)) {
            throw new Error("localsName is not a valid JS identifier.");
          }
          if (opts.destructuredLocals && opts.destructuredLocals.length) {
            var destructuring = "  var __locals = (" + opts.localsName + " || {}),\n";
            for (var i = 0; i < opts.destructuredLocals.length; i++) {
              var name = opts.destructuredLocals[i];
              if (!_JS_IDENTIFIER.test(name)) {
                throw new Error("destructuredLocals[" + i + "] is not a valid JS identifier.");
              }
              if (i > 0) {
                destructuring += ",\n  ";
              }
              destructuring += name + " = __locals." + name;
            }
            prepended += destructuring + ";\n";
          }
          if (opts._with !== false) {
            prepended += "  with (" + opts.localsName + " || {}) {\n";
            appended += "  }\n";
          }
          appended += "  return __output;\n";
          this.source = prepended + this.source + appended;
        }
        if (opts.compileDebug) {
          src = "var __line = 1\n  , __lines = " + JSON.stringify(this.templateText) + "\n  , __filename = " + sanitizedFilename + ";\ntry {\n" + this.source + `} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn, ${prepended.split("\n").length + 4});
}
`;
        } else {
          src = this.source;
        }
        if (opts.client) {
          src = "escapeFn = escapeFn || " + escapeFn.toString() + ";\n" + src;
          if (opts.compileDebug) {
            src = "rethrow = rethrow || " + rethrow.toString() + ";\n" + src;
          }
        }
        if (opts.strict) {
          src = '"use strict";\n' + src;
        }
        if (opts.debug) {
          console.log(src);
        }
        if (opts.compileDebug && opts.filename) {
          src = src + "\n//# sourceURL=" + sanitizedFilename + "\n";
        }
        try {
          if (opts.async) {
            try {
              ctor = new Function("return (async function(){}).constructor;")();
            } catch (e) {
              if (e instanceof SyntaxError) {
                throw new Error("This environment does not support async/await");
              } else {
                throw e;
              }
            }
          } else {
            ctor = Function;
          }
          fn = new ctor(opts.localsName + ", escapeFn, include, rethrow", src);
        } catch (e) {
          if (e instanceof SyntaxError) {
            if (opts.filename) {
              e.message += " in " + opts.filename;
            }
            e.message += " while compiling ejs\n\n";
            e.message += "If the above error is not helpful, you may want to try EJS-Lint:\n";
            e.message += "https://github.com/RyanZim/EJS-Lint";
            if (!opts.async) {
              e.message += "\n";
              e.message += "Or, if you meant to create an async function, pass `async: true` as an option.";
            }
          }
          throw e;
        }
        var returnedFn = opts.client ? fn : function anonymous(data) {
          var include = function(path3, includeData) {
            var d = utils.shallowCopy(utils.createNullProtoObjWherePossible(), data);
            if (includeData) {
              d = utils.shallowCopy(d, includeData);
            }
            return opts.includeFile(path3, opts)(d);
          };
          return fn.apply(
            opts.context,
            [data || utils.createNullProtoObjWherePossible(), escapeFn, include, rethrow]
          );
        };
        if (opts.filename && typeof Object.defineProperty === "function") {
          var filename = opts.filename;
          var basename = path2.basename(filename, path2.extname(filename));
          try {
            Object.defineProperty(returnedFn, "name", {
              value: basename,
              writable: false,
              enumerable: false,
              configurable: true
            });
          } catch (e) {
          }
        }
        return returnedFn;
      },
      generateSource: function() {
        var opts = this.opts;
        if (opts.rmWhitespace) {
          this.templateText = this.templateText.replace(/[\r\n]+/g, "\n").replace(/^\s+|\s+$/gm, "");
        }
        this.templateText = this.templateText.replace(/[ \t]*<%_/gm, "<%_").replace(/_%>[ \t]*/gm, "_%>");
        var self = this;
        var matches = this.parseTemplateText();
        var d = this.opts.delimiter;
        var o = this.opts.openDelimiter;
        var c = this.opts.closeDelimiter;
        if (matches && matches.length) {
          matches.forEach(function(line, index) {
            var closing;
            if (line.indexOf(o + d) === 0 && line.indexOf(o + d + d) !== 0) {
              closing = matches[index + 2];
              if (!(closing == d + c || closing == "-" + d + c || closing == "_" + d + c)) {
                throw new Error('Could not find matching close tag for "' + line + '".');
              }
            }
            self.scanLine(line);
          });
        }
      },
      parseTemplateText: function() {
        var str = this.templateText;
        var pat = this.regex;
        var result = pat.exec(str);
        var arr = [];
        var firstPos;
        while (result) {
          firstPos = result.index;
          if (firstPos !== 0) {
            arr.push(str.substring(0, firstPos));
            str = str.slice(firstPos);
          }
          arr.push(result[0]);
          str = str.slice(result[0].length);
          result = pat.exec(str);
        }
        if (str) {
          arr.push(str);
        }
        return arr;
      },
      _addOutput: function(line) {
        if (this.truncate) {
          line = line.replace(/^(?:\r\n|\r|\n)/, "");
          this.truncate = false;
        }
        if (!line) {
          return line;
        }
        line = line.replace(/\\/g, "\\\\");
        line = line.replace(/\n/g, "\\n");
        line = line.replace(/\r/g, "\\r");
        line = line.replace(/"/g, '\\"');
        this.source += '    ; __append("' + line + '")\n';
      },
      scanLine: function(line) {
        var self = this;
        var d = this.opts.delimiter;
        var o = this.opts.openDelimiter;
        var c = this.opts.closeDelimiter;
        var newLineCount = 0;
        newLineCount = line.split("\n").length - 1;
        switch (line) {
          case o + d:
          case o + d + "_":
            this.mode = Template.modes.EVAL;
            break;
          case o + d + "=":
            this.mode = Template.modes.ESCAPED;
            break;
          case o + d + "-":
            this.mode = Template.modes.RAW;
            break;
          case o + d + "#":
            this.mode = Template.modes.COMMENT;
            break;
          case o + d + d:
            this.mode = Template.modes.LITERAL;
            this.source += '    ; __append("' + line.replace(o + d + d, o + d) + '")\n';
            break;
          case d + d + c:
            this.mode = Template.modes.LITERAL;
            this.source += '    ; __append("' + line.replace(d + d + c, d + c) + '")\n';
            break;
          case d + c:
          case "-" + d + c:
          case "_" + d + c:
            if (this.mode == Template.modes.LITERAL) {
              this._addOutput(line);
            }
            this.mode = null;
            this.truncate = line.indexOf("-") === 0 || line.indexOf("_") === 0;
            break;
          default:
            if (this.mode) {
              switch (this.mode) {
                case Template.modes.EVAL:
                case Template.modes.ESCAPED:
                case Template.modes.RAW:
                  if (line.lastIndexOf("//") > line.lastIndexOf("\n")) {
                    line += "\n";
                  }
              }
              switch (this.mode) {
                // Just executing code
                case Template.modes.EVAL:
                  this.source += "    ; " + line + "\n";
                  break;
                // Exec, esc, and output
                case Template.modes.ESCAPED:
                  this.source += "    ; __append(escapeFn(" + stripSemi(line) + "))\n";
                  break;
                // Exec and output
                case Template.modes.RAW:
                  this.source += "    ; __append(" + stripSemi(line) + ")\n";
                  break;
                case Template.modes.COMMENT:
                  break;
                // Literal <%% mode, append as raw output
                case Template.modes.LITERAL:
                  this._addOutput(line);
                  break;
              }
            } else {
              this._addOutput(line);
            }
        }
        if (self.opts.compileDebug && newLineCount) {
          this.currentLine += newLineCount;
          this.source += "    ; __line = " + this.currentLine + "\n";
        }
      }
    };
    exports2.escapeXML = utils.escapeXML;
    exports2.__express = exports2.renderFile;
    exports2.VERSION = _VERSION_STRING;
    exports2.name = _NAME;
    if (typeof window != "undefined") {
      window.ejs = exports2;
    }
  }
});

// node_modules/pocketbase-node/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/pocketbase-node/dist/index.js"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames3 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames3(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export(src_exports, {
      child_process: () => child_process_exports,
      fs: () => fs_exports,
      path: () => path_exports,
      process: () => process_exports
    });
    module2.exports = __toCommonJS(src_exports);
    var fs_exports = {};
    __export(fs_exports, {
      existsSync: () => existsSync,
      mkdirSync: () => mkdirSync,
      readFileSync: () => readFileSync,
      writeFileSync: () => writeFileSync
    });
    function byteArrayToUtf8(byteArray) {
      let utf8String = "";
      for (let i = 0; i < byteArray.length; i++) {
        utf8String += String.fromCharCode(byteArray[i]);
      }
      return decodeURIComponent(escape(utf8String));
    }
    var readFileSync = (path2, options) => {
      if (typeof path2 !== "string") {
        throw new Error("path must be a string");
      }
      const res = $os.readFile(path2);
      if (typeof res === "string") {
        return res;
      }
      const s = byteArrayToUtf8(res);
      return s;
    };
    var existsSync = (pathLike, fileType = "both") => {
      const isDir = (() => {
        try {
          $os.readDir(pathLike);
          return true;
        } catch {
          return false;
        }
      })();
      const isFile = (() => {
        if (isDir) {
          return false;
        }
        try {
          return $filesystem.fileFromPath(pathLike) !== null;
        } catch {
          return false;
        }
      })();
      return fileType === "file" ? isFile : fileType === "dir" ? isDir : isFile || isDir;
    };
    var writeFileSync = (path2, data, options) => {
      if (typeof path2 !== "string") {
        throw new Error("path must be a string");
      }
      if (typeof data !== "string") {
        throw new Error("data must be a string");
      }
      const mode = (() => {
        if (options && typeof options === "object" && "mode" in options) {
          return options.mode;
        }
        return 420;
      })();
      $os.writeFile(path2, data, mode);
    };
    function mkdirSync(path2, options) {
      const mode = (() => {
        if (options && typeof options === "object" && "mode" in options) {
          return options.mode;
        }
        return 493;
      })();
      $os.mkdirAll(path2.toString(), mode);
      return;
    }
    var path_exports = {};
    __export(path_exports, {
      basename: () => basename,
      delimiter: () => delimiter,
      dirname: () => dirname,
      extname: () => extname,
      format: () => format,
      isAbsolute: () => isAbsolute,
      join: () => join,
      normalize: () => normalize,
      parse: () => parse,
      relative: () => relative,
      resolve: () => resolve,
      sep: () => sep,
      win32: () => win32
    });
    function assertPath(path2) {
      if (typeof path2 !== "string") {
        throw new TypeError(
          "Path must be a string. Received " + JSON.stringify(path2)
        );
      }
    }
    function normalizeStringPosix(path2, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i = 0; i <= path2.length; ++i) {
        if (i < path2.length) code = path2.charCodeAt(i);
        else if (code === 47) break;
        else code = 47;
        if (code === 47) {
          if (lastSlash === i - 1 || dots === 1) {
          } else if (lastSlash !== i - 1 && dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = "";
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                  }
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0) res += "/..";
              else res = "..";
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0) res += "/" + path2.slice(lastSlash + 1, i);
            else res = path2.slice(lastSlash + 1, i);
            lastSegmentLength = i - lastSlash - 1;
          }
          lastSlash = i;
          dots = 0;
        } else if (code === 46 && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    }
    function _format(sep2, pathObject) {
      var dir = pathObject.dir || pathObject.root;
      var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
      if (!dir) {
        return base;
      }
      if (dir === pathObject.root) {
        return dir + base;
      }
      return dir + sep2 + base;
    }
    function resolve(...args) {
      var resolvedPath = "";
      var resolvedAbsolute = false;
      var cwd2;
      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path2;
        if (i >= 0) path2 = arguments[i];
        else {
          if (cwd2 === void 0) cwd2 = $os.getwd();
          path2 = cwd2;
        }
        assertPath(path2);
        if (path2.length === 0) {
          continue;
        }
        resolvedPath = path2 + "/" + resolvedPath;
        resolvedAbsolute = path2.charCodeAt(0) === 47;
      }
      resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
      if (resolvedAbsolute) {
        if (resolvedPath.length > 0) return "/" + resolvedPath;
        else return "/";
      } else if (resolvedPath.length > 0) {
        return resolvedPath;
      } else {
        return ".";
      }
    }
    function normalize(path2) {
      assertPath(path2);
      if (path2.length === 0) return ".";
      var isAbsolute2 = path2.charCodeAt(0) === 47;
      var trailingSeparator = path2.charCodeAt(path2.length - 1) === 47;
      path2 = normalizeStringPosix(path2, !isAbsolute2);
      if (path2.length === 0 && !isAbsolute2) path2 = ".";
      if (path2.length > 0 && trailingSeparator) path2 += "/";
      if (isAbsolute2) return "/" + path2;
      return path2;
    }
    function isAbsolute(path2) {
      assertPath(path2);
      return path2.length > 0 && path2.charCodeAt(0) === 47;
    }
    function join(...paths) {
      if (arguments.length === 0) return ".";
      var joined;
      for (var i = 0; i < arguments.length; ++i) {
        var arg = arguments[i];
        assertPath(arg);
        if (arg.length > 0) {
          if (joined === void 0) joined = arg;
          else joined += "/" + arg;
        }
      }
      if (joined === void 0) return ".";
      return normalize(joined);
    }
    function relative(from, to) {
      assertPath(from);
      assertPath(to);
      if (from === to) return "";
      from = resolve(from);
      to = resolve(to);
      if (from === to) return "";
      var fromStart = 1;
      for (; fromStart < from.length; ++fromStart) {
        if (from.charCodeAt(fromStart) !== 47) break;
      }
      var fromEnd = from.length;
      var fromLen = fromEnd - fromStart;
      var toStart = 1;
      for (; toStart < to.length; ++toStart) {
        if (to.charCodeAt(toStart) !== 47) break;
      }
      var toEnd = to.length;
      var toLen = toEnd - toStart;
      var length = fromLen < toLen ? fromLen : toLen;
      var lastCommonSep = -1;
      var i = 0;
      for (; i <= length; ++i) {
        if (i === length) {
          if (toLen > length) {
            if (to.charCodeAt(toStart + i) === 47) {
              return to.slice(toStart + i + 1);
            } else if (i === 0) {
              return to.slice(toStart + i);
            }
          } else if (fromLen > length) {
            if (from.charCodeAt(fromStart + i) === 47) {
              lastCommonSep = i;
            } else if (i === 0) {
              lastCommonSep = 0;
            }
          }
          break;
        }
        var fromCode = from.charCodeAt(fromStart + i);
        var toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 47) lastCommonSep = i;
      }
      var out = "";
      for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from.charCodeAt(i) === 47) {
          if (out.length === 0) out += "..";
          else out += "/..";
        }
      }
      if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
      else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47) ++toStart;
        return to.slice(toStart);
      }
    }
    function dirname(path2) {
      assertPath(path2);
      if (path2.length === 0) return ".";
      var code = path2.charCodeAt(0);
      var hasRoot = code === 47;
      var end = -1;
      var matchedSlash = true;
      for (var i = path2.length - 1; i >= 1; --i) {
        code = path2.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          matchedSlash = false;
        }
      }
      if (end === -1) return hasRoot ? "/" : ".";
      if (hasRoot && end === 1) return "//";
      return path2.slice(0, end);
    }
    function basename(path2, ext) {
      if (ext !== void 0 && typeof ext !== "string")
        throw new TypeError('"ext" argument must be a string');
      assertPath(path2);
      var start = 0;
      var end = -1;
      var matchedSlash = true;
      var i;
      if (ext !== void 0 && ext.length > 0 && ext.length <= path2.length) {
        if (ext.length === path2.length && ext === path2) return "";
        var extIdx = ext.length - 1;
        var firstNonSlashEnd = -1;
        for (i = path2.length - 1; i >= 0; --i) {
          var code = path2.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
            if (firstNonSlashEnd === -1) {
              matchedSlash = false;
              firstNonSlashEnd = i + 1;
            }
            if (extIdx >= 0) {
              if (code === ext.charCodeAt(extIdx)) {
                if (--extIdx === -1) {
                  end = i;
                }
              } else {
                extIdx = -1;
                end = firstNonSlashEnd;
              }
            }
          }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path2.length;
        return path2.slice(start, end);
      } else {
        for (i = path2.length - 1; i >= 0; --i) {
          if (path2.charCodeAt(i) === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
        }
        if (end === -1) return "";
        return path2.slice(start, end);
      }
    }
    function extname(path2) {
      assertPath(path2);
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var preDotState = 0;
      for (var i = path2.length - 1; i >= 0; --i) {
        var code = path2.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1) startDot = i;
          else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
      }
      return path2.slice(startDot, end);
    }
    function format(pathObject) {
      if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(
          'The "pathObject" argument must be of type Object. Received type ' + typeof pathObject
        );
      }
      return _format("/", pathObject);
    }
    function parse(path2) {
      assertPath(path2);
      var ret = { root: "", dir: "", base: "", ext: "", name: "" };
      if (path2.length === 0) return ret;
      var code = path2.charCodeAt(0);
      var isAbsolute2 = code === 47;
      var start;
      if (isAbsolute2) {
        ret.root = "/";
        start = 1;
      } else {
        start = 0;
      }
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var i = path2.length - 1;
      var preDotState = 0;
      for (; i >= start; --i) {
        code = path2.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1) startDot = i;
          else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
          if (startPart === 0 && isAbsolute2)
            ret.base = ret.name = path2.slice(1, end);
          else ret.base = ret.name = path2.slice(startPart, end);
        }
      } else {
        if (startPart === 0 && isAbsolute2) {
          ret.name = path2.slice(1, startDot);
          ret.base = path2.slice(1, end);
        } else {
          ret.name = path2.slice(startPart, startDot);
          ret.base = path2.slice(startPart, end);
        }
        ret.ext = path2.slice(startDot, end);
      }
      if (startPart > 0) ret.dir = path2.slice(0, startPart - 1);
      else if (isAbsolute2) ret.dir = "/";
      return ret;
    }
    var sep = "/";
    var delimiter = ":";
    var win32 = null;
    var child_process_exports = {};
    __export(child_process_exports, {
      execSync: () => execSync
    });
    var execSync = (cmdArr) => {
      const [cmd, ...args] = cmdArr;
      const _cmd = $os.cmd(cmd, ...args);
      const charOut = _cmd.output();
      const output = String.fromCharCode(...charOut);
      return output;
    };
    var process_exports = {};
    __export(process_exports, {
      cwd: () => cwd,
      env: () => env
    });
    var cwd = () => $os.getwd();
    var { env } = process;
  }
});

// node_modules/pocketbase-stringify/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/pocketbase-stringify/dist/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames3 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames3(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export(src_exports, {
      defaultReplacer: () => defaultReplacer,
      stringify: () => stringify
    });
    module2.exports = __toCommonJS(src_exports);
    var defaultReplacer = (k, v) => {
      if (v instanceof Error) {
        return v.stack;
      }
      if (v instanceof RegExp) {
        return v.toString();
      }
      if (v instanceof Function) {
        return v.toString();
      }
      return v;
    };
    var stringify = (obj, replacer = defaultReplacer, space = 0) => {
      const seen = /* @__PURE__ */ new WeakSet();
      return JSON.stringify(
        obj,
        (k, v) => {
          if (typeof v === "object" && v !== null) {
            if (seen.has(v)) {
              return replacer ? replacer(k, `[Circular]`) : `[Circular]`;
            }
            seen.add(v);
          }
          return replacer ? replacer(k, v) : v;
        },
        space
      );
    };
  }
});

// node_modules/pocketpages-plugin-ejs/dist/index.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames2(from), i = 0, n = keys.length, key; i < n; i++) {
    key = keys[i];
    if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
      get: ((k) => from[k]).bind(null, key),
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
  value: mod,
  enumerable: true
}) : target, mod));
var pocketbase_ejs = __toESM(require_ejs());
var pocketbase_node = __toESM(require_dist2());
var pocketbase_stringify = __toESM(require_dist3());
var oldCompile = pocketbase_ejs.default.compile;
var oldResolveInclude = pocketbase_ejs.default.resolveInclude;
var oldIncludeFile = pocketbase_ejs.default.includeFile;
var VALID_CONFIG_KEYS = [
  "name",
  "extensions",
  "debug"
];
var ejsPluinFactory = (config, extra) => {
  const opts = {
    extensions: [".ejs"],
    ...extra
  };
  Object.keys(opts).forEach((key) => {
    if (!VALID_CONFIG_KEYS.includes(key)) throw new Error(`Invalid config key: ${key}`);
  });
  const { pagesRoot, dbg } = config;
  pocketbase_ejs.default.compile = function(template, options) {
    const newTemplate = template.replaceAll(/<script\s+server>([\s\S]*?)<\/script>/g, "<% $1 %>");
    return oldCompile(newTemplate, { ...options });
  };
  pocketbase_ejs.default.resolveInclude = function(includePath, templatePath, isDir) {
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
      const content = pocketbase_ejs.default.renderFile(filePath, {
        ...api,
        api
      }, {
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
        includeFile: function(path$1, options) {
          dbg(`includeFile ${path$1}`);
          const renderFunc = oldIncludeFile(path$1, options);
          return (data) => {
            const rawRendered = renderFunc(data);
            return plugins.filter((otherPlugin) => otherPlugin.name !== thisPlugin.name).reduce((content$1, plugin) => {
              dbg(`calling ${plugin.name}:onRender ${path$1}`);
              return plugin.onRender?.({
                ...renderContext,
                api: data,
                content: content$1,
                filePath: pocketbase_ejs.default.resolveInclude(path$1, filePath, false)
              }) ?? content$1;
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
/*! Bundled license information:

pocketbase-ejs/lib/ejs.js:
  (**
   * @file Embedded JavaScript templating engine. {@link http://ejs.co}
   * @author Matthew Eernisse <mde@fleegix.org>
   * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
   * @project EJS
   * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
   *)
*/
