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
  dbg: () => dbg,
  error: () => error,
  info: () => info,
  log: () => log,
  warn: () => warn
});
module.exports = __toCommonJS(src_exports);
var import_pocketbase_stringify = require("./pocketbase-stringify.js");
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

