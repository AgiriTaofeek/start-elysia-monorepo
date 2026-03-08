var d = class extends Error {
  constructor(e, s) {
    super(s + "");
    this.status = e;
    this.value = s;
  }
};
var i = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/, o = /(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT(?:\+|-)\d{4}\s\([^)]+\)/, u = /^(?:(?:(?:(?:0?[1-9]|[12][0-9]|3[01])[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:19|20)\d{2})|(?:(?:19|20)\d{2}[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:0?[1-9]|[12][0-9]|3[01]))))(?:\s(?:1[012]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?(?:\s[AP]M)?)?$/, c = (t) => t.trim().length !== 0 && !Number.isNaN(Number(t)), a = (t, r) => {
  if (typeof t != "string" || r?.parseDate === false) return null;
  let e = t.replace(/"/g, "");
  if (i.test(e) || o.test(e) || u.test(e)) {
    let s = new Date(e);
    if (!Number.isNaN(s.getTime())) return s;
  }
  return null;
}, p = (t) => {
  let r = t.charCodeAt(0), e = t.charCodeAt(t.length - 1);
  return r === 123 && e === 125 || r === 91 && e === 93;
}, f = (t, r) => JSON.parse(t, (e, s) => {
  let n = a(s, r);
  return n || s;
}), g = (t, r) => {
  if (!t) return t;
  if (c(t)) return +t;
  if (t === "true") return true;
  if (t === "false") return false;
  if (r?.parseDate !== false) {
    let e = a(t, r);
    if (e) return e;
  }
  if (p(t)) try {
    return f(t, r);
  } catch {
  }
  return t;
}, S = (t, r) => {
  let e = t.data.toString();
  return e === "null" ? null : g(e, r);
};
var W = class {
  constructor(t) {
    this.url = t;
    this.ws = new WebSocket(t);
  }
  ws;
  send(t) {
    return Array.isArray(t) ? (t.forEach((n) => this.send(n)), this) : (this.ws.send(typeof t == "object" ? JSON.stringify(t) : t.toString()), this);
  }
  on(t, n, r) {
    return this.addEventListener(t, n, r);
  }
  off(t, n, r) {
    return this.ws.removeEventListener(t, n, r), this;
  }
  subscribe(t, n) {
    return this.addEventListener("message", t, n);
  }
  addEventListener(t, n, r) {
    return this.ws.addEventListener(t, (c2) => {
      if (t === "message") {
        let i2 = S(c2);
        n({ ...c2, data: i2 });
      } else n(c2);
    }, r), this;
  }
  removeEventListener(t, n, r) {
    return this.off(t, n, r), this;
  }
  close() {
    return this.ws.close(), this;
  }
};
var Q = ["get", "post", "put", "delete", "patch", "options", "head", "connect", "subscribe"], P = (e, t) => typeof t == "function" ? t(e) : t === true, U = ["localhost", "127.0.0.1", "0.0.0.0"], q = typeof FileList > "u", H = (e) => q ? e instanceof Blob : e instanceof FileList || e instanceof File, X = (e) => {
  if (!e) return false;
  for (let t in e) if (H(e[t]) || Array.isArray(e[t]) && e[t].find(H)) return true;
  return false;
}, K = (e) => q ? e : new Promise((t) => {
  let n = new FileReader();
  n.onload = () => {
    let r = new File([n.result], e.name, { lastModified: e.lastModified, type: e.type });
    t(r);
  }, n.readAsArrayBuffer(e);
}), A = async (e, t, n = {}, r = {}) => {
  if (Array.isArray(e)) {
    for (let c2 of e) if (!Array.isArray(c2)) r = await A(c2, t, n, r);
    else {
      let i2 = c2[0];
      if (typeof i2 == "string") r[i2.toLowerCase()] = c2[1];
      else for (let [a2, l] of i2) r[a2.toLowerCase()] = l;
    }
    return r;
  }
  if (!e) return r;
  switch (typeof e) {
    case "function":
      if (e instanceof Headers) return A(e, t, n, r);
      let c2 = await e(t, n);
      return c2 ? A(c2, t, n, r) : r;
    case "object":
      if (e instanceof Headers) return e.forEach((i2, a2) => {
        r[a2.toLowerCase()] = i2;
      }), r;
      for (let [i2, a2] of Object.entries(e)) r[i2.toLowerCase()] = a2;
      return r;
    default:
      return r;
  }
};
function _(e, t) {
  let n = e.split(`
`), r = {};
  for (let c2 of n) {
    if (!c2 || c2.startsWith(":")) continue;
    let i2 = c2.indexOf(":");
    if (i2 > 0) {
      let a2 = c2.slice(0, i2).trim(), l = c2.slice(i2 + 1).replace(/^ /, "");
      r[a2] = l && g(l, t);
    }
  }
  return Object.keys(r).length > 0 ? r : null;
}
function* B(e, t) {
  let n;
  for (; (n = e.value.indexOf(`

`)) !== -1; ) {
    let r = e.value.slice(0, n);
    if (e.value = e.value.slice(n + 2), r.trim()) {
      let c2 = _(r, t);
      c2 && (yield c2);
    }
  }
}
async function* Y(e, t) {
  let n = e.body;
  if (!n) return;
  let r = n.getReader(), c2 = new TextDecoder("utf-8"), i2 = { value: "" };
  try {
    for (; ; ) {
      let { done: l, value: O } = await r.read();
      if (l) break;
      let k = typeof O == "string" ? O : c2.decode(O, { stream: true });
      i2.value += k, yield* B(i2, t);
    }
    let a2 = c2.decode();
    if (a2 && (i2.value += a2), yield* B(i2, t), i2.value.trim()) {
      let l = _(i2.value, t);
      l && (yield l);
    }
  } finally {
    r.releaseLock();
  }
}
var F = (e, t, n = [], r) => new Proxy(() => {
}, { get(c2, i2) {
  if (!(n.length === 0 && (i2 === "then" || i2 === "catch" || i2 === "finally"))) return F(e, t, [...n, i2], r);
}, apply(c2, i2, [a$1, l]) {
  if (!a$1 || l || typeof a$1 == "object" && Object.keys(a$1).length !== 1 || Q.includes(n.at(-1))) {
    let O = [...n], k = O.pop(), b = "/" + O.join("/"), { fetcher: V = fetch, headers: L, onRequest: g$1, onResponse: R, fetch: G } = t, E = k === "get" || k === "head" || k === "subscribe", M = E ? a$1?.query : l?.query, D = "";
    if (M) {
      let s = (m, d2) => {
        d2 != null && (d2 instanceof Date && (d2 = d2.toISOString()), D += (D ? "&" : "?") + `${encodeURIComponent(m)}=${encodeURIComponent(typeof d2 == "object" ? JSON.stringify(d2) : d2 + "")}`);
      };
      for (let [m, d2] of Object.entries(M)) {
        if (Array.isArray(d2)) {
          for (let T of d2) s(m, T);
          continue;
        }
        s(m, d2);
      }
    }
    if (k === "subscribe") {
      let s = e.replace(/^([^]+):\/\//, e.startsWith("https://") ? "wss://" : e.startsWith("http://") || U.find((m) => e.includes(m)) ? "ws://" : "wss://") + b + D;
      return new W(s);
    }
    return (async () => {
      L = await A(L, b, l);
      let s = { method: k?.toUpperCase(), body: a$1, ...G, headers: L };
      s.headers = { ...L, ...await A(E ? a$1?.headers : l?.headers, b, s) };
      let m = E && typeof a$1 == "object" ? a$1.fetch : l?.fetch, T = (E && typeof a$1 == "object" ? a$1.throwHttpError : l?.throwHttpError) ?? t.throwHttpError;
      if (s = { ...s, ...m }, E && delete s.body, g$1) {
        Array.isArray(g$1) || (g$1 = [g$1]);
        for (let u2 of g$1) {
          let o2 = await u2(b, s);
          typeof o2 == "object" && (s = { ...s, ...o2, headers: { ...s.headers, ...await A(o2.headers, b, s) } });
        }
      }
      if (E && delete s.body, X(a$1)) {
        let u2 = new FormData(), o2 = (f2) => {
          if (typeof f2 == "string" || H(f2)) return false;
          if (typeof f2 == "object") {
            if (f2 !== null) return true;
            if (f2 instanceof Date) return false;
          }
          return false;
        }, w = async (f2) => f2 instanceof File ? await K(f2) : o2(f2) ? JSON.stringify(f2) : f2;
        for (let [f2, p2] of Object.entries(s.body)) {
          if (Array.isArray(p2)) {
            if (p2.some((S2) => typeof S2 == "object" && S2 !== null && !H(S2))) u2.append(f2, JSON.stringify(p2));
            else for (let S2 = 0; S2 < p2.length; S2++) {
              let $ = p2[S2], z = await w($);
              u2.append(f2, z);
            }
            continue;
          }
          if (q) {
            if (Array.isArray(p2)) for (let x of p2) u2.append(f2, await w(x));
            else u2.append(f2, await w(p2));
            continue;
          }
          if (p2 instanceof File) {
            u2.append(f2, await K(p2));
            continue;
          }
          if (p2 instanceof FileList) {
            for (let x = 0; x < p2.length; x++) u2.append(f2, await K(p2[x]));
            continue;
          }
          u2.append(f2, await w(p2));
        }
        s.body = u2;
      } else typeof a$1 == "object" ? (s.headers["content-type"] = "application/json", s.body = JSON.stringify(a$1)) : a$1 != null && (s.headers["content-type"] = "text/plain");
      if (E && delete s.body, g$1) {
        Array.isArray(g$1) || (g$1 = [g$1]);
        for (let u2 of g$1) {
          let o2 = await u2(b, s);
          typeof o2 == "object" && (s = { ...s, ...o2, headers: { ...s.headers, ...await A(o2.headers, b, s) } });
        }
      }
      l?.headers?.["content-type"] && (s.headers["content-type"] = l?.headers["content-type"]);
      let I = e + b + D, y;
      try {
        y = await (r?.handle(new Request(I, s)) ?? V(I, s));
      } catch (u2) {
        let o2 = new d(503, u2);
        if (P(o2, T)) throw o2;
        return { data: null, error: o2, response: void 0, status: 503, headers: void 0 };
      }
      let h = null, v = null;
      if (R) {
        Array.isArray(R) || (R = [R]);
        for (let u2 of R) try {
          let o2 = await u2(y.clone());
          if (o2 != null) {
            h = o2;
            break;
          }
        } catch (o2) {
          o2 instanceof d ? v = o2 : v = new d(422, o2);
          break;
        }
      }
      if (h !== null) return { data: h, error: v, response: y, status: y.status, headers: y.headers };
      switch (y.headers.get("Content-Type")?.split(";")[0]) {
        case "text/event-stream":
          h = Y(y, { parseDate: t.parseDate });
          break;
        case "application/json":
          h = JSON.parse(await y.text(), (o2, w) => {
            if (typeof w != "string") return w;
            let f2 = a(w, { parseDate: t.parseDate });
            return f2 || w;
          });
          break;
        case "application/octet-stream":
          h = await y.arrayBuffer();
          break;
        case "multipart/form-data":
          let u2 = await y.formData();
          h = {}, u2.forEach((o2, w) => {
            h[w] = o2;
          });
          break;
        default:
          h = await y.text().then((o2) => g(o2, { parseDate: t.parseDate }));
      }
      if (y.status >= 300 || y.status < 200) {
        if (v = new d(y.status, h), P(v, T)) throw v;
        h = null;
      }
      return { data: h, error: v, response: y, status: y.status, headers: y.headers };
    })();
  }
  return typeof a$1 == "object" ? F(e, t, [...n, Object.values(a$1)[0]], r) : F(e, t, n);
} }), se = (e, t = {}) => typeof e == "string" ? (t.keepDomain || (e.includes("://") || (e = (U.find((n) => e.includes(n)) ? "http://" : "https://") + e), e.endsWith("/") && (e = e.slice(0, -1))), F(e, t)) : (typeof window < "u" && console.warn("Elysia instance server found on client side, this is not recommended for security reason. Use generic type instead."), F("http://e.ly", t, [], e));
export {
  se as s
};
