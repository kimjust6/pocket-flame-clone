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
  defaultReplacer: () => defaultReplacer,
  stringify: () => stringify
});
module.exports = __toCommonJS(src_exports);
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
