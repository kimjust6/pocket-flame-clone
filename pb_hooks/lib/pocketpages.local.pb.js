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
var __commonJS = (cb, mod) => function () {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") for (var keys$1 = __getOwnPropNames(from), i = 0, n = keys$1.length, key; i < n; i++) {
    key = keys$1[i];
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
const pocketbase_log = __toESM(require(HOOKS_DIR + "/lib/vendor/pocketbase-log.js"));
const pocketbase_stringify = __toESM(require(HOOKS_DIR + "/lib/vendor/pocketbase-stringify.js"));
const pocketbase_node = __toESM(require(HOOKS_DIR + "/lib/vendor/pocketbase-node.js"));
function clone(value) {
  if (Array.isArray(value)) return value.slice();
  else if (value instanceof Object) return __spreadValues({}, value);
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
  var _a;
  const obj = (_a = clone(object)) != null ? _a : {};
  for (const path of paths) delete obj[path];
  return obj;
}
const dbg = (...args) => {
  const dbgVal = $app.store().get("__pocketpages_debug");
  if (!dbgVal) return;
  return pocketbase_log.dbg(...args);
};
var require_requires_port = __commonJS({
  "../../node_modules/requires-port/index.js"(exports2, module2) {
    module2.exports = function required$1(port$1, protocol) {
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
  }
});
var require_querystringify = __commonJS({
  "../../node_modules/querystringify/index.js"(exports2) {
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
    exports2.stringify = querystringify;
    exports2.parse = querystring;
  }
});
var require_url_parse = __commonJS({
  "../../node_modules/url-parse/index.js"(exports2, module2) {
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
      var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path.length, last = path[i - 1], unshift = false, up = 0;
      while (i--) if (path[i] === ".") path.splice(i, 1);
      else if (path[i] === "..") {
        path.splice(i, 1);
        up++;
      } else if (up) {
        if (i === 0) unshift = true;
        path.splice(i, 1);
        up--;
      }
      if (unshift) path.unshift("");
      if (last === "." || last === "..") path.push("");
      return path.join("/");
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
    module2.exports = Url;
  }
});
var import_url_parse = __toESM(require_url_parse());
const globalApi = __spreadValues({
  url: (path) => {
    const url = (0, import_url_parse.default)(path, true);
    const parsedQuery = {};
    for (const [key, value] of Object.entries(url.query)) try {
      parsedQuery[key] = JSON.parse(value);
    } catch (e) {
      parsedQuery[key] = value;
    }
    url.set("query", parsedQuery);
    return url;
  },
  stringify: pocketbase_stringify.stringify,
  env: (key) => {
    var _a;
    return (_a = process.env[key]) != null ? _a : "";
  },
  store: (name, value) => {
    if (value === void 0) return $app.store().get(name);
    globalApi.dbg(`store: ${name}`, value);
    $app.store().set(name, value);
    return value;
  }
}, pocketbase_log);
const pagesRoot = $filepath.join(__hooks, `pages`);
const SAFE_HEADER = `if (typeof module === 'undefined') { module = { exports: {} } };`;
const exts = [
  "",
  ".js",
  ".json"
];
const moduleExists = (path) => {
  for (let i = 0; i < exts.length; i++) if (pocketbase_node.fs.existsSync(path + exts[i])) return true;
  return false;
};
const simulateRequire = (path) => {
  for (let i = 0; i < exts.length; i++) try {
    return pocketbase_node.fs.readFileSync(path + exts[i], "utf-8");
  } catch (e) {
    continue;
  }
  throw new Error(`No module '${path}' found`);
};
var NotFoundError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
};
const mkResolve = (rootPath) => (path, options) => {
  const _require = (path$1) => {
    if (!moduleExists(path$1)) throw new NotFoundError(`No module '${path$1}' found`);
    switch ((options == null ? void 0 : options.mode) || "require") {
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
  if (path.startsWith("/")) {
    const finalPath = $filepath.join(pagesRoot, "_private", path);
    try {
      return _require(finalPath);
    } catch (e) {
      throw new Error(`No module '${finalPath}' found`);
    }
  }
  let currentPath = rootPath;
  while (currentPath.length >= pagesRoot.length) try {
    const finalPath = $filepath.join(currentPath, "_private", path);
    return _require(finalPath);
  } catch (e) {
    const errorMsg = `${e}`;
    if (!(e instanceof NotFoundError)) throw e;
    if (currentPath === pagesRoot) throw new Error(`No module '${path}' found in _private directories from ${rootPath} up to ${pagesRoot}`);
    currentPath = $filepath.dir(currentPath);
  }
  throw new Error(`Unreachable code reached`);
};
const mkMeta = () => {
  const metaData = {};
  return (key, value) => {
    if (value === void 0) return metaData[key];
    return metaData[key] = value;
  };
};
const echo = (...args) => {
  const result = args.map((arg) => {
    if (typeof arg === "function") return arg.toString();
    else if (typeof arg === "object") return (0, pocketbase_stringify.stringify)(arg);
    else if (typeof arg === "number") return arg.toString();
    return `${arg}`;
  });
  return result.join(" ");
};
const normalizePlugin = (plugin) => {
  if (typeof plugin === "string") return {
    debug: false,
    fn: loadFactory(plugin)
  };
  if (typeof plugin === "function") return {
    debug: false,
    fn: plugin
  };
  if (typeof plugin === "object" && "fn" in plugin) return __spreadValues({
    debug: false,
    fn: plugin.fn
  }, plugin);
  if (typeof plugin === "object" && "name" in plugin) return __spreadProps(__spreadValues({
    debug: false
  }, omit(plugin, "name")), {
    fn: loadFactory(plugin.name)
  });
  throw new Error("Invalid plugin config");
};
const loadFactory = (plugin) => {
  const factory = (() => {
    var _a;
    const module$1 = require(plugin);
    return (_a = module$1.default) != null ? _a : module$1;
  })();
  return factory;
};
const loadPlugins = (cache) => {
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
const LOADER_METHODS = [
  "load",
  "get",
  "post",
  "put",
  "patch",
  "delete"
];
const toBoolean = (value) => {
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
const AfterBootstrapHandler = (e) => {
  (0, pocketbase_log.info)(`pocketpages startup`);
  if (!pocketbase_node.fs.existsSync(pagesRoot)) throw new Error(`${pagesRoot} must exist. Did you launch pocketbase with --dir or --hooksDir`);
  const VALID_CONFIG_KEYS = ["plugins", "debug"];
  const configPath = $filepath.join(pagesRoot, `+config.js`);
  const config = __spreadValues({
    plugins: [`pocketpages-plugin-ejs`],
    debug: toBoolean(process.env.DEBUG) ? "verbose" : false
  }, (() => {
    try {
      if (!pocketbase_node.fs.existsSync(configPath)) return {};
      const mod = require(configPath);
      if (typeof mod === "function") return mod(globalApi);
      return mod;
    } catch (e$1) {
      (0, pocketbase_log.error)(`Error loading config file: ${e$1}`);
      return {};
    }
  })());
  if (config.debug === "verbose") $app.store().set("__pocketpages_debug", true);
  keys(config).forEach((key) => {
    if (!VALID_CONFIG_KEYS.includes(key)) throw new Error(`Invalid config key: ${key}`);
  });
  const physicalFiles = [];
  $filepath.walkDir(pagesRoot, (path, d, err) => {
    const isDir = d.isDir();
    if (isDir) return;
    physicalFiles.push(path.slice(pagesRoot.length + 1));
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
    var _a;
    const partsWithoutGroupNames = $filepath.toSlash(relativePath).split("/").filter((p) => !p.startsWith(`(`));
    const absolutePath = $filepath.join(pagesRoot, relativePath);
    const content = toString($os.readFile(absolutePath));
    const contentSha = $security.sha256(content);
    const route = {
      relativePath,
      absolutePath,
      fingerprint: contentSha,
      assetPrefix: (_a = partsWithoutGroupNames[partsWithoutGroupNames.length - 2]) != null ? _a : "",
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
    route.isStatic = !plugins.some((p) => {
      var _a2;
      return (_a2 = p.handles) == null ? void 0 : _a2.call(p, {
        route,
        filePath: absolutePath
      });
    });
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
var require_dist = __commonJS({
  "../../node_modules/cookie/dist/index.js"(exports2) {
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parse = parse;
    exports2.serialize = serialize;
    const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    const __toString = Object.prototype.toString;
    const NullObject = /* @__PURE__ */ (() => {
      const C = function () {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parse(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2) return obj;
      const dec = (options == null ? void 0 : options.decode) || decode;
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
      const enc = (options == null ? void 0 : options.encode) || encodeURIComponent;
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
  }
});
const fingerprint = (nodeName, fingerprint$1) => {
  const lastDotIndex = nodeName.lastIndexOf(".");
  if (lastDotIndex === -1) return `${nodeName}.${fingerprint$1}`;
  const base = nodeName.slice(0, lastDotIndex);
  const ext = nodeName.slice(lastDotIndex);
  return `${base}.${fingerprint$1}${ext}`;
};
const resolveRoute = (url, routes) => {
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
var import_dist = __toESM(require_dist());
const escapeXml = (unsafe = "") => {
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
const parseSlots = (input) => {
  var _a;
  const regex = /<!--\s*slot:(\w+)\s*-->([\s\S]*?)(?=<!--\s*slot:\w+\s*-->|$)/g;
  const slots = {};
  let lastIndex = 0;
  let cleanedContent = "";
  let match;
  while ((match = regex.exec(input)) !== null) {
    const name = match[1];
    const content = (_a = match[2]) == null ? void 0 : _a.trim();
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
const defaultResponder = {
  name: "builtin",
  onResponse: ({ content, api, route }) => {
    const { response } = api;
    response.html(200, content);
    return true;
  }
};
const MiddlewareHandler = (e) => {
  var _a;
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
      var _a2;
      return ((_a2 = e.request) == null ? void 0 : _a2.header.get(name)) || "";
    },
    cookies: /* @__PURE__ */ (() => {
      let parsed;
      const tryParseJson = (value) => {
        if (!value) return value;
        try {
          return JSON.parse(value);
        } catch (e2) {
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
    file: (path) => {
      return e.fileFS($os.dirFS($filepath.dir(path)), $filepath.base(path));
    },
    write: (s) => {
      e.response.write(s);
    },
    redirect: (path, status = 302) => {
      e.redirect(status, path);
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
      const _options = __spreadValues({
        path: "/"
      }, options);
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
  plugins.forEach((plugin) => {
    var _a2;
    return (_a2 = plugin.onRequest) == null ? void 0 : _a2.call(plugin, {
      request,
      response
    });
  });
  const resolvedRoute = resolveRoute(request.url, routes);
  if (!resolvedRoute) {
    dbg(`No route matched for ${url}, passing on to PocketBase`);
    return next();
  }
  const { route, params } = resolvedRoute;
  const { absolutePath, relativePath } = route;
  try {
    let _next2 = function (extra = {}) {
      data = merge(data, extra);
      if (idx >= route.middlewares.length) return done2();
      const maybeMiddleware = route.middlewares[idx++];
      const middlewareFn = require(maybeMiddleware);
      dbg(`Executing middleware ${maybeMiddleware}`);
      if (middlewareFn.length < 2) _next2(middlewareFn(__spreadProps(__spreadValues({}, api), {
        data
      })));
      else middlewareFn(__spreadProps(__spreadValues({}, api), {
        data
      }), _next2);
    }, done2 = function () {
      var _a2;
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
          data = merge(data, require(loaderFname)(__spreadProps(__spreadValues({}, api), {
            data
          })));
        });
      }
      api.data = data;
      let content = plugins.reduce((content$1, plugin) => {
        var _a3, _b;
        return (_b = (_a3 = plugin.onRender) == null ? void 0 : _a3.call(plugin, {
          content: content$1,
          api,
          route,
          filePath: absolutePath,
          plugins
        })) != null ? _b : content$1;
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
          var _a3, _b;
          return (_b = (_a3 = plugin.onRender) == null ? void 0 : _a3.call(plugin, {
            content: content$1,
            api,
            route,
            filePath: layoutPath,
            plugins
          })) != null ? _b : content$1;
        }, content);
      });
      for (const plugin of [...plugins, defaultResponder]) if ((_a2 = plugin.onResponse) == null ? void 0 : _a2.call(plugin, {
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
    const api = __spreadProps(__spreadValues({}, globalApi), {
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
      redirect: (path, _options) => {
        const options = __spreadValues({
          status: 302,
          message: ""
        }, _options);
        const parsed = globalApi.url(path);
        parsed.query.__flash = options.message;
        response.redirect(parsed.toString(), options.status);
      },
      slot: "",
      slots: {},
      asset: (path) => {
        const shortAssetPath = path.startsWith("/") ? path : $filepath.join(route.assetPrefix, path);
        const fullAssetPath = path.startsWith("/") ? path : $filepath.join(...route.segments.slice(0, -2).map((s) => s.nodeName), route.assetPrefix, path);
        const assetRoute = resolveRoute(globalApi.url(fullAssetPath), routes);
        if (!assetRoute) return `${shortAssetPath}`;
        return fingerprint(shortAssetPath, assetRoute.route.fingerprint);
      },
      meta: mkMeta(),
      resolve: mkResolve($filepath.dir(absolutePath))
    });
    plugins.forEach((plugin) => {
      var _a2;
      return (_a2 = plugin.onExtendContextApi) == null ? void 0 : _a2.call(plugin, {
        api,
        route
      });
    });
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
      const stackTrace = e$1 instanceof Error ? (_a = e$1.stack) == null ? void 0 : _a.replaceAll(pagesRoot, "/" + $filepath.base(pagesRoot)).replaceAll(__hooks, "") : "";
      return response.html(500, `<html><body><h1>PocketPages Error</h1><pre><code>${escapeXml(message)}
${escapeXml(stackTrace)}</code></pre></body></html>`);
    } else return response.html(500, `<html><body><h1>Internal Server Error</h1><p>Something went wrong. Please try again later.</p></body></html>`);
  }
};
const isInHandler = typeof onBootstrap === "undefined";
if (!isInHandler) {
  onBootstrap((e) => {
    e.next();
    try {
      module.exports.AfterBootstrapHandler(e);
      $app.store().set("__pp_bootstrap_error", "");
    } catch (err) {
      const msg = `PocketPages bootstrap failed: ${err}`;
      $app.store().set("__pp_bootstrap_error", msg);
      pocketbase_log.error(msg);
    }
  });
  routerUse((e) => {
    try {
      module.exports.MiddlewareHandler(e);
    } catch (err) {
      const msg = `PocketPages middleware failed: ${err}`;
      $app.store().set("__pp_bootstrap_error", msg);
      pocketbase_log.error(msg);
      e.next();
    }
  });
}
module.exports = {
  AfterBootstrapHandler,
  MiddlewareHandler,
  globalApi,
  log: pocketbase_log,
  moduleExists,
  stringify: pocketbase_stringify.stringify
};

