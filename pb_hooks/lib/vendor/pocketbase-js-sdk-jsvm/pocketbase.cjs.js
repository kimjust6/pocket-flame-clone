"use strict";
var __defProp = Object.defineProperty;
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
class ClientResponseError extends Error {
  constructor(e2) {
    var _a, _b, _c, _d;
    super("ClientResponseError"), this.url = "", this.status = 0, this.response = {}, this.isAbort = false, this.originalError = null, Object.setPrototypeOf(this, ClientResponseError.prototype), null !== e2 && "object" == typeof e2 && (this.url = "string" == typeof e2.url ? e2.url : "", this.status = "number" == typeof e2.status ? e2.status : 0, this.isAbort = !!e2.isAbort, this.originalError = e2.originalError, null !== e2.response && "object" == typeof e2.response ? this.response = e2.response : null !== e2.data && "object" == typeof e2.data ? this.response = e2.data : this.response = {}), this.originalError || e2 instanceof ClientResponseError || (this.originalError = e2), "undefined" != typeof DOMException && e2 instanceof DOMException && (this.isAbort = true), this.name = "ClientResponseError " + this.status, this.message = (_a = this.response) == null ? void 0 : _a.message, this.message || (((_d = (_c = (_b = this.originalError) == null ? void 0 : _b.cause) == null ? void 0 : _c.message) == null ? void 0 : _d.includes("ECONNREFUSED ::1")) ? this.message = "Failed to connect to the PocketBase server. Try changing the SDK URL from localhost to 127.0.0.1 (https://github.com/pocketbase/js-sdk/issues/21)." : this.message = "Something went wrong while processing your request.");
  }
  get data() {
    return this.response;
  }
  toJSON() {
    return __spreadValues({}, this);
  }
}
const e = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function cookieSerialize(t2, s2, i2) {
  const r2 = Object.assign({}, i2 || {}), o = r2.encode || defaultEncode;
  if (!e.test(t2)) throw new TypeError("argument name is invalid");
  const n = o(s2);
  if (n && !e.test(n)) throw new TypeError("argument val is invalid");
  let a = t2 + "=" + n;
  if (null != r2.maxAge) {
    const e2 = r2.maxAge - 0;
    if (isNaN(e2) || !isFinite(e2)) throw new TypeError("option maxAge is invalid");
    a += "; Max-Age=" + Math.floor(e2);
  }
  if (r2.domain) {
    if (!e.test(r2.domain)) throw new TypeError("option domain is invalid");
    a += "; Domain=" + r2.domain;
  }
  if (r2.path) {
    if (!e.test(r2.path)) throw new TypeError("option path is invalid");
    a += "; Path=" + r2.path;
  }
  if (r2.expires) {
    if (!(function isDate(e2) {
      return "[object Date]" === Object.prototype.toString.call(e2) || e2 instanceof Date;
    })(r2.expires) || isNaN(r2.expires.valueOf())) throw new TypeError("option expires is invalid");
    a += "; Expires=" + r2.expires.toUTCString();
  }
  if (r2.httpOnly && (a += "; HttpOnly"), r2.secure && (a += "; Secure"), r2.priority) {
    switch ("string" == typeof r2.priority ? r2.priority.toLowerCase() : r2.priority) {
      case "low":
        a += "; Priority=Low";
        break;
      case "medium":
        a += "; Priority=Medium";
        break;
      case "high":
        a += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (r2.sameSite) {
    switch ("string" == typeof r2.sameSite ? r2.sameSite.toLowerCase() : r2.sameSite) {
      case true:
        a += "; SameSite=Strict";
        break;
      case "lax":
        a += "; SameSite=Lax";
        break;
      case "strict":
        a += "; SameSite=Strict";
        break;
      case "none":
        a += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return a;
}
function defaultDecode(e2) {
  return -1 !== e2.indexOf("%") ? decodeURIComponent(e2) : e2;
}
function defaultEncode(e2) {
  return encodeURIComponent(e2);
}
let t;
function getTokenPayload(e2) {
  if (e2) try {
    const s2 = decodeURIComponent(t(e2.split(".")[1]).split("").map((function(e3) {
      return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
    })).join(""));
    return JSON.parse(s2) || {};
  } catch (e3) {
  }
  return {};
}
t = "function" == typeof atob ? atob : (e2) => {
  let t2 = String(e2).replace(/=+$/, "");
  if (t2.length % 4 == 1) throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
  for (var s2, i2, r2 = 0, o = 0, n = ""; i2 = t2.charAt(o++); ~i2 && (s2 = r2 % 4 ? 64 * s2 + i2 : i2, r2++ % 4) ? n += String.fromCharCode(255 & s2 >> (-2 * r2 & 6)) : 0) i2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(i2);
  return n;
};
const s = "pb_auth";
class BaseAuthStore {
  constructor() {
    this.baseToken = "", this.baseModel = null, this._onChangeCallbacks = [];
  }
  get token() {
    return this.baseToken;
  }
  get record() {
    return this.baseModel;
  }
  get model() {
    return this.baseModel;
  }
  get isValid() {
    return !(function isTokenExpired(e2, t2 = 0) {
      let s2 = getTokenPayload(e2);
      return !(Object.keys(s2).length > 0 && (!s2.exp || s2.exp - t2 > Date.now() / 1e3));
    })(this.token);
  }
  get isSuperuser() {
    var _a, _b;
    let e2 = getTokenPayload(this.token);
    return "auth" == e2.type && ("_superusers" == ((_a = this.record) == null ? void 0 : _a.collectionName) || !((_b = this.record) == null ? void 0 : _b.collectionName) && "pbc_3142635823" == e2.collectionId);
  }
  get isAdmin() {
    return console.warn("Please replace pb.authStore.isAdmin with pb.authStore.isSuperuser OR simply check the value of pb.authStore.record?.collectionName"), this.isSuperuser;
  }
  get isAuthRecord() {
    return console.warn("Please replace pb.authStore.isAuthRecord with !pb.authStore.isSuperuser OR simply check the value of pb.authStore.record?.collectionName"), "auth" == getTokenPayload(this.token).type && !this.isSuperuser;
  }
  save(e2, t2) {
    this.baseToken = e2 || "", this.baseModel = t2 || null, this.triggerChange();
  }
  clear() {
    this.baseToken = "", this.baseModel = null, this.triggerChange();
  }
  loadFromCookie(e2, t2 = s) {
    const i2 = (function cookieParse(e3, t3) {
      const s2 = {};
      if ("string" != typeof e3) return s2;
      const i3 = Object.assign({}, {}).decode || defaultDecode;
      let r3 = 0;
      for (; r3 < e3.length; ) {
        const t4 = e3.indexOf("=", r3);
        if (-1 === t4) break;
        let o = e3.indexOf(";", r3);
        if (-1 === o) o = e3.length;
        else if (o < t4) {
          r3 = e3.lastIndexOf(";", t4 - 1) + 1;
          continue;
        }
        const n = e3.slice(r3, t4).trim();
        if (void 0 === s2[n]) {
          let r4 = e3.slice(t4 + 1, o).trim();
          34 === r4.charCodeAt(0) && (r4 = r4.slice(1, -1));
          try {
            s2[n] = i3(r4);
          } catch (e4) {
            s2[n] = r4;
          }
        }
        r3 = o + 1;
      }
      return s2;
    })(e2 || "")[t2] || "";
    let r2 = {};
    try {
      r2 = JSON.parse(i2), (null === typeof r2 || "object" != typeof r2 || Array.isArray(r2)) && (r2 = {});
    } catch (e3) {
    }
    this.save(r2.token || "", r2.record || r2.model || null);
  }
  exportToCookie(e2, t2 = s) {
    var _a, _b;
    const i2 = { secure: true, sameSite: true, httpOnly: true, path: "/" }, r2 = getTokenPayload(this.token);
    i2.expires = (r2 == null ? void 0 : r2.exp) ? new Date(1e3 * r2.exp) : /* @__PURE__ */ new Date("1970-01-01"), e2 = Object.assign({}, i2, e2);
    const o = { token: this.token, record: this.record ? JSON.parse(JSON.stringify(this.record)) : null };
    let n = cookieSerialize(t2, JSON.stringify(o), e2);
    const a = "undefined" != typeof Blob ? new Blob([n]).size : n.length;
    if (o.record && a > 4096) {
      o.record = { id: (_a = o.record) == null ? void 0 : _a.id, email: (_b = o.record) == null ? void 0 : _b.email };
      const s2 = ["collectionId", "collectionName", "verified"];
      for (const e3 in this.record) s2.includes(e3) && (o.record[e3] = this.record[e3]);
      n = cookieSerialize(t2, JSON.stringify(o), e2);
    }
    return n;
  }
  onChange(e2, t2 = false) {
    return this._onChangeCallbacks.push(e2), t2 && e2(this.token, this.record), () => {
      for (let t3 = this._onChangeCallbacks.length - 1; t3 >= 0; t3--) if (this._onChangeCallbacks[t3] == e2) return delete this._onChangeCallbacks[t3], void this._onChangeCallbacks.splice(t3, 1);
    };
  }
  triggerChange() {
    for (const e2 of this._onChangeCallbacks) e2 && e2(this.token, this.record);
  }
}
class LocalAuthStore extends BaseAuthStore {
  constructor(e2 = "pocketbase_auth") {
    super(), this.storageFallback = {}, this.storageKey = e2, this._bindStorageEvent();
  }
  get token() {
    return (this._storageGet(this.storageKey) || {}).token || "";
  }
  get record() {
    const e2 = this._storageGet(this.storageKey) || {};
    return e2.record || e2.model || null;
  }
  get model() {
    return this.record;
  }
  save(e2, t2) {
    this._storageSet(this.storageKey, { token: e2, record: t2 }), super.save(e2, t2);
  }
  clear() {
    this._storageRemove(this.storageKey), super.clear();
  }
  _storageGet(e2) {
    if ("undefined" != typeof window && (window == null ? void 0 : window.localStorage)) {
      const t2 = window.localStorage.getItem(e2) || "";
      try {
        return JSON.parse(t2);
      } catch (e3) {
        return t2;
      }
    }
    return this.storageFallback[e2];
  }
  _storageSet(e2, t2) {
    if ("undefined" != typeof window && (window == null ? void 0 : window.localStorage)) {
      let s2 = t2;
      "string" != typeof t2 && (s2 = JSON.stringify(t2)), window.localStorage.setItem(e2, s2);
    } else this.storageFallback[e2] = t2;
  }
  _storageRemove(e2) {
    var _a;
    "undefined" != typeof window && (window == null ? void 0 : window.localStorage) && ((_a = window.localStorage) == null ? void 0 : _a.removeItem(e2)), delete this.storageFallback[e2];
  }
  _bindStorageEvent() {
    "undefined" != typeof window && (window == null ? void 0 : window.localStorage) && window.addEventListener && window.addEventListener("storage", ((e2) => {
      if (e2.key != this.storageKey) return;
      const t2 = this._storageGet(this.storageKey) || {};
      super.save(t2.token || "", t2.record || t2.model || null);
    }));
  }
}
class BaseService {
  constructor(e2) {
    this.client = e2;
  }
}
class SettingsService extends BaseService {
  getAll(e2) {
    return e2 = Object.assign({ method: "GET" }, e2), this.client.send("/api/settings", e2);
  }
  update(e2, t2) {
    return t2 = Object.assign({ method: "PATCH", body: e2 }, t2), this.client.send("/api/settings", t2);
  }
  testS3(e2 = "storage", t2) {
    return t2 = Object.assign({ method: "POST", body: { filesystem: e2 } }, t2), this.client.send("/api/settings/test/s3", t2), true;
  }
  testEmail(e2, t2, s2, i2) {
    return i2 = Object.assign({ method: "POST", body: { email: t2, template: s2, collection: e2 } }, i2), this.client.send("/api/settings/test/email", i2), true;
  }
  generateAppleClientSecret(e2, t2, s2, i2, r2, o) {
    return o = Object.assign({ method: "POST", body: { clientId: e2, teamId: t2, keyId: s2, privateKey: i2, duration: r2 } }, o), this.client.send("/api/settings/apple/generate-client-secret", o);
  }
}
class CrudService extends BaseService {
  decode(e2) {
    return e2;
  }
  getFullList(e2, t2) {
    if ("number" == typeof e2) return this._getFullList(e2, t2);
    let s2 = 500;
    return (t2 = Object.assign({}, e2, t2)).batch && (s2 = t2.batch, delete t2.batch), this._getFullList(s2, t2);
  }
  getList(e2 = 1, t2 = 30, s2) {
    var _a;
    (s2 = Object.assign({ method: "GET" }, s2)).query = Object.assign({ page: e2, perPage: t2 }, s2.query);
    const i2 = this.client.send(this.baseCrudPath, s2);
    return i2.items = ((_a = i2.items) == null ? void 0 : _a.map(((e3) => this.decode(e3)))) || [], i2;
  }
  getFirstListItem(e2, t2) {
    var _a;
    (t2 = Object.assign({ requestKey: "one_by_filter_" + this.baseCrudPath + "_" + e2 }, t2)).query = Object.assign({ filter: e2, skipTotal: 1 }, t2.query);
    const s2 = this.getList(1, 1, t2);
    if (!((_a = s2 == null ? void 0 : s2.items) == null ? void 0 : _a.length)) throw new ClientResponseError({ status: 404, response: { code: 404, message: "The requested resource wasn't found.", data: {} } });
    return s2.items[0];
  }
  getOne(e2, t2) {
    if (!e2) throw new ClientResponseError({ url: this.client.buildURL(this.baseCrudPath + "/"), status: 404, response: { code: 404, message: "Missing required record id.", data: {} } });
    t2 = Object.assign({ method: "GET" }, t2);
    const s2 = this.client.send(this.baseCrudPath + "/" + encodeURIComponent(e2), t2);
    return this.decode(s2);
  }
  create(e2, t2) {
    t2 = Object.assign({ method: "POST", body: e2 }, t2);
    const s2 = this.client.send(this.baseCrudPath, t2);
    return this.decode(s2);
  }
  update(e2, t2, s2) {
    s2 = Object.assign({ method: "PATCH", body: t2 }, s2);
    const i2 = this.client.send(this.baseCrudPath + "/" + encodeURIComponent(e2), s2);
    return this.decode(i2);
  }
  delete(e2, t2) {
    t2 = Object.assign({ method: "DELETE" }, t2);
    return this.client.send(this.baseCrudPath + "/" + encodeURIComponent(e2), t2);
  }
  _getFullList(e2 = 500, t2) {
    (t2 = t2 || {}).query = Object.assign({ skipTotal: 1 }, t2.query);
    let s2 = [], request = (i2) => {
      const r2 = this.getList(i2, e2 || 500, t2), o = r2.items;
      return s2 = s2.concat(o), o.length == r2.perPage ? request(i2 + 1) : s2;
    };
    return request(1);
  }
}
function normalizeLegacyOptionsArgs(e2, t2, s2, i2) {
  const r2 = void 0 !== i2;
  return r2 || void 0 !== s2 ? r2 ? (console.warn(e2), t2.body = Object.assign({}, t2.body, s2), t2.query = Object.assign({}, t2.query, i2), t2) : Object.assign(t2, s2) : t2;
}
class RecordService extends CrudService {
  constructor(e2, t2) {
    super(e2), this.collectionIdOrName = t2;
  }
  get baseCrudPath() {
    return this.baseCollectionPath + "/records";
  }
  get baseCollectionPath() {
    return "/api/collections/" + encodeURIComponent(this.collectionIdOrName);
  }
  get isSuperusers() {
    return "_superusers" == this.collectionIdOrName || "_pbc_2773867675" == this.collectionIdOrName;
  }
  getFullList(e2, t2) {
    if ("number" == typeof e2) return super.getFullList(e2, t2);
    const s2 = Object.assign({}, e2, t2);
    return super.getFullList(s2);
  }
  getList(e2 = 1, t2 = 30, s2) {
    return super.getList(e2, t2, s2);
  }
  getFirstListItem(e2, t2) {
    return super.getFirstListItem(e2, t2);
  }
  getOne(e2, t2) {
    return super.getOne(e2, t2);
  }
  create(e2, t2) {
    return super.create(e2, t2);
  }
  update(e2, t2, s2) {
    var _a, _b, _c;
    const i2 = super.update(e2, t2, s2);
    if (((_a = this.client.authStore.record) == null ? void 0 : _a.id) === (i2 == null ? void 0 : i2.id) && (((_b = this.client.authStore.record) == null ? void 0 : _b.collectionId) === this.collectionIdOrName || ((_c = this.client.authStore.record) == null ? void 0 : _c.collectionName) === this.collectionIdOrName)) {
      let e3 = Object.assign({}, this.client.authStore.record.expand), t3 = Object.assign({}, this.client.authStore.record, i2);
      e3 && (t3.expand = Object.assign(e3, i2.expand)), this.client.authStore.save(this.client.authStore.token, t3);
    }
    return i2;
  }
  delete(e2, t2) {
    var _a, _b, _c;
    const s2 = super.delete(e2, t2);
    return !s2 || ((_a = this.client.authStore.record) == null ? void 0 : _a.id) !== e2 || ((_b = this.client.authStore.record) == null ? void 0 : _b.collectionId) !== this.collectionIdOrName && ((_c = this.client.authStore.record) == null ? void 0 : _c.collectionName) !== this.collectionIdOrName || this.client.authStore.clear(), s2;
  }
  authResponse(e2) {
    const t2 = this.decode((e2 == null ? void 0 : e2.record) || {});
    return this.client.authStore.save(e2 == null ? void 0 : e2.token, t2), Object.assign({}, e2, { token: (e2 == null ? void 0 : e2.token) || "", record: t2 });
  }
  listAuthMethods(e2) {
    return e2 = Object.assign({ method: "GET", fields: "mfa,otp,password,oauth2" }, e2), this.client.send(this.baseCollectionPath + "/auth-methods", e2);
  }
  authWithPassword(e2, t2, s2) {
    s2 = Object.assign({ method: "POST", body: { identity: e2, password: t2 } }, s2);
    let i2 = this.client.send(this.baseCollectionPath + "/auth-with-password", s2);
    return i2 = this.authResponse(i2), i2;
  }
  authWithOAuth2Code(e2, t2, s2, i2, r2, o, n) {
    let a = { method: "POST", body: { provider: e2, code: t2, codeVerifier: s2, redirectURL: i2, createData: r2 } };
    a = normalizeLegacyOptionsArgs("This form of authWithOAuth2Code(provider, code, codeVerifier, redirectURL, createData?, body?, query?) is deprecated. Consider replacing it with authWithOAuth2Code(provider, code, codeVerifier, redirectURL, createData?, options?).", a, o, n);
    const c = this.client.send(this.baseCollectionPath + "/auth-with-oauth2", a);
    return this.authResponse(c);
  }
  authRefresh(e2, t2) {
    let s2 = { method: "POST" };
    s2 = normalizeLegacyOptionsArgs("This form of authRefresh(body?, query?) is deprecated. Consider replacing it with authRefresh(options?).", s2, e2, t2);
    const i2 = this.client.send(this.baseCollectionPath + "/auth-refresh", s2);
    return this.authResponse(i2);
  }
  requestPasswordReset(e2, t2, s2) {
    let i2 = { method: "POST", body: { email: e2 } };
    return i2 = normalizeLegacyOptionsArgs("This form of requestPasswordReset(email, body?, query?) is deprecated. Consider replacing it with requestPasswordReset(email, options?).", i2, t2, s2), this.client.send(this.baseCollectionPath + "/request-password-reset", i2), true;
  }
  confirmPasswordReset(e2, t2, s2, i2, r2) {
    let o = { method: "POST", body: { token: e2, password: t2, passwordConfirm: s2 } };
    return o = normalizeLegacyOptionsArgs("This form of confirmPasswordReset(token, password, passwordConfirm, body?, query?) is deprecated. Consider replacing it with confirmPasswordReset(token, password, passwordConfirm, options?).", o, i2, r2), this.client.send(this.baseCollectionPath + "/confirm-password-reset", o), true;
  }
  requestVerification(e2, t2, s2) {
    let i2 = { method: "POST", body: { email: e2 } };
    return i2 = normalizeLegacyOptionsArgs("This form of requestVerification(email, body?, query?) is deprecated. Consider replacing it with requestVerification(email, options?).", i2, t2, s2), this.client.send(this.baseCollectionPath + "/request-verification", i2), true;
  }
  confirmVerification(e2, t2, s2) {
    let i2 = { method: "POST", body: { token: e2 } };
    i2 = normalizeLegacyOptionsArgs("This form of confirmVerification(token, body?, query?) is deprecated. Consider replacing it with confirmVerification(token, options?).", i2, t2, s2), this.client.send(this.baseCollectionPath + "/confirm-verification", i2);
    const r2 = getTokenPayload(e2), o = this.client.authStore.record;
    return o && !o.verified && o.id === r2.id && o.collectionId === r2.collectionId && (o.verified = true, this.client.authStore.save(this.client.authStore.token, o)), true;
  }
  requestEmailChange(e2, t2, s2) {
    let i2 = { method: "POST", body: { newEmail: e2 } };
    return i2 = normalizeLegacyOptionsArgs("This form of requestEmailChange(newEmail, body?, query?) is deprecated. Consider replacing it with requestEmailChange(newEmail, options?).", i2, t2, s2), this.client.send(this.baseCollectionPath + "/request-email-change", i2), true;
  }
  confirmEmailChange(e2, t2, s2, i2) {
    let r2 = { method: "POST", body: { token: e2, password: t2 } };
    r2 = normalizeLegacyOptionsArgs("This form of confirmEmailChange(token, password, body?, query?) is deprecated. Consider replacing it with confirmEmailChange(token, password, options?).", r2, s2, i2), this.client.send(this.baseCollectionPath + "/confirm-email-change", r2);
    const o = getTokenPayload(e2), n = this.client.authStore.record;
    return n && n.id === o.id && n.collectionId === o.collectionId && this.client.authStore.clear(), true;
  }
  requestOTP(e2, t2) {
    return t2 = Object.assign({ method: "POST", body: { email: e2 } }, t2), this.client.send(this.baseCollectionPath + "/request-otp", t2);
  }
  authWithOTP(e2, t2, s2) {
    s2 = Object.assign({ method: "POST", body: { otpId: e2, password: t2 } }, s2);
    const i2 = this.client.send(this.baseCollectionPath + "/auth-with-otp", s2);
    return this.authResponse(i2);
  }
  impersonate(e2, t2, s2) {
    (s2 = Object.assign({ method: "POST", body: { duration: t2 } }, s2)).headers = s2.headers || {}, s2.headers.Authorization || (s2.headers.Authorization = this.client.authStore.token);
    const i2 = new Client(this.client.baseURL, new BaseAuthStore(), this.client.lang), r2 = i2.send(this.baseCollectionPath + "/impersonate/" + encodeURIComponent(e2), s2);
    return i2.authStore.save(r2 == null ? void 0 : r2.token, this.decode((r2 == null ? void 0 : r2.record) || {})), i2;
  }
}
class CollectionService extends CrudService {
  get baseCrudPath() {
    return "/api/collections";
  }
  import(e2, t2 = false, s2) {
    return s2 = Object.assign({ method: "PUT", body: { collections: e2, deleteMissing: t2 } }, s2), this.client.send(this.baseCrudPath + "/import", s2), true;
  }
  getScaffolds(e2) {
    return e2 = Object.assign({ method: "GET" }, e2), this.client.send(this.baseCrudPath + "/meta/scaffolds", e2);
  }
  truncate(e2, t2) {
    return t2 = Object.assign({ method: "DELETE" }, t2), this.client.send(this.baseCrudPath + "/" + encodeURIComponent(e2) + "/truncate", t2), true;
  }
}
class LogService extends BaseService {
  getList(e2 = 1, t2 = 30, s2) {
    return (s2 = Object.assign({ method: "GET" }, s2)).query = Object.assign({ page: e2, perPage: t2 }, s2.query), this.client.send("/api/logs", s2);
  }
  getOne(e2, t2) {
    if (!e2) throw new ClientResponseError({ url: this.client.buildURL("/api/logs/"), status: 404, response: { code: 404, message: "Missing required log id.", data: {} } });
    return t2 = Object.assign({ method: "GET" }, t2), this.client.send("/api/logs/" + encodeURIComponent(e2), t2);
  }
  getStats(e2) {
    return e2 = Object.assign({ method: "GET" }, e2), this.client.send("/api/logs/stats", e2);
  }
}
class HealthService extends BaseService {
  check(e2) {
    return e2 = Object.assign({ method: "GET" }, e2), this.client.send("/api/health", e2);
  }
}
class FileService extends BaseService {
  getUrl(e2, t2, s2 = {}) {
    return console.warn("Please replace pb.files.getUrl() with pb.files.getURL()"), this.getURL(e2, t2, s2);
  }
  getURL(e2, t2, s2 = {}) {
    if (!t2 || !(e2 == null ? void 0 : e2.id) || !(e2 == null ? void 0 : e2.collectionId) && !(e2 == null ? void 0 : e2.collectionName)) return "";
    const i2 = [];
    i2.push("api"), i2.push("files"), i2.push(encodeURIComponent(e2.collectionId || e2.collectionName)), i2.push(encodeURIComponent(e2.id)), i2.push(encodeURIComponent(t2));
    let r2 = this.client.buildURL(i2.join("/"));
    if (Object.keys(s2).length) {
      false === s2.download && delete s2.download;
      const e3 = new URLSearchParams(s2);
      r2 += (r2.includes("?") ? "&" : "?") + e3;
    }
    return r2;
  }
  getToken(e2) {
    e2 = Object.assign({ method: "POST" }, e2);
    const t2 = this.client.send("/api/files/token", e2);
    return (t2 == null ? void 0 : t2.token) || "";
  }
}
class BackupService extends BaseService {
  getFullList(e2) {
    return e2 = Object.assign({ method: "GET" }, e2), this.client.send("/api/backups", e2);
  }
  create(e2, t2) {
    return t2 = Object.assign({ method: "POST", body: { name: e2 } }, t2), this.client.send("/api/backups", t2), true;
  }
  upload(e2, t2) {
    return t2 = Object.assign({ method: "POST", body: e2 }, t2), this.client.send("/api/backups/upload", t2), true;
  }
  delete(e2, t2) {
    return t2 = Object.assign({ method: "DELETE" }, t2), this.client.send(`/api/backups/${encodeURIComponent(e2)}`, t2), true;
  }
  restore(e2, t2) {
    return t2 = Object.assign({ method: "POST" }, t2), this.client.send(`/api/backups/${encodeURIComponent(e2)}/restore`, t2), true;
  }
  getDownloadURL(e2, t2) {
    return this.client.buildURL(`/api/backups/${encodeURIComponent(t2)}?token=${encodeURIComponent(e2)}`);
  }
}
class CronService extends BaseService {
  getFullList(e2) {
    return e2 = Object.assign({ method: "GET" }, e2), this.client.send("/api/crons", e2);
  }
  run(e2, t2) {
    return t2 = Object.assign({ method: "POST" }, t2), this.client.send(`/api/crons/${encodeURIComponent(e2)}`, t2), true;
  }
}
function isFile(e2) {
  return "undefined" != typeof Blob && e2 instanceof Blob || "undefined" != typeof File && e2 instanceof File;
}
function isFormData(e2) {
  return e2 && ("FormData" === e2.constructor.name || "undefined" != typeof FormData && e2 instanceof FormData);
}
function hasFileField(e2) {
  for (const t2 in e2) {
    const s2 = Array.isArray(e2[t2]) ? e2[t2] : [e2[t2]];
    for (const e3 of s2) if (isFile(e3)) return true;
  }
  return false;
}
const i = /^[\-\.\d]+$/;
function inferFormDataValue(e2) {
  if ("string" != typeof e2) return e2;
  if ("true" == e2) return true;
  if ("false" == e2) return false;
  if (("-" === e2[0] || e2[0] >= "0" && e2[0] <= "9") && i.test(e2)) {
    let t2 = +e2;
    if ("" + t2 === e2) return t2;
  }
  return e2;
}
const r = ["fetch", "headers", "body", "query", "params", "cache", "credentials", "headers", "integrity", "keepalive", "method", "mode", "redirect", "referrer", "referrerPolicy", "signal", "window"];
function normalizeUnknownQueryParams(e2) {
  if (e2) {
    e2.query = e2.query || {};
    for (let t2 in e2) r.includes(t2) || (e2.query[t2] = e2[t2], delete e2[t2]);
  }
}
function serializeQueryParams(e2) {
  const t2 = [];
  for (const s2 in e2) {
    if (null === e2[s2] || void 0 === e2[s2]) continue;
    const i2 = e2[s2], r2 = encodeURIComponent(s2);
    if (Array.isArray(i2)) for (const e3 of i2) t2.push(r2 + "=" + encodeURIComponent(e3));
    else i2 instanceof Date ? t2.push(r2 + "=" + encodeURIComponent(i2.toISOString())) : null !== typeof i2 && "object" == typeof i2 ? t2.push(r2 + "=" + encodeURIComponent(JSON.stringify(i2))) : t2.push(r2 + "=" + encodeURIComponent(i2));
  }
  return t2.join("&");
}
class BatchService extends BaseService {
  constructor() {
    super(...arguments), this.requests = [], this.subs = {};
  }
  collection(e2) {
    return this.subs[e2] || (this.subs[e2] = new SubBatchService(this.requests, e2)), this.subs[e2];
  }
  send(e2) {
    const t2 = new FormData(), s2 = [];
    for (let e3 = 0; e3 < this.requests.length; e3++) {
      const i2 = this.requests[e3];
      if (s2.push({ method: i2.method, url: i2.url, headers: i2.headers, body: i2.json }), i2.files) for (let s3 in i2.files) {
        const r2 = i2.files[s3] || [];
        for (let i3 of r2) t2.append("requests." + e3 + "." + s3, i3);
      }
    }
    return t2.append("@jsonPayload", JSON.stringify({ requests: s2 })), e2 = Object.assign({ method: "POST", body: t2 }, e2), this.client.send("/api/batch", e2);
  }
}
class SubBatchService {
  constructor(e2, t2) {
    this.requests = [], this.requests = e2, this.collectionIdOrName = t2;
  }
  upsert(e2, t2) {
    t2 = Object.assign({ body: e2 || {} }, t2);
    const s2 = { method: "PUT", url: "/api/collections/" + encodeURIComponent(this.collectionIdOrName) + "/records" };
    this.prepareRequest(s2, t2), this.requests.push(s2);
  }
  create(e2, t2) {
    t2 = Object.assign({ body: e2 || {} }, t2);
    const s2 = { method: "POST", url: "/api/collections/" + encodeURIComponent(this.collectionIdOrName) + "/records" };
    this.prepareRequest(s2, t2), this.requests.push(s2);
  }
  update(e2, t2, s2) {
    s2 = Object.assign({ body: t2 || {} }, s2);
    const i2 = { method: "PATCH", url: "/api/collections/" + encodeURIComponent(this.collectionIdOrName) + "/records/" + encodeURIComponent(e2) };
    this.prepareRequest(i2, s2), this.requests.push(i2);
  }
  delete(e2, t2) {
    t2 = Object.assign({}, t2);
    const s2 = { method: "DELETE", url: "/api/collections/" + encodeURIComponent(this.collectionIdOrName) + "/records/" + encodeURIComponent(e2) };
    this.prepareRequest(s2, t2), this.requests.push(s2);
  }
  prepareRequest(e2, t2) {
    if (normalizeUnknownQueryParams(t2), e2.headers = t2.headers, e2.json = {}, e2.files = {}, void 0 !== t2.query) {
      const s3 = serializeQueryParams(t2.query);
      s3 && (e2.url += (e2.url.includes("?") ? "&" : "?") + s3);
    }
    let s2 = t2.body;
    isFormData(s2) && (s2 = (function convertFormDataToObject(e3) {
      let t3 = {};
      return e3.forEach(((e4, s3) => {
        if ("@jsonPayload" === s3 && "string" == typeof e4) try {
          let s4 = JSON.parse(e4);
          Object.assign(t3, s4);
        } catch (e5) {
          console.warn("@jsonPayload error:", e5);
        }
        else void 0 !== t3[s3] ? (Array.isArray(t3[s3]) || (t3[s3] = [t3[s3]]), t3[s3].push(inferFormDataValue(e4))) : t3[s3] = inferFormDataValue(e4);
      })), t3;
    })(s2));
    for (const t3 in s2) {
      const i2 = s2[t3];
      if (isFile(i2)) e2.files[t3] = e2.files[t3] || [], e2.files[t3].push(i2);
      else if (Array.isArray(i2)) {
        const s3 = [], r2 = [];
        for (const e3 of i2) isFile(e3) ? s3.push(e3) : r2.push(e3);
        if (s3.length > 0 && s3.length == i2.length) {
          e2.files[t3] = e2.files[t3] || [];
          for (let i3 of s3) e2.files[t3].push(i3);
        } else if (e2.json[t3] = r2, s3.length > 0) {
          let i3 = t3;
          t3.startsWith("+") || t3.endsWith("+") || (i3 += "+"), e2.files[i3] = e2.files[i3] || [];
          for (let t4 of s3) e2.files[i3].push(t4);
        }
      } else e2.json[t3] = i2;
    }
  }
}
class Client {
  get baseUrl() {
    return this.baseURL;
  }
  set baseUrl(e2) {
    this.baseURL = e2;
  }
  constructor(e2 = "/", t2, s2 = "en-US") {
    this.recordServices = {}, this.baseURL = e2, this.lang = s2, t2 ? this.authStore = t2 : "undefined" != typeof window && window.Deno ? this.authStore = new BaseAuthStore() : this.authStore = new LocalAuthStore(), this.collections = new CollectionService(this), this.files = new FileService(this), this.logs = new LogService(this), this.settings = new SettingsService(this), this.health = new HealthService(this), this.backups = new BackupService(this), this.crons = new CronService(this);
  }
  get admins() {
    return this.collection("_superusers");
  }
  createBatch() {
    return new BatchService(this);
  }
  collection(e2) {
    return this.recordServices[e2] || (this.recordServices[e2] = new RecordService(this, e2)), this.recordServices[e2];
  }
  filter(e2, t2) {
    if (!t2) return e2;
    for (let s2 in t2) {
      let i2 = t2[s2];
      switch (typeof i2) {
        case "boolean":
        case "number":
          i2 = "" + i2;
          break;
        case "string":
          i2 = "'" + i2.replace(/'/g, "\\'") + "'";
          break;
        default:
          i2 = null === i2 ? "null" : i2 instanceof Date ? "'" + i2.toISOString().replace("T", " ") + "'" : "'" + JSON.stringify(i2).replace(/'/g, "\\'") + "'";
      }
      e2 = e2.replaceAll("{:" + s2 + "}", i2);
    }
    return e2;
  }
  getFileUrl(e2, t2, s2 = {}) {
    return console.warn("Please replace pb.getFileUrl() with pb.files.getURL()"), this.files.getURL(e2, t2, s2);
  }
  buildUrl(e2) {
    return console.warn("Please replace pb.buildUrl() with pb.buildURL()"), this.buildURL(e2);
  }
  buildURL(e2) {
    var _a;
    let t2 = this.baseURL;
    return "undefined" == typeof window || !window.location || t2.startsWith("https://") || t2.startsWith("http://") || (t2 = ((_a = window.location.origin) == null ? void 0 : _a.endsWith("/")) ? window.location.origin.substring(0, window.location.origin.length - 1) : window.location.origin || "", this.baseURL.startsWith("/") || (t2 += window.location.pathname || "/", t2 += t2.endsWith("/") ? "" : "/"), t2 += this.baseURL), e2 && (t2 += t2.endsWith("/") ? "" : "/", t2 += e2.startsWith("/") ? e2.substring(1) : e2), t2;
  }
  send(e2, t2) {
    t2 = this.initSendOptions(e2, t2);
    let s2 = this.buildURL(e2);
    if (this.beforeSend) {
      const e3 = Object.assign({}, this.beforeSend(s2, t2));
      void 0 !== e3.url || void 0 !== e3.options ? (s2 = e3.url || s2, t2 = e3.options || t2) : Object.keys(e3).length && (t2 = e3, (console == null ? void 0 : console.warn) && console.warn("Deprecated format of beforeSend return: please use `return { url, options }`, instead of `return options`."));
    }
    if (void 0 !== t2.query) {
      const e3 = serializeQueryParams(t2.query);
      e3 && (s2 += (s2.includes("?") ? "&" : "?") + e3), delete t2.query;
    }
    "application/json" == this.getHeader(t2.headers, "Content-Type") && t2.body && "string" != typeof t2.body && (t2.body = JSON.stringify(t2.body));
    const i2 = t2.fetch || $http.send;
    try {
      const e3 = i2({ url: s2, method: t2.method, headers: t2.headers, body: t2.body });
      let r2 = {};
      try {
        r2 = e3.json;
      } catch (e4) {
      }
      if (this.afterSend && (r2 = this.afterSend(e3, r2, t2)), e3.statusCode >= 400) throw new ClientResponseError({ url: s2, status: e3.statusCode, data: r2 });
      return r2;
    } catch (e3) {
      throw new ClientResponseError(e3);
    }
  }
  initSendOptions(e2, t2) {
    return (t2 = Object.assign({ method: "GET" }, t2)).body = (function convertToFormDataIfNeeded(e3) {
      if ("undefined" == typeof FormData || void 0 === e3 || "object" != typeof e3 || null === e3 || isFormData(e3) || !hasFileField(e3)) return e3;
      const t3 = new FormData();
      for (const s2 in e3) {
        const i2 = e3[s2];
        if ("object" != typeof i2 || hasFileField({ data: i2 })) {
          const e4 = Array.isArray(i2) ? i2 : [i2];
          for (let i3 of e4) t3.append(s2, i3);
        } else {
          let e4 = {};
          e4[s2] = i2, t3.append("@jsonPayload", JSON.stringify(e4));
        }
      }
      return t3;
    })(t2.body), normalizeUnknownQueryParams(t2), null !== this.getHeader(t2.headers, "Content-Type") || isFormData(t2.body) || (t2.headers = Object.assign({}, t2.headers, { "Content-Type": "application/json" })), null === this.getHeader(t2.headers, "Accept-Language") && (t2.headers = Object.assign({}, t2.headers, { "Accept-Language": this.lang })), this.authStore.token && null === this.getHeader(t2.headers, "Authorization") && (t2.headers = Object.assign({}, t2.headers, { Authorization: this.authStore.token })), t2;
  }
  getHeader(e2, t2) {
    e2 = e2 || {}, t2 = t2.toLowerCase();
    for (let s2 in e2) if (s2.toLowerCase() == t2) return e2[s2];
    return null;
  }
}
module.exports = Client;
