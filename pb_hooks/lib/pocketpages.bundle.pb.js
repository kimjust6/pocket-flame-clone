var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/pocketbase-stringify/dist/index.js
var require_dist = __commonJS({
  "node_modules/pocketbase-stringify/dist/index.js"(exports2, module2) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// node_modules/pocketbase-log/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/pocketbase-log/dist/index.js"(exports2, module2) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export(src_exports, {
      dbg: () => dbg,
      error: () => error,
      info: () => info,
      log: () => log,
      warn: () => warn
    });
    module2.exports = __toCommonJS(src_exports);
    var import_pocketbase_stringify = require_dist();
    var replacer = (k, v) => {
      if (v instanceof Error) {
        return `${v}
${v.stack}`;
      }
      if (v instanceof RegExp) {
        return v.toString();
      }
      if (v instanceof Function) {
        return v.toString();
      }
      return v;
    };
    var prepare = (objs) => {
      const parts = objs.map((o) => {
        if (o instanceof Error) {
          return o.stack;
        }
        if (o instanceof RegExp) {
          return o.toString();
        }
        if (o instanceof Function) {
          return o.toString();
        }
        if (typeof o === "object") {
          return (0, import_pocketbase_stringify.stringify)(o, replacer, 2);
        }
        return o;
      });
      return parts.join(` `);
    };
    var dbg = (...objs) => {
      const s = prepare(objs);
      $app.logger().debug(s);
    };
    var info = (...objs) => {
      const s = prepare(objs);
      $app.logger().info(s);
    };
    var warn = (...objs) => {
      const s = prepare(objs);
      $app.logger().warn(s);
    };
    var error = (...objs) => {
      const s = prepare(objs);
      $app.logger().error(s);
    };
    var log = (...objs) => {
      const s = prepare(objs);
      console.log(s);
    };
  }
});

// node_modules/pocketbase-node/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/pocketbase-node/dist/index.js"(exports2, module2) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// node_modules/pocketpages/dist/index.js
var require_index = __commonJS({
  "node_modules/pocketpages/dist/index.js"(exports2, module2) {
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __commonJS2 = (cb, mod) => function() {
      return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") for (var keys$1 = __getOwnPropNames2(from), i = 0, n = keys$1.length, key; i < n; i++) {
        key = keys$1[i];
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
    var pocketbase_log = __toESM(require_dist2());
    var pocketbase_stringify = __toESM(require_dist());
    var pocketbase_node = __toESM(require_dist3());
    function clone(value) {
      if (Array.isArray(value)) return value.slice();
      else if (value instanceof Object) return { ...value };
      else return value;
    }
    function keys(object) {
      let val = keysOfNonArray(object);
      if (Array.isArray(object)) val = val.filter((item) => item !== "length");
      return val;
    }
    function keysOfNonArray(object) {
      return object ? Object.getOwnPropertyNames(object) : [];
    }
    function forOwnOfNonArray(object, iteratee) {
      forEachOfArray(keysOfNonArray(object), (key) => iteratee(object[key], key));
      return object;
    }
    function forEach(collection, iteratee) {
      if (Array.isArray(collection)) forEachOfArray(collection, iteratee);
      else forOwnOfNonArray(collection, iteratee);
      return collection;
    }
    function forEachOfArray(array, iteratee) {
      for (let i = 0, len = array.length; i < len; ++i) if (iteratee(array[i], i) === false) break;
    }
    function merge(object, ...sources) {
      for (const source of sources) forEach(source, (value, key) => {
        const myValue = object[key];
        if (myValue instanceof Object) value = merge(clone(myValue), value);
        object[key] = value;
      });
      return object;
    }
    function omit(object, ...paths) {
      const obj = clone(object) ?? {};
      for (const path2 of paths) delete obj[path2];
      return obj;
    }
    var dbg = (...args) => {
      const dbgVal = $app.store().get("__pocketpages_debug");
      if (!dbgVal) return;
      return pocketbase_log.dbg(...args);
    };
    var require_requires_port = __commonJS2({ "../../node_modules/requires-port/index.js"(exports3, module3) {
      module3.exports = function required$1(port$1, protocol) {
        protocol = protocol.split(":")[0];
        port$1 = +port$1;
        if (!port$1) return false;
        switch (protocol) {
          case "http":
          case "ws":
            return port$1 !== 80;
          case "https":
          case "wss":
            return port$1 !== 443;
          case "ftp":
            return port$1 !== 21;
          case "gopher":
            return port$1 !== 70;
          case "file":
            return false;
        }
        return port$1 !== 0;
      };
    } });
    var require_querystringify = __commonJS2({ "../../node_modules/querystringify/index.js"(exports3) {
      var has = Object.prototype.hasOwnProperty, undef;
      function decode$1(input) {
        try {
          return decodeURIComponent(input.replace(/\+/g, " "));
        } catch (e) {
          return null;
        }
      }
      function encode(input) {
        try {
          return encodeURIComponent(input);
        } catch (e) {
          return null;
        }
      }
      function querystring(query) {
        var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
        while (part = parser.exec(query)) {
          var key = decode$1(part[1]), value = decode$1(part[2]);
          if (key === null || value === null || key in result) continue;
          result[key] = value;
        }
        return result;
      }
      function querystringify(obj, prefix) {
        prefix = prefix || "";
        var pairs = [], value, key;
        if ("string" !== typeof prefix) prefix = "?";
        for (key in obj) if (has.call(obj, key)) {
          value = obj[key];
          if (!value && (value === null || value === undef || isNaN(value))) value = "";
          key = encode(key);
          value = encode(value);
          if (key === null || value === null) continue;
          pairs.push(key + "=" + value);
        }
        return pairs.length ? prefix + pairs.join("&") : "";
      }
      exports3.stringify = querystringify;
      exports3.parse = querystring;
    } });
    var require_url_parse = __commonJS2({ "../../node_modules/url-parse/index.js"(exports3, module3) {
      var required = require_requires_port(), qs = require_querystringify(), controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/, CRHTLF = /[\n\r\t]/g, slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//, port = /:\d+$/, protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i, windowsDriveLetter = /^[a-zA-Z]:/;
      function trimLeft(str) {
        return (str ? str : "").toString().replace(controlOrWhitespace, "");
      }
      var rules = [
        ["#", "hash"],
        ["?", "query"],
        function sanitize(address, url) {
          return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
        },
        ["/", "pathname"],
        [
          "@",
          "auth",
          1
        ],
        [
          NaN,
          "host",
          void 0,
          1,
          1
        ],
        [
          /:(\d*)$/,
          "port",
          void 0,
          1
        ],
        [
          NaN,
          "hostname",
          void 0,
          1,
          1
        ]
      ];
      var ignore = {
        hash: 1,
        query: 1
      };
      function lolcation(loc) {
        var globalVar;
        if (typeof window !== "undefined") globalVar = window;
        else if (typeof global !== "undefined") globalVar = global;
        else if (typeof self !== "undefined") globalVar = self;
        else globalVar = {};
        var location = globalVar.location || {};
        loc = loc || location;
        var finaldestination = {}, type = typeof loc, key;
        if ("blob:" === loc.protocol) finaldestination = new Url(unescape(loc.pathname), {});
        else if ("string" === type) {
          finaldestination = new Url(loc, {});
          for (key in ignore) delete finaldestination[key];
        } else if ("object" === type) {
          for (key in loc) {
            if (key in ignore) continue;
            finaldestination[key] = loc[key];
          }
          if (finaldestination.slashes === void 0) finaldestination.slashes = slashes.test(loc.href);
        }
        return finaldestination;
      }
      function isSpecial(scheme) {
        return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
      }
      function extractProtocol(address, location) {
        address = trimLeft(address);
        address = address.replace(CRHTLF, "");
        location = location || {};
        var match = protocolre.exec(address);
        var protocol = match[1] ? match[1].toLowerCase() : "";
        var forwardSlashes = !!match[2];
        var otherSlashes = !!match[3];
        var slashesCount = 0;
        var rest;
        if (forwardSlashes) if (otherSlashes) {
          rest = match[2] + match[3] + match[4];
          slashesCount = match[2].length + match[3].length;
        } else {
          rest = match[2] + match[4];
          slashesCount = match[2].length;
        }
        else if (otherSlashes) {
          rest = match[3] + match[4];
          slashesCount = match[3].length;
        } else rest = match[4];
        if (protocol === "file:") {
          if (slashesCount >= 2) rest = rest.slice(2);
        } else if (isSpecial(protocol)) rest = match[4];
        else if (protocol) {
          if (forwardSlashes) rest = rest.slice(2);
        } else if (slashesCount >= 2 && isSpecial(location.protocol)) rest = match[4];
        return {
          protocol,
          slashes: forwardSlashes || isSpecial(protocol),
          slashesCount,
          rest
        };
      }
      function resolve(relative, base) {
        if (relative === "") return base;
        var path2 = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path2.length, last = path2[i - 1], unshift = false, up = 0;
        while (i--) if (path2[i] === ".") path2.splice(i, 1);
        else if (path2[i] === "..") {
          path2.splice(i, 1);
          up++;
        } else if (up) {
          if (i === 0) unshift = true;
          path2.splice(i, 1);
          up--;
        }
        if (unshift) path2.unshift("");
        if (last === "." || last === "..") path2.push("");
        return path2.join("/");
      }
      function Url(address, location, parser) {
        address = trimLeft(address);
        address = address.replace(CRHTLF, "");
        if (!(this instanceof Url)) return new Url(address, location, parser);
        var relative, extracted, parse$2, instruction, index, key, instructions = rules.slice(), type = typeof location, url = this, i = 0;
        if ("object" !== type && "string" !== type) {
          parser = location;
          location = null;
        }
        if (parser && "function" !== typeof parser) parser = qs.parse;
        location = lolcation(location);
        extracted = extractProtocol(address || "", location);
        relative = !extracted.protocol && !extracted.slashes;
        url.slashes = extracted.slashes || relative && location.slashes;
        url.protocol = extracted.protocol || location.protocol || "";
        address = extracted.rest;
        if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) instructions[3] = [/(.*)/, "pathname"];
        for (; i < instructions.length; i++) {
          instruction = instructions[i];
          if (typeof instruction === "function") {
            address = instruction(address, url);
            continue;
          }
          parse$2 = instruction[0];
          key = instruction[1];
          if (parse$2 !== parse$2) url[key] = address;
          else if ("string" === typeof parse$2) {
            index = parse$2 === "@" ? address.lastIndexOf(parse$2) : address.indexOf(parse$2);
            if (~index) if ("number" === typeof instruction[2]) {
              url[key] = address.slice(0, index);
              address = address.slice(index + instruction[2]);
            } else {
              url[key] = address.slice(index);
              address = address.slice(0, index);
            }
          } else if (index = parse$2.exec(address)) {
            url[key] = index[1];
            address = address.slice(0, index.index);
          }
          url[key] = url[key] || (relative && instruction[3] ? location[key] || "" : "");
          if (instruction[4]) url[key] = url[key].toLowerCase();
        }
        if (parser) url.query = parser(url.query);
        if (relative && location.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location.pathname !== "")) url.pathname = resolve(url.pathname, location.pathname);
        if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) url.pathname = "/" + url.pathname;
        if (!required(url.port, url.protocol)) {
          url.host = url.hostname;
          url.port = "";
        }
        url.username = url.password = "";
        if (url.auth) {
          index = url.auth.indexOf(":");
          if (~index) {
            url.username = url.auth.slice(0, index);
            url.username = encodeURIComponent(decodeURIComponent(url.username));
            url.password = url.auth.slice(index + 1);
            url.password = encodeURIComponent(decodeURIComponent(url.password));
          } else url.username = encodeURIComponent(decodeURIComponent(url.auth));
          url.auth = url.password ? url.username + ":" + url.password : url.username;
        }
        url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
        url.href = url.toString();
      }
      function set(part, value, fn) {
        var url = this;
        switch (part) {
          case "query":
            if ("string" === typeof value && value.length) value = (fn || qs.parse)(value);
            url[part] = value;
            break;
          case "port":
            url[part] = value;
            if (!required(value, url.protocol)) {
              url.host = url.hostname;
              url[part] = "";
            } else if (value) url.host = url.hostname + ":" + value;
            break;
          case "hostname":
            url[part] = value;
            if (url.port) value += ":" + url.port;
            url.host = value;
            break;
          case "host":
            url[part] = value;
            if (port.test(value)) {
              value = value.split(":");
              url.port = value.pop();
              url.hostname = value.join(":");
            } else {
              url.hostname = value;
              url.port = "";
            }
            break;
          case "protocol":
            url.protocol = value.toLowerCase();
            url.slashes = !fn;
            break;
          case "pathname":
          case "hash":
            if (value) {
              var char = part === "pathname" ? "/" : "#";
              url[part] = value.charAt(0) !== char ? char + value : value;
            } else url[part] = value;
            break;
          case "username":
          case "password":
            url[part] = encodeURIComponent(value);
            break;
          case "auth":
            var index = value.indexOf(":");
            if (~index) {
              url.username = value.slice(0, index);
              url.username = encodeURIComponent(decodeURIComponent(url.username));
              url.password = value.slice(index + 1);
              url.password = encodeURIComponent(decodeURIComponent(url.password));
            } else url.username = encodeURIComponent(decodeURIComponent(value));
        }
        for (var i = 0; i < rules.length; i++) {
          var ins = rules[i];
          if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
        }
        url.auth = url.password ? url.username + ":" + url.password : url.username;
        url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
        url.href = url.toString();
        return url;
      }
      function toString$1(stringify$4) {
        if (!stringify$4 || "function" !== typeof stringify$4) stringify$4 = qs.stringify;
        var query, url = this, host = url.host, protocol = url.protocol;
        if (protocol && protocol.charAt(protocol.length - 1) !== ":") protocol += ":";
        var result = protocol + (url.protocol && url.slashes || isSpecial(url.protocol) ? "//" : "");
        if (url.username) {
          result += url.username;
          if (url.password) result += ":" + url.password;
          result += "@";
        } else if (url.password) {
          result += ":" + url.password;
          result += "@";
        } else if (url.protocol !== "file:" && isSpecial(url.protocol) && !host && url.pathname !== "/") result += "@";
        if (host[host.length - 1] === ":" || port.test(url.hostname) && !url.port) host += ":";
        result += host + url.pathname;
        query = "object" === typeof url.query ? stringify$4(url.query) : url.query;
        if (query) result += "?" !== query.charAt(0) ? "?" + query : query;
        if (url.hash) result += url.hash;
        return result;
      }
      Url.prototype = {
        set,
        toString: toString$1
      };
      Url.extractProtocol = extractProtocol;
      Url.location = lolcation;
      Url.trimLeft = trimLeft;
      Url.qs = qs;
      module3.exports = Url;
    } });
    var import_url_parse = __toESM(require_url_parse());
    var globalApi = {
      url: (path2) => {
        const url = (0, import_url_parse.default)(path2, true);
        const parsedQuery = {};
        for (const [key, value] of Object.entries(url.query)) try {
          parsedQuery[key] = JSON.parse(value);
        } catch {
          parsedQuery[key] = value;
        }
        url.set("query", parsedQuery);
        return url;
      },
      stringify: pocketbase_stringify.stringify,
      env: (key) => process.env[key] ?? "",
      store: (name, value) => {
        if (value === void 0) return $app.store().get(name);
        globalApi.dbg(`store: ${name}`, value);
        $app.store().set(name, value);
        return value;
      },
      ...pocketbase_log
    };
    var pagesRoot = $filepath.join(__hooks, `pages`);
    var SAFE_HEADER = `if (typeof module === 'undefined') { module = { exports: {} } };`;
    var exts = [
      "",
      ".js",
      ".json"
    ];
    var moduleExists = (path2) => {
      for (let i = 0; i < exts.length; i++) if (pocketbase_node.fs.existsSync(path2 + exts[i])) return true;
      return false;
    };
    var simulateRequire = (path2) => {
      for (let i = 0; i < exts.length; i++) try {
        return pocketbase_node.fs.readFileSync(path2 + exts[i], "utf-8");
      } catch (e) {
        continue;
      }
      throw new Error(`No module '${path2}' found`);
    };
    var NotFoundError = class extends Error {
      constructor(message) {
        super(message);
        this.name = "NotFoundError";
      }
    };
    var mkResolve = (rootPath) => (path2, options) => {
      const _require = (path$1) => {
        if (!moduleExists(path$1)) throw new NotFoundError(`No module '${path$1}' found`);
        switch (options?.mode || "require") {
          case "raw":
            return simulateRequire(path$1);
          case "require":
            return require(path$1);
          case "script":
            return `<script>
${SAFE_HEADER}
${simulateRequire(path$1)}
</script>`;
          case "style":
            return `<style>
${simulateRequire(path$1)}
</style>`;
        }
      };
      if (path2.startsWith("/")) {
        const finalPath = $filepath.join(pagesRoot, "_private", path2);
        try {
          return _require(finalPath);
        } catch (e) {
          throw new Error(`No module '${finalPath}' found`);
        }
      }
      let currentPath = rootPath;
      while (currentPath.length >= pagesRoot.length) try {
        const finalPath = $filepath.join(currentPath, "_private", path2);
        return _require(finalPath);
      } catch (e) {
        const errorMsg = `${e}`;
        if (!(e instanceof NotFoundError)) throw e;
        if (currentPath === pagesRoot) throw new Error(`No module '${path2}' found in _private directories from ${rootPath} up to ${pagesRoot}`);
        currentPath = $filepath.dir(currentPath);
      }
      throw new Error(`Unreachable code reached`);
    };
    var mkMeta = () => {
      const metaData = {};
      return (key, value) => {
        if (value === void 0) return metaData[key];
        return metaData[key] = value;
      };
    };
    var echo = (...args) => {
      const result = args.map((arg) => {
        if (typeof arg === "function") return arg.toString();
        else if (typeof arg === "object") return (0, pocketbase_stringify.stringify)(arg);
        else if (typeof arg === "number") return arg.toString();
        return `${arg}`;
      });
      return result.join(" ");
    };
    var normalizePlugin = (plugin) => {
      if (typeof plugin === "string") return {
        debug: false,
        fn: loadFactory(plugin)
      };
      if (typeof plugin === "function") return {
        debug: false,
        fn: plugin
      };
      if (typeof plugin === "object" && "fn" in plugin) return {
        debug: false,
        fn: plugin.fn,
        ...plugin
      };
      if (typeof plugin === "object" && "name" in plugin) return {
        debug: false,
        ...omit(plugin, "name"),
        fn: loadFactory(plugin.name)
      };
      throw new Error("Invalid plugin config");
    };
    var loadFactory = (plugin) => {
      const factory = (() => {
        const module$1 = require(plugin);
        return module$1.default ?? module$1;
      })();
      return factory;
    };
    var loadPlugins = (cache) => {
      const { config, routes } = cache;
      return [...config.plugins.map((pluginConfigItem) => {
        try {
          const normalizedPlugin = normalizePlugin(pluginConfigItem);
          const extra = omit(normalizedPlugin, "fn");
          const factoryConfig = {
            pagesRoot,
            config,
            globalApi,
            routes,
            dbg: (...args) => extra.debug ? globalApi.dbg(`[${plugin.name}]`, ...args) : dbg(`[${plugin.name}]`, ...args)
          };
          const plugin = normalizedPlugin.fn(factoryConfig, extra);
          dbg(`loaded plugin ${plugin.name}`);
          return plugin;
        } catch (e) {
          (0, pocketbase_log.error)(`${e}`, pluginConfigItem);
          throw e;
        }
      })];
    };
    var LOADER_METHODS = [
      "load",
      "get",
      "post",
      "put",
      "patch",
      "delete"
    ];
    var toBoolean = (value) => {
      if (typeof value === "boolean") return value;
      if (typeof value === "string") return [
        "true",
        "1",
        "yes",
        "on",
        "enabled"
      ].includes(value.toLowerCase());
      return false;
    };
    var AfterBootstrapHandler = (e) => {
      (0, pocketbase_log.info)(`pocketpages startup`);
      if (!pocketbase_node.fs.existsSync(pagesRoot)) throw new Error(`${pagesRoot} must exist. Did you launch pocketbase with --dir or --hooksDir`);
      const VALID_CONFIG_KEYS = ["plugins", "debug"];
      const configPath = $filepath.join(pagesRoot, `+config.js`);
      const config = {
        plugins: [`pocketpages-plugin-ejs`],
        debug: toBoolean(process.env.DEBUG) ? "verbose" : false,
        ...(() => {
          try {
            if (!pocketbase_node.fs.existsSync(configPath)) return {};
            const mod = require(configPath);
            if (typeof mod === "function") return mod(globalApi);
            return mod;
          } catch (e$1) {
            (0, pocketbase_log.error)(`Error loading config file: ${e$1}`);
            return {};
          }
        })()
      };
      if (config.debug === "verbose") $app.store().set("__pocketpages_debug", true);
      keys(config).forEach((key) => {
        if (!VALID_CONFIG_KEYS.includes(key)) throw new Error(`Invalid config key: ${key}`);
      });
      const physicalFiles = [];
      $filepath.walkDir(pagesRoot, (path2, d, err) => {
        const isDir = d.isDir();
        if (isDir) return;
        physicalFiles.push(path2.slice(pagesRoot.length + 1));
      });
      dbg({ physicalFiles });
      const routableFiles = physicalFiles.filter((f) => {
        const notRoutable = [/^[-+_]/];
        const pathParts = $filepath.toSlash(f).split("/");
        return !pathParts.some((part) => notRoutable.some((r) => r.test(part)));
      });
      dbg({ routableFiles });
      const plugins = loadPlugins({
        config,
        routes: []
      });
      const routes = routableFiles.map((relativePath) => {
        const partsWithoutGroupNames = $filepath.toSlash(relativePath).split("/").filter((p) => !p.startsWith(`(`));
        const absolutePath = $filepath.join(pagesRoot, relativePath);
        const content = toString($os.readFile(absolutePath));
        const contentSha = $security.sha256(content);
        const route = {
          relativePath,
          absolutePath,
          fingerprint: contentSha,
          assetPrefix: partsWithoutGroupNames[partsWithoutGroupNames.length - 2] ?? "",
          segments: partsWithoutGroupNames.map((part) => {
            return {
              nodeName: part,
              paramName: part.match(/\[.*\]/) ? part.replace(/\[(.*)\].*$/g, "$1") : void 0
            };
          }),
          middlewares: [],
          layouts: [],
          loaders: {},
          isStatic: false
        };
        route.isStatic = !plugins.some((p) => p.handles?.({
          route,
          filePath: absolutePath
        }));
        if (route.isStatic) return route;
        const lastSegment = route.segments[route.segments.length - 1];
        lastSegment.nodeName = $filepath.base(lastSegment.nodeName).slice(0, -$filepath.ext(lastSegment.nodeName).length);
        {
          const pathParts = $filepath.toSlash($filepath.dir(relativePath)).split(`/`).filter((node) => node !== ".").filter((p) => !!p);
          do {
            const maybeLayouts = $filepath.glob($filepath.join(pagesRoot, ...pathParts, `+layout.*`).replace(/\[/g, "\\[").replace(/\]/g, "\\]"));
            if (maybeLayouts && maybeLayouts.length > 0) {
              if (maybeLayouts.length > 1) throw new Error(`Multiple layouts found for ${relativePath}`);
              const maybeLayout = maybeLayouts[0];
              route.layouts.push(maybeLayout);
            }
            if (pathParts.length === 0) break;
            pathParts.pop();
          } while (true);
        }
        {
          const pathParts = $filepath.toSlash($filepath.dir(relativePath)).split(`/`).filter((p) => !!p);
          const current = [pagesRoot];
          do {
            const maybeMiddleware = $filepath.join(...current, `+middleware.js`);
            if (pocketbase_node.fs.existsSync(maybeMiddleware, "file")) route.middlewares.push(maybeMiddleware);
            if (pathParts.length === 0) break;
            current.push(pathParts.shift());
          } while (true);
        }
        forEach(LOADER_METHODS, (method) => {
          const maybeLoad = $filepath.join(pagesRoot, $filepath.dir(route.relativePath), `+${method}.js`);
          if (pocketbase_node.fs.existsSync(maybeLoad)) route.loaders[method] = maybeLoad;
        });
        return route;
      }).filter((r) => r.segments.length > 0);
      dbg({ routes });
      dbg({ config });
      const cache = {
        routes,
        config
      };
      $app.store().set(`pocketpages`, cache);
    };
    var require_dist4 = __commonJS2({ "../../node_modules/cookie/dist/index.js"(exports3) {
      Object.defineProperty(exports3, "__esModule", { value: true });
      exports3.parse = parse;
      exports3.serialize = serialize;
      const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
      const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
      const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
      const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
      const __toString = Object.prototype.toString;
      const NullObject = /* @__PURE__ */ (() => {
        const C = function() {
        };
        C.prototype = /* @__PURE__ */ Object.create(null);
        return C;
      })();
      function parse(str, options) {
        const obj = new NullObject();
        const len = str.length;
        if (len < 2) return obj;
        const dec = options?.decode || decode;
        let index = 0;
        do {
          const eqIdx = str.indexOf("=", index);
          if (eqIdx === -1) break;
          const colonIdx = str.indexOf(";", index);
          const endIdx = colonIdx === -1 ? len : colonIdx;
          if (eqIdx > endIdx) {
            index = str.lastIndexOf(";", eqIdx - 1) + 1;
            continue;
          }
          const keyStartIdx = startIndex(str, index, eqIdx);
          const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
          const key = str.slice(keyStartIdx, keyEndIdx);
          if (obj[key] === void 0) {
            let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
            let valEndIdx = endIndex(str, endIdx, valStartIdx);
            const value = dec(str.slice(valStartIdx, valEndIdx));
            obj[key] = value;
          }
          index = endIdx + 1;
        } while (index < len);
        return obj;
      }
      function startIndex(str, index, max) {
        do {
          const code = str.charCodeAt(index);
          if (code !== 32 && code !== 9) return index;
        } while (++index < max);
        return max;
      }
      function endIndex(str, index, min) {
        while (index > min) {
          const code = str.charCodeAt(--index);
          if (code !== 32 && code !== 9) return index + 1;
        }
        return min;
      }
      function serialize(name, val, options) {
        const enc = options?.encode || encodeURIComponent;
        if (!cookieNameRegExp.test(name)) throw new TypeError(`argument name is invalid: ${name}`);
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) throw new TypeError(`argument val is invalid: ${val}`);
        let str = name + "=" + value;
        if (!options) return str;
        if (options.maxAge !== void 0) {
          if (!Number.isInteger(options.maxAge)) throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
          str += "; Max-Age=" + options.maxAge;
        }
        if (options.domain) {
          if (!domainValueRegExp.test(options.domain)) throw new TypeError(`option domain is invalid: ${options.domain}`);
          str += "; Domain=" + options.domain;
        }
        if (options.path) {
          if (!pathValueRegExp.test(options.path)) throw new TypeError(`option path is invalid: ${options.path}`);
          str += "; Path=" + options.path;
        }
        if (options.expires) {
          if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) throw new TypeError(`option expires is invalid: ${options.expires}`);
          str += "; Expires=" + options.expires.toUTCString();
        }
        if (options.httpOnly) str += "; HttpOnly";
        if (options.secure) str += "; Secure";
        if (options.partitioned) str += "; Partitioned";
        if (options.priority) {
          const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
          switch (priority) {
            case "low":
              str += "; Priority=Low";
              break;
            case "medium":
              str += "; Priority=Medium";
              break;
            case "high":
              str += "; Priority=High";
              break;
            default:
              throw new TypeError(`option priority is invalid: ${options.priority}`);
          }
        }
        if (options.sameSite) {
          const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
          switch (sameSite) {
            case true:
            case "strict":
              str += "; SameSite=Strict";
              break;
            case "lax":
              str += "; SameSite=Lax";
              break;
            case "none":
              str += "; SameSite=None";
              break;
            default:
              throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
          }
        }
        return str;
      }
      function decode(str) {
        if (str.indexOf("%") === -1) return str;
        try {
          return decodeURIComponent(str);
        } catch (e) {
          return str;
        }
      }
      function isDate(val) {
        return __toString.call(val) === "[object Date]";
      }
    } });
    var fingerprint = (nodeName, fingerprint$1) => {
      const lastDotIndex = nodeName.lastIndexOf(".");
      if (lastDotIndex === -1) return `${nodeName}.${fingerprint$1}`;
      const base = nodeName.slice(0, lastDotIndex);
      const ext = nodeName.slice(lastDotIndex);
      return `${base}.${fingerprint$1}${ext}`;
    };
    var resolveRoute = (url, routes) => {
      const { config } = $app.store().get(`pocketpages`);
      const urlPath = url.pathname.slice(1);
      const params = url.query;
      const tryFnames = [urlPath || "index"];
      if (tryFnames[0] !== "index") tryFnames.push(`${urlPath}/index`);
      for (const maybeFname of tryFnames) {
        const parts = $filepath.toSlash(maybeFname).split("/").filter((p) => p);
        const sortedRoutes = routes.slice().sort((a, b) => {
          const getSpecificity = (route) => route.segments.reduce((acc, segment) => acc + (segment.paramName ? 1 : 10), 0);
          const aSpecificity = getSpecificity(a);
          const bSpecificity = getSpecificity(b);
          if (aSpecificity !== bSpecificity) return bSpecificity - aSpecificity;
          return 0;
        });
        for (const route of sortedRoutes) {
          const matched = route.segments.every((segment, i) => {
            const { nodeName, paramName } = segment;
            if (paramName) return true;
            const part = parts[i];
            const matchesWithFingerprint = (() => {
              if (i !== route.segments.length - 1) return false;
              if (!route.isStatic) return false;
              const fingerprinted = fingerprint(segment.nodeName, route.fingerprint);
              return fingerprinted === parts[i];
            })();
            return nodeName === part || matchesWithFingerprint;
          });
          if (matched) {
            dbg(`Matched route ${route.relativePath}`);
            route.segments.forEach((segment, i) => {
              const { paramName } = segment;
              if (paramName) {
                params[paramName] = parts[i];
                return true;
              }
            });
            return {
              route,
              params
            };
          }
        }
      }
      return null;
    };
    var import_dist = __toESM(require_dist4());
    var escapeXml = (unsafe = "") => {
      return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
          case "<":
            return "&lt;";
          case ">":
            return "&gt;";
          case "&":
            return "&amp;";
          case "'":
            return "&apos;";
          case '"':
            return "&quot;";
          default:
            return c;
        }
      });
    };
    var parseSlots = (input) => {
      const regex = /<!--\s*slot:(\w+)\s*-->([\s\S]*?)(?=<!--\s*slot:\w+\s*-->|$)/g;
      const slots = {};
      let lastIndex = 0;
      let cleanedContent = "";
      let match;
      while ((match = regex.exec(input)) !== null) {
        const name = match[1];
        const content = match[2]?.trim();
        if (name && content) {
          slots[name] = content;
          cleanedContent += input.slice(lastIndex, match.index);
          lastIndex = match.index + match[0].length;
        }
      }
      cleanedContent += input.slice(lastIndex);
      return {
        slots,
        content: cleanedContent.trim()
      };
    };
    var defaultResponder = {
      name: "builtin",
      onResponse: ({ content, api, route }) => {
        const { response } = api;
        response.html(200, content);
        return true;
      }
    };
    var MiddlewareHandler = (e) => {
      const next = () => {
        e.next();
      };
      if (!e.request) {
        dbg(`No request, passing on to PocketBase`);
        return next();
      }
      const { method, url } = e.request;
      if (!url) {
        dbg(`No URL, passing on to PocketBase`);
        return next();
      }
      dbg(`Pages middleware request: ${method} ${url}`);
      const request = {
        event: e,
        auth: e.auth,
        method: method.toUpperCase(),
        url: globalApi.url(url.string()),
        formData: () => e.requestInfo().body,
        body: () => e.requestInfo().body,
        header: (name) => {
          return e.request?.header.get(name) || "";
        },
        cookies: /* @__PURE__ */ (() => {
          let parsed;
          const tryParseJson = (value) => {
            if (!value) return value;
            try {
              return JSON.parse(value);
            } catch {
              return value;
            }
          };
          const cookieFunc = (name) => {
            if (!parsed) {
              const cookieHeader = request.header("Cookie");
              const rawParsed = import_dist.parse(cookieHeader || "");
              parsed = Object.fromEntries(Object.entries(rawParsed).map(([key, value]) => [key, tryParseJson(value)]));
            }
            if (name === void 0) return parsed;
            return parsed[name];
          };
          return cookieFunc;
        })()
      };
      const response = {
        file: (path2) => {
          return e.fileFS($os.dirFS($filepath.dir(path2)), $filepath.base(path2));
        },
        write: (s) => {
          e.response.write(s);
        },
        redirect: (path2, status = 302) => {
          e.redirect(status, path2);
        },
        json: (status, data) => {
          e.json(status, data);
        },
        html: (status, data) => {
          e.html(status, data);
        },
        header: (name, value) => {
          if (value === void 0) return e.response.header().get(name) || "";
          dbg(`header: ${name} ${value}`);
          e.response.header().set(name, value);
          return value;
        },
        cookie: (name, value, options = {}) => {
          const _options = {
            path: "/",
            ...options
          };
          const stringifiedValue = (() => {
            if (typeof value !== "string") return (0, pocketbase_stringify.stringify)(value);
            return value;
          })();
          const serialized = import_dist.serialize(name, stringifiedValue, _options);
          response.header(`Set-Cookie`, serialized);
          return serialized;
        }
      };
      const cache = $app.store().get(`pocketpages`);
      const { routes, config } = cache;
      const plugins = loadPlugins(cache);
      plugins.forEach((plugin) => plugin.onRequest?.({
        request,
        response
      }));
      const resolvedRoute = resolveRoute(request.url, routes);
      if (!resolvedRoute) {
        dbg(`No route matched for ${url}, passing on to PocketBase`);
        return next();
      }
      const { route, params } = resolvedRoute;
      const { absolutePath, relativePath } = route;
      try {
        let _next2 = function(extra = {}) {
          data = merge(data, extra);
          if (idx >= route.middlewares.length) return done2();
          const maybeMiddleware = route.middlewares[idx++];
          const middlewareFn = require(maybeMiddleware);
          dbg(`Executing middleware ${maybeMiddleware}`);
          if (middlewareFn.length < 2) _next2(middlewareFn({
            ...api,
            data
          }));
          else middlewareFn({
            ...api,
            data
          }, _next2);
        }, done2 = function() {
          {
            const methods = [
              "load",
              method.toLowerCase(),
              method
            ];
            forEach(methods, (method$1) => {
              const loaderFname = route.loaders[method$1];
              if (!loaderFname) return;
              dbg(`Executing loader ${loaderFname}`);
              data = merge(data, require(loaderFname)({
                ...api,
                data
              }));
            });
          }
          api.data = data;
          let content = plugins.reduce((content$1, plugin) => {
            return plugin.onRender?.({
              content: content$1,
              api,
              route,
              filePath: absolutePath,
              plugins
            }) ?? content$1;
          }, "");
          const contentType = response.header("Content-Type");
          dbg(`Content-Type: ${contentType}`);
          if (contentType && contentType !== "text/html") {
            dbg(`Skipping layout for non-HTML content`, content);
            return true;
          }
          try {
            dbg(`Attempting to parse as JSON`);
            const parsed = JSON.parse(content);
            response.json(200, parsed);
            return true;
          } catch (e$1) {
            dbg(`Not JSON`);
          }
          route.layouts.forEach((layoutPath) => {
            const res = parseSlots(content);
            api.slots = res.slots;
            api.slot = res.slots.default || res.content;
            content = plugins.reduce((content$1, plugin) => {
              return plugin.onRender?.({
                content: content$1,
                api,
                route,
                filePath: layoutPath,
                plugins
              }) ?? content$1;
            }, content);
          });
          for (const plugin of [...plugins, defaultResponder]) if (plugin.onResponse?.({
            content,
            api,
            route
          })) return;
          throw new Error(`No plugin handled the response`);
        };
        var _next = _next2, done = done2;
        if (route.isStatic) {
          dbg(`Serving static file ${absolutePath}`);
          return response.file(absolutePath);
        }
        const api = {
          ...globalApi,
          params,
          echo: (...args) => {
            const s = echo(...args);
            response.write(s);
            dbg(`echo: ${s}`);
            return s;
          },
          formData: request.formData,
          body: request.body,
          auth: request.auth,
          request,
          response,
          redirect: (path2, _options) => {
            const options = {
              status: 302,
              message: "",
              ..._options
            };
            const parsed = globalApi.url(path2);
            parsed.query.__flash = options.message;
            response.redirect(parsed.toString(), options.status);
          },
          slot: "",
          slots: {},
          asset: (path2) => {
            const shortAssetPath = path2.startsWith("/") ? path2 : $filepath.join(route.assetPrefix, path2);
            const fullAssetPath = path2.startsWith("/") ? path2 : $filepath.join(...route.segments.slice(0, -2).map((s) => s.nodeName), route.assetPrefix, path2);
            const assetRoute = resolveRoute(globalApi.url(fullAssetPath), routes);
            if (!assetRoute) return `${shortAssetPath}`;
            return fingerprint(shortAssetPath, assetRoute.route.fingerprint);
          },
          meta: mkMeta(),
          resolve: mkResolve($filepath.dir(absolutePath))
        };
        plugins.forEach((plugin) => plugin.onExtendContextApi?.({
          api,
          route
        }));
        let data = {};
        let idx = 0;
        _next2();
      } catch (e$1) {
        (0, pocketbase_log.error)(e$1);
        if (e$1 instanceof BadRequestError) {
          const message = config.debug ? `${e$1}` : "Bad Request";
          return response.html(400, message);
        }
        if (config.debug) {
          const message = (() => {
            const m = `${e$1}`;
            if (m.includes("Value is not an object")) return `${m} - are you referencing a symbol missing from require() or resolve()?`;
            return `${e$1}`;
          })();
          const stackTrace = e$1 instanceof Error ? e$1.stack?.replaceAll(pagesRoot, "/" + $filepath.base(pagesRoot)).replaceAll(__hooks, "") : "";
          return response.html(500, `<html><body><h1>PocketPages Error</h1><pre><code>${escapeXml(message)}
${escapeXml(stackTrace)}</code></pre></body></html>`);
        } else return response.html(500, `<html><body><h1>Internal Server Error</h1><p>Something went wrong. Please try again later.</p></body></html>`);
      }
    };
    var isInHandler = typeof onBootstrap === "undefined";
    if (!isInHandler) {
      onBootstrap((e) => {
        e.next();
        require_index().AfterBootstrapHandler(e);
      });
      routerUse((e) => {
        require_index().MiddlewareHandler(e);
      });
    }
    module2.exports = {
      AfterBootstrapHandler,
      MiddlewareHandler,
      globalApi,
      log: pocketbase_log,
      moduleExists,
      stringify: pocketbase_stringify.stringify
    };
  }
});
module.exports = require_index();
