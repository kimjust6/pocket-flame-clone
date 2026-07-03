var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
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
const HOOKS_DIR = typeof __hooks !== "undefined" ? __hooks : ".";
const pocketbase_js_sdk_jsvm = __toESM(require(HOOKS_DIR + "/lib/vendor/pocketbase-js-sdk-jsvm/pocketbase.cjs.js"));
const jsSdkPluginFactory = (config, extra) => {
  const { globalApi } = config;
  const { dbg } = globalApi;
  const newClient = (host, auth, authToken) => {
    const pb = new pocketbase_js_sdk_jsvm.default(host);
    if (auth) {
      dbg(`auth`, typeof auth, auth);
      const token = authToken != null ? authToken : auth.newAuthToken();
      pb.authStore.save(token, JSON.parse(JSON.stringify(auth)));
      dbg(`created new PocketBase client for ${host} with saved auth: ${auth.id} ${token}`);
    } else dbg(`created new PocketBase client for ${host}`);
    return pb;
  };
  const pbCache = /* @__PURE__ */ new Map();
  globalApi.pb = (options) => {
    var _a, _b, _c, _d, _e;
    const host = (_b = (_a = options == null ? void 0 : options.host) != null ? _a : extra == null ? void 0 : extra.host) != null ? _b : `http://localhost:8090`;
    const auth = (_d = options == null ? void 0 : options.auth) != null ? _d : (_c = options == null ? void 0 : options.request) == null ? void 0 : _c.auth;
    const authToken = (_e = options == null ? void 0 : options.request) == null ? void 0 : _e.authToken;
    const key = `${host}-${auth == null ? void 0 : auth.id}`;
    if (pbCache.has(key)) return pbCache.get(key);
    dbg(`creating new pb client for ${key}`);
    const pb = newClient(host, auth, authToken);
    pbCache.set(key, pb);
    return pb;
  };
  return { name: "js-sdk" };
};
var src_default = jsSdkPluginFactory;
module.exports = src_default;

