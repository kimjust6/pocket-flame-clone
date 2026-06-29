"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
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
module.exports = __toCommonJS(src_exports);
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
    } catch (e) {
      return false;
    }
  })();
  const isFile = (() => {
    if (isDir) {
      return false;
    }
    try {
      return $filesystem.fileFromPath(pathLike) !== null;
    } catch (e) {
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
