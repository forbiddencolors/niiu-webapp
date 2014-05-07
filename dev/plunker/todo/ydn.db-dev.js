(function() {
    function aa() {
        return function() {}
    }
    function l(a) {
        return function() {
            return this[a]
        }
    }
    function ba(a) {
        return function() {
            return a
        }
    }
    var r, t = this;
    function ca(a) {
        a = a.split(".");
        for (var b = t, c; c = a.shift();)
            if (null != b[c])
                b = b[c];
            else 
                return null;
        return b
    }
    function da(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array)
                    return "array";
                    if (a instanceof Object)
                        return b;
                        var c = Object.prototype.toString.call(a);
                        if ("[object Window]" == c)
                            return "object";
                            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))
                                return "array";
                                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))
                                    return "function"
            } else 
                return "null";
                else if ("function" == b && "undefined" == typeof a.call)
                    return "object";
return b
}
function u(a) {
    return void 0 !== a
}
function v(a) {
    return "array" == da(a)
}
function w(a) {
    var b = da(a);
    return "array" == b || "object" == b && "number" == typeof a.length
}
function x(a) {
    return "string" == typeof a
}
function ea(a) {
    return "boolean" == typeof a
}
function y(a) {
    return "number" == typeof a
}
function fa(a) {
    return "function" == da(a)
}
function B(a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b
}
function ga(a) {
    return a[ha] || (a[ha]=++ja)
}
var ha = "closure_uid_" + (1E9 * Math.random()>>>0), ja = 0;
function ka(a, b, c) {
    return a.call.apply(a.bind, arguments)
}
function la(a, b, c) {
    if (!a)
        throw Error();
    if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var c = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(c, d);
            return a.apply(b, c)
        }
    }
    return function() {
        return a.apply(b, arguments)
    }
}
function ma(a, b, c) {
    ma = Function.prototype.bind&&-1 != Function.prototype.bind.toString().indexOf("native code") ? ka : la;
    return ma.apply(null, arguments)
}
function na(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
        var b = Array.prototype.slice.call(arguments);
        b.unshift.apply(b, c);
        return a.apply(this, b)
    }
}
var oa = Date.now || function() {
    return + new Date
};
function pa(a, b) {
    var c = a.split("."), d = t;
    c[0]in d ||!d.execScript || d.execScript("var " + c[0]);
    for (var e; c.length && (e = c.shift());)
        c.length || void 0 === b ? d = d[e] ? d[e] : d[e] = {} : d[e] = b
}
function C(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.G = b.prototype;
    a.prototype = new c
};
function qa(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, qa) : this.stack = Error().stack || "";
    a && (this.message = String(a))
}
C(qa, Error);
qa.prototype.name = "CustomError";
function ra(a, b) {
    for (var c = 1; c < arguments.length; c++) {
        var d = String(arguments[c]).replace(/\$/g, "$$$$");
        a = a.replace(/\%s/, d)
    }
    return a
}
function sa(a) {
    return /^[\s\xa0]*$/.test(a)
}
function ta(a, b) {
    return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
}
function ua(a) {
    if (!va.test(a))
        return a;
    -1 != a.indexOf("&") && (a = a.replace(wa, "&amp;"));
    -1 != a.indexOf("<") && (a = a.replace(xa, "&lt;"));
    -1 != a.indexOf(">") && (a = a.replace(ya, "&gt;"));
    -1 != a.indexOf('"') && (a = a.replace(za, "&quot;"));
    return a
}
var wa = /&/g, xa = /</g, ya = />/g, za = /\"/g, va = /[&<>\"]/;
function Ba(a) {
    return ta(a.replace(/  /g, " &#160;"), void 0)
}
function Ca(a, b) {
    for (var c = b.length, d = 0; d < c; d++) {
        var e = 1 == c ? b: b.charAt(d);
        if (a.charAt(0) == e && a.charAt(a.length-1) == e)
            return a.substring(1, a.length-1)
    }
    return a
}
var Da = {
    "\x00": "\\0",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\x0B": "\\x0B",
    '"': '\\"',
    "\\": "\\\\"
}, Ea = {
    "'": "\\'"
};
function Fa(a) {
    a = String(a);
    if (a.quote)
        return a.quote();
    for (var b = ['"'], c = 0; c < a.length; c++) {
        var d = a.charAt(c), e = d.charCodeAt(0), f = b, g = c + 1, h;
        if (!(h = Da[d])) {
            if (!(31 < e && 127 > e))
                if (d in Ea)
                    d = Ea[d];
                else if (d in Da)
                    d = Ea[d] = Da[d];
                else {
                    e = d;
                    h = d.charCodeAt(0);
                    if (31 < h && 127 > h)
                        e = d;
                    else {
                        if (256 > h) {
                            if (e = "\\x", 16 > h || 256 < h)
                                e += "0"
                        } else 
                            e = "\\u", 4096 > h && (e += "0");
                            e += h.toString(16).toUpperCase()
                        }
                        d = Ea[d] = e
                }
            h = d
        }
        f[g] = h
    }
    b.push('"');
    return b.join("")
};
function Ga(a, b) {
    b.unshift(a);
    qa.call(this, ra.apply(null, b));
    b.shift()
}
C(Ga, qa);
Ga.prototype.name = "AssertionError";
function Ha(a, b) {
    throw new Ga("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
};
var Ia = Array.prototype, D = Ia.indexOf ? function(a, b, c) {
    return Ia.indexOf.call(a, b, c)
}
: function(a, b, c) {
    c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
    if (x(a))
        return x(b) && 1 == b.length ? a.indexOf(b, c) : -1;
    for (; c < a.length; c++)
        if (c in a && a[c] === b)
            return c;
    return -1
}, Ja = Ia.forEach ? function(a, b, c) {
    Ia.forEach.call(a, b, c)
}
: function(a, b, c) {
    for (var d = a.length, e = x(a) ? a.split("") : a, f = 0; f < d; f++)
        f in e && b.call(c, e[f], f, a)
    }, Ka = Ia.map ? function(a, b, c) {
    return Ia.map.call(a, b, c)
}
: function(a, b, c) {
    for (var d = a.length, e = Array(d), f =
    x(a) ? a.split("") : a, g = 0; g < d; g++)
        g in f && (e[g] = b.call(c, f[g], g, a));
    return e
}, La = Ia.some ? function(a, b, c) {
    return Ia.some.call(a, b, c)
}
: function(a, b, c) {
    for (var d = a.length, e = x(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a))
            return !0;
    return !1
}, Na = Ia.every ? function(a, b, c) {
    return Ia.every.call(a, b, c)
}
: function(a, b, c) {
    for (var d = a.length, e = x(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e&&!b.call(c, e[f], f, a))
            return !1;
    return !0
};
function Oa(a, b) {
    var c = Pa(a, b, void 0);
    return 0 > c ? null : x(a) ? a.charAt(c) : a[c]
}
function Pa(a, b, c) {
    for (var d = a.length, e = x(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a))
            return f;
    return -1
}
function Qa(a) {
    if (!v(a))
        for (var b = a.length-1; 0 <= b; b--)
            delete a[b];
    a.length = 0
}
function Ra(a, b) {
    var c = D(a, b), d;
    (d = 0 <= c) && Ia.splice.call(a, c, 1);
    return d
}
function Sa(a) {
    var b = a.length;
    if (0 < b) {
        for (var c = Array(b), d = 0; d < b; d++)
            c[d] = a[d];
        return c
    }
    return []
}
function Ta(a, b, c, d) {
    Ia.splice.apply(a, Ua(arguments, 1))
}
function Ua(a, b, c) {
    return 2 >= arguments.length ? Ia.slice.call(a, b) : Ia.slice.call(a, b, c)
}
function Va(a, b) {
    if (!w(a) ||!w(b) || a.length != b.length)
        return !1;
    for (var c = a.length, d = Wa, e = 0; e < c; e++)
        if (!d(a[e], b[e]))
            return !1;
    return !0
}
function Xa(a, b) {
    return a > b ? 1 : a < b?-1 : 0
}
function Wa(a, b) {
    return a === b
}
function Ya(a, b) {
    var c;
    c = Za || Xa;
    for (var d = 0, e = a.length, f; d < e;) {
        var g = d + e>>1, h;
        h = c(b, a[g]);
        0 < h ? d = g + 1 : (e = g, f=!h)
    }
    c = f ? d : ~d;
    0 > c && Ta(a, - (c + 1), 0, b)
};
function $a(a, b) {
    for (var c in a)
        b.call(void 0, a[c], c, a)
}
function ab(a, b) {
    for (var c = w(b), d = c ? b : arguments, c = c ? 0 : 1; c < d.length && (a = a[d[c]], u(a));
    c++);
    return a
}
var bb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function cb(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d)
            a[c] = d[c];
        for (var f = 0; f < bb.length; f++)
            c = bb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
};
var db = "StopIteration"in t ? t.StopIteration: Error("StopIteration");
function eb() {}
eb.prototype.a = function() {
    throw db;
};
eb.prototype.Ra = function() {
    return this
};
function fb(a) {
    if (a instanceof eb)
        return a;
    if ("function" == typeof a.Ra)
        return a.Ra(!1);
    if (w(a)) {
        var b = 0, c = new eb;
        c.a = function() {
            for (; ;) {
                if (b >= a.length)
                    throw db;
                if (b in a)
                    return a[b++];
                b++
            }
        };
        return c
    }
    throw Error("Not implemented");
}
function gb(a, b, c) {
    if (w(a))
        try {
            Ja(a, b, c)
    } catch (d) {
        if (d !== db)
            throw d;
    } else {
        a = fb(a);
        try {
            for (; ;)
                b.call(c, a.a(), void 0, a)
            } catch (e) {
            if (e !== db)
                throw e;
        }
    }
}
function hb(a) {
    if (w(a))
        return Sa(a);
    a = fb(a);
    var b = [];
    gb(a, function(a) {
        b.push(a)
    });
    return b
};
function ib(a, b) {
    this.b = {};
    this.a = [];
    var c = arguments.length;
    if (1 < c) {
        if (c%2)
            throw Error("Uneven number of arguments");
        for (var d = 0; d < c; d += 2)
            jb(this, arguments[d], arguments[d + 1])
    } else if (a) {
        var e;
        if (a instanceof ib)
            e = a.Ua(), d = a.qb();
        else {
            var c = [], f = 0;
            for (e in a)
                c[f++] = e;
                e = c;
                c = [];
                f = 0;
                for (d in a)
                    c[f++] = a[d];
                    d = c
        }
        for (c = 0; c < e.length; c++)
            jb(this, e[c], d[c])
    }
}
r = ib.prototype;
r.H = 0;
r.rb = 0;
r.qb = function() {
    kb(this);
    for (var a = [], b = 0; b < this.a.length; b++)
        a.push(this.b[this.a[b]]);
    return a
};
r.Ua = function() {
    kb(this);
    return this.a.concat()
};
r.clear = function() {
    this.b = {};
    this.rb = this.H = this.a.length = 0
};
function kb(a) {
    if (a.H != a.a.length) {
        for (var b = 0, c = 0; b < a.a.length;) {
            var d = a.a[b];
            Object.prototype.hasOwnProperty.call(a.b, d) && (a.a[c++] = d);
            b++
        }
        a.a.length = c
    }
    if (a.H != a.a.length) {
        for (var e = {}, c = b = 0; b < a.a.length;)
            d = a.a[b], Object.prototype.hasOwnProperty.call(e, d) || (a.a[c++] = d, e[d] = 1), b++;
        a.a.length = c
    }
}
function jb(a, b, c) {
    Object.prototype.hasOwnProperty.call(a.b, b) || (a.H++, a.a.push(b), a.rb++);
    a.b[b] = c
}
r.Da = function() {
    return new ib(this)
};
r.Ra = function(a) {
    kb(this);
    var b = 0, c = this.a, d = this.b, e = this.rb, f = this, g = new eb;
    g.a = function() {
        for (; ;) {
            if (e != f.rb)
                throw Error("The map has changed since the iterator was created");
            if (b >= c.length)
                throw db;
            var g = c[b++];
            return a ? g : d[g]
        }
    };
    return g
};
var lb, mb, nb, ob, pb;
function qb() {
    return t.navigator ? t.navigator.userAgent : null
}
pb = ob = nb = mb = lb=!1;
var rb;
if (rb = qb()) {
    var tb = t.navigator;
    lb = 0 == rb.indexOf("Opera");
    mb=!lb&&-1 != rb.indexOf("MSIE");
    ob = (nb=!lb&&-1 != rb.indexOf("WebKit"))&&-1 != rb.indexOf("Mobile");
    pb=!lb&&!nb && "Gecko" == tb.product
}
var ub = lb, vb = mb, wb = pb, xb = nb, yb = ob;
function zb() {
    var a = t.document;
    return a ? a.documentMode : void 0
}
var Ab;
a: {
    var Bb = "", Cb;
    if (ub && t.opera)
        var Db = t.opera.version, Bb = "function" == typeof Db ? Db(): Db;
    else if (wb ? Cb = /rv\:([^\);]+)(\)|;)/ : vb ? Cb = /MSIE\s+([^\);]+)(\)|;)/ : xb && (Cb = /WebKit\/(\S+)/), Cb)
        var Eb = Cb.exec(qb()), Bb = Eb ? Eb[1]: "";
    if (vb) {
        var Fb = zb();
        if (Fb > parseFloat(Bb)) {
            Ab = String(Fb);
            break a
        }
    }
    Ab = Bb
}
var Gb = {};
function Hb(a) {
    var b;
    if (!(b = Gb[a])) {
        b = 0;
        for (var c = String(Ab).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
            var g = c[f] || "", h = d[f] || "", k = RegExp("(\\d*)(\\D*)", "g"), n = RegExp("(\\d*)(\\D*)", "g");
            do {
                var m = k.exec(g) || ["", "", ""], p = n.exec(h) || ["", "", ""];
                if (0 == m[0].length && 0 == p[0].length)
                    break;
                b = ((0 == m[1].length ? 0 : parseInt(m[1], 10)) < (0 == p[1].length ? 0 : parseInt(p[1], 10))?-1 : (0 == m[1].length ? 0 : parseInt(m[1],
                10)) > (0 == p[1].length ? 0 : parseInt(p[1], 10)) ? 1 : 0) || ((0 == m[2].length) < (0 == p[2].length)?-1 : (0 == m[2].length) > (0 == p[2].length) ? 1 : 0) || (m[2] < p[2]?-1 : m[2] > p[2] ? 1 : 0)
            }
            while (0 == b)
            }
        b = Gb[a] = 0 <= b
    }
    return b
}
var Ib = t.document, Lb = Ib && vb ? zb() || ("CSS1Compat" == Ib.compatMode ? parseInt(Ab, 10) : 5): void 0;
function Mb(a) {
    return Nb(a || arguments.callee.caller, [])
}
function Nb(a, b) {
    var c = [];
    if (0 <= D(b, a))
        c.push("[...circular reference...]");
    else if (a && 50 > b.length) {
        c.push(Ob(a) + "(");
        for (var d = a.arguments, e = 0; e < d.length; e++) {
            0 < e && c.push(", ");
            var f;
            f = d[e];
            switch (typeof f) {
            case "object":
                f = f ? "object" : "null";
                break;
            case "string":
                break;
            case "number":
                f = String(f);
                break;
            case "boolean":
                f = f ? "true" : "false";
                break;
            case "function":
                f = (f = Ob(f)) ? f : "[fn]";
                break;
            default:
                f = typeof f
            }
            40 < f.length && (f = f.substr(0, 40) + "...");
            c.push(f)
        }
        b.push(a);
        c.push(")\n");
        try {
            c.push(Nb(a.caller, b))
        } catch (g) {
            c.push("[exception trying to get caller]\n")
        }
    } else 
        a ?
        c.push("[...long stack...]") : c.push("[end]");
    return c.join("")
}
function Ob(a) {
    if (Pb[a])
        return Pb[a];
    a = String(a);
    if (!Pb[a]) {
        var b = /function ([^\(]+)/.exec(a);
        Pb[a] = b ? b[1] : "[Anonymous]"
    }
    return Pb[a]
}
var Pb = {};
function Qb(a, b, c, d, e) {
    "number" == typeof e || Rb++;
    this.f = d || oa();
    this.e = a;
    this.d = b;
    this.c = c;
    delete this.b;
    delete this.a
}
Qb.prototype.b = null;
Qb.prototype.a = null;
var Rb = 0;
function Sb(a) {
    this.e = a
}
Sb.prototype.c = null;
Sb.prototype.b = null;
Sb.prototype.d = null;
Sb.prototype.a = null;
function Tb(a, b) {
    this.name = a;
    this.value = b
}
Tb.prototype.toString = l("name");
var Ub = new Tb("SHOUT", 1200), Vb = new Tb("SEVERE", 1E3), Wb = new Tb("WARNING", 900), Xb = new Tb("INFO", 800), Yb = new Tb("CONFIG", 700), Zb = new Tb("FINE", 500), $b = new Tb("FINER", 400), ac = new Tb("FINEST", 300), bc = [new Tb("OFF", Infinity), Ub, Vb, Wb, Xb, Yb, Zb, $b, ac, new Tb("ALL", 0)], cc = null;
Sb.prototype.getName = l("e");
function dc(a) {
    if (a.b)
        return a.b;
    if (a.c)
        return dc(a.c);
    Ha("Root logger has no level set.");
    return null
}
Sb.prototype.log = function(a, b, c) {
    if (a.value >= dc(this).value)
        for (a = this.f(a, b, c), b = "log:" + a.d, t.console && (t.console.timeStamp ? t.console.timeStamp(b) 
            : t.console.markTimeline && t.console.markTimeline(b)), t.msWriteProfilerMark && t.msWriteProfilerMark(b), b = this;
    b;
    ) {
        c = b;
        var d = a;
        if (c.a)
            for (var e = 0, f = void 0; f = c.a[e]; e++)
                f(d);
        b = b.c
    }
};
Sb.prototype.f = function(a, b, c) {
    var d = new Qb(a, String(b), this.e);
    if (c) {
        d.b = c;
        var e;
        var f = arguments.callee.caller;
        try {
            var g;
            var h = ca("window.location.href");
            if (x(c))
                g = {
                    message: c,
                    name: "Unknown error",
                    lineNumber: "Not available",
                    fileName: h,
                    stack: "Not available"
                };
            else {
                var k, n, m=!1;
                try {
                    k = c.lineNumber || c.gd || "Not available"
                } catch (p) {
                    k = "Not available", m=!0
                }
                try {
                    n = c.fileName || c.filename || c.sourceURL || t.$googDebugFname || h
                } catch (q) {
                    n = "Not available", m=!0
                }
                g=!m && c.lineNumber && c.fileName && c.stack ? c : {
                    message: c.message,
                    name: c.name,
                    lineNumber: k,
                    fileName: n,
                    stack: c.stack || "Not available"
                }
            }
            e = "Message: " + ua(g.message) + '\nUrl: <a href="view-source:' + g.fileName + '" target="_new">' + g.fileName + "</a>\nLine: " + g.lineNumber + "\n\nBrowser stack:\n" + ua(g.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + ua(Mb(f) + "-> ")
        } catch (s) {
            e = "Exception trying to expose exception! You win, we lose. " + s
        }
        d.a = e
    }
    return d
};
function ec(a, b) {
    a.log(Vb, b, void 0)
}
function E(a, b) {
    a.log(Wb, b, void 0)
}
function fc(a, b) {
    a.log(Zb, b, void 0)
}
function F(a, b) {
    a.log($b, b, void 0)
}
function G(a, b) {
    a.log(ac, b, void 0)
}
var gc = {}, hc = null;
function ic() {
    hc || (hc = new Sb(""), gc[""] = hc, hc.b = Yb)
}
function jc() {
    ic();
    return hc
}
function I(a) {
    ic();
    var b;
    if (!(b = gc[a])) {
        b = new Sb(a);
        var c = a.lastIndexOf("."), d = a.substr(c + 1), c = I(a.substr(0, c));
        c.d || (c.d = {});
        c.d[d] = b;
        b.c = c;
        gc[a] = b
    }
    return b
};
function kc(a) {
    return function() {
        throw a;
    }
}; /*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
function J(a, b) {
    this.e = [];
    this.C = b || null
}
r = J.prototype;
r.Ta=!1;
r.Va=!1;
r.Ob=!1;
r.Dc=!1;
r.qc=!1;
r.gc = 0;
r.ic = function(a, b) {
    this.Ob=!1;
    lc(this, a, b)
};
function lc(a, b, c) {
    a.Ta=!0;
    a.i = c;
    a.Va=!b;
    mc(a)
}
function nc(a) {
    if (a.Ta) {
        if (!a.qc)
            throw new oc;
        a.qc=!1
    }
}
r.D = function(a) {
    nc(this);
    lc(this, !0, a)
};
r.A = function(a) {
    nc(this);
    lc(this, !1, a)
};
r.$ = function(a, b) {
    return this.aa(a, null, b)
};
r.dc = function(a, b) {
    return this.aa(null, a, b)
};
r.Ba = function(a, b) {
    return this.aa(a, a, b)
};
r.aa = function(a, b, c) {
    this.e.push([a, b, c]);
    this.Ta && mc(this);
    return this
};
r.Ic = function(a) {
    var b = new J;
    this.aa(b.D, b.A, b);
    a && (b.f = this, this.gc++);
    return b
};
function pc(a) {
    return La(a.e, function(a) {
        return fa(a[1])
    })
}
function mc(a) {
    a.n && a.Ta && pc(a) && (t.clearTimeout(a.n), delete a.n);
    a.f && (a.f.gc--, delete a.f);
    for (var b = a.i, c=!1, d=!1; a.e.length&&!a.Ob;) {
        var e = a.e.shift(), f = e[0], g = e[1], e = e[2];
        if (f = a.Va ? g : f)
            try {
                var h = f.call(e || a.C, b);
                u(h) && (a.Va = a.Va && (h == b || h instanceof Error), a.i = b = h);
                b instanceof J && (d=!0, a.Ob=!0)
            } catch (k) {
            b = k, a.Va=!0, pc(a) || (c=!0)
        }
    }
    a.i = b;
    d && (b.aa(ma(a.ic, a, !0), ma(a.ic, a, !1)), b.Dc=!0);
    c && (a.n = t.setTimeout(kc(b), 0))
}
function qc(a) {
    var b = new J;
    b.D(a);
    return b
}
function rc(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, rc) : this.stack = Error().stack || "";
    a && (this.message = String(a))
}
C(rc, Error);
function oc() {
    rc.call(this)
}
C(oc, rc);
oc.prototype.message = "Deferred has already fired";
oc.prototype.name = "AlreadyCalledError";
var sc = {
    READ_ONLY: "readonly",
    READ_WRITE: "readwrite",
    VERSION_CHANGE: "versionchange"
}, tc = t.IDBRequest && "LOADING"in t.IDBRequest ? t.IDBTransaction: t.webkitIDBRequest && "LOADING"in t.webkitIDBRequest && 1 === t.webkitIDBTransaction.READ_WRITE ? t.webkitIDBTransaction: sc, uc = tc.READ_ONLY, K = tc.READ_WRITE, vc = tc.VERSION_CHANGE, wc = t.indexedDB || t.mozIndexedDB || t.webkitIndexedDB || t.moz_indexedDB || t.msIndexedDB;
function xc(a, b) {
    var c, d;
    2 == arguments.length && x(arguments[1]) ? (c=!0, d = arguments[1].split(".")) : d = (c = w(b)) ? b : arguments;
    for (c = c ? 0 : 1; c < d.length && (a = a[d[c]], u(a));
    c++);
    return a
}
function yc(a, b, c) {
    if (a)
        if (-1 == b.indexOf("."))
            a[b] = c;
        else {
            b = b.split(".");
            for (var d = b.pop(), e; e = b.shift();)
                B(a[e]) || (a[e] = {}), a = a[e];
                a[d] = c
        }
}
var zc = {};
function Ac(a) {
    a = [a];
    for (var b = new Bc, c = 0, d, e; void 0 !== (e = a.pop());) {
        0 === c%4 && 12 < c + 4 && (b.write(c), c = 0);
        d = typeof e;
        if (e instanceof Array)
            if (c += 4, 0 < e.length) {
                a.push(zc);
                for (d = e.length; d--;)
                    a.push(e[d]);
                    continue
            } else 
                b.write(c);
        else if ("number" === d)
            c += 1, b.write(c), Cc(b, e);
        else if (e instanceof Date)
            c += 2, b.write(c), Cc(b, e.valueOf());
        else if ("string" === d) {
            c += 3;
            b.write(c);
            c = b;
            for (d = 0; d < e.length; d++) {
                var f = e.charCodeAt(d);
                126 >= f ? c.write(f + 1) : 16510 >= f ? (f -= 127, c.write(128 | f>>8, f & 255)) : c.write(192 | f>>10, f>>
                2 | 255, (f | 3)<<6)
            }
            c.write(0)
        } else if (e === zc)
            b.write(0);
        else 
            return "";
        c = 0
    }
    return b.trim().toString()
}
function Dc(a) {
    for (var b = [], c = b, d = [], e, f, g = new Ec(a); null != Fc(g);)
        if (0 === g.a)
            c = d.pop();
        else {
            if (null === g.a)
                break;
                do {
                    e = g.a / 4 | 0;
                    a = g.a%4;
                    for (var h = 0; h < e; h++)
                        f = [], c.push(f), d.push(c), c = f;
                        if (0 === a && 12 < g.a + 4)
                            Fc(g);
                        else 
                            break
                }
                while (1);
                1 === a ? c.push(Gc(g)) : 2 === a ? c.push(new Date(Gc(g))) : 3 === a ? c.push(Hc(g)) : 0 === a && (c = d.pop())
        }
    return b[0]
}
function Cc(a, b) {
    var c, d, e;
    c = b;
    var f = e = d = 0;
    if (0 !== c)
        if (isFinite(c)) {
            0 > c && (d = 1, c =- c);
            f = 0;
            if (2.2250738585072014E-308 <= c) {
                for (e = c; 1 > e;)
                    f--, e*=2;
                    for (; 2 <= e;)
                        f++, e/=2;
                        e = f + 1023
            }
            f = e ? Math.floor(4503599627370496 * (c / Math.pow(2, f)-1)) : Math.floor(c / 4.9E-324)
        } else 
            e = 2047, isNaN(c) ? f = 0x8000000000000 : - Infinity === c && (d = 1);
    c = d;
    d = e;
    e = f;
    c && (e = 0xfffffffffffff - e, d = 2047 - d);
    a.write((c ? 0 : 128) | d>>4);
    a.write((d & 15)<<4 | 0 | e / 281474976710656);
    e%=281474976710656;
    c = 0 | e / 4294967296;
    a.write(c>>8, c & 255);
    e%=4294967296;
    c = 0 | e / 65536;
    a.write(c>>
    8, c & 255);
    c = e%65536;
    a.write(c>>8, c & 255)
}
function Gc(a) {
    var b = Fc(a) | 0, c = b>>7?!1 : !0, d = c?-1 : 1, e = (b & 127)<<4, b = Fc(a) | 0, e = e + (b>>4);
    c && (e = 2047 - e);
    for (var b = [c ? 15 - (b & 15): b & 15], f = 6; f--;)
        b.push(c ? 255 - (Fc(a) | 0) : Fc(a) | 0);
    a = 0;
    for (f = 7; f--;)
        a = a / 256 + b[f];
    a/=16;
    return 0 === a && 0 === e ? 0 : (a + 1) * Math.pow(2, e-1023) * d
}
function Hc(a) {
    for (var b = [], c = 0, d = 0, e = 0, f, g; ;) {
        f = Fc(a);
        if (0 === f || null == f)
            break;
        0 === c ? (g = f>>6, 2 > g&&!isNaN(f) ? b.push(String.fromCharCode(f-1)) : (c = g, d = f<<10, e++)) : 2 === c ? (b.push(String.fromCharCode(d + f + 127)), c = d = e = 0) : 2 === e ? (d += f<<2, e++) : (b.push(String.fromCharCode(d | f>>6)), c = d = e = 0)
    }
    return b.join("")
}
function Ec(a) {
    this.a = null;
    this.b = a;
    this.c = this.b.length-1;
    this.index =- 1
}
function Fc(a) {
    return a.a = a.index < a.c ? parseInt(a.b[++a.index] + a.b[++a.index], 16) : null
}
function Bc() {
    this.a = [];
    this.b = void 0
}
Bc.prototype.write = function(a) {
    for (var b = 0; b < arguments.length; b++)
        this.b = arguments[b].toString(16), this.a.push(2 === this.b.length ? this.b : this.b = "0" + this.b)
};
Bc.prototype.trim = function() {
    for (var a = this.a.length; "00" === this.a[--a];);
    this.a.length=++a;
    return this
};
Bc.prototype.toString = function() {
    return this.a.length ? this.a.join("") : ""
};
function Ic(a, b) {
    var c = Ac(a), d = Ac(b);
    return c > d ? 1 : c == d ? 0 : -1
};
var M = wc && wc.cmp ? ma(wc.cmp, wc): Ic;
function N(a) {
    qa.call(this, a);
    this.name = "ydn.error.ArgumentException"
}
C(N, qa);
function Jc(a) {
    qa.call(this, a);
    this.name = "ydn.error.NotSupportedException"
}
C(Jc, qa);
function Kc(a) {
    qa.call(this, a);
    this.name = "ydn.error.NotImplementedException"
}
C(Kc, qa);
function Lc(a) {
    qa.call(this, a);
    this.name = "ydn.error.InvalidOperationException"
}
C(Lc, qa);
function Mc(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, Mc) : this.stack = Error().stack || "";
    a && (this.message = String(a));
    this.name = "ydn.error.InternalError"
}
C(Mc, Error);
Mc.prototype.name = "ydn.error.InternalError";
function Nc(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, Oc) : this.stack = Error().stack || "";
    a && (this.message = String(a));
    this.name = "ydn.error.ConstraintError"
}
C(Nc, Error);
Nc.prototype.name = "ydn.error.ConstraintError";
I("ydn.db.Cursor");
function O(a, b, c, d) {
    this.lower = a;
    this.upper = b;
    this.lowerOpen=!!c;
    this.upperOpen=!!d;
    fa(Object.freeze) && Object.freeze(this)
}
O.prototype.lower = void 0;
O.prototype.upper = void 0;
O.prototype.toJSON = function() {
    return Pc(this)
};
function Qc(a) {
    return Rc(a)
}
O.only = function(a) {
    return new O(a, a, !1, !1)
};
O.bound = function(a, b, c, d) {
    return new O(a, b, c, d)
};
O.upperBound = function(a, b) {
    return new O(void 0, a, void 0, !!b)
};
O.lowerBound = function(a, b) {
    return new O(a, void 0, !!b, void 0)
};
function Sc(a) {
    var b;
    if (v(a))
        b = Sa(a), b.push("\uffff");
    else if (x(a))
        b = a + "\uffff";
    else 
        throw new N;
    return O.bound(a, b, !1, !0)
}
function Pc(a) {
    a = a || {};
    return {
        lower: a.lower,
        upper: a.upper,
        lowerOpen: a.lowerOpen,
        upperOpen: a.upperOpen
    }
}
function Rc(a) {
    return null != a ? null != a.upper && null != a.lower ? Tc.bound(a.lower, a.upper, !!a.lowerOpen, !!a.upperOpen) : null != a.upper ? Tc.upperBound(a.upper, a.upperOpen) : null != a.lower ? Tc.lowerBound(a.lower, a.lowerOpen) : null : null
}
function Uc(a) {
    if (a instanceof O)
        return "";
    if (null != a) {
        if (B(a)) {
            for (var b in a)
                if (a.hasOwnProperty(b)&&!(0 <= D(["lower", "upper", "lowerOpen", "upperOpen"], b)))
                    return 'invalid attribute "' + b + '" in key range object';
            return ""
        }
        return "key range must be an object"
    }
    return ""
}
O.prototype.Nb = function(a) {
    var b = this.lower, c = this.upper, d = this.lowerOpen, e = this.upperOpen;
    null != a.lower && (null == this.lower || a.lower >= this.lower) && (b = a.lower, d = a.lowerOpen || this.lowerOpen);
    null != a.upper && (null == this.upper || a.upper <= this.upper) && (c = a.upper, e = a.upperOpen || this.upperOpen);
    return O.bound(b, c, d, e)
};
function Vc(a) {
    if (!a)
        return "";
    var b = a.lowerOpen ? "(": "[";
    null != a.lower && (b += a.lower + ", ");
    null != a.upper && (b += a.upper);
    return b += a.upperOpen ? ")" : "]"
}
function Wc(a, b, c, d, e) {
    if (c)
        if (c.lowerOpen || c.upperOpen || null == c.lower || null == c.upper || 0 !== M(c.lower, c.upper)) {
            if (null != c.lower) {
                var f = c.lowerOpen ? " > ": " >= ";
                d.push(a + f + "?");
                e.push(Xc(c.lower, b))
            }
            null != c.upper && (f = c.upperOpen ? " < " : " <= ", d.push(a + f + "?"), e.push(Xc(c.upper, b)))
        } else 
            d.push(a + " = ?"), e.push(Xc(c.lower, b))
}
function Yc(a, b, c, d) {
    var e, f, g, h;
    if ("^" == a)
        return Sc(b);
    if ("<" == a || "<=" == a)
        e = b, g = "<" == a;
    else if (">" == a || ">=" == a)
        f = b, h = ">" == a;
    else if ("=" == a || "==" == a)
        e = f = b;
    else 
        throw new N("invalid op: " + a);
    if ("<" == c || "<=" == c)
        e = d, g = "<" == c;
    else if (">" == c || ">=" == c)
        f = d, h = ">" == c;
    else if (u(c))
        throw new N("invalid op2: " + c);
    return O.bound(f, e, h, g)
}
var Tc = t.IDBKeyRange || t.webkitIDBKeyRange || O;
function Zc(a, b, c, d, e) {
    if (!(b instanceof O))
        if (x(b) && u(c))
            b = Yc(b, c, d, e);
        else if (null != b) {
            if (!(b instanceof O))
                if (B(b))
                    b = new O(b.lower, b.upper, b.lowerOpen, b.upperOpen);
                else 
                    throw new N("Invalid key range: " + b + " of type " + typeof b);
        } else 
            b = null;
    this.a = b;
    this.za = a
}
Zc.prototype.za = "";
Zc.prototype.Nb = function(a) {
    if (this.za != a.za)
        return null;
    a = null != this.a && null != a.a ? this.a.Nb(a.a) : this.a || a.a;
    return new Zc(this.za, a)
};
function P(a, b, c, d, e, f, g) {
    if (!x(a))
        throw new TypeError("store name");
    this.f = a;
    this.d = b;
    this.i = g;
    this.c=!!this.d;
    if (u(d)&&!ea(d))
        throw new N("reverse value must be a boolean, but " + typeof d + " found");
    if (u(e)&&!ea(e))
        throw new N("unique value must be a boolean, but " + typeof e + " found");
    if (u(f)&&!ea(f))
        throw new N("key_only value must be a boolean, but " + typeof f + " found");
    this.a = u(f) ? f : !!x(this.d);
    a = "next";
    d && e ? a = "prevunique" : d ? a = "prev" : e && (a = "nextunique");
    this.n = a;
    if (d = Uc(c))
        throw new N("Invalid key range: " +
        d);
    this.b = Rc(c);
    this.e = $c
}
P.prototype.a=!0;
function ad(a, b, c) {
    if (3 < arguments.length)
        throw new N("too many argument");
    P.call(this, a, void 0, b, c, void 0, !0)
}
C(ad, P);
function bd(a, b, c, d, e) {
    if (!x(b))
        throw new N("index name must be string");
    P.call(this, a, b, c, d, e, !0)
}
C(bd, P);
function cd(a, b, c) {
    if (3 < arguments.length)
        throw new N("too many argument");
    P.call(this, a, void 0, b, c, void 0, !1)
}
C(cd, P);
function dd(a, b, c, d, e) {
    return new cd(a, Yc(b, c, d, e))
}
function ed(a, b, c, d, e) {
    if (!x(b))
        throw new N("index name must be string");
    P.call(this, a, b, c, d, e, !1)
}
C(ed, P);
function fd(a, b, c, d, e, f) {
    return new ed(a, b, Yc(c, d, e, f))
}
var $c = "init";
r = P.prototype;
r.Sc = I("ydn.db.Iterator");
r.h = l("f");
r.O = l("d");
r.kc = l("b");
r.Ja = function() {
    return this.b ? this.b instanceof Tc ? this.b : Tc.bound(this.b.lower, this.b.upper, this.b.lowerOpen, this.b.upperOpen) : null
};
r.Rc = l("a");
r.Jc = l("c");
r.Da = function() {
    return new P(this.f, this.d, this.b, this.V(), this.W(), this.a, this.i)
};
r.unique = function(a) {
    return new P(this.f, this.d, this.b, this.V(), a, this.a, this.i)
};
function gd(a) {
    return new P(a.f, a.d, a.b, a.V(), a.W(), a.a, a.i)
}
r.toJSON = function() {
    return {
        store: this.f,
        index: this.d,
        keyRange: this.b ? Pc(this.b): null,
        direction: this.n
    }
};
r.toString = function() {
    var a = u(this.i) ? ":" + this.i.join(","): u(this.d) ? ":" + this.d: "", a = a + Vc(this.b);
    this.e != $c && (a += this.e + "{" + this.o, this.c && (a += ", " + this.B), a += "}");
    var b = this.c ? "Index": "", b = b + (this.a ? "Key" : "Value");
    return b + "Iterator:" + this.f + a
};
r.Tc = function() {
    new P(this.f, this.d, this.b, this.V(), this.W(), this.a, this.i);
    throw Error("not possible");
};
r.tc = function() {
    return new P(this.f, this.d, this.b, !this.V(), this.W(), this.a, this.i)
};
r.V = function() {
    return "prev" === this.n || "prevunique" === this.n
};
r.W = function() {
    return "nextunique" === this.n || "prevunique" === this.n
};
r.Hc = l("e");
function hd(a, b) {
    b.$b(a.f, a.i || a.d, a.b, a.n, a.a);
    a.e = "busy";
    b.wb = function(b, d, e) {
        a.o = d;
        a.B = e;
        a.e = b ? "rest" : "done"
    };
    b.Gb(a.o, a.B)
}
r.Qc = l("o");
r.q = l("B");
r.Cb = function(a, b, c) {
    a = a || $c;
    "busy" == this.e ? E(this.Sc, this + ": resetting state to " + a + " ignore during iteration") : (this.o = b, this.B = c, this.e = a)
};
r.stores = function() {
    var a = [this.f];
    if (this.C)
        for (var b = 0; b < this.C.length; b++)
            0 <= D(a, this.C[b].a) || a.push(this.C[b].a);
    return a
};
function id(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, id) : this.stack = Error().stack || "";
    a && (this.message = String(a));
    this.name = "ConstraintError"
}
C(id, Error);
id.prototype.name = "ConstraintError";
function jd(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, jd) : this.stack = Error().stack || "";
    a && (this.message = String(a));
    this.name = "ydn.db.InvalidKeyException"
}
C(jd, Error);
function kd(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, kd) : this.stack = Error().stack || "";
    a && (this.message = String(a));
    this.name = "ydn.db.VersionError"
}
C(kd, Error);
kd.prototype.name = "ydn.db.VersionError";
function ld(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, ld) : this.stack = Error().stack || "";
    a && (this.message = String(a))
}
C(ld, Error);
ld.prototype.name = "ydn.db.InternalError";
function md(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, md) : this.stack = Error().stack || "";
    a && (this.message = String(a));
    this.name = "InvalidStateError"
}
C(md, Error);
function nd(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, nd) : this.stack = Error().stack || "";
    a && (this.message = String(a));
    this.name = "InvalidAccessError"
}
C(nd, Error);
function od(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, od) : this.stack = Error().stack || "";
    a && (this.message = String(a));
    this.name = "NotFoundError"
}
C(od, Error);
od.prototype.name = "NotFoundError";
function pd(a, b) {
    Error.captureStackTrace ? Error.captureStackTrace(this, pd) : this.stack = Error().stack || "";
    b && (this.message = String(b));
    this.message += " :" + a.message + " [" + a.code + "]";
    this.name = "SQLError"
}
C(pd, Error);
function qd(a, b) {
    Error.captureStackTrace ? Error.captureStackTrace(this, qd) : this.stack = Error().stack || "";
    b && (this.message = String(b));
    this.message += " :" + a.message;
    this.name = "SecurityError"
}
C(qd, Error);
function rd(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, rd) : this.stack = Error().stack || "";
    a && (this.message = String(a));
    this.name = "ydn.db.SqlParseError"
}
C(rd, Error);
function sd(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, sd) : this.stack = Error().stack || "";
    a && (this.message = String(a));
    this.name = "ydn.db.TimeoutError"
}
C(sd, Error);
function td(a, b, c) {
    var d;
    if (B(a))
        d = a.store, b = a.id, null != a.parent && (c = new td(a.parent));
    else if (u(b))
        d = a;
    else if (d = a.lastIndexOf("^|"), b = a, 0 < d && (b = a.substr(d)
        , c = new td(a.substring(0, d))), b = b.split("^:"), d = b[0], b = b[1], !u(b))throw Error("Invalid key value: " + a);
    this.a = d;
    this.id = b;
    this.parent = c || null
}
r = td.prototype;
r.toJSON = function() {
    var a = {
        store: this.a,
        id: this.id
    };
    this.parent && (a.parent = this.parent.toJSON());
    return a
};
r.valueOf = function() {
    return (this.parent ? this.parent.valueOf() + "^|" : "") + this.a + "^:" + this.id
};
r.toString = function() {
    return this.valueOf().replace("^|", "|").replace("^:", ":")
};
r.h = l("a");
r.Uc = l("id");
r.Vc = l("parent");
function ud(a) {
    return y(a) || x(a) || v(a) && Na(a, ud) || a instanceof Date
}
function vd(a) {
    if (w(a)) {
        for (var b = [], c = 0, d = a.length; c < d; c++)
            b[c] = a[c];
        return b
    }
    return a
};
function wd(a, b) {
    this.ta = a;
    this.a = b
}
wd.prototype.g = I("ydn.db.crud.req.RequestExecutor");
wd.prototype.ta = "";
wd.prototype.toString = ba("RequestExecutor");
function xd(a, b, c, d) {
    if ("transaction"in a)
        this.n = a, this.e = this.i = null;
    else if ("objectStore"in a) {
        if (this.n = null, this.i = a.db, this.e = a, !this.e.db.objectStoreNames.contains(b)
            )throw new yd('store "' + b + '" not in transaction.');
    } else 
        throw new yd("storage instance require.");
    this.o = b;
    this.B = c;
    this.C = d;
    this.c = [];
    this.b = 0;
    this.f=!1
}
xd.prototype.a = I("ydn.db.con.IdbCursorStream");
xd.prototype.f=!1;
xd.prototype.c = [];
function zd(a, b) {
    a.b++;
    b.onsuccess = function(b) {
        if (b = b.target.result) {
            if (fa(a.C)) {
                var d = b.value;
                a.C(b.primaryKey, null != a.B ? d[a.B] : d)
            } else 
                E(a.a, "sink gone, dropping value for: " + b.primaryKey);
            if (b && 0 < a.c.length)
                b["continue"](a.c.shift());
            else 
                a.b--, 0 == a.b && a.la && a.la()
        }
    };
    b.onerror = function() {
        E(a.a, "seeking fail. " + ("error"in b ? b.error.name + ":" + b.error.message : ""));
        a.b--;
        0 == a.b && a.la && a.la()
    }
}
function Ad(a, b) {
    0 == a.c.length && 0 == a.b ? b() : a.la = b
}
function Bd(a) {
    if (!a.f) {
        var b = function(b, c) {
            a.e = null;
            "complete" !== b && E(a.a, c.name + ":" + c.message);
            G(a.a, a + " transaction " + b)
        }, c = function(b) {
            var c = a.c.shift();
            G(a.a, a + " transaction started for " + c);
            b = b.objectStore(a.o);
            zd(a, b.openCursor(c))
        };
        if (a.e)
            G(a.a, a + " using existing tx."), c(a.e);
        else if (a.i)
            G(a.a, a + " creating tx from IDBDatabase."), a.d = a.i.transaction([a.o], uc), a.d.oncomplete = function(a) {
            b("complete", a)
        }, a.d.onerror = function(a) {
            b("error", a)
        }, a.d.onabort = function(a) {
            b("abort", a)
        };
        else if (a.n)
            G(a.a,
            a + " creating tx from ydn.db.con.IStorage."), a.f=!0, a.n.Ma(function(b) {
            a.f=!1;
            c(b)
        }, [a.o], uc, b);
        else 
            throw new Cd("no way to create a transaction provided.");
    }
};
function Dd(a, b, c) {
    if (a && a instanceof Ed)
        this.eb = a, this.pa = null;
    else if (a && a.db)
        if (this.eb = null, a.db)
            this.pa = new xd(a, this.a, this.Ka, ma(this.la, this));
        else 
            throw new N("Invalid IndexedDB Transaction.");
    else 
        throw new N("ydn.db.Streamer: First argument requires storage or transaction instance required.");
    if (!x(b))
        throw new N("a store name required.");
    this.a = b;
    if (u(c)&&!x(c))
        throw new N("index name must be a string.");
    this.Ka = c;
    this.pa = null;
    this.ka = [];
    this.xa = [];
    this.Wa=!1
}
I("ydn.db.Streamer");
r = Dd.prototype;
r.eb = null;
r.l = null;
r.Yb = null;
r.xa = [];
r.ka = [];
r.pa = null;
r.Pc = function(a) {
    this.Yb = a
};
function Fd(a) {
    var b = 0 < a.ka.length;
    if (b&&!a.Wa && fa(a.Yb)) {
        var c = function() {
            Fd(a)
        }, d = a.xa.shift(), e = a.ka.shift(), b = 0 < a.ka.length, c = a.Yb(d, e, b ? c : null);
        b&&!c && Fd(a)
    }
}
r.Wa=!1;
r.ad = function(a) {
    if (this.pa) {
        this.Wa=!0;
        var b = this;
        Ad(this.pa, function() {
            a(b.xa, b.ka);
            b.xa = [];
            b.ka = [];
            b.Wa=!1
        })
    } else 
        a(this.xa, this.ka), this.xa = [], this.ka = []
};
r.la = function(a, b) {
    this.xa.push(a);
    this.ka.push(b);
    Fd(this)
};
r.push = function(a, b) {
    if (this.Wa)
        throw new Hd("push not allowed after a collection is started");
    if (2 <= arguments.length)
        this.la(a, b);
    else {
        if (!this.pa) {
            if (!this.eb)
                throw new Hd("Database is not setup.");
            var c = this.eb.qa();
            if (c)
                if ("indexeddb" === c)
                    this.pa = new xd(this.eb, this.a, this.Ka, ma(this.la, this));
                else 
                    throw new Id(c);
            else 
                throw new Hd("Database is not connected.");
        }
        c = this.pa;
        c.c.push(a);
        Bd(c)
    }
};
r.h = l("a");
r.O = l("Ka");
r.toString = function() {
    return "Streamer:" + this.a + (this.Ka || "")
};
function Jd() {
    0 != Kd && ga(this)
}
var Kd = 0;
function Ld(a, b, c, d) {
    Jd.call(this);
    this.a = c;
    this.Ya = c.getName();
    this.e = void 0;
    this.b=!1;
    this.r = null;
    this.d = a;
    this.Mc = b;
    this.H = 0;
    this.Ga = this.va=!1;
    this.B = d || 4;
    this.oa = this.J = this.F = void 0;
    this.i = function() {
        throw new Mc;
    };
    this.n = function() {
        throw new Mc;
    };
    this.wb = aa()
}
C(Ld, Jd);
r = Ld.prototype;
r.$b = function(a, b, c, d, e) {
    u(b) && (this.e = this.a.O(b));
    this.b = x(this.e);
    this.r = c || null;
    this.H = 0;
    this.Ga = this.va=!1;
    this.u = "prev" == d || "prevunique" == d;
    this.unique = "nextunique" == d || "prevunique" == d;
    this.ea = d;
    this.Xa = e;
    this.oa = this.J = this.F = void 0
};
r.ea = "";
r.r = null;
r.unique=!1;
r.u=!1;
r.Xa=!0;
r.L = I("ydn.db.core.req.AbstractCursor");
r.ac = function(a) {
    this.n(a);
    Md(this);
    this.va=!0
};
r.ca = function(a, b, c) {
    null == a && (F(this.L, this + " finished."), this.va=!0);
    this.F = a;
    this.J = b;
    this.oa = c;
    this.H++;
    this.va ? (G(this.L, this + " DONE."), this.i(), Md(this)) : (G(this.L, this + " new cursor position {" + (this.b ? this.F + ", " + this.J : this.F) + "}"), this.i(this.F))
};
r.toString = function() {
    return "Cursor:" + this.Ya + (u(this.e) ? ":" + this.e : "") + "[" + (this.d ? "" : "~") + this.Mc + "]"
};
function Md(a) {
    null != a.J ? a.J = vd(a.J) : a.J = void 0;
    null != a.F ? a.F = vd(a.F) : a.F = void 0;
    a.wb(a.Ga, a.F, a.J)
}
function Nd(a) {
    a.Ga=!0;
    G(a.L, a + ": exit");
    Md(a)
}
r.dd = l("F");
r.q = function() {
    return this.b ? this.J : this.F
};
r.I = function() {
    return this.Xa ? this.q() : this.oa
};
r.hb = aa();
r.Na = aa();
function Od(a, b, c) {
    G(a.L, a + " restarting");
    a.va=!1;
    a.Ga=!1;
    a.Gb(c, b)
};
function Pd(a, b) {
    if (null != a&&!("push"in a))
        throw new yd;
    this.a = a || null;
    this.f = b;
    this.e = 0
}
Pd.prototype.i = I("ydn.db.algo.AbstractSolver");
Pd.prototype.a = null;
Pd.prototype.b = function(a) {
    if (!v(a))
        throw new TypeError("iterators must be array");
    if (2 > a.length)
        throw new RangeError("ZigzagMerge require at least 2 iterators, but  only " + a.length + " found.");
    for (var b = 0; b < a.length; b++)
        if (!(a[b]instanceof P))
            throw new TypeError("item at iterators " + b + " is not an iterator.");
    return !1
};
function Qd(a, b, c) {
    var d, e = null != d;
    if (!u(d)) {
        d = c[0];
        for (var e = null != d, f = 1; e && f < c.length; f++)
            null != c[f] && 0 == M(c[f], d) || (e=!1)
    }
    return e && (a.e++, a.a && a.a.push(d), u(a.f) && a.e >= a.f) ? [] : b
}
Pd.prototype.c = function() {
    return []
};
function Rd(a, b, c, d) {
    Ld.call(this, a, b, c, d);
    this.c = null
}
C(Rd, Ld);
r = Rd.prototype;
r.L = I("ydn.db.core.req.IDBCursor");
r.mb = function(a) {
    (a = a.target.result) ? this.ca(a.key, a.primaryKey, a.value) : this.ca()
};
r.Gb = function(a, b) {
    function c(a, b, c) {
        p.c = m;
        p.c.onsuccess = ma(p.mb, p);
        p.ca(a, p.b ? b : void 0, c);
        m = null
    }
    var d = this + " opening ";
    null != a && (d += "{" + a, d = null != b ? d + (";" + b + "}") : d + "}");
    G(this.L, d);
    var e = this.r, d = this.d.objectStore(this.Ya), f = x(this.e) ? d.index(this.e): null;
    if (u(a))
        var g = f?!u(b) : !0, h = e ? e.lower : void 0, k = e ? e.upper : void 0, n = e?!!e.lowerOpen : !1, e = e?!!e.upperOpen : !1, e = Qc(this.u ? new O(h, a, n, g) : new O(a, k, g, e));
    var m;
    m = this.Xa ? f ? null != this.ea ? f.openKeyCursor(e, this.ea) : null != e ? f.openKeyCursor(e) : f.openKeyCursor() :
    null != this.ea ? d.openCursor(e, this.ea) : null != e ? d.openCursor(e) : d.openCursor() : f ? null != this.ea ? f.openCursor(e, this.ea) : null != e ? f.openCursor(e) : f.openCursor() : null != this.ea ? d.openCursor(e, this.ea) : null != e ? d.openCursor(e) : d.openCursor();
    var p = this;
    m.onerror = function(a) {
        var b = m.error;
        a.preventDefault();
        p.ac(b)
    };
    null != a ? m.onsuccess = function(d) {
        if (d = d.target.result) {
            var e = wc.cmp(d.key, a), f = p.u?-1 : 1;
            if (e == f)
                c(d.key, d.primaryKey, d.value);
            else if (e==-f)
                d["continue"](a);
            else if (null != b)
                if (wc.cmp(d.primaryKey,
                b) == f)
                    c(d.key, d.primaryKey, d.value);
                else 
                    d["continue"]();
            else 
                d["continue"]()
        } else 
            c()
    } : (p.c = m, p.c.onsuccess = ma(p.mb, p))
};
r.sb = function() {
    return !!this.c
};
r.update = function(a) {
    var b = this.c.result;
    if (b) {
        var c = new J;
        a = b.update(a);
        a.onsuccess = function(a) {
            c.D(a.target.result)
        };
        a.onerror = function(a) {
            a.preventDefault();
            c.A(a)
        };
        return c
    }
    throw new nd("cursor gone");
};
r.clear = function() {
    var a = this.c.result;
    if (a) {
        var b = new J, a = a["delete"]();
        a.onsuccess = function() {
            b.D(1)
        };
        a.onerror = function(a) {
            a.preventDefault();
            b.A(a)
        };
        return b
    }
    throw new nd("cursor gone");
};
r.advance = function(a) {
    var b = this.c.result;
    if (1 == a)
        b["continue"]();
    else 
        b.advance(a)
};
r.hb = function(a) {
    var b = this.c.result, c = wc.cmp(a, b.primaryKey);
    if (1 != c)
        throw new Mc('continuing primary key "' + a + '" must higher than current primary key "' + b.primaryKey + '"');
    var d = this;
    this.c.onsuccess = function(e) {
        if (b = e.target.result)
            if (c = wc.cmp(b.primaryKey, a), 0 == c || 1 == c&&!d.u||-1 == c && d.u)
                d.c.onsuccess = ma(d.mb, d), d.ca(b.key, d.b ? b.primaryKey : void 0, b.value);
        else 
            b["continue"]();
            else 
                d.c.onsuccess = ma(d.mb, d), d.ca()
    };
    b["continue"]()
};
r.Na = function(a) {
    var b = this.c.result;
    if (null != a)
        b["continue"](a);
    else 
        b["continue"]()
};
r.toString = function() {
    return "IDB" + Rd.G.toString.call(this)
};
function yd(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, yd) : this.stack = Error().stack || "";
    a && (this.message = String(a));
    this.name = "ydn.error.ArgumentException"
}
C(yd, Error);
function Sd(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, Sd) : this.stack = Error().stack || "";
    a && (this.message = String(a));
    this.name = "ydn.error.NotSupportedException"
}
C(yd, Error);
Sd.prototype.name = "ydn.error.NotSupportedException";
function Id(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, Id) : this.stack = Error().stack || "";
    a && (this.message = String(a));
    this.name = "ydn.error.NotImplementedException"
}
C(Id, Error);
function Cd(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, Cd) : this.stack = Error().stack || "";
    a && (this.message = String(a));
    this.name = "ydn.error.InternalError"
}
C(Cd, Error);
Cd.prototype.name = "ydn.InternalError";
function Oc(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, Oc) : this.stack = Error().stack || "";
    a && (this.message = String(a));
    this.name = "ydn.error.ConstraintError"
}
C(Oc, Error);
Oc.prototype.name = "ydn.error.ConstraintError";
function Td(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, Td) : this.stack = Error().stack || "";
    a && (this.message = String(a));
    this.name = "ydn.error.InvalidOperationException"
}
C(yd, Error);
function Hd(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, Hd) : this.stack = Error().stack || "";
    a && (this.message = String(a));
    this.name = "ydn.error.InvalidOperationError"
}
C(Hd, Error);
function Ud(a) {
    a = String(a);
    if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))
        try {
            return eval("(" + a + ")")
    } catch (b) {}
    throw Error("Invalid JSON string: " + a);
}
function Vd() {}
function Wd(a, b, c) {
    switch (typeof b) {
    case "string":
        Xd(b, c);
        break;
    case "number":
        c.push(isFinite(b)&&!isNaN(b) ? b : "null");
        break;
    case "boolean":
        c.push(b);
        break;
    case "undefined":
        c.push("null");
        break;
    case "object":
        if (null == b) {
            c.push("null");
            break
        }
        if (v(b)) {
            var d = b.length;
            c.push("[");
            for (var e = "", f = 0; f < d; f++)
                c.push(e), Wd(a, b[f], c), e = ",";
            c.push("]");
            break
        }
        c.push("{");
        d = "";
        for (e in b)
            Object.prototype.hasOwnProperty.call(b, e) && (f = b[e], "function" != typeof f && (c.push(d), Xd(e, c), c.push(":"), Wd(a, f, c), d = ","));
        c.push("}");
        break;
    case "function":
        break;
    default:
        throw Error("Unknown type: " + typeof b);
    }
}
var Yd = {
    '"': '\\"',
    "\\": "\\\\",
    "/": "\\/",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\x0B": "\\u000b"
}, Zd = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g: /[\\\"\x00-\x1f\x7f-\xff]/g;
function Xd(a, b) {
    b.push('"', a.replace(Zd, function(a) {
        if (a in Yd)
            return Yd[a];
        var b = a.charCodeAt(0), e = "\\u";
        16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
        return Yd[a] = e + b.toString(16)
    }), '"')
};
I("ydn");
var $d = "undefined" != typeof t.JSON;
function ae(a) {
    return !x(a) || sa(a) ? {} : $d ? JSON.parse(a) : Ud(a)
}
function be(a) {
    var b;
    try {
        b = Q(a)
    } catch (c) {
        b = ""
    }
    return b ? b.substr(0, 70) + (70 < b.length ? "..." : "") : ""
}
function Q(a) {
    if ($d)
        a = JSON.stringify(a);
    else {
        var b = [];
        Wd(new Vd, a, b);
        a = b.join("")
    }
    return a
};
function ce(a, b) {
    wd.call(this, a, b)
}
C(ce, wd);
r = ce.prototype;
r.g = I("ydn.db.crud.req.IndexedDb");
r.lb = function(a, b) {
    function c(e) {
        var f = a.a.objectStore(b[e]).count();
        f.onsuccess = function(f) {
            d[e] = f.target.result;
            e++;
            e == b.length ? S(a, d) : c(e)
        };
        f.onerror = function(b) {
            b.preventDefault();
            S(a, f.error, !0)
        }
    }
    var d = [];
    0 == b.length ? S(a, []) : c(0)
};
r.Lb = function(a, b, c, d) {
    var e = a.a.objectStore(b);
    G(this.g, T(a) + " addObject: " + b + " " + d);
    var f;
    f = u(d) ? e.add(c, d) : e.add(c);
    f.onsuccess = function(b) {
        S(a, b.target.result)
    };
    f.onerror = function(b) {
        b.preventDefault();
        S(a, f.error, !0)
    }
};
r.Vb = function(a, b, c, d) {
    var e = a.a.objectStore(b);
    G(this.g, T(a) + ' putObject to store "' + b + '" ' + (u(d) ? " key: " + d : ""));
    var f;
    f = u(d) ? e.put(c, d) : e.put(c);
    f.onsuccess = function(b) {
        S(a, b.target.result)
    };
    f.onerror = function(d) {
        "DataError" == d.name && (d = Q(c), d = new jd(b + ": " + d.substring(0, 70)));
        d.preventDefault();
        S(a, f.error, !0)
    }
};
r.Mb = function(a, b, c, d) {
    function e(m) {
        var q;
        q = null != d ? n.add(c[m], d[m]) : n.add(c[m]);
        q.onsuccess = function(b) {
            g++;
            f[m] = b.target.result;
            g == c.length ? S(a, f, k) : (b = m + 10, b < c.length && e(b))
        };
        q.onerror = function(d) {
            g++;
            var n = q.error;
            E(h.g, T(a) + ' add request to "' + b + '" cause ' + n.name + ' for object "' + be(c[m]) + '" at index ' + m + " of " + c.length + " objects.");
            f[m] = n;
            k=!0;
            d.preventDefault();
            g == c.length ? S(a, f, k) : (d = m + 10, d < c.length && e(d))
        }
    }
    var f = [], g = 0, h = this, k=!1, n = a.a.objectStore(b);
    G(this.g, T(a) + " addObjects: " + b + " " +
    c.length + " objects");
    if (0 < c.length)
        for (var m = 0; 10 > m && m < c.length; m++)
            e(m);
    else 
        S(a, [])
};
r.zb = function(a, b, c, d) {
    function e(m) {
        if (null == c[m])
            if (G(k.g, "empty object at " + m + " of " + c.length), g++, g == c.length)
                S(a, f, h);
            else {
                var q = m + 10;
                q < c.length && e(q)
            }
        var s;
        s = null != d ? n.put(c[m], d[m]) : n.put(c[m]);
        s.onsuccess = function(b) {
            g++;
            f[m] = b.target.result;
            g == c.length ? S(a, f, h) : (b = m + 10, b < c.length && e(b))
        };
        s.onerror = function(d) {
            g++;
            var n = s.error;
            G(k.g, T(a) + ' put request to "' + b + '" cause ' + n.name + ' for object "' + be(c[m]) + '" at index ' + m + " of " + c.length + " objects.");
            f[m] = n;
            h=!0;
            d.preventDefault();
            g == c.length ?
            S(a, f, h) : (d = m + 10, d < c.length && e(d))
        }
    }
    var f = [], g = 0, h=!1, k = this, n = a.a.objectStore(b);
    G(this.g, T(a) + " put " + c.length + ' objects to store "' + b + '"');
    if (0 < c.length)
        for (var m = 0; 10 > m && m < c.length; m++)
            e(m);
    else 
        S(a, [])
};
r.yb = function(a, b, c) {
    function d(k) {
        var m = c[k], p = m.h(), q = a.a.objectStore(p), s;
        s = null === q.keyPath ? q.put(b[k], m.id) : q.put(b[k]);
        s.onsuccess = function(c) {
            f++;
            e[k] = c.target.result;
            f == b.length ? S(a, e, g) : (c = k + 10, c < b.length && d(c))
        };
        s.onerror = function(c) {
            f++;
            E(h.g, "request result " + c.name + ' error when put keys to "' + p + '" for object "' + be(b[k]) + '" at index ' + k + " of " + b.length + " objects.");
            e[k] = s.error;
            g=!0;
            c.preventDefault();
            f == b.length ? S(a, e, g) : (c = k + 10, c < b.length && d(c))
        }
    }
    var e = [], f = 0, g=!1, h = this;
    G(this.g, T(a) +
    " putByKeys: of " + b.length + " objects");
    if (0 < b.length)
        for (var k = 0; 10 > k && k < b.length; k++)
            d(k);
    else 
        S(a, e, g)
};
r.Ab = function(a, b, c) {
    var d = a.a.objectStore(b);
    G(this.g, T(a) + " clearById: " + b + " " + c);
    var e = d.openCursor(Tc.only(c));
    e.onsuccess = function(b) {
        if (b = b.target.result) {
            var c = b["delete"]();
            c.onsuccess = function() {
                S(a, 1)
            };
            c.onerror = function() {
                S(a, c.error, !0)
            }
        } else 
            S(a, 0)
    };
    e.onerror = function(b) {
        b.preventDefault();
        S(a, e.error, !0)
    }
};
r.Bb = function(a, b) {
    function c(h) {
        h++;
        if (h >= b.length)
            0 < g.length ? S(a, g, !0) : S(a, d);
        else {
            b[h].h() != e && (e = b[h].h(), f = a.a.objectStore(e));
            var k = f["delete"](b[h].id);
            k.onsuccess = function() {
                d++;
                c(h)
            };
            k.onerror = function(a) {
                a.preventDefault();
                g[h] = k.error;
                c(h)
            }
        }
    }
    var d = 0, e, f;
    G(this.g, T(a) + " removeByKeys: " + b.length + " keys");
    var g = [];
    c(-1)
};
r.Za = function(a, b, c) {
    var d = a.a.objectStore(b), e = d.count(c);
    G(this.g, T(a) + " clearByKeyRange: " + b + " " + c);
    e.onsuccess = function(b) {
        var e = b.target.result, h = d["delete"](c);
        h.onsuccess = function() {
            S(a, e)
        };
        h.onerror = function() {
            S(a, h.error, !0)
        }
    };
    e.onerror = function(b) {
        b.preventDefault();
        S(a, e.error, !0)
    }
};
r.Pb = function(a, b, c) {
    var d = a.a.objectStore(b);
    G(this.g, T(a) + " " + b + " " + c);
    var e = d["delete"](c);
    e.onsuccess = function() {
        S(a, void 0)
    };
    e.onerror = function(b) {
        b.preventDefault();
        S(a, e.error, !0)
    }
};
r.Wb = function(a, b, c, d) {
    var e = a.a.objectStore(b).index(c);
    G(this.g, T(a) + " clearByIndexKeyRange: " + b + ":" + c + " " + d);
    var f = [], g = e.openCursor(d), h = 0;
    g.onsuccess = function(b) {
        var c = b.target.result;
        if (c) {
            var d = c["delete"]();
            d.onsuccess = function() {
                h++;
                c["continue"]()
            };
            d.onerror = function(a) {
                f.push(d.error);
                a.preventDefault();
                c["continue"]()
            }
        } else 
            0 < f.length ? S(a, f, !0) : S(a, h)
    };
    g.onerror = function(b) {
        b.preventDefault();
        S(a, g.error, !0)
    }
};
r.jb = function(a, b) {
    var c = b.length, d = 0;
    G(this.g, T(a) + " clearByStores: " + b);
    for (var e = 0; e < c; e++) {
        var f = a.a.objectStore(b[e]).clear();
        f.onsuccess = function() {
            d++;
            d == c && S(a, d)
        };
        f.onerror = function(b) {
            d++;
            b.preventDefault();
            d == c && S(a, f.error, !0)
        }
    }
};
r.pb = function(a, b, c) {
    var d = this;
    G(this.g, T(a) + b + ":" + c);
    var e = a.a.objectStore(b).get(c);
    e.onsuccess = function(b) {
        G(d.g, T(a) + " record " + c + (null != b.target.result ? " " : " not ") + " exists.");
        S(a, b.target.result)
    };
    e.onerror = function(b) {
        b.preventDefault();
        S(a, e.error, !0)
    }
};
r.Rb = function(a, b, c) {
    function d(b) {
        if (null == c[b])
            if (f++, e[b] = void 0, f == h)
                S(a, e);
            else {
                var n = b + 10;
                n < h && d(n)
            }
        var m;
        m = g.get(c[b]);
        m.onsuccess = function(c) {
            f++;
            e[b] = c.target.result;
            f == h ? S(a, e) : (c = b + 10, c < h && d(c))
        };
        m.onerror = function(b) {
            f++;
            b.preventDefault();
            S(a, m.error, !0)
        }
    }
    var e = [];
    e.length = c.length;
    var f = 0, g = a.a.objectStore(b), h = c.length;
    G(this.g, T(a) + " " + b + ":" + h + " ids");
    if (0 < h)
        for (b = 0; 10 > b && b < h; b++)
            d(b);
    else 
        S(a, [])
};
r.Sb = function(a, b) {
    function c(f) {
        var h = b[f], k = a.a.objectStore(h.h()).get(h.id);
        k.onsuccess = function(h) {
            e++;
            d[f] = h.target.result;
            e == b.length ? S(a, d) : (h = f + 10, h < b.length && c(h))
        };
        k.onerror = function(b) {
            e++;
            b.preventDefault();
            S(a, k.error, !0)
        }
    }
    var d = [];
    d.length = b.length;
    var e = 0;
    G(this.g, T(a) + " " + b.length + " ids");
    if (0 < b.length)
        for (var f = 0; 10 > f && f < b.length; f++)
            c(f);
    else 
        S(a, [])
};
r.Sa = function(a, b, c, d, e) {
    if (d && e)
        throw new Td("unique count not available in IndexedDB");
    e = a.a.objectStore(b);
    b = T(a) + " " + b + (d ? ":" + d : "") + (c ? ":" + Q(c) : "");
    G(this.g, b);
    var f;
    null != d ? (d = e.index(d), f = null != c ? d.count(c) : d.count()) : f = null != c ? e.count(c) : e.count();
    f.onsuccess = function(b) {
        S(a, b.target.result)
    };
    f.onerror = function(b) {
        b.preventDefault();
        S(a, f.error, !0)
    }
};
r.Y = function(a, b, c, d, e, f, g, h, k, n) {
    var m = [], p = a.a.objectStore(c), q = f ? k ? "prevunique": "prev": k ? "nextunique": "next";
    c = T(a) + " " + b + " " + c + (d ? ":" + d : "") + (e ? Q(e) : "");
    f && (c += " reverse");
    k && (c += " unique");
    if (n && u(n[0])) {
        k = d?!u(n[1]) : !0;
        var s = n[0], A = e ? e.lower: void 0, z = e ? e.upper : void 0, H = e?!!e.lowerOpen : !1;
        e = e?!!e.upperOpen : !1;
        e = Qc(f ? new O(A, s, H, k) : new O(s, z, k, e));
        c += " starting from " + Q(n[0]);
        u(n[1]) && (c += ", " + Q(n[1]))
    }
    G(this.g, c);
    var L;
    L = 1 == b || 2 == b || 3 == b ? d ? p.index(d).openKeyCursor(e, q) : p.openCursor(e, q) : d ? p.index(d).openCursor(e,
    q) : p.openCursor(e, q);
    var R=!1;
    L.onsuccess = function(c) {
        if (c = c.target.result) {
            if (!R) {
                if (0 < h) {
                    R=!0;
                    c.advance(h);
                    return 
                }
                if (n && d && u(n[0]))
                    if (u(n[1])) {
                        var e = wc.cmp(c.key, n[0]), k = f?-1 : 1;
                        if (0 == e) {
                            e = wc.cmp(c.primaryKey, n[1]);
                            if (0 == e) {
                                R=!0;
                                c["continue"]();
                                return 
                            }
                            if (e == k)
                                R=!0;
                            else {
                                c["continue"]();
                                return 
                            }
                        } else 
                            R=!0
                    } else 
                        R=!0;
                else 
                    R=!0
            }
            1 == b ? m.push(c.key) : 2 == b ? m.push(c.primaryKey) : 3 == b ? (k = {}, d && (k[d] = c.key), p.keyPath ? k[p.keyPath] = c.primaryKey : k._ROWID_ = c.primaryKey, m.push(k)) : 4 == b ? m.push(c.value) : m.push([c.key,
            c.primaryKey, c.value]);
            if (m.length < g)
                c["continue"]();
            else 
                n && (n[0] = vd(c.key), n[1] = vd(c.primaryKey)), S(a, m)
        } else 
            n && (n[0] = void 0, n[1] = void 0), S(a, m)
    };
    L.onerror = function(b) {
        b.preventDefault();
        S(a, L.error, !0)
    }
};
function de(a, b) {
    wd.call(this, a, b)
}
C(de, ce);
de.prototype.g = I("ydn.db.core.req.IndexedDb");
de.prototype.b = function(a, b, c, d) {
    c = V(this.a, c);
    return new Rd(a, b, c, d)
};
var ee=!vb || vb && 9 <= Lb, fe = vb&&!Hb("9");
!xb || Hb("528");
wb && Hb("1.9b") || vb && Hb("8") || ub && Hb("9.5") || xb && Hb("528");
wb&&!Hb("8") || vb && Hb("9");
function ge(a, b) {
    this.type = a;
    this.a = this.target = b
}
ge.prototype.b=!1;
ge.prototype.d=!0;
ge.prototype.preventDefault = function() {
    this.d=!1
};
function he(a) {
    he[" "](a);
    return a
}
he[" "] = aa();
function ie(a, b) {
    a && je(this, a, b)
}
C(ie, ge);
r = ie.prototype;
r.target = null;
r.clientX = 0;
r.clientY = 0;
r.jc = null;
function je(a, b, c) {
    var d = a.type = b.type;
    ge.call(a, d);
    a.target = b.target || b.srcElement;
    a.a = c;
    if ((c = b.relatedTarget) && wb)
        try {
            he(c.nodeName)
    } catch (e) {}
    a.clientX = void 0 !== b.clientX ? b.clientX : b.pageX;
    a.clientY = void 0 !== b.clientY ? b.clientY : b.pageY;
    a.jc = b;
    b.defaultPrevented && a.preventDefault();
    delete a.b
}
r.preventDefault = function() {
    ie.G.preventDefault.call(this);
    var a = this.jc;
    if (a.preventDefault)
        a.preventDefault();
    else if (a.returnValue=!1, fe)
        try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)
                a.keyCode =- 1
    } catch (b) {}
};
var ke = "closure_listenable_" + (1E6 * Math.random() | 0), le = 0;
function me(a, b, c, d, e, f) {
    this.fa = a;
    this.a = b;
    this.src = c;
    this.type = d;
    this.capture=!!e;
    this.Ea = f;
    this.key=++le;
    this.ja = this.Ca=!1
};
var ne = {}, oe = {}, pe = {}, qe = {};
function re(a, b, c, d, e) {
    if (v(b))
        for (var f = 0; f < b.length; f++)
            re(a, b[f], c, d, e);
    else 
        c = se(c), a && a[ke] ? te(a, b, c, !1, d, e) : ue(a, b, c, !1, d, e)
}
function ue(a, b, c, d, e, f) {
    if (!b)
        throw Error("Invalid event type");
    e=!!e;
    var g = oe;
    b in g || (g[b] = {
        H: 0,
        ia: 0
    });
    g = g[b];
    e in g || (g[e] = {
        H: 0,
        ia: 0
    }, g.H++);
    var g = g[e], h = ga(a), k;
    g.ia++;
    if (g[h]) {
        k = g[h];
        for (var n = 0; n < k.length; n++)
            if (g = k[n], g.fa == c && g.Ea == f) {
                if (g.ja)
                    break;
                    d || (k[n].Ca=!1);
                    return 
            }
    } else 
        k = g[h] = [], g.H++;
    n = ve();
    g = new me(c, n, a, b, e, f);
    g.Ca = d;
    n.src = a;
    n.fa = g;
    k.push(g);
    pe[h] || (pe[h] = []);
    pe[h].push(g);
    a.addEventListener ? a.addEventListener(b, n, e) : a.attachEvent(b in qe ? qe[b] : qe[b] = "on" + b, n);
    ne[g.key] = g
}
function ve() {
    var a = we, b = ee ? function(c) {
        return a.call(b.src, b.fa, c)
    }
    : function(c) {
        c = a.call(b.src, b.fa, c);
        if (!c)
            return c
    };
    return b
}
function xe(a, b, c, d, e) {
    if (v(b))
        for (var f = 0; f < b.length; f++)
            xe(a, b[f], c, d, e);
    else 
        c = se(c), a && a[ke] ? te(a, b, c, !0, d, e) : ue(a, b, c, !0, d, e)
}
function ye(a, b, c, d, e) {
    if (v(b))
        for (var f = 0; f < b.length; f++)
            ye(a, b[f], c, d, e);
    else if (c = se(c), a && a[ke])
        b in a.i && (a = a.i[b], c = ze(a, c, d, e), -1 < c && (e = a[c], delete ne[e.key], e.ja=!0, Ia.splice.call(a, c, 1)));
    else {
        d=!!d;
        a:
        {
            f = oe;
            if (b in f && (f = f[b], d in f && (f = f[d], a = ga(a), f[a])
                )) {
                a = f[a];
                break a
            }
            a = null
        }
        if (a)
            for (f = 0; f < a.length; f++)
                if (a[f].fa == c && a[f].capture == d && a[f].Ea == e) {
                    Ae(a[f]);
                    break
                }
    }
}
function Ae(a) {
    if (!y(a) && a&&!a.ja) {
        var b = a.src;
        if (b && b[ke])
            Be(b, a);
        else {
            var c = a.type, d = a.a, e = a.capture;
            b.removeEventListener ? b.removeEventListener(c, d, e) : b.detachEvent && b.detachEvent(c in qe ? qe[c] : qe[c] = "on" + c, d);
            b = ga(b);
            pe[b] && (d = pe[b], Ra(d, a), 0 == d.length && delete pe[b]);
            a.ja=!0;
            a.fa = null;
            a.a = null;
            a.src = null;
            a.Ea = null;
            if (d = oe[c][e][b])
                d.nc=!0, Ce(c, e, b, d);
            delete ne[a.key]
        }
    }
}
function Ce(a, b, c, d) {
    if (!d.vb && d.nc) {
        for (var e = 0, f = 0; e < d.length; e++)
            d[e].ja || (e != f && (d[f] = d[e]), f++);
        d.length = f;
        d.nc=!1;
        0 == f && (delete oe[a][b][c], oe[a][b].H--, 0 == oe[a][b].H && (delete oe[a][b], oe[a].H--), 0 == oe[a].H && delete oe[a])
    }
}
function De(a, b, c, d, e) {
    var f = 1;
    b = ga(b);
    if (a[b]) {
        var g=--a.ia, h = a[b];
        h.vb ? h.vb++ : h.vb = 1;
        try {
            for (var k = h.length, n = 0; n < k; n++) {
                var m = h[n];
                m&&!m.ja && (f&=!1 !== Ee(m, e))
            }
        } finally {
            a.ia = Math.max(g, a.ia), h.vb--, Ce(c, d, b, h)
        }
    }
    return Boolean(f)
}
function Ee(a, b) {
    var c = a.fa, d = a.Ea || a.src;
    a.Ca && Ae(a);
    return c.call(d, b)
}
function we(a, b) {
    if (a.ja)
        return !0;
    var c = a.type, d = oe;
    if (!(c in d))
        return !0;
    var d = d[c], e, f;
    if (!ee) {
        e = b || ca("window.event");
        var g=!0 in d, h=!1 in d;
        if (g) {
            if (0 > e.keyCode || void 0 != e.returnValue)
                return !0;
            a:
            {
                var k=!1;
                if (0 == e.keyCode)
                    try {
                        e.keyCode =- 1;
                        break a
                } catch (n) {
                    k=!0
                }
                if (k || void 0 == e.returnValue)
                    e.returnValue=!0
            }
        }
        k = new ie;
        je(k, e, this);
        e=!0;
        try {
            if (g) {
                for (var m = [], p = k.a; p; p = p.parentNode)
                    m.push(p);
                f = d[!0];
                f.ia = f.H;
                for (var q = m.length-1; !k.b && 0 <= q && f.ia; q--)
                    k.a = m[q], e&=De(f, m[q], c, !0, k);
                if (h)
                    for (f = d[!1], f.ia =
                    f.H, q = 0; !k.b && q < m.length && f.ia; q++)
                        k.a = m[q], e&=De(f, m[q], c, !1, k)
            } else 
                e = Ee(a, k)
            } finally {
            m && (m.length = 0)
        }
        return e
    }
    c = new ie(b, this);
    return e = Ee(a, c)
}
var Fe = "__closure_events_fn_" + (1E9 * Math.random()>>>0);
function se(a) {
    return fa(a) ? a : a[Fe] || (a[Fe] = function(b) {
        return a.handleEvent(b)
    })
};
function Ge() {
    Jd.call(this);
    this.i = {};
    this.C = this
}
C(Ge, Jd);
Ge.prototype[ke]=!0;
Ge.prototype.Qb = function(a, b, c, d) {
    re(this, a, b, c, d)
};
Ge.prototype.removeEventListener = function(a, b, c, d) {
    ye(this, a, b, c, d)
};
Ge.prototype.dispatchEvent = function(a) {
    var b = this.C, c = a.type || a;
    if (x(a))
        a = new ge(a, b);
    else if (a instanceof ge)
        a.target = a.target || b;
    else {
        var d = a;
        a = new ge(c, b);
        cb(a, d)
    }
    d=!0;
    a.b || (b = a.a = b, d = He(b, c, !0, a) && d, a.b || (d = He(b, c, !1, a) && d));
    return d
};
function te(a, b, c, d, e, f) {
    var g = a.i[b] || (a.i[b] = []), h = ze(g, c, e, f);
    -1 < h ? (a = g[h], d || (a.Ca=!1)) : (a = new me(c, null, a, b, !!e, f), a.Ca = d, g.push(a))
}
function Be(a, b) {
    var c = b.type;
    c in a.i && Ra(a.i[c], b) && (delete ne[b.key], b.ja=!0)
}
function He(a, b, c, d) {
    if (!(b in a.i))
        return !0;
    var e=!0;
    b = Sa(a.i[b]);
    for (var f = 0; f < b.length; ++f) {
        var g = b[f];
        if (g&&!g.ja && g.capture == c) {
            var h = g.fa, k = g.Ea || g.src;
            g.Ca && Be(a, g);
            e=!1 !== h.call(k, d) && e
        }
    }
    return e&&!1 != d.d
}
function ze(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (f.fa == b && f.capture==!!c && f.Ea == d)
            return e
    }
    return -1
};
function Ie(a, b, c) {
    if (fa(a))
        c && (a = ma(a, c));
    else if (a && "function" == typeof a.handleEvent)
        a = ma(a.handleEvent, a);
    else 
        throw Error("Invalid listener argument");
    2147483647 < b || t.setTimeout(a, b || 0)
};
function Je() {
    this.a=!1
}
Je.prototype.a=!1;
function Ke(a, b, c, d) {
    Ld.call(this, a, b, c, d);
    this.oa = this.J = this.F = void 0;
    this.Ub = this.c = null;
    this.C = new Je;
    this.o = this.f = null
}
C(Ke, Ld);
r = Ke.prototype;
r.L = I("ydn.db.core.req.SimpleCursor");
r.sb = function() {
    return !!this.d
};
r.update = function(a) {
    Le(this.o, this.q(), a);
    return qc()
};
r.advance = function(a) {
    function b(b) {
        d++;
        if (!b || d >= a)
            return Me(c, b)
    }
    var c = this, d = this.c?-1 : 0;
    this.u ? Ne(this.f, b, this.c) : Oe(this.f, b, this.c)
};
r.Na = function(a) {
    if (null != a) {
        var b = this, c = new W(a), d = function(c) {
            b.c = c;
            if (!c)
                return Me(b, c);
            var d = M(c.value.key, a);
            if (b.u) {
                if (1 != d)
                    return Me(b, c)
            } else if (-1 != d)
                return Me(b, c)
        };
        this.u ? Ne(this.f, d, c) : Oe(this.f, d, c)
    } else 
        this.advance(1)
};
function Pe(a) {
    Ie(function() {
        a.C.a ? (a.C.a=!1, this.ca(this.F, this.J, this.oa), Pe(this)) : (this.Ub(), this.Ub = null)
    }, 0, a)
}
function Me(a, b) {
    if (a.c = b) {
        var c = b.value;
        if (a.r)
            if (a.u || null == a.r.upper)
                a.u && null != a.r.lower && (d = M(c.key, a.r.lower), -1 == d || 0 == d && a.r.lowerOpen) && (a.c = null);
            else {
                var d = M(c.key, a.r.upper);
                if (1 == d || 0 == d && a.r.upperOpen)
                    a.c = null
            }
        if (a.c) {
            if (a.unique && null != a.F && null != c.key && 0 == M(a.F, c.key))
                return;
            a.F = c.key;
            a.J = a.b ? c.q() : a.F;
            4 == a.B && (a.Xa ? a.oa = a.J : a.oa = Qe(a.o, a.J))
        }
    }
    a.c || (a.F = void 0, a.J = void 0, a.oa = void 0);
    return a.C.a=!0
}
r.Gb = function(a, b) {
    var c = null;
    if (this.r)
        if (this.u) {
            var d = this.b ? "\uffff": void 0;
            null != this.r.upper && (c = new W(this.r.upper, d))
        } else 
            null != this.r.lower && (c = new W(this.r.lower));
    null != a && (c = this.b ? new W(a, b) : new W(a));
    this.Ub = Re(this.d, function(b) {
        function d(b) {
            var e = b.value, f = e.key;
            if (b && null != f)
                if (null != a) {
                    if (0 == Se(c, e))
                        return 
                } else if (this.r && (!this.u && this.r.lowerOpen && null != this.r.lower && (e = M(f, this.r.lower), 0 == e) || this.u && this.r.upperOpen && null != this.r.upper && (e = M(f, this.r.upper), 0 == e)))
                    return;
            return Me(this, b)
        }
        this.o = Te(b, this.Ya);
        this.f = Ue(this.o, this.e);
        this.u ? Ne(this.f, ma(d, this), c) : Oe(this.f, ma(d, this), c);
        Pe(this)
    }, this)
};
r.clear = function() {
    throw new Kc;
};
r.hb = function() {
    throw new Kc;
};
r.toString = function() {
    return "Simple" + Ke.G.toString.call(this)
};
function Ve(a, b) {
    wd.call(this, a, b)
}
C(Ve, wd);
r = Ve.prototype;
r.g = I("ydn.db.crud.req.SimpleStore");
r.yb = function(a, b, c) {
    We(this, a, null, b, c, !0, !1)
};
function We(a, b, c, d, e, f, g) {
    G(a.g, T(b) + " " + (f ? "put" : "add") + "Object" + (g ? "" : "s " + d.length + " objects"));
    var h = Re(b.a, function(a) {
        var n;
        if (g)
            n = Te(a, c), a = Le(n, e, d, !f), null != a ? S(b, a) : (a = be(a), a = new id(a), S(b, a, !0));
        else {
            for (var m = c, p = [], q=!1, s = e || {}, A = 0; A < d.length; A++) {
                var z;
                c ? z = s[A] : (m = e[A], z = m.id, m = m.h());
                n && n.getName() == m || (n = Te(a, m));
                z = Le(n, z, d[A], !f);
                null != z ? p.push(z) : (q=!0, p.push(new id))
            }
            S(b, p, q)
        }
        h();
        h = null
    }, a)
}
r.Lb = function(a, b, c, d) {
    We(this, a, b, c, d, !1, !0)
};
r.Vb = function(a, b, c, d) {
    We(this, a, b, c, d, !0, !0)
};
r.Mb = function(a, b, c, d) {
    We(this, a, b, c, d, !1, !1)
};
r.zb = function(a, b, c, d) {
    We(this, a, b, c, d, !0, !1)
};
r.pb = function(a, b, c) {
    var d = Re(a.a, function(e) {
        e = Qe(Te(e, b), c);
        S(a, e);
        d();
        d = null
    }, this)
};
function Xe(a, b, c, d) {
    var e = Re(b.a, function(a) {
        for (var g = [], h = c, k, n = 0; n < d.length; n++) {
            var m = d[n];
            m instanceof td && (h = m, m = h.id, h = h.h());
            k && k.getName() == h || (k = Te(a, h));
            m = Qe(k, m);
            g[n] = m
        }
        S(b, g, !1);
        e();
        e = null
    }, a)
}
r.Rb = function(a, b, c) {
    Xe(this, a, b, c)
};
r.Sb = function(a, b) {
    Xe(this, a, null, b)
};
r.Ab = function(a, b, c) {
    var d = T(a) + " removeById " + b + " " + c;
    G(this.g, d);
    var e = this, f = Re(a.a, function(g) {
        g = Ye(Te(g, b), c);
        F(e.g, "success " + d + (0 == g ? " [not found]" : ""));
        S(a, g);
        f();
        f = null
    }, this)
};
r.Bb = function(a, b) {
    G(this.g, T(a) + " removeByKeys " + b.length + " keys");
    var c, d = 0, e = Re(a.a, function(f) {
        for (var g = 0; g < b.length; g++) {
            var h = b[g].h(), k = b[g].id;
            c && c.getName() == h || (c = Te(f, h));
            d += Ye(c, k)
        }
        S(a, d);
        e();
        e = null
    }, this)
};
r.Pb = function(a, b, c) {
    this.Za(a, b, c)
};
r.Za = function(a, b, c) {
    var d = T(a) + " removeByKeyRange " + (c ? Q(c) : "");
    G(this.g, d);
    var e = this, f = Re(a.a, function(g) {
        g = Ze(Te(g, b), c);
        F(e.g, d + " deleted " + g + " records.");
        S(a, g);
        f();
        f = null
    }, this)
};
r.Wb = function(a, b, c, d) {
    var e = T(a) + " removeByIndexKeyRange " + (d ? Q(d) : "");
    G(this.g, e);
    var f = Re(a.a, function(e) {
        e = Te(e, b);
        for (var h = e.Ua(c, d), k = h.length, n = 0; n < k; n++)
            Ye(e, h[n]);
        S(a, k);
        f();
        f = null
    }, this)
};
r.jb = function(a, b) {
    var c = T(a) + " clearByStores";
    G(this.g, c);
    var d = Re(a.a, function(e) {
        for (var f = 0; f < b.length; f++)
            Te(e, b[f]).clear();
        F(this.g, "success " + c);
        S(a, b.length);
        d();
        d = null
    }, this)
};
r.lb = function(a, b) {
    var c = Re(a.a, function(d) {
        for (var e = [], f = 0; f < b.length; f++) {
            var g = Te(d, b[f]);
            e.push($e(g))
        }
        S(a, e);
        c();
        c = null
    }, this)
};
r.Sa = function(a, b, c, d) {
    var e = T(a) + " count" + (null != d ? "Index" : "") + (null != c ? "KeyRange" : "Store");
    G(this.g, e);
    var f = Re(a.a, function(g) {
        g = $e(Te(g, b), d, c);
        F(this.g, "success " + e);
        S(a, g);
        f();
        f = null
    }, this)
};
r.Y = function(a, b, c, d, e, f, g, h, k, n) {
    var m = T(a) + " " + c + " " + (e ? be(e) : "");
    G(this.g, m);
    var p = Re(a.a, function(q) {
        q = af(Te(q, c), b, d, e, f, g, h, k, n);
        F(this.g, m + " " + q.length + " records found.");
        S(a, q);
        p();
        p = null
    }, this)
};
function df(a, b) {
    wd.call(this, a, b)
}
C(df, Ve);
df.prototype.b = function(a, b, c, d) {
    c = V(this.a, c);
    return new Ke(a, b, c, d)
};
function ef(a, b, c, d) {
    Ld.call(this, a, b, c, d);
    this.C = null;
    this.c = this.f = void 0
}
C(ef, Ld);
r = ef.prototype;
r.L = I("ydn.db.core.req.WebsqlCursor");
r.q = l("c");
r.$b = function(a, b, c, d, e) {
    ef.G.$b.call(this, a, b, c, d, e);
    this.C = x(b) ? ff(this.a, b) : null
};
r.I = l("o");
function gf(a, b) {
    a.f = void 0;
    a.c = void 0;
    a.o = void 0;
    if (u(b))
        if (B(b)) {
            var c = hf(b[a.a.d], a.a.type);
            a.c = c;
            if (a.b) {
                var d = ff(a.a, a.e);
                a.f = hf(b[a.e], d.type)
            } else 
                a.f = c;
                a.o = a.Xa ? c : jf(b, a.a)
        } else 
            a.o = b
    }
function kf(a, b, c) {
    ff(a.a, a.e);
    var d = [], e = a.e, f = a.r, g = a.f;
    if (null != f) {
        var h = f.lower, k = f.upper, n = f.lowerOpen, f = f.upperOpen;
        a.u ? k = null != k&&-1 == M(k, g) ? k : g : h = null != h && 1 == M(h, g) ? h : g;
        f = null != h && null != k ? O.bound(h, k, !!n, !!f) : null != h ? Tc.lowerBound(h, !!n) : Tc.upperBound(k, !!f)
    } else 
        f = a.u ? Tc.upperBound(g) : Tc.lowerBound(g);
    e = lf(a.a, d, a.B, e, f, a.u, a.unique);
    c = a.u ? Tc.upperBound(c, !1) : Tc.lowerBound(c, !1);
    c = lf(a.a, d, a.B, a.a.d, c, a.u, a.unique);
    e.s = e.s ? e.s + (" AND " + c.s) : c.s;
    c = "SELECT " + e.select + " FROM " + e.ba + (e.s ? " WHERE " +
    e.s : "") + (e.group ? " GROUP BY " + e.group : "") + " ORDER BY " + e.da;
    c += " LIMIT 1";
    G(a.L, a + ": continuePrimary:  SQL: " + c + " : " + Q(d));
    a.d.executeSql(c, d, function(c, d) {
        0 < d.rows.length ? gf(a, d.rows.item(0)) : gf(a);
        b.call(a, a.f, a.c, a.o);
        b = null
    }, function(c, d) {
        E(a.L, "get error: " + d.message);
        a.ac(d);
        gf(a);
        b.call(a, a.c, a.f, a.o);
        b = null;
        return !1
    })
}
function mf(a, b, c, d, e, f) {
    var g=!d;
    d = [];
    a.b && null != f && null != c ? c = nf(a.a, a.B, d, a.C.getName(), a.r, c, g, f, a.u, a.unique) : null != c ? c = of(a.a, a.B, d, a.C ? a.C.getName() : null, a.r, a.u, a.unique, c, g) : (c = pf(a.a, d, a.B, a.b ? a.C.c : a.a.d, a.r, a.u, a.unique), a.b && (c += ", " + a.a.c + " ASC"));
    c += " LIMIT 1";
    0 < e && (c += " OFFSET " + e);
    G(a.L, a + ": continue:  SQL: " + c + " : " + Q(d));
    a.d.executeSql(c, d, function(c, d) {
        0 < d.rows.length ? gf(a, d.rows.item(0)) : gf(a);
        b.call(a, a.f, a.c, a.o);
        b = null
    }, function(c, d) {
        E(a.L, "get error: " + d.message);
        a.ac(d);
        gf(a);
        b.call(a, a.c, a.f, a.o);
        b = null;
        return !1
    })
}
r.sb = function() {
    return !!this.d
};
r.update = function(a) {
    if (!this.sb())
        throw new nd;
    var b = new J, c = this.q();
    a = qf(this.a, a, c);
    var d = "REPLACE INTO " + rf(this.a) + " (" + a.hc.join(", ") + ") VALUES (" + a.rc.join(", ") + ")";
    G(this.L, this + ': update "' + d + '" : ' + Q(a.P));
    this.d.executeSql(d, a.P, function() {
        b.D(c)
    }, function(a, c) {
        b.A(c);
        return !1
    });
    return b
};
r.advance = function(a) {
    var b = this.f, c = this.c, d=!0;
    null == this.f || this.b && null == this.c || (a -= 1, d=!1);
    mf(this, function(a, d, g) {
        var h = null != b && null != a && 0 == M(b, a);
        if (this.b) {
            var k = null != d && null != c && 0 == M(d, c);
            if (h && k)
                throw new Mc("current: " + b + ";" + c + " next: " + a + ";" + d);
        } else if (h)
            throw new Mc("current: " + b + " next: " + a);
        this.ca(a, d, g)
    }, this.f, d, a, this.c)
};
r.Na = function(a) {
    null != a ? mf(this, this.ca, a, !0) : this.advance(1)
};
r.Gb = function(a, b) {
    mf(this, this.ca, a, !1, 0, b)
};
r.clear = function() {
    if (!this.sb())
        throw new nd;
    var a = new J, b = this.a.d, b = "DELETE FROM " + rf(this.a) + " WHERE " + b + " = ?", c = [this.q()];
    G(this.L, this + ': clear "' + b + '" : ' + Q(c));
    this.d.executeSql(b, c, function(b, c) {
        a.D(c.rowsAffected)
    }, function(b, c) {
        a.A(c);
        return !1
    });
    return a
};
r.hb = function(a) {
    var b = M(a, this.c);
    if (0 == b || 1 == b && this.u||-1 == b&&!this.u)
        throw new Hd(this + " to continuePrimaryKey  from " + this.c + " to " + a + " on " + this.ea + " direction is wrong");
    kf(this, this.ca, a)
};
r.toString = function() {
    return "WebSql" + ef.G.toString.call(this)
};
function sf(a, b) {
    wd.call(this, a, b)
}
C(sf, wd);
r = sf.prototype;
r.g = I("ydn.db.crud.req.WebSql");
function jf(a, b) {
    var c = a._default_ ? ae(a._default_): {};
    if (null != b.keyPath) {
        var d = hf(a[b.keyPath], b.type);
        null != d && tf(b, c, d)
    }
    for (d = 0; d < b.a.length; d++) {
        var e = b.a[d], f = e.c;
        "_default_" == f || e.e || e.multiEntry || e.type != uf || (f = hf(a[f], e.type), u(f) && vf(e, c, f))
    }
    return c
}
r.Lb = function(a, b, c, d) {
    wf(this, a, !0, !0, b, [c], [d])
};
r.Vb = function(a, b, c, d) {
    wf(this, a, !1, !0, b, [c], [d])
};
r.Mb = function(a, b, c, d) {
    wf(this, a, !0, !1, b, c, d)
};
function wf(a, b, c, d, e, f, g) {
    function h(c, e) {
        if (null == f[c])
            if (G(a.g, "empty object at " + c + " of " + f.length), p++, p == f.length)
                F(a.g, q + " success " + q), S(b, m, s);
        else {
            var H = c + 2;
            H < f.length && h(H, e)
        }
        var L;
        L = u(g) ? qf(k, f[c], g[c]) : qf(k, f[c]);
        H = n + rf(k) + " (" + L.hc.join(", ") + ") VALUES (" + L.rc.join(", ") + ");";
        G(a.g, T(b) + " SQL: " + H + " PARAMS: " + L.P + " REQ: " + c + " of " + f.length);
        e.executeSql(H, L.P, function(g, q) {
            function H(c, d) {
                var f = n + Fa("ydn.db.me:" + k.getName() + ":" + c.getName()) + " (" + k.c + ", " + c.b + ") VALUES (?, ?)", g = [Xc(U,
                k.type), Xc(d, c.type)];
                G(a.g, T(b) + " multiEntry " + f + " " + g);
                e.executeSql(f, g, aa(), function(b, c) {
                    E(a.g, "multiEntry index insert error: " + c.message);
                    return !1
                })
            }
            p++;
            var U = u(L.key) ? L.key: q.insertId;
            1 > q.rowsAffected && (s=!0, U = new id(U + " no-op"));
            for (var Aa = 0, Gd = k.a.length; Aa < Gd; Aa++) {
                var sb = k.index(Aa);
                if (sb.multiEntry)
                    for (var Kb = xc(f[c], sb.keyPath), gi = (Kb ? Kb.length : 0) || 0, cf = 0; cf < gi; cf++)
                        H(sb, Kb[cf])
            }
            d ? S(b, U) : (m[c] = U, p == f.length ? S(b, m, s) : (Aa = c + 2, Aa < f.length && h(Aa, g)))
        }, function(e, g) {
            p++;
            s=!0;
            6 == g.code ? g.name =
            "ConstraintError" : E(a.g, "error: " + g.message + " " + q);
            if (d)
                S(b, g, !0);
            else if (m[c] = g, p == f.length)
                G(a.g, "success " + q), S(b, m, s);
            else {
                var k = c + 2;
                k < f.length && h(k, e)
            }
            return !1
        })
    }
    var k = V(a.a, e), n = c ? "INSERT INTO ": "INSERT OR REPLACE INTO ";
    c = b.a;
    var m = [], p = 0, q = T(b) + " inserting " + f.length + " objects.", s=!1;
    if (0 < f.length)
        for (e = 0; 2 > e && e < f.length; e++)
            h(e, c);
    else 
        F(a.g, "success"), S(b, [])
}
r.zb = function(a, b, c, d) {
    wf(this, a, !1, !1, b, c, d)
};
r.yb = function(a, b, c) {
    if (0 == c.length)
        S(a, []);
    else {
        for (var d = [], e = 0, f = 0, g = this, h = function(h, k) {
            var m = [];
            G(g.g, "put " + k.length + " objects to " + h);
            for (var n = xf(V(g.a, h)), p = n ? void 0 : [], q = 0; q < k.length; q++)
                m.push(b[k[q]]), n || p.push(c[k[q]].id);
            n = yf(a);
            n.aa(function(b) {
                for (var c = 0; c < k.length; c++)
                    d[k[c]] = b[c];
                e++;
                e == f && S(a, d)
            }, function() {
                e++;
                e == f && S(a, d, !0)
            });
            wf(g, n, !1, !1, h, m, p)
        }, k = "", n = [], m = [], p = 0; p < c.length; p++) {
            var q = c[p].h(), s = c[p].id;
            q != k ? (f++, 0 < n.length && h(k, n), n = [p], m = [s], k = q) : (n.push(p), m.push(s))
        }
        0 <
        n.length && h(k, n)
    }
};
r.pb = function(a, b, c) {
    var d = a.a, e = V(this.a, b), f = this;
    b = e.c;
    c = [Xc(c, e.type)];
    b = "SELECT * FROM " + rf(e) + " WHERE " + b + " = ?";
    var g = T(a) + " SQL: " + b + " PARAMS: " + c;
    G(this.g, g);
    d.executeSql(b, c, function(b, c) {
        if (0 < c.rows.length) {
            var d = c.rows.item(0);
            null != d ? (d = jf(d, e), S(a, d)) : (F(f.g, "success no result: " + g), S(a, void 0))
        } else 
            F(f.g, "success no result: " + g), S(a, void 0)
    }, function(b, c) {
        E(f.g, "error: " + g + " " + c.message);
        S(a, c, !0);
        return !1
    })
};
r.Rb = function(a, b, c) {
    function d(b, e) {
        var p = k.c, q = [Xc(c[b], k.type)], s = "SELECT * FROM " + rf(k) + " WHERE " + p + " = ?";
        G(f.g, "SQL: " + s + " PARAMS: " + q);
        e.executeSql(s, q, function(e, f) {
            h++;
            if (0 < f.rows.length) {
                var m = f.rows.item(0);
                null != m && (g[b] = jf(m, k))
            } else 
                g[b] = void 0;
            h == c.length ? S(a, g) : (m = b + 10, m < c.length && d(m, e))
        }, function(e, k) {
            h++;
            E(f.g, "error: " + s + " " + k.message);
            if (h == c.length)
                S(a, g);
            else {
                var m = b + 10;
                m < c.length && d(m, e)
            }
            return !1
        })
    }
    var e = a.a, f = this, g = [], h = 0, k = V(this.a, b);
    if (0 < c.length)
        for (b = 0; 10 > b && b < c.length; b++)
            d(b,
            e);
    else 
        F(f.g, "success"), S(a, [])
};
r.Sb = function(a, b) {
    function c(d, h) {
        var m = b[d], p = V(e.a, m.h()), q = v(m.id) ? m.id.join("^|"): m.id instanceof Date?+m.id : m.id, m = p.c, q = [Xc(q, p.type)], s = "SELECT * FROM " + rf(p) + " WHERE " + m + " = ?";
        G(e.g, "SQL: " + s + " PARAMS: " + q);
        h.executeSql(s, q, function(h, m) {
            g++;
            if (0 < m.rows.length) {
                var n = m.rows.item(0);
                null != n && (f[d] = jf(n, p))
            } else 
                f[d] = void 0;
            g == b.length ? (G(e.g, "success " + s), S(a, f)) : (n = d + 10, n < b.length && c(n, h))
        }, function(b, c) {
            S(a, c, !0);
            return !1
        })
    }
    var d = a.a, e = this, f = [], g = 0;
    if (0 < b.length)
        for (var h = 0; 10 > h && h < b.length; h++)
            c(h,
            d);
    else 
        G(this.g, "success"), S(a, [])
};
r.jb = function(a, b) {
    function c(d, g) {
        function h(a) {
            a = "DELETE FROM  " + Fa("ydn.db.me:" + k.getName() + ":" + a.getName());
            G(e.g, "SQL: " + a);
            g.executeSql(a, [])
        }
        var k = V(e.a, b[d]), n = "DELETE FROM  " + rf(k);
        G(e.g, "SQL: " + n + " PARAMS: []");
        g.executeSql(n, [], function(g) {
            d == b.length-1 ? (G(e.g, "success " + n), S(a, b.length)) : c(d + 1, g)
        }, function(b, c) {
            S(a, c, !0);
            return !1
        });
        for (var m = 0, p = k.a.length; m < p; m++) {
            var q = k.index(m);
            q.multiEntry && h(q)
        }
    }
    var d = a.a, e = this;
    0 < b.length ? c(0, d) : (G(this.g, "success"), S(a, 0))
};
r.Bb = function(a, b) {
    function c(h) {
        if (h >= b.length)
            S(a, f, g);
        else {
            var k = V(e.a, b[h].h()), n = Xc(b[h].id, k.type), m = " WHERE " + k.c + " = ?", p = "DELETE FROM " + rf(k) + m, q = T(a) + " SQL: " + p + " PARAMS: " + [n];
            d.executeSql(p, [n], function() {
                f++;
                c(h)
            }, function(a, b) {
                E(e.g, "error: " + q + b.message);
                g=!0;
                c(h);
                return !1
            });
            h++;
            for (var p = function(b) {
                b = "DELETE FROM  " + Fa("ydn.db.me:" + k.getName() + ":" + b.getName()) + m;
                G(e.g, T(a) + NaN + b);
                d.executeSql(b, [n])
            }, s = 0, A = k.a.length; s < A; s++) {
                var z = k.index(s);
                z.multiEntry && p(z)
            }
        }
    }
    var d = a.a, e = this,
    f = 0, g=!1;
    G(this.g, T(a) + " removeByKeys: " + b.length + " keys");
    c(0)
};
r.Ab = function(a, b, c) {
    function d(b) {
        b = "DELETE FROM  " + Fa("ydn.db.me:" + f.getName() + ":" + b.getName()) + k;
        G(h.g, T(a) + NaN + b);
        e.executeSql(b, [g])
    }
    var e = a.a, f = V(this.a, b), g = Xc(c, f.type), h = this, k = " WHERE " + f.c + " = ?";
    b = "DELETE FROM " + rf(f) + k;
    G(this.g, T(a) + " SQL: " + b + " PARAMS: " + [g]);
    e.executeSql(b, [g], function(b, c) {
        S(a, c.rowsAffected)
    }, function(b, c) {
        S(a, c, !0);
        return !1
    });
    b = 0;
    for (c = f.a.length; b < c; b++) {
        var n = f.index(b);
        n.multiEntry && d(n)
    }
};
r.Pb = function(a, b, c) {
    zf(this, a, b, void 0, c)
};
r.Za = function(a, b, c) {
    zf(this, a, b, void 0, c)
};
r.Wb = function(a, b, c, d) {
    zf(this, a, b, c, d)
};
function zf(a, b, c, d, e) {
    function f(c) {
        c = "DELETE FROM  " + Fa("ydn.db.me:" + h.getName() + ":" + c.getName()) + m;
        G(a.g, T(b) + NaN + c);
        g.executeSql(c, n)
    }
    var g = b.a, h = V(a.a, c);
    c = "DELETE FROM " + rf(h);
    var k = [], n = [], m = "";
    null != e && (u(d) ? (d = ff(h, d), Wc(d.b, d.type, e, n, k)) : Wc(h.c, h.type, e, n, k), m = " WHERE " + n.join(" AND "));
    c += m;
    var p = T(b) + " SQL: " + c + " PARAMS: " + k;
    G(a.g, p);
    g.executeSql(c, k, function(c, d) {
        G(a.g, "success " + p);
        S(b, d.rowsAffected)
    }, function(c, d) {
        E(a.g, "error: " + p + d.message);
        S(b, d, !0);
        return !1
    });
    e = 0;
    for (d = h.a.length; e <
    d; e++)
        c = h.index(e), c.multiEntry && f(c)
}
r.lb = function(a, b) {
    function c(g) {
        var h = "SELECT COUNT(*) FROM " + Fa(b[g]);
        G(e.g, "SQL: " + h + " PARAMS: []");
        d.executeSql(h, [], function(d, e) {
            var h = e.rows.item(0);
            f[g] = parseInt(h["COUNT(*)"], 10);
            g++;
            g == b.length ? S(a, f) : c(g)
        }, function(b, c) {
            S(a, c, !0);
            return !1
        })
    }
    var d = a.a, e = this, f = [];
    0 == b.length ? (G(this.g, "success"), S(a, 0)) : c(0)
};
r.Sa = function(a, b, c, d, e) {
    var f = [];
    b = pf(V(this.a, b), f, 6, d, c, !1, e);
    G(this.g, T(a) + " SQL: " + b + " PARAMS: " + f);
    a.a.executeSql(b, f, function(b, c) {
        var d = c.rows.item(0);
        S(a, Af(d))
    }, function(b, c) {
        S(a, c, !0);
        return !1
    })
};
r.Y = function(a, b, c, d, e, f, g, h, k, n) {
    var m = this, p = [], q = V(this.a, c), s = q.d, A = q.type, z = A, H = null != d && d !== s ? ff(q, d): null, L = d || s;
    H && (z = H.type);
    c = [];
    if (n && u(n[0])) {
        var R = n[0];
        d = H && u(n[1]) ? nf(q, b, c, H.getName(), e, R, !0, n[1], f, k) : of(q, b, c, d, e, f, k, R, !0)
    } else 
        d = pf(q, c, b, L, e, f, k);
    y(g) && (d += " LIMIT " + g);
    y(h) && (d += " OFFSET " + h);
    var ia = a + " SQL: " + d + " ;params= " + Q(c);
    G(this.g, ia);
    a.a.executeSql(d, c, function(c, d) {
        for (var e = d.rows.length, f, g = 0; g < e; g++)
            f = d.rows.item(g), 2 == b ? p[g] = hf(f[s], A) : 1 == b ? p[g] = hf(f[L], z) : 3 == b ? p[g] =
        [hf(f[L], z), hf(f[s], A)] : null != f && (p[g] = jf(f, q));
        F(m.g, "success " + a);
        n && f && (n[0] = hf(f[L], z), n[1] = hf(f[s], A));
        S(a, p)
    }, function(b, c) {
        E(m.g, "error: " + ia + c.message);
        S(a, c, !0);
        return !1
    })
};
function Bf(a, b) {
    wd.call(this, a, b)
}
C(Bf, sf);
Bf.prototype.g = I("ydn.db.core.req.WebSql");
Bf.prototype.b = function(a, b, c, d) {
    c = V(this.a, c);
    return new ef(a, b, c, d)
};
function Cf(a, b, c) {
    J.call(this, 0, c);
    this.b = a;
    this.d = [];
    this.c = [];
    this.B = [];
    this.a = null;
    this.na = "";
    this.o = 0
}
C(Cf, J);
r = Cf.prototype;
r.na = "";
r.bb = I("ydn.db.Request");
function Df(a, b, c) {
    a.a = b;
    a.na = c;
    F(a.bb, a + " BEGIN");
    if (b) {
        for (c = 0; c < a.c.length; c++)
            a.c[c][0].call(a.c[c][1], b);
        a.c.length = 0
    }
    F(a.bb, a + " END")
}
function yf(a) {
    var b = new Cf(a.b);
    a.o++;
    Df(b, a.a, a.na + "C" + a.o);
    return b
}
r.Ec = function() {
    return !!this.a
};
r.Zc = function() {
    if (this.a)
        if (F(this.bb, this + " aborting"), fa(this.a.abort)
            )this.a.abort();
    else if (fa(this.a.executeSql))
        this.a.executeSql("ABORT", [], aa(), ba(!0));
    else 
        throw new Sd;
    else 
        throw new md("No active transaction");
};
function S(a, b, c) {
    var d = a.B.shift();
    c=!!c;
    d ? d[0].call(d[1], b, c, function(b, c) {
        S(a, b, c)
    }) : c ? a.A(b) : a.D(b)
}
function Ef(a, b, c) {
    a.B.push([b, c])
}
function X(a, b, c) {
    a.a ? b.call(c, a.a) : a.c.push([b, c])
}
r.$c = function(a, b) {
    this.d.push([a, b]);
    return this
};
function Ff(a, b) {
    for (var c = 0; c < a.d.length; c++)
        a.d[c][0].call(a.d[c][1], b)
}
r.D = function(a) {
    F(this.bb, this + " SUCCESS");
    Cf.G.D.call(this, a);
    Gf(this)
};
r.A = function(a) {
    F(this.bb, this + " ERROR");
    Cf.G.A.call(this, a);
    Gf(this)
};
function Gf(a) {
    a.d.length = 0;
    a.a = null;
    a.na = a.na
}
function T(a) {
    var b = "";
    a.na && (b = a.a ? "*" : "", b = "[" + a.na + b + "]");
    return a.b + b
}
function Hf(a, b) {
    var c = new Cf(a);
    S(c, b);
    return c
}
r.Lc = function() {
    return this
};
r.toString = function() {
    return "Request:" + T(this)
};
r.toJSON = function() {
    var a = (this.na || "").match(/B(\d+)T(\d+)(?:Q(\d+?))?(?:R(\d+))?/) || [];
    return {
        method: this.b ? this.b.split(":"): [],
        branchNo: parseFloat(a[1]),
        transactionNo: parseFloat(a[2]),
        queueNo: parseFloat(a[3]),
        requestNo: parseFloat(a[4])
    }
};
function If(a) {
    this.d = a;
    this.a = null;
    this.b = 0
}
If.prototype.e = I("ydn.db.tr.Mutex");
If.prototype.U = null;
If.prototype.S = null;
If.prototype.toString = function() {
    return "Mutex:" + ("B" + this.d + "T" + this.b) + (this.a ? "*" : "")
};
function Jf(a, b, c, d, e, f) {
    this.l = a;
    this.c = 0;
    this.n = d;
    this.f = c || "single";
    this.b = [];
    this.d = [];
    this.e = null;
    this.a = new If(b);
    this.Kb = f || 0;
    this.i=!1
}
r = Jf.prototype;
r.Kb = 0;
r.Q = I("ydn.db.tr.Serial");
r.ib = function() {
    return this.a.b
};
function Kf(a, b, c) {
    if ("multi" == a.f)
        a: if (a = a.a, !a.U ||!a.mode || c != a.mode && (a.mode != K || c != uc) || b.length > a.U.length)b=!1;
    else {
        for (c = 0; c < b.length; c++)
            if (-1 == a.U.indexOf(b[c])) {
                b=!1;
                break a
            }
        b=!0
    } else if ("repeat" == a.f)
        a: if (a = a.a, a.U && a.mode && c == a.mode && a.U.length == b.length) {
            for (c = 0; c < b.length; c++)
                if (-1 == a.U.indexOf(b[c])) {
                    b=!1;
                    break a
                }
                b=!0
        } else 
            b=!1;
    else 
        b = "all" == a.f?!0 : !1;
    return b
}
r.type = function() {
    return this.l.qa()
};
function Lf(a) {
    var b = 0 < a.b.length ? a.b[0].U: null, c = 0 < a.b.length ? a.b[0].mode: null;
    return null != b && null != c ? Kf(a, b, c) : !1
}
function Mf(a, b, c, d, e) {
    G(a.Q, "push tx queue[" + a.b.length + "]");
    a.b.push({
        ob: b,
        U: c,
        mode: d,
        S: e
    })
}
r.wa = function(a, b, c, d) {
    var e = x(b) ? [b]: b;
    if (w(e)) {
        if (0 == e.length)
            throw new N("number of store names must more than 0");
        for (var f = 0; f < e.length; f++) {
            if (!x(e[f]))
                throw new N("store name at " + f + " must be string but found " + e[f] + " of type " + typeof e[f]);
            if (this.n&&!(0 <= D(this.n, e[f])))
                throw new N('store name "' + f + e[f] + '" in scope of ' + this);
        }
    } else 
        throw new N("store names must be an array");
    var g = u(c) ? c: uc, h = this;
    if (this.a.a || (!this.l.b ||!this.l.b.fb()) && this.i)
        Mf(this, a, b, g, d);
    else {
        var k = this.N();
        d && this.d.push(d);
        if (this.Kb && this.ib() >= this.Kb)
            throw new Lc("Exceed maximum number of transactions of " + this.Kb);
        this.i=!0;
        this.l.Ma(function(c) {
            var d = h.a;
            d.a = c;
            d.c=!1;
            d.U = b;
            d.mode = g;
            d.b++;
            d.S = null;
            k = h.N();
            fc(h.Q, k + " BEGIN " + Q(b) + " " + g);
            a(h);
            for (a = null; Lf(h);)
                c = h.b.shift(), c.S && h.d.push(c.S), G(h.Q, "pop tx queue" + (h.b.length + 1) + " reusing T" + h.ib()), c.ob()
        }, e, g, function(a, b) {
            fc(h.Q, k + " " + a);
            var c = h.a;
            c.a ? (c.a = null, c.U = null, c.mode = null, fa(c.S) && c.S(a, b), c.S = null) : E(c.e, c + " has no TX to be unlocked for " + a);
            for (c = 0; c <
            h.d.length; c++)(0, h.d[c])(a, b);
            h.d.length = 0;
            (c = h.b.shift()) && h.wa(c.ob, c.U, c.mode, c.S);
            h.c = 0
        })
    }
};
r.N = function() {
    return "B" + this.a.d + "T" + this.a.b
};
r.m = function(a, b, c, d) {
    var e = new Cf(a);
    a = c || uc;
    var f = this;
    this.a.a&&!this.a.c && Kf(this, b, a) ? (b = this.a.a, this.c++, Df(e, b, this.N() + "R" + this.c), d && this.d.push(d)) : f.wa(function() {
        var a = f.a.a;
        f.c++;
        Df(e, a, f.N() + "R" + f.c)
    }, b, a, d);
    return e
};
r.ra = function(a, b, c, d, e) {
    d = d || uc;
    var f = this, g;
    if (f.a.a&&!f.a.c && Kf(this, c, d)) {
        var h = f.a.a;
        f.c++;
        g = f.N() + "R" + f.c;
        F(f.Q, g + " BEGIN");
        b(h, g, function(b, c) {
            f.e = h;
            c ? (F(f.Q, g + " ERROR"), a.A(b)) : (F(f.Q, g + " SUCCESS"), a.D(b));
            f.e = null
        });
        F(f.Q, g + " END");
        b = null
    } else 
        f.wa(function() {
            var c = f.a.a;
            f.c++;
            g = f.N() + "R" + f.c;
            F(f.Q, g + " BEGIN");
            b(c, g, function(b, d) {
                f.e = c;
                d ? (F(f.Q, g + " ERROR"), a.A(b)) : (F(f.Q, g + " SUCCESS"), a.D(b));
                f.e = null
            });
            F(f.Q, g + " END");
            b = null
        }, c, d, e)
};
r.getName = function() {
    return this.l.getName()
};
r.toString = function() {
    return "Serial:" + this.N() + (this.e ? "*" : "")
};
function Nf(a, b) {
    Jf.call(this, a, b)
}
C(Nf, Jf);
Nf.prototype.Q = I("ydn.db.tr.AtomicSerial");
Nf.prototype.m = function(a, b, c) {
    var d, e, f, g = Nf.G.m.call(this, a, b, c, function(a, b) {
        g.a = null;
        if (d)
            "complete" != a && (f=!0, e = b), d(e, f);
        else {
            var c = new sd;
            S(g, c, !0)
        }
    });
    Ef(g, function(a, b, c) {
        f = b;
        e = a;
        d = c
    });
    return g
};
Nf.prototype.ra = function(a, b, c, d, e) {
    var f, g, h = new J;
    h.aa(function(a) {
        g=!1;
        f = a
    }, function(a) {
        g=!0;
        f = a
    });
    Nf.G.ra.call(this, h, b, c, d, function(b, c) {
        if ("complete" != b)
            a.A(c);
        else if (!0 === g)
            a.A(f);
        else if (!1 === g)
            a.D(f);
        else {
            var d = new sd;
            a.A(d)
        }
        e && (e(b, c), e = void 0)
    })
};
Nf.prototype.toString = function() {
    return "Atomic" + Nf.G.toString.call(this)
};
function Of(a, b, c, d) {
    this.l = a;
    this.b = b;
    this.a = c;
    this.d = d;
    this.c = null
}
Of.prototype.j = I("ydn.db.tr.DbOperator");
Of.prototype.e = function() {
    return this.a.ib()
};
function Y(a) {
    a.c || (a.c = a.l.Tb());
    return a.c
}
Of.prototype.toString = function() {
    return "TxStorage:" + this.l.getName()
};
function Pf(a, b, c, d) {
    Of.call(this, a, b, c, d)
}
C(Pf, Of);
r = Pf.prototype;
r.j = I("ydn.db.crud.DbOperator");
r.count = function(a, b, c, d) {
    var e, f, g, h;
    if (null != a)
        if (v(a)) {
            if (u(c) || u(b))
                throw new N("too many arguments.");
                f = a;
                for (var k = 0; k < f.length; k++)
                    if (!Qf(this.b, f[k]))
                        throw new N('store name "' + f[k] + '" at ' + k + " not found.");
                        F(this.j, "countStores: " + Q(f));
                        e = this.a.m("count", f);
                        X(e, function() {
                            Y(this).lb(e, f)
                        }, this)
        } else if (x(a)) {
            k = V(this.b, a);
            if (!k)
                throw new N('store name "' + a + '" not found.');
                if (u(d)&&!ea(d))
                    throw new TypeError('unique value "' + d + '" must be boolean, but found ' + typeof d + ".");
                    f = [a];
                    if (x(b))
                        if (g =
                        b, B(c)
                            ) {
                                var n = Uc(c);
                                if (n)
                                    throw new N("invalid key range: " + be(c) + " " + n);
                                    h = Rc(c)
                                } else {
                                    if (null != c)
                                        throw new N("invalid key range: " + be(c) + " of type " + typeof c);
                                        h = null
                                } else if (B(b) || null == b)
                                    if (B(b)) {
                                        if (n = Uc(b))
                                            throw new N("invalid key range: " + be(b) + " " + n);
                                            h = Rc(b)
                                    } else {
                                        if (null != b)
                                            throw new N("key range must be  an object but found " + be(b) + " of type " + typeof b);
                                            h = null
                                    } else 
                                        throw new N('invalid second argument for count "' + be(c) + '" of type ' + typeof b);
                                        F(this.j, "countKeyRange: " + a + " " + (g ? g : "") + Q(h));
                                        e =
                                        this.a.m("count", f);
                                        Rf(k, e, arguments);
                                        X(e, function() {
                                            Y(this).Sa(e, f[0], h, g, !!d)
                                        }, this)
                                    } else 
                                        throw new N("Invalid store name or store names.");
                                else 
                                    E(this.j, "count method requires store name(s)"), k = Sf(this.b), e = this.a.m("count", k), Ef(e, function(a, b, c) {
        if (b)
            c(a, !0);
        else {
            for (var d = b = 0; d < a.length; d++)
                b += a[d];
            c(b, !1)
        }
    }, this), X(e, function() {
        Y(this).lb(e, f)
    }, this);
    return e
};
r.Oa = function(a, b) {
    var c;
    if (a instanceof td) {
        var d = a, e = d.h(), f = V(this.b, e);
        if (!f) {
            if (this.b.Z())
                return Hf("get", void 0);
            throw new N("Store: " + e + " not found.");
        }
        var g = d.id;
        F(this.j, "getByKey: " + e + ":" + g);
        c = this.a.m("get", [e]);
        Rf(f, c, arguments);
        X(c, function() {
            Y(this).pb(c, e, g)
        }, this)
    } else if (x(a) && u(b)) {
        var h = a, f = V(this.b, h);
        if (!f) {
            if (this.b.Z())
                return Hf("get", void 0);
                throw new N('Store name "' + h + '" not found.');
        }
        var k = b;
        F(this.j, "getById: " + h + ":" + k);
        c = this.a.m("get", [h]);
        Rf(f, c, arguments);
        X(c, function() {
            Y(this).pb(c,
            h, k)
        }, this)
    } else 
        throw new N("get require valid input arguments.");
    return c
};
r.keys = function(a, b, c, d, e, f) {
    var g, h, k = null, n=!1, m = V(this.b, a);
    if (!x(a))
        throw new N("store name must be a string, but " + a + " of type " + typeof a + " is not.");
    if (!this.b.Z()) {
        if (!m)
            throw new N('store name "' + a + '" not found.');
        if (x(b)&&!ff(m, b))
            throw new N('index "' + b + '" not found in store "' + a + '".');
    }
    if (this.b.Z()&&!m)
        return Hf("keys", []);
    var p;
    if (x(b)) {
        if (m = Uc(c))
            throw new N("invalid key range: " + c + " " + m);
        k = Rc(c);
        if (y(d))
            g = d;
        else {
            if (u(d))
                throw new N("limit must be a number");
            g = 100
        }
        if (y(e))
            h = e;
        else {
            if (u(e))
                throw new N("offset must be a number");
            h = 0
        }
        if (u(f))
            if (ea)
                n = f;
            else 
                throw new N("reverse must be a boolean");
        F(this.j, "keysByIndexKeyRange: " + a);
        p = this.a.m("keys:iter:index", [a]);
        X(p, function() {
            Y(this).Y(p, 2, a, b, k, n, g, h, !1)
        }, this)
    } else {
        if (B(b)) {
            if (m = Uc(b))
                throw new N("invalid key range: " + be(b) + " " + m);
            k = Rc(b)
        } else {
            if (null != b)
                throw new TypeError("invalid key range: " + be(b) + " of type " + typeof b);
            k = null
        }
        if (y(c))
            g = c;
        else {
            if (u(c))
                throw new N("limit must be a number");
            g = 100
        }
        if (y(d))
            h = d;
        else {
            if (u(d))
                throw new N("offset must be a number");
            h = 0
        }
        if (u(e))
            if (ea(e))
                n =
                e;
            else 
                throw new N("reverse must be a boolean");
        F(this.j, "keysByKeyRange: " + a);
        p = this.a.m("keys", [a]);
        X(p, function() {
            Y(this).Y(p, 2, a, null, k, n, g, h, !1)
        }, this)
    }
    return p
};
r.P = function(a, b, c, d, e, f) {
    var g, h, k, n=!1;
    if (x(a)) {
        var m = a, p = V(this.b, m);
        if (!p) {
            if (this.b.Z())
                return Hf("get", []);
            throw new od(m);
        }
        if (v(b)) {
            if (u(c) || u(d))
                throw new N("too many input arguments");
            var q = b;
            F(this.j, "listByIds: " + m + " " + q.length + " ids");
            g = this.a.m("values:array", [m]);
            Rf(p, g, arguments);
            X(g, function() {
                Y(this).Rb(g, m, q)
            }, this)
        } else if (x(b)) {
            var s = b;
            if (!Tf(p, s))
                throw new N('index "' + s + '" not found in store "' + m + '"');
                var A = Uc(c);
                if (A)
                    throw new N("invalid key range: " + c + " " + A);
                    var z = Rc(c);
                    if (u(d))
                        if (y(d))
                            h =
                            d;
                        else 
                            throw new N("limit must be a number.");
            else 
                h = 100;
                if (u(e))
                    if (y(e))
                        k = e;
                    else 
                        throw new N("offset must be a number.");
            else 
                k = 0;
                if (ea(f))
                    n = f;
                else if (u(f))
                    throw new N("reverse must be a boolean, but " + f);
                    F(this.j, "listByIndexKeyRange: " + m + ":" + s);
                    g = this.a.m("values:iter:index", [m]);
                    Rf(p, g, arguments);
                    X(g, function() {
                        Y(this).Y(g, 4, m, s, z, n, h, k, !1)
                    }, this)
        } else {
            z = null;
            if (B(b)) {
                if (A = Uc(b))
                    throw new N("invalid key range: " + b + " " + A);
                    z = Rc(b)
                } else if (null != b)
                    throw new TypeError('expect key range object, but found "' +
                    be(b) + '" of type ' + typeof b);
                    if (u(c))
                        if (y(c))
                            h = c;
                        else 
                            throw new N("limit must be a number, but " + c + " is " + typeof c);
            else 
                h = 100;
                if (u(d))
                    if (y(d))
                        k = d;
                    else 
                        throw new N("offset must be a number, but " + d + " is " + typeof d);
            else 
                k = 0;
                if (u(e))
                    if (ea(e))
                        n = e;
                    else 
                        throw new N("reverse must be a boolean, but " + e + " is " + typeof e);
                        F(this.j, (z ? "listByKeyRange: " : "listByStore: ") + m);
                        g = this.a.m("values", [m]);
                        Rf(p, g, arguments);
                        X(g, function() {
                            Y(this).Y(g, 4, m, null, z, n, h, k, !1)
                        }, this)
                    }
    } else if (v(a))
        if (a[0]instanceof td) {
            for (var p =
            [], H = a, A = 0; A < H.length; A++) {
                var L = H[A].h();
                if (!Qf(this.b, L)) {
                    if (this.b.Z())
                        return p = [], p[H.length-1] = void 0, Hf("get", p);
                        throw new N("Store: " + L + " not found.");
                }
                0 <= D(p, L) || p.push(L)
            }
            F(this.j, "listByKeys: " + Q(p) + " " + H.length + " keys");
            g = this.a.m("values:keys", p);
            X(g, function() {
                Y(this).Sb(g, H)
            }, this)
        } else 
            throw new N("first argumentmust be array of ydn.db.Key, but " + a[0] + " of " + typeof a[0] + " found.");
        else 
            throw new N("first argument " + a + " is invalid.");
    return g
};
r.Hb = function(a, b, c) {
    var d = x(a) ? a: B(a) ? a.name: void 0;
    if (!x(d))
        throw new N("store name " + d + " must be a string, but " + typeof d);
    var e = V(this.b, d);
    if (!e) {
        if (!this.b.Z())
            throw new N('store name "' + d + '" not found.');
        e = Uf(B(a) ? a : {
            name: d
        });
        F(this.j, "Adding object store: " + d);
        Vf(this.l, e)
    } else if (this.b.Z() && B(a) && (a = Uf(a), a = Wf(e, a))
        )throw new Sd(a);
    var f;
    if (!e)
        throw new N('store name "' + d + '" not found.');
    if (x(e.keyPath) && u(c))
        throw new N("key must not be provided while the store uses in-line key.");
    if (!e.keyPath &&
    !e.b&&!u(c))
        throw new N("out-of-line key must be provided.");
    if (v(b)) {
        F(this.j, "addObjects: " + d + " " + b.length + " objects");
        for (a = 0; a < b.length; a++)
            Xf(e, b[a]);
        f = this.a.m("add:array", [d], K);
        X(f, function() {
            Y(this).Mb(f, d, b, c)
        }, this);
        e.ua && f.$(function(a) {
            this.l.dispatchEvent(new Yf(Zf, this.l, e.getName(), a, b))
        }, this)
    } else if (B(b))
        a = "store: " + d + " key: " + $f(e, b, c), F(this.j, "addObject: " + a), Xf(e, b), f = this.a.m("add", [d], K), X(f, function() {
        Y(this).Lb(f, d, b, c)
    }, this), e.ua && f.$(function(a) {
        this.l.dispatchEvent(new ag(Zf,
        this.l, e.getName(), a, b))
    }, this);
    else 
        throw new N("record must be an object or array list of objects, but " + b + " of type " + typeof b + " found.");
    return f
};
function bg(a, b) {
    var c = x(b) ? b: B(b) ? b.name: void 0;
    if (!x(c))
        throw new N("store name must be a string");
    var d = V(a.b, c);
    if (!d) {
        if (!a.b.Z())
            throw new od(c);
        d = Uf(B(b) ? b : {
            name: c
        });
        F(a.j, "Adding object store: " + c);
        Vf(a.l, d)
    } else if (a.b.Z() && B(b)) {
        var e = Uf(b);
        if (e = Wf(d, e))
            throw new Sd(e);
    }
    if (!d)
        throw new od(c);
    return d
}
function cg(a, b) {
    var c = dg(b);
    G(a.j, "query " + b);
    var d = a.a.m("search", c, uc);
    X(d, function() {
        var a = Y(this);
        eg(b, function(c, g, h, k) {
            var n = yf(d);
            a.Y(n, 4, c, g, Rc(h), !1, 100, 0, !1);
            n.Ba(function(a) {
                var c = null;
                a instanceof Array || (c = a, a = []);
                for (var e = 0; e < a.length; e++) {
                    var f;
                    f = a[e];
                    var g = f.id, g = x(g) ? Dc(g): g, h = g[3];
                    (f = 1 == this.type && h != this.value ? null : new fg(this, g[0], g[2], g[1], h, f.k, f.loc)) && b.d.push(f)
                }
                b.c--;
                a = 0 == b.c?!1 : b.b[b.b.length-1].i === this.i?!0 : null;
                !0 === a ? Ff(d, b) : !1 === a && d.D(b.e());
                if (c)
                    throw c;
            }, k)
        })
    },
    a);
    return d
}
r.Pa = function(a, b, c) {
    var d, e = this;
    if (a instanceof td) {
        var f = a, g = f.h(), h = V(this.b, g);
        if (!h)
            throw new N('store "' + g + '" not found.');
        if (h.keyPath) {
            var k = $f(h, b);
            if (null != k) {
                if (0 != M(k, f.id))
                    throw new N("Inline key must be " + f + " but " + k + " found.");
            } else 
                tf(h, b, f.id);
            return this.Pa(g, b)
        }
        return this.Pa(g, b, f.id)
    }
    if (v(a)) {
        if (u(c))
            throw new N("too many arguments");
        var n = a;
        if (!u(b))
            throw new N("record values required");
        for (var m = b, f = [], g = 0, h = n.length; g < h; g++) {
            k = n[g].h();
            -1 == D(f, k) && f.push(k);
            var p = V(this.b,
            k);
            if (!p)
                throw new N('store "' + k + '" not found.');
            p.keyPath && tf(p, m[g], n[g].id)
        }
        F(this.j, "putByKeys: to " + Q(f) + " " + m.length + " objects");
        for (g = 0; g < m.length; g++)
            Xf(p, m[g]);
        d = this.a.m("put:keys", f, K);
        Rf(p, d, arguments);
        X(d, function() {
            Y(e).yb(d, m, n)
        }, this)
    } else if (x(a) || B(a)) {
        var p = bg(this, a), q = p.getName();
        if (p.keyPath && u(c))
            throw new N("key must not be provided while the store uses in-line key.");
            if (!p.keyPath&&!p.b&&!u(c))
                throw new N("out-of-line key must be provided.");
                if (v(b)) {
                    var s = b, A = c;
                    F(this.j,
                    "putObjects: " + q + " " + s.length + " objects");
                    for (g = 0; g < s.length; g++)
                        Xf(p, s[g]);
                        d = this.a.m("put:array", [q], K);
                        Rf(p, d, arguments);
                        X(d, function() {
                            Y(this).zb(d, q, s, A)
                        }, this);
                        p.ua && d.$(function(a) {
                            this.l.dispatchEvent(new Yf(gg, this.l, q, a, s))
                        }, this)
                    } else if (B(b)) {
                        var z = b, H = c;
                        F(this.j, "putObject: " + q + " " + H);
                        Xf(p, z);
                        d = this.a.m("put", [q], K);
                        Rf(p, d, arguments);
                        X(d, function() {
                            Y(e).Vb(d, q, z, H)
                        }, this);
                        p.ua && d.$(function(a) {
                            this.l.dispatchEvent(new ag(gg, this.l, q, a, z))
                        }, this)
                    } else 
                        throw new N("put record value must be Object or array of Objects");
            } else 
                throw new N("the first argument of put must be store name, store schema or array of keys.");
    return d
};
function hg(a, b, c) {
    var d = a.d, e, f;
    if (x(b)) {
        var g = V(a.b, b);
        if (g) {
            if (!g.keyPath&&!g.b)
                throw new N('key required for store "' + b + '"');
        } else 
            throw new od(b);
        for (var h = 0; h < c.length; h++)
            Xf(g, c[h]);
        e = [b]
    } else {
        f = b;
        e = [];
        for (var h = 0, k = f.length; h < k; h++) {
            var n = f[h].h(), g = V(a.b, n);
            -1 == D(e, n) && e.push(n);
            if (!g)
                throw new od(n);
            Xf(g, c[h])
        }
    }
    var m;
    x(b) ? (g = V(a.b, b), m = d.m("put:array", e, K), X(m, function() {
        Y(this).zb(m, b, c, void 0)
    }, a)) : (m = d.m("put:keys", e, K), X(m, function() {
        Y(this).yb(m, c, f)
    }, a));
    return m
}
function ig(a, b) {
    for (var c = [], d = 0, e = b.length; d < e; d++) {
        var f = b[d].h();
        -1 == D(c, f) && c.push(f);
        if (!Qf(a.b, f))
            throw new od(f);
    }
    var g = a.d.m("rm:keys", c, K);
    X(g, function() {
        Y(this).Bb(g, b)
    }, a);
    return g
}
function jg(a, b, c) {
    var d = a.d.m("rm:iter", [b], K);
    X(d, function() {
        Y(this).Za(d, b, c || null)
    }, a);
    return d
}
r.clear = function(a, b, c) {
    if (u(c))
        throw new N("too many input arguments");
    var d;
    if (x(a)) {
        c = V(this.b, a);
        if (!c)
            throw new N('store name "' + a + '" not found.');
        if (B(b)) {
            var e = Rc(b);
            if (null === e)
                throw new N("clear method requires a valid non-null KeyRange object.");
            F(this.j, "clearByKeyRange: " + a + ":" + Q(e));
            d = this.a.m("clear", [a], K);
            Rf(c, d, [a, e]);
            X(d, function() {
                Y(this).Pb(d, a, e)
            }, this)
        } else {
            if (u(b))
                throw new N("clear method requires a valid KeyRange object as second argument, but found " + b + " of type " + typeof b);
            F(this.j, "clearByStore: " + a);
            d = this.a.m("clear", [a], K);
            X(d, function() {
                Y(this).jb(d, [a])
            }, this)
        }
    } else if (!u(a) || v(a) && x(a[0])) {
        var f = a || Sf(this.b);
        F(this.j, "clearByStores: " + Q(f));
        d = this.a.m("clear", f, K);
        X(d, function() {
            Y(this).jb(d, f)
        }, this)
    } else 
        throw new N('first argument "' + a + '" is invalid.');
    return d
};
r.Ib = function(a, b, c) {
    var d;
    if (x(a)) {
        var e = V(this.b, a);
        if (!e)
            throw new N('store name "' + a + '" not found.');
        if (u(c))
            if (x(b)) {
                var f = ff(e, b);
                if (!f)
                    throw new N("index: " + b + " not found in " + a);
                    if (B(c) || null === c) {
                        var g = Rc(c);
                        F(this.j, "removeByIndexKeyRange: " + a + ":" + f.getName() + " " + a);
                        d = this.a.m("rm:iter:index", [a], K);
                        X(d, function() {
                            Y(this).Wb(d, a, f.getName(), g)
                        }, this)
                    } else 
                        throw new N("key range " + c + ' is invalid type "' + typeof c + '".');
                } else 
                    throw new N('index name "' + b + '" must be a string, but ' + typeof b +
                    " found.");
            else if (x(b) || y(b) || w(b) || b instanceof Date)
                F(this.j, "removeById: " + a + ":" + b), d = this.a.m("rm", [a], K), Rf(e, d, [a, b]), X(d, function() {
            Y(this).Ab(d, a, b)
        }, this), e.ua && d.$(function(b) {
            this.l.dispatchEvent(new ag(kg, this.l, a, b, void 0))
        }, this);
        else if (B(b))
            g = Rc(b), F(this.j, "removeByKeyRange: " + a + ":" + Q(g)), d = this.a.m("rm:iter", [a], K), Rf(e, d, [a, g]), X(d, function() {
            Y(this).Za(d, a, g)
        }, this), e.ua && d.$(function(b) {
            this.l.dispatchEvent(new Yf(kg, this.l, a, b, void 0))
        }, this);
        else 
            throw new N('Invalid key or key range "' +
            b + '" of type ' + typeof b);
        } else if (a instanceof td) {
            var h = a.h(), e = V(this.b, h);
            d = this.a.m("rm", [h], K);
            Rf(e, d, [h, a.id]);
            X(d, function() {
                Y(this).Ab(d, h, a.id)
            }, this)
        } else if (v(a)) {
            c = [];
            for (var e = 0, k = a.length; e < k; e++) {
                if (!(a[e]instanceof td))
                    throw new N("key list element at " + e + " of " + k + ' must be yn.db.Key, but "' + be(a[e]) + '" (' + da(a[e]) + ") is not ydn.db.Key.");
                    var n = a[e].h();
                    -1 == D(c, n) && c.push(n)
                }
                if (1 > c.length)
                    throw new N('at least one valid key required in key list "' + be(a) + '"');
                    d = this.a.m("rm:keys", c,
                    K);
                    X(d, function() {
                        Y(this).Bb(d, a)
                    }, this)
        } else 
            throw new N('first argument requires store name, key (ydn.db.Key) or list of keys (array) , but "' + be(a) + '" (' + da(a) + ") found.");
    return d
};
r.toString = function() {
    return "DbOperator:" + this.l.getName()
};
function lg(a, b, c, d) {
    Of.call(this, a, b, c, d)
}
C(lg, Pf);
r = lg.prototype;
r.j = I("ydn.db.core.DbOperator");
r.Oa = function(a, b) {
    if (a instanceof P) {
        var c = a.h(), d = V(this.b, c);
        if (!d)
            throw new N('store "' + c + '" not found.');
        var e = a.O();
        if (u(e)&&!Tf(d, e))
            throw new N('index "' + e + '" not found in store "' + c + '".');
        F(this.j, "getByIterator:" + a);
        var f = this.a.m("get:iter", [c]);
        X(f, function() {
            mg(this, 5, f, a, 1)
        }, this);
        return f
    }
    return lg.G.Oa.call(this, a, b)
};
r.keys = function(a, b, c, d, e) {
    if (a instanceof P) {
        var f = 100;
        if (y(b)) {
            if (f = b, 1 > f)
                throw new N("limit must be a positive value, but " + b);
        } else if (u(b))
            throw new N("limit must be a number,  but " + b);
        if (u(c))
            throw new N("offset must not be specified");
        F(this.j, "keysByIterator:" + a);
        var g = this.a.m("keys:iter", a.stores());
        X(g, function() {
            a.c ? mg(this, 1, g, a, f) : mg(this, 2, g, a, f)
        }, this);
        return g
    }
    return lg.G.keys.call(this, a, b, c, d, e)
};
r.count = function(a, b, c) {
    if (a instanceof P) {
        if (u(b) || u(c))
            throw new N("too many arguments.");
        F(this.j, "countIterator:" + a);
        var d = this.a.m("count", a.stores());
        X(d, function() {
            mg(this, 6, d, a)
        }, this);
        return d
    }
    return lg.G.count.call(this, a, b, c)
};
r.P = function(a, b, c, d, e, f) {
    if (a instanceof P) {
        var g;
        if (y(b)) {
            if (g = b, 1 > g)
                throw new N("limit must be a positive value, but " + g);
        } else if (u(b))
            throw new N("limit must be a number, but " + b);
        if (u(c))
            throw new N("offset must not be specified");
        F(this.j, "listByIterator:" + a);
        var h = this.a.m("values:iter", a.stores());
        X(h, function() {
            a.a ? mg(this, 2, h, a, g) : mg(this, 4, h, a, g)
        }, this);
        return h
    }
    return lg.G.P.call(this, a, b, c, d, e, f)
};
r.wc = function(a, b) {
    var c = new J;
    if (u(b)) {
        if (!v(b))
            throw new TypeError("Iterator argument must be an array.");
        for (var d = 0; d < b.length; d++)
            if (!(b[d]instanceof P))
                throw new TypeError("Iterator at " + d + " must be cursor range iterator.");
    }
    var e;
    e = b ? b : null;
    for (var f = [], d = 0; d < e.length; d++)
        for (var g = e[d].stores(), h = 0; h < g.length; h++)
            0 <= D(f, g[h]) || f.push(g[h]);
    G(this.j, this + ": scan for " + e.length + " iterators on " + f);
    var k = this;
    this.a.ra(c, function(b, c, d) {
        function f() {
            for (var a = 0, d = 0; d < e.length; d++) {
                var p = e[d],
                q = Y(k).b(b, c, p.h());
                hd(p, q);
                q.n = g;
                q.i = na(h, a);
                U[d] = q;
                R[a] = d;
                a++
            }
            L = e.length
        }
        function g(a) {
            for (var b = 0; b < U.length; b++)
                Nd(U[b]);
            Qa(U);
            F(k.j, z + " error");
            d(a, !0)
        }
        function h(b, c) {
            if (H)
                throw new Cd;
            Aa++;
            var f = Aa === L, g = R[b], m = e[g], n = U[g], g = n.q(), n = n.I();
            ia[b] = c;
            Ma[b] = m.c ? m.a ? g : n : m.a ? c : n;
            if (f) {
                var q;
                q = a instanceof Pd ? a.c(ia, Ma) : a(ia, Ma);
                f = [];
                m = [];
                g = [];
                n = [];
                if (v(q))
                    for (var s = 0; s < q.length; s++)
                        !0 === q[s] ? g[s] = 1 : !1 === q[s] ? n[s]=!0 : m[s] = q[s];
                else if (null === q)
                    f = [];
                else if (u(q))
                    if (B(q)) {
                        f = ["advance", "continue", "continuePrimary",
                        "restart"];
                        for (s in q)
                            if (!(0 <= D(f, s)))
                                throw new Lc('Unknown attribute "' + s + '" in cursor advancement object');
                                f = q.continuePrimary || [];
                                m = q["continue"] || [];
                                g = q.advance || [];
                                n = q.restart || []
                    } else 
                        throw new Td("scan callback output");
                        else 
                            for (f = [], s = 0;
                            s < e.length;
                            s++)u(R[s]) && (g[s] = 1); for (s = Aa = q = 0; s < e.length; s++)
                                null != f[s] || u(m[s]) || null != n[s] || null != g[s] || Aa++;
                for (s = 0; s < e.length; s++)
                    if (null != f[s] || u(m[s]) || null != n[s] || null != g[s]) {
                        var A = R[s];
                        if (!u(A))
                            throw new Td(s + " is not an iterator.");
                            var A = e[A], Jb = U[s];
                            if (null == ia[s]) {
                                var bf = s + "/" + e.length;
                                if (null != g[s])
                                    throw new Hd(Jb + " " + bf + " must not advance " + g[s] + " steps");
                                    if (u(m[s]))
                                        throw new Hd(Jb + " " + bf + " must not continue to key " + m[s]);
                                        if (null != f[s])
                                            throw new Hd(Jb + " " + bf + " must not continue to primary key " + f[s]);
                            }
                            ia[s] = void 0;
                            Ma[s] = void 0;
                            if (null != n[s])
                                Od(Jb);
                            else if (u(m[s]))
                                Jb.Na(m[s]);
                            else if (null != f[s])
                                Jb.hb(f[s]);
                            else if (null != g[s])
                                Jb.advance(1);
                            else 
                                throw new Cd(A + ": has no action");
                                q++
                    }
                if (0 == q) {
                    for (s = 0; s < U.length; s++)
                        Nd(U[s]);
                    H=!0;
                    Qa(U);
                    F(k.j,
                    "success " + z);
                    d(void 0)
                }
            }
        }
        var z = c + " " + k + " scanning";
        G(k.j, z);
        var H=!1, L, R = [], ia = [], Ma = [], U = [], Aa = 0;
        a instanceof Pd ? a.b(e, function() {
            f()
        }) || f() : f()
    }, f, uc);
    return c
};
r.vc = function(a, b, c, d) {
    if (!(b instanceof P))
        throw new N("Second argument must be cursor range iterator.");
    if (!V(this.b, b.h()))
        throw new N('Store "' + b.h() + '" not found.');
    c = c || uc;
    var e = this, f = this.a.m("open", b.stores(), c);
    F(this.j, "open:" + c + " " + b);
    X(f, function(c) {
        var h = T(f);
        F(e.j, h + " iterating " + b);
        var k = Y(e).b(c, h, b.h());
        hd(b, k);
        k.n = function(a) {
            S(f, a, !0)
        };
        k.i = function(b) {
            null != b ? (b = a.call(d, k), !0 === b ? Od(k) : B(b)?!0 === b.restart ? Od(k, b["continue"], b.continuePrimary) : null != b["continue"] ? k.Na(b["continue"]) :
            null != b.continuePrimary ? k.hb(b.continuePrimary) : (Nd(k), S(f, void 0)) : k.advance(1)) : (Nd(k), S(f, void 0))
        }
    }, this);
    return f
};
r.map = function(a, b) {
    for (var c = this, d = a.stores(), e, f = 0; e = d[f]; f++)
        if (!e)
            throw new N('Store "' + e + '" not found.');
    e = new J;
    G(this.j, "map:" + a);
    this.a.ra(e, function(d, e, f) {
        G(c.j, e + " iterating " + a);
        var n = Y(c).b(d, e, a.h());
        hd(a, n);
        n.n = function(a) {
            f(a, !1)
        };
        n.i = function(c) {
            null != c ? (c = a.c ? a.a ? c : n.q() : a.a ? c : n.I(), b(c), n.advance(1)) : (f(void 0), b = null)
        }
    }, d, uc);
    return e
};
r.reduce = function(a, b, c) {
    for (var d = this, e = a.stores(), f, g = 0; f = e[g]; g++)
        if (!f)
            throw new N('Store "' + f + '" not found.');
    f = new J;
    var h = B(c) ? ae(Q(c)): c;
    F(this.j, "reduce:" + a);
    this.a.ra(f, function(c, e, f) {
        var g = Y(d).b(c, e, a.h());
        hd(a, g);
        g.n = function(a) {
            f(a, !0)
        };
        var q = 0;
        g.i = function(c) {
            null != c ? (c = a.c ? a.a ? c : g.q() : a.a ? c : g.I(), h = b(h, c, q++), g.advance(1)) : f(h)
        }
    }, e, uc);
    return f
};
function ng(a, b, c, d) {
    var e = c.h(), f = c.O() || null, g = d || 100;
    F(a.j, "listIter:" + b + " " + c + (d ? " limit=" + g : "") + "");
    var h = a.a.m("values:iter:index", [e]), k = "done" == c.e || c.e == $c ? []: [c.o, c.q()];
    X(h, function() {
        Y(this).Y(h, b, e, f, c.Ja(), c.V(), g, 0, c.W(), k)
    }, a);
    h.$(function() {
        null != k[0] ? c.Cb("rest", k[0], k[1]) : c.Cb()
    });
    return h
}
function mg(a, b, c, d, e) {
    var f = [], g = c.a, h = T(c), k = h + " " + b + "ByIterator " + d;
    0 < e && (k += " limit " + e);
    F(a.j, k);
    var n = Y(a).b(g, h, d.h());
    hd(d, n);
    n.n = function(a) {
        Nd(n);
        S(c, a, !0)
    };
    var m = 0, p=!1;
    n.i = function(g) {
        p || (G(a.j, k + " starting"), p=!0);
        if (null != g) {
            var h = d.c ? n.q(): g;
            m++;
            1 == b ? f.push(g) : 2 == b ? f.push(n.q()) : 3 == b ? f.push([g, n.q()]) : 6 != b && f.push(d.a ? h : n.I());
            5 == b ? (Nd(n), S(c, f[0])) : 6 == b ||!u(e) || m < e ? n.Na() : (F(a.j, "success:" + k + " yields " + f.length + " records"), Nd(n), S(c, f))
        } else 
            F(a.j, "success:" + k + " yields " + f.length +
            " records"), Nd(n), S(c, 5 == b ? f[0] : 6 == b ? m : f)
    }
};
J.prototype.done = J.prototype.$;
J.prototype.fail = J.prototype.dc;
J.prototype.then = J.prototype.aa;
J.prototype.always = J.prototype.Ba;
Ge.prototype.addEventListener = Ge.prototype.Qb;
var Zf = "created", kg = "deleted", gg = "updated";
function og(a, b) {
    ge.call(this, a, b)
}
C(og, ge);
og.prototype.h = l("c");
function pg(a, b, c, d, e) {
    ge.call(this, a, b);
    this.version = c;
    this.yc = d;
    this.pc = e
}
C(pg, og);
r = pg.prototype;
r.name = "ReadyEvent";
r.version = NaN;
r.yc = NaN;
r.pc = null;
r.ed = l("version");
r.Gc = l("yc");
r.Fc = l("pc");
function qg(a, b, c) {
    ge.call(this, c || "error", a);
    this.error = b
}
C(qg, og);
qg.prototype.name = "ErrorEvent";
qg.prototype.error = null;
qg.prototype.e = l("error");
function rg(a, b) {
    qg.call(this, a, b, "fail")
}
C(rg, qg);
rg.prototype.name = "FailEvent";
function ag(a, b, c, d, e) {
    ge.call(this, a, b);
    this.c = c;
    this.key = d;
    this.value = e
}
C(ag, og);
ag.prototype.name = "RecordEvent";
ag.prototype.e = l("key");
ag.prototype.I = l("value");
function Yf(a, b, c, d, e) {
    ge.call(this, a, b);
    this.c = c;
    this.keys = d;
    this.P = e
}
C(Yf, og);
Yf.prototype.name = "StoreEvent";
Yf.prototype.Ua = l("keys");
Yf.prototype.qb = l("P");
function sg(a, b, c, d, e, f) {
    u(e) || (e = v(a) ? a.join(", ") : a);
    if (null != a&&!x(a)&&!w(a))
        throw new N("index keyPath for " + e + " must be a string or array, but " + a + " is " + typeof a);
    v(a) && Object.freeze && Object.freeze(a);
    !u(a) && u(e) && (a = e);
    this.keyPath = a;
    this.e = w(this.keyPath);
    this.name = e;
    this.type = tg(b);
    if (u(b)) {
        if (!u(this.type))
            throw new N("type invalid in index: " + this.name);
        if (v(this.keyPath))
            throw new N('composite key for store "' + this.name + '" must not specified type');
    }
    this.unique=!!c;
    this.multiEntry=!!d;
    this.f = x(this.type) ? this.type : ug;
    this.c = x(e) ? e : v(a) ? this.keyPath.join(",") : a;
    this.b = Fa(this.c);
    this.a = this.e || this.multiEntry ? null : this.keyPath.split(".");
    this.d = f || null
}
function vg(a, b) {
    if (null != b) {
        if (w(a.keyPath)) {
            for (var c = [], d = 0, e = a.keyPath.length; d < e; d++) {
                var f = xc(b, a.keyPath[d]);
                c[d] = f
            }
            return c
        }
        return xc(b, a.keyPath)
    }
}
function vf(a, b, c) {
    for (var d = 0; d < a.a.length; d++)
        d == a.a.length-1 ? b[a.a[d]] = c : B(b[a.a[d]]) || (b[a.a[d]] = {})
}
var uf = "DATE", ug = "TEXT";
function Xc(a, b) {
    if (b == uf) {
        if (a instanceof Date)
            return + a
    } else 
        return null != b ? a : Ac(a)
}
function hf(a, b) {
    return b == uf ? new Date(a) : u(b) ? a : Dc(a)
}
var wg = ["BLOB", uf, "INTEGER", "NUMERIC", ug];
function tg(a) {
    if (x(a))
        return a = D(wg, a), wg[a]
}
sg.prototype.getName = l("name");
sg.prototype.toJSON = function() {
    return {
        name: this.name,
        keyPath: this.keyPath,
        type: this.type,
        unique: this.unique,
        multiEntry: this.multiEntry
    }
};
sg.prototype.Da = function() {
    var a = v(this.keyPath) ? Sa(this.keyPath): this.keyPath;
    return new sg(a, this.type, this.unique, this.multiEntry, this.name, this.d)
};
function xg(a, b) {
    return null != a || null != b ? null != a ? null != b ? w(a) && w(b) ? Va(a, b) ? null : "expect: " + a + ", but: " + b : yg(a, b) ? null : "expect: " + a + ", but: " + b : "keyPath: " + a + " no longer defined" : "newly define " + b : null
}
sg.prototype.hint = function(a) {
    if (!a)
        return this;
    var b = v(this.keyPath) ? Sa(this.keyPath): this.keyPath, c = this.type;
    u(a.type) || "TEXT" != c || (c = void 0);
    return new sg(b, c, this.unique, this.multiEntry, a.name)
};
function zg(a, b, c, d, e, f, g) {
    this.name = a;
    if (!x(this.name))
        throw new N("store name must be a string");
    this.keyPath = u(b) ? b : null;
    this.i = w(this.keyPath);
    if (null !== this.keyPath&&!x(this.keyPath)&&!this.i)
        throw new N("keyPath must be a string or array");
    this.b = c;
    var h;
    if (null != d) {
        h = tg(d);
        if (!u(h))
            throw new N('type "' + d + '" for primary key in store "' + this.name + '" is invalid.');
        if (this.i)
            throw new N('composite key for store "' + this.name + '" must not specified type');
    }
    this.type = null != h ? h : this.b ? "INTEGER" : void 0;
    this.e = x(this.keyPath) ? this.keyPath.split(".") : [];
    this.a = e || [];
    this.ua=!!f;
    this.zc=!!g;
    this.n = x(this.type) ? this.type : ug;
    this.d = v(this.keyPath) ? this.keyPath.join(",") : x(this.keyPath) ? this.keyPath : "_ROWID_";
    this.c = Fa(this.d);
    this.f = []
}
r = zg.prototype;
r.ua=!1;
r.zc=!1;
r.toJSON = function() {
    for (var a = [], b = 0; b < this.a.length; b++)
        a.push(this.a[b].toJSON());
    return {
        name: this.name,
        keyPath: this.keyPath,
        autoIncrement: this.b,
        type: this.type,
        indexes: a
    }
};
function Uf(a) {
    var b = "name keyPath autoIncrement type indexes dispatchEvents fixed Sync".split(" "), c;
    for (c in a)
        if (a.hasOwnProperty(c)&&-1 == D(b, c))
            throw new N('Unknown attribute "' + c + '"');
    b = [];
    c = a.indexes || [];
    if (v(c))
        for (var d = 0; d < c.length; d++) {
            var e;
            e = c[d];
            var f = "name unique type keyPath multiEntry generator".split(" "), g = void 0;
            for (g in e)
                if (e.hasOwnProperty(g)&&-1 == D(f, g))
                    throw new N("Unknown field: " + g + " in " + Q(e));
                    e = new sg(e.keyPath, e.type, e.unique, e.multiEntry, e.name, e.generator);
                    u(e.keyPath) &&
                    e.keyPath === a.keyPath || b.push(e)
        }
    return new zg(a.name, a.keyPath, a.autoIncrement, "undefined" === a.type || "null" === a.type ? void 0 : a.type, b, a.dispatchEvents, a.fixed)
}
function pf(a, b, c, d, e, f, g) {
    a = lf(a, b, c, d, e, f, g);
    b = "";
    0 != c && (b += "SELECT " + a.select);
    b += " FROM " + a.ba;
    a.s && (b += " WHERE " + a.s);
    a.group && (b += " GROUP BY " + a.group);
    a.da && (b += " ORDER BY " + a.da);
    return b
}
function lf(a, b, c, d, e, f, g) {
    var h = {
        select: "",
        ba: "",
        s: "",
        group: "",
        da: ""
    }, k = a.d, n = a.c, m = null;
    d !== k && x(d) && (m = ff(a, d));
    var p=!!m, q = d || k, s = Fa(q), A = p ? m.type : a.type, z = p && m.multiEntry;
    h.ba = rf(a);
    6 === c ? h.select = "COUNT(" + n + ")" : 3 === c || 1 === c || 2 === c ? (h.select = n, null != d && d != k && (h.select += ", " + s)) : h.select = "*";
    d = g ? "DISTINCT " : "";
    k = [];
    z ? (z = Fa("ydn.db.me:" + a.getName() + ":" + m.getName()), h.select = 6 === c ? "COUNT(" + d + z + "." + s + ")" : 3 === c || 1 === c || 2 === c ? "DISTINCT " + rf(a) + "." + n + ", " + z + "." + s + " AS " + q : "DISTINCT " + rf(a) + ".*, " + z +
    "." + s + " AS " + q, h.ba = z + " INNER JOIN " + rf(a) + " USING (" + n + ")", null != e && (Wc(z + "." + s, A, e, k, b), 0 < k.length && (h.s = h.s ? h.s + (" AND " + k.join(" AND ")) : k.join(" AND ")))) : null != e && (Wc(s, A, e, k, b), 0 < k.length && (h.s = h.s ? h.s + (" AND " + k.join(" AND ")) : k.join(" AND ")));
    p&&!m.unique && g && (h.group = s);
    a = f ? "DESC" : "ASC";
    h.da = s + " " + a;
    p && (h.da += ", " + n + " " + a);
    return h
}
function of(a, b, c, d, e, f, g, h, k) {
    var n, m, p, q;
    null != e ? (n = e.lower, m = e.upper, p = e.lowerOpen, q = e.upperOpen, f ? null != m ? (e = M(h, m), -1 == e ? (m = h, q = k) : 0 == e && (q = k || q)) : (m = h, q = k) : null != n ? (e = M(h, n), 1 == e ? (n = h, p = k) : 0 == e && (p = k || p)) : (n = h, p = k)) : f ? (m = h, q = k) : (n = h, p = k);
    e = new O(n, m, !!p, !!q);
    d = d ? ff(a, d) : null;
    b = lf(a, c, b, d ? d.c : a.d, e, f, g);
    b = "SELECT " + b.select + " FROM " + b.ba + (b.s ? " WHERE " + b.s : "") + (b.group ? " GROUP BY " + b.group : "") + " ORDER BY " + b.da;
    d && (b += ", " + a.c + (f ? "DESC" : "ASC"));
    return b
}
function nf(a, b, c, d, e, f, g, h, k, n) {
    var m = ff(a, d), p = m.c;
    d = m.b;
    var q = a.c, s = k ? " <": " >", s = g ? s + " ": s + "= ";
    g = Xc(f, m.type);
    h = Xc(h, a.type);
    m = "";
    e ? (a = lf(a, c, b, p, e, k, n), a.s += " AND ", m = d + s + "?", c.push(g)) : (e = k ? O.upperBound(f, !0) : O.lowerBound(f, !0), a = lf(a, c, b, p, e, k, n), m = a.s, a.s = "");
    a.s += "(" + m + " OR (" + d + " = ? AND " + q + s + "?))";
    c.push(g);
    c.push(h);
    return "SELECT " + a.select + " FROM " + a.ba + " WHERE " + a.s + (a.group ? " GROUP BY " + a.group : "") + " ORDER BY " + a.da
}
r.Da = function() {
    return Uf(this.toJSON())
};
r.index = function(a) {
    return this.a[a] || null
};
function ff(a, b) {
    return Oa(a.a, function(a) {
        return a.name == b
    })
}
function Tf(a, b) {
    return b === a.keyPath?!0 : La(a.a, function(a) {
        return a.name == b
    })
}
function rf(a) {
    return Fa(a.name)
}
r.hint = function(a) {
    if (!a)
        return this;
    var b = this.b, c = v(this.keyPath) ? Sa(this.keyPath): this.keyPath, d = this.type, e = Ka(this.a, function(a) {
        return a.Da()
    });
    u(a.type) || "TEXT" != d || (d = void 0);
    v(a.keyPath) && x(c) && c == a.keyPath.join(",") && (c = Sa(a.keyPath));
    for (var f = 0, g = a.a.length; f < g; f++)
        if (a.a[f].e)
            for (var h = a.a[f].getName(), k = e.length-1; 0 <= k; k--)
                if (0 <= h.indexOf(e[k].getName())) {
                    e[k] = a.a[f].Da();
                    break
                }
    for (f = 0; f < e.length; f++)(g = ff(a, e[f].getName())
        ) && (e[f] = e[f].hint(g));
    return new zg(a.name, c, b, d, e)
};
r.getName = l("name");
function xf(a) {
    return !!a.keyPath
}
function $f(a, b, c) {
    if (!a.keyPath && null != c)
        return c;
    if (a.i) {
        c = [];
        for (var d = 0; d < a.keyPath.length; d++)
            c.push(xc(b, a.keyPath[d]));
        return c
    }
    if (a.keyPath)
        return ab(b, a.e)
}
function tf(a, b, c) {
    for (var d = 0; d < a.e.length; d++) {
        var e = a.e[d];
        if (d == a.e.length-1) {
            b[e] = c;
            break
        }
        u(b[e]) || (b[e] = {});
        b = b[e]
    }
}
function qf(a, b, c) {
    var d = [], e = [];
    c = u(c) ? c : $f(a, b);
    u(c) && (e.push(a.c), d.push(Xc(c, a.type)));
    for (var f = 0; f < a.a.length; f++) {
        var g = a.a[f];
        if (!g.multiEntry && g.name !== a.keyPath && "_default_" != g.name) {
            var h = vg(g, b);
            null != h && (d.push(Xc(h, g.type)), e.push(g.b))
        }
    }
    a.zc || (d.push(Q(b)), e.push("_default_"));
    a = [];
    for (f = d.length-1; 0 <= f; f--)
        a[f] = "?";
    return {
        hc: e,
        rc: a,
        P: d,
        key: c
    }
}
function Wf(a, b) {
    if (!b)
        return "missing store: " + a.name;
    if (a.name != b.name)
        return "store name, expect: " + a.name + ", but: " + b.name;
    var c = xg(a.keyPath, b.keyPath);
    if (c)
        return "keyPath, " + c;
    if (u(a.b) && u(b.b) && a.b != b.b)
        return "autoIncrement, expect:  " + a.b + ", but: " + b.b;
    if (a.a.length != b.a.length)
        return "indexes length, expect:  " + a.a.length + ", but: " + b.a.length;
    if (u(a.type) && u(b.type) && (w(a.type)?!Va(a.type, b.type) : a.type != b.type))
        return "data type, expect:  " + a.type + ", but: " + b.type;
    for (c = 0; c < a.a.length; c++) {
        var d =
        ff(b, a.a[c].name), e;
        e = a.a[c];
        if (d)
            if (e.name != d.name)
                e = "name, expect: " + e.name + ", but: " + d.name;
            else {
                var f = xg(e.keyPath, d.keyPath);
                e = f ? "keyPath, " + f : null != e.unique && null != d.unique && e.unique != d.unique ? "unique, expect: " + e.unique + ", but: " + d.unique : null != e.multiEntry && null != d.multiEntry && e.multiEntry != d.multiEntry ? "multiEntry, expect: " + e.multiEntry + ", but: " + d.multiEntry : u(e.type) && u(d.type) && (w(e.type)?!Va(e.type, d.type) : e.type != d.type) ? "data type, expect: " + e.type + ", but: " + d.type : ""
            } else 
                e = "no index for " +
                e.name;
        if (0 < e.length)
            return 'index "' + a.a[c].name + '" ' + e
    }
    return ""
}
function Xf(a, b) {
    if (b)
        for (var c = 0; c < a.a.length; c++) {
            var d = a.a[c], e = b;
            if (d.d) {
                var f = d.d(e), g = typeof f;
                if ("string" == g || "number" == g || "array" == g || "undefined" == g || f instanceof Date) {
                    for (g = 0; g < d.a.length-1; g++)
                        B(e[d.a[g]]) || (e[d.a[g]] = {});
                        e[d.a[d.a.length-1]] = f
                }
            }
        }
}
function Ag(a, b) {
    a.f.push(b)
}
function Rf(a, b, c) {
    for (var d = 0; d < a.f.length; d++)
        if (void 0 !== d)
            a.f[d](b, c)
}
r.O = function(a) {
    var b, c = a;
    if (v(a)) {
        a:
        {
            for (b = 0; b < this.a.length; b++)
                if (!xg(this.a[b].keyPath, a)) {
                    b = this.a[b];
                    break a
                }
            b = null
        }
        c = a.join(", ")
    } else 
        b = ff(this, a);
    if (!b)
        throw new N('require index "' + c + '" not found in store "' + this.getName() + '"');
    return b.getName()
};
function Bg(a, b, c) {
    if (!a || sa(a))
        throw new N("store_name must be provided for primary full text index");
    if (!b || sa(b))
        throw new N("index_name must be provided for primary full text index");
    this.b = a;
    this.a = b;
    this.c = c || 1
}
Bg.prototype.h = l("b");
function Cg(a, b, c, d) {
    this.name = a;
    this.b = b;
    this.c = c || "";
    if (-1 == ["", "en", "fr"].indexOf(this.c))
        throw new N('Unsupported lang "' + c + " for full text search index " + a);
    this.d = d || null;
    this.a = null
}
Cg.prototype.getName = l("name");
Cg.prototype.count = function() {
    return this.b.length
};
Cg.prototype.index = function(a) {
    return this.b[a]
};
function Dg(a, b, c) {
    return Oa(a.b, function(a) {
        return a.h() == b && a.a == c
    })
}
function Eg(a) {
    var b = ["name", "sources", "lang"], c;
    for (c in a)
        if (a.hasOwnProperty(c)&&-1 == D(b, c))
            throw new N("Unknown field: " + c + " in " + Q(a));
    if (!v(a.sources))
        throw new N("indexes require for full text search index " + a.name + ", but " + a.sources + " of type " + typeof a.sources + " found.");
    b = a.sources.map(function(a) {
        var b = ["storeName", "keyPath", "weight"], c;
        for (c in a)
            if (a.hasOwnProperty(c)&&-1 == D(b, c))
                throw new N("Unknown field: " + c + " in " + be(a));
        return new Bg(a.storeName, a.keyPath, a.weight)
    });
    return new Cg(a.name,
    b, a.lang)
};
function Fg(a, b) {
    var c, d, e = b;
    if (B(a)) {
        d = a;
        c = ["version", "stores", "fullTextCatalogs"];
        for (var f in d)
            if (d.hasOwnProperty(f)&&-1 == D(c, f))
                throw new N("Unknown field: " + f + " in schema.");
        c = d.version;
        var e = [], g = d.stores || [];
        if (!v(g))
            throw new N("stores must be array");
        for (f = 0; f < g.length; f++) {
            var h = Uf(g[f]);
            if (-1 != Pa(e, function(a) {
                return a.name == h.name
            }))
                throw new N('duplicate store name "' + h.name + '".');
            e.push(h)
        }
    } else 
        x(a) ? c = 0 == a.length ? void 0 : parseFloat(a) : y(a) && (c = a);
    if (u(c)) {
        if (!y(c) || 0 > c)
            throw new N("Invalid version: " +
            c + " (" + a + ")");
        isNaN(c) && (c = void 0)
    }
    if (u(b) && (!v(b) || 0 < b.length&&!(b[0]instanceof zg)))
        throw new N("stores");
    this.version = c;
    this.Fa=!u(this.version);
    this.stores = e || [];
    c = [];
    if (d && d.fullTextCatalogs)
        for (f = 0; f < d.fullTextCatalogs.length; f++)
            e = Eg(d.fullTextCatalogs[f]), c[f] = e, V(this, e.getName()) || (g = [new sg("k", ug), new sg("v", ug)], e = new zg(e.getName(), "id", !1, void 0, g), this.stores.push(e));
    this.a = c
}
r = Fg.prototype;
r.toJSON = function() {
    var a = Ka(this.stores, function(a) {
        return a.toJSON()
    }), b = {};
    b.stores = a;
    u(this.version) && (b.version = this.version);
    return b
};
r.Fa=!1;
r.Z = ba(!1);
function Sf(a) {
    return Ka(a.stores, function(a) {
        return a.name
    })
}
r.ya = function(a) {
    return this.stores[a] || null
};
r.count = function() {
    return this.stores.length
};
function V(a, b) {
    return Oa(a.stores, function(a) {
        return a.name == b
    })
}
function Qf(a, b) {
    return La(a.stores, function(a) {
        return a.name == b
    })
}
function Gg(a, b, c) {
    if (!b || a.stores.length != b.stores.length)
        return "Number of store: " + a.stores.length + " vs " + b.stores.length;
    for (var d = 0; d < a.stores.length; d++) {
        var e = V(b, a.stores[d].name), e = e && c ? e.hint(a.stores[d]): e, e = Wf(a.stores[d], e);
        if (0 < e.length)
            return 'store: "' + a.stores[d].name + '" ' + e
    }
    return ""
}
function Hg(a, b) {
    return Oa(a.a, function(a) {
        return a.getName() == b
    })
};
function Ig(a, b) {
    Fg.call(this, a, b)
}
C(Ig, Fg);
Ig.prototype.Z = ba(!0);
function Jg(a, b) {
    a.stores.push(b)
};
function yg(a, b) {
    var c;
    c = c || {};
    if (null != a && null != b) {
        if (w(a) && w(b)) {
            if (a.length != b.length)
                return !1;
            for (var d = 0; d < a.length; d++)
                if (-1 == Oa(b, function(b) {
                    return yg(b, a[d])
                }))
                    return !1;
            return !0
        }
        if (w(a))
            return 1 == a.length && yg(a[0], b);
        if (w(b))
            return 1 == b.length && yg(b[0], a);
        if (B(a) && B(a)) {
            for (var e in a)
                if (a.hasOwnProperty(e)&&!c[e]) {
                    var f = yg(a[e], b[e]);
                    if (!f)
                        return !1
                }
            for (e in b)
                if (b.hasOwnProperty(e)&&!c[e] && (f = yg(a[e], b[e]), !f))
                    return !1;
            return !0
        }
        return a === b
    }
    return !1
}
function Af(a) {
    if (a)
        for (var b in a)
            if (a.hasOwnProperty(b))
                return a[b]
};
function Kg() {};
function Lg() {}
C(Lg, Kg);
Lg.prototype.clear = function() {
    var a = hb(this.Ra(!0)), b = this;
    Ja(a, function(a) {
        b.a.removeAttribute(Mg(a));
        Ng(b)
    })
};
function Og(a, b) {
    if (vb&&!(vb && 9 <= Lb)) {
        Pg || (Pg = new ib);
        var c = Pg;
        this.a = Object.prototype.hasOwnProperty.call(c.b, a) ? c.b[a] : void 0;
        this.a || (b ? this.a = document.getElementById(b) : (this.a = document.createElement("userdata"), this.a.addBehavior("#default#userData"), document.body.appendChild(this.a)), jb(Pg, a, this.a));
        this.b = a;
        try {
            this.a.load(this.b)
        } catch (d) {
            this.a = null
        }
    }
}
C(Og, Lg);
var Qg = {
    ".": ".2E",
    "!": ".21",
    "~": ".7E",
    "*": ".2A",
    "'": ".27",
    "(": ".28",
    ")": ".29",
    "%": "."
}, Pg = null;
Og.prototype.a = null;
Og.prototype.b = null;
function Mg(a) {
    return "_" + encodeURIComponent(a).replace(/[.!~*'()%]/g, function(a) {
        return Qg[a]
    })
}
Og.prototype.Ra = function(a) {
    var b = 0, c = this.a.XMLDocument.documentElement.attributes, d = new eb;
    d.a = function() {
        if (b >= c.length)
            throw db;
        var d = c[b++];
        if (a)
            return decodeURIComponent(d.nodeName.replace(/\./g, "%")).substr(1);
        d = d.nodeValue;
        if (!x(d))
            throw "Storage mechanism: Invalid value was encountered";
        return d
    };
    return d
};
Og.prototype.clear = function() {
    for (var a = this.a.XMLDocument.documentElement, b = a.attributes.length; 0 < b; b--)
        a.removeAttribute(a.attributes[b-1].nodeName);
    Ng(this)
};
function Ng(a) {
    try {
        a.a.save(a.b)
    } catch (b) {
        throw "Storage mechanism: Quota exceeded";
    }
};
function Rg(a, b, c) {
    a = ["ydn.db", a];
    u(b) && (a.push(b), u(c) && (a.push(c), u(void 0) && a.push(Ac(void 0))));
    return a.join("^|")
};
function Sg(a) {
    this.R = a || Tg
}
function Tg(a, b) {
    return String(a) < String(b)?-1 : String(a) > String(b) ? 1 : 0
}
r = Sg.prototype;
r.M = null;
r.R = null;
r.ha = null;
r.ga = null;
function Ug(a, b) {
    if (null == a.M)
        a.M = new Vg(b), a.ha = a.M, a.ga = a.M;
    else {
        var c = null;
        Wg(a, function(a) {
            var e = null;
            0 < this.R(a.value, b) ? (e = a.left, null == a.left && (c = new Vg(b, a), a.left = c, a == this.ha && (this.ha = c))) : 0 > this.R(a.value, b) && (e = a.right, null == a.right && (c = new Vg(b, a), a.right = c, a == this.ga && (this.ga = c)));
            return e
        });
        c && (Wg(a, function(a) {
            a.count++;
            return a.parent
        }, c.parent), Xg(a, c.parent))
    }
}
function Yg(a, b) {
    Wg(a, function(a) {
        var d = null;
        0 < this.R(a.value, b) ? d = a.left : 0 > this.R(a.value, b) ? d = a.right : Zg(this, a);
        return d
    })
}
r.clear = function() {
    this.ga = this.ha = this.M = null
};
r.contains = function(a) {
    var b=!1;
    Wg(this, function(c) {
        var d = null;
        0 < this.R(c.value, a) ? d = c.left : 0 > this.R(c.value, a) ? d = c.right : b=!0;
        return d
    });
    return b
};
r.qb = function() {
    var a = [];
    $g(this, function(b) {
        a.push(b)
    });
    return a
};
function $g(a, b) {
    if (a.M) {
        var c, d = c = ah(a);
        for (c = c.left ? c.left : c; null != d;)
            if (null != d.left && d.left != c && d.right != c)
                d = d.left;
            else {
                if (d.right != c && b(d.value))
                    break;
                    var e = d, d = null != d.right && d.right != c ? d.right: d.parent;
                    c = e
            }
    }
}
function Wg(a, b, c) {
    for (c = c ? c : a.M; c && null != c;)
        c = b.call(a, c)
}
function Xg(a, b) {
    Wg(a, function(a) {
        var b = a.left ? a.left.height: 0, e = a.right ? a.right.height: 0;
        1 < b - e ? (a.left.right && (!a.left.left || a.left.left.height < a.left.right.height) && bh(this, a.left), ch(this, a)) : 1 < e - b && (a.right.left && (!a.right.right || a.right.right.height < a.right.left.height) && ch(this, a.right), bh(this, a));
        b = a.left ? a.left.height : 0;
        e = a.right ? a.right.height : 0;
        a.height = Math.max(b, e) + 1;
        return a.parent
    }, b)
}
function bh(a, b) {
    dh(b) ? (b.parent.left = b.right, b.right.parent = b.parent) : eh(b) ? (b.parent.right = b.right, b.right.parent = b.parent) : (a.M = b.right, a.M.parent = null);
    var c = b.right;
    b.right = b.right.left;
    null != b.right && (b.right.parent = b);
    c.left = b;
    b.parent = c;
    c.count = b.count;
    b.count -= (c.right ? c.right.count : 0) + 1
}
function ch(a, b) {
    dh(b) ? (b.parent.left = b.left, b.left.parent = b.parent) : eh(b) ? (b.parent.right = b.left, b.left.parent = b.parent) : (a.M = b.left, a.M.parent = null);
    var c = b.left;
    b.left = b.left.right;
    null != b.left && (b.left.parent = b);
    c.right = b;
    b.parent = c;
    c.count = b.count;
    b.count -= (c.left ? c.left.count : 0) + 1
}
function Zg(a, b) {
    if (null != b.left || null != b.right) {
        var c = null, d;
        if (null != b.left) {
            d = fh(a, b.left);
            Wg(a, function(a) {
                a.count--;
                return a.parent
            }, d);
            if (d != b.left) {
                if (d.parent.right = d.left)
                    d.left.parent = d.parent;
                d.left = b.left;
                d.left.parent = d;
                c = d.parent
            }
            d.parent = b.parent;
            d.right = b.right;
            d.right && (d.right.parent = d);
            b == a.ga && (a.ga = d)
        } else {
            d = ah(a, b.right);
            Wg(a, function(a) {
                a.count--;
                return a.parent
            }, d);
            if (d != b.right) {
                if (d.parent.left = d.right)
                    d.right.parent = d.parent;
                d.right = b.right;
                d.right.parent = d;
                c = d.parent
            }
            d.parent =
            b.parent;
            d.left = b.left;
            d.left && (d.left.parent = d);
            b == a.ha && (a.ha = d)
        }
        d.count = b.count;
        dh(b) ? b.parent.left = d : eh(b) ? b.parent.right = d : a.M = d;
        Xg(a, c ? c : d)
    } else 
        Wg(a, function(a) {
            a.count--;
            return a.parent
        }, b.parent), dh(b) ? (b.parent.left = null, b == a.ha && (a.ha = b.parent), Xg(a, b.parent)) : eh(b) ? (b.parent.right = null, b == a.ga && (a.ga = b.parent), Xg(a, b.parent)) : a.clear()
}
function ah(a, b) {
    if (!b)
        return a.ha;
    var c = b;
    Wg(a, function(a) {
        var b = null;
        a.left && (b = c = a.left);
        return b
    }, b);
    return c
}
function fh(a, b) {
    if (!b)
        return a.ga;
    var c = b;
    Wg(a, function(a) {
        var b = null;
        a.right && (b = c = a.right);
        return b
    }, b);
    return c
}
function Vg(a, b) {
    this.value = a;
    this.parent = b ? b : null;
    this.count = 1
}
Vg.prototype.left = null;
Vg.prototype.right = null;
Vg.prototype.height = 1;
function eh(a) {
    return !!a.parent && a.parent.right == a
}
function dh(a) {
    return !!a.parent && a.parent.left == a
};
function gh(a) {
    this.R = a || Tg
}
C(gh, Sg);
function Oe(a, b, c) {
    if (a.M) {
        var d;
        if (c instanceof Vg)
            d = c;
        else if (c) {
            if (Wg(a, function(a) {
                var b = null;
                0 < this.R(a.value, c) ? (b = a.left, d = a) : 0 > this.R(a.value, c) ? b = a.right : d = a;
                return b
            }), !d)
                return 
        } else 
            d = ah(a);
        a = d;
        for (var e = d.left ? d.left : d; null != a;)
            if (null != a.left && a.left != e && a.right != e)
                a = a.left;
            else {
                if (a.right != e && b(a))
                    return;
                    var f = a;
                    a = null != a.right && a.right != e ? a.right : a.parent;
                    e = f
            }
        b(null)
    }
}
function Ne(a, b, c) {
    if (a.M) {
        var d;
        if (c instanceof Vg)
            d = c;
        else if (c) {
            if (Wg(a, ma(function(a) {
                var b = null;
                0 < this.R(a.value, c) ? b = a.left : (0 > this.R(a.value, c) && (b = a.right), d = a);
                return b
            }, a)), !d)
                return 
        } else 
            d = fh(a);
        a = d;
        for (var e = d.right ? d.right : d; null != a;)
            if (null != a.right && a.right != e && a.left != e)
                a = a.right;
            else {
                if (a.left != e && b(a))
                    return;
                    var f = a;
                    a = null != a.left && a.left != e ? a.left : a.parent;
                    e = f
            }
        b(null)
    }
};
function W(a, b) {
    this.key = a;
    this.a = b
}
W.prototype.q = l("a");
W.prototype.toString = function() {
    return "ydn.db.con.simple.Node(" + this.key + (null != this.a ? ", " + this.a + ")" : ")")
};
function Se(a, b) {
    var c = M(a.key, b.key);
    return 0 === c ? null != a.a ? null != b.a ? M(a.a, b.a) : 1 : null != b.a?-1 : 0 : c
};
function hh(a, b, c) {
    this.f = a;
    this.b = b;
    this.c = c;
    this.a = {};
    a = this.c.keyPath;
    this.d = v(a) ? a.join(",") : a || "_ROWID_";
    this.a[this.d] = null;
    this.e = Rg(this.f, this.c.getName(), this.d) + "^|"
}
function Ue(a, b) {
    var c = b || a.d;
    if (!a.a[c]) {
        a.a[c] = new gh(Se);
        for (var d = a.b.length, e = 0; e < d; e++) {
            var f = a.b.key(e);
            if (null !== f && 0 == f.lastIndexOf(a.e, 0)) {
                var g = Dc(f.substr(a.e.length));
                if (c == a.d)
                    Ug(a.a[c], new W(g));
                else {
                    var h = a.b.getItem(f);
                    if (null !== h)
                        if (f = ff(a.c, c), h = ae(h)
                            , h = vg(f, h), f.multiEntry) {
                        if (v(h))
                            for (f = 0; f < h.length; f++)
                                Ug(a.a[c], new W(h[f], g))
                            } else 
                                Ug(a.a[c], new W(h, g))
                            }
            }
        }
    }
    return a.a[c]
}
function ih(a, b, c) {
    for (var d in a.a) {
        var e = a.a[d];
        if (e)
            if (d == a.d)
                Yg(e, new W(b));
            else {
                var f = ff(a.c, d), f = xc(c, f.keyPath);
                Yg(e, new W(b, f))
            }
        }
}
function jh(a) {
    for (var b in a.a) {
        var c = a.a[b];
        c && c.clear()
    }
    a.a = {}
}
function Le(a, b, c, d) {
    if (null == b && (a.c.keyPath && (b = $f(a.c, c)), a.c.b && null == b)) {
        b = a.e + Ac(void 0);
        var e = ae(a.b.getItem(b));
        e.key_count || (e.key_count = 0);
        e.key_count++;
        a.b.setItem(b, Q(e));
        b = e.key_count
    }
    d && (d = null !== a.b.getItem(a.e + Ac(b)));
    if (d)
        return null;
    a.b.setItem(a.e + Ac(b), Q(c));
    d = b;
    for (var f in a.a)
        if (e = a.a[f])
            if (f == a.d)
                Ug(e, new W(d));
            else {
                var g = ff(a.c, f), g = xc(c, g.keyPath);
                null != g && Ug(e, new W(d, g))
            }
    return b
}
function Ye(a, b) {
    var c = a.e + Ac(b), d = a.b.getItem(c);
    if (null === d)
        return 0;
    a.b.removeItem(c);
    c = ae(d);
    ih(a, b, c);
    return 1
}
hh.prototype.clear = function() {
    jh(this);
    Ze(this)
};
function Qe(a, b) {
    var c = a.b.getItem(a.e + Ac(b)), d = void 0;
    if (null !== c)
        for (var d = ae(c), c = 0, e = a.c.a.length; c < e; c++) {
            var f = a.c.index(c);
            if (f.type == uf) {
                var g = vg(f, d);
                g && vf(f, d, new Date(g))
            }
        }
    return d
}
hh.prototype.getName = function() {
    return this.c.getName()
};
function $e(a, b, c) {
    b = b || a.d;
    a = Ue(a, b);
    var d = null, e = null, f = 0, g=!1, h=!1;
    null != c && (null != c.lower && (d = new W(c.lower)), null != c.upper && (e = new W(c.upper)), g = c.lowerOpen, h = c.upperOpen);
    Oe(a, function(a) {
        if (null != a && (a = a.value, !g || null == d || 0 != M(a.key, d.key))
            ) {
            if (null != e && (a = M(a.key, e.key), 1 === a || 0 === a && h))
                return !0;
            f++
        }
    }, d);
    return f
}
function Ze(a, b) {
    var c = Ue(a, a.d), d = null, e = null, f = 0, g = [], h = [], k=!1, n=!1;
    null != b && (null != b.lower && (d = new W(b.lower)), null != b.upper && (e = new W(b.upper)), k = b.lowerOpen, n = b.upperOpen);
    Oe(c, function(b) {
        if (null != b && (b = b.value, !k || null == d || 0 != Se(b, d))
            ) {
            if (null != e) {
                var c = Se(b, e);
                if (1 === c || 0 === c && n)
                    return !0
            }
            var c = a.e + Ac(b.key), q = a.b.getItem(c);
            null !== q && (a.b.removeItem(c), f++, 10 > g.length && (g.push(b.key), h.push(ae(q))))
        }
    }, d);
    if (10 > g.length)
        for (c = 0; c < g.length; c++)
            ih(a, g[c], h[c]);
    else 
        jh(a);
    return f
}
function af(a, b, c, d, e, f, g, h, k) {
    function n(c) {
        if (c && (H++, !(H < g))
            ) {
            var d = c.value;
            if (e) {
                if (R && null != z && (c = q ? Se(d, z) : M(d.key, z.key), 0 == c))
                    return;
                if (null != A && (c = q ? Se(d, A) : M(d.key, A.key), -1 == c || 0 == c && L))
                    return k && (k[0] = void 0, k[1] = void 0), !0
            } else {
                if (L && null != A && (c = q ? Se(d, A) : M(d.key, A.key), 0 == c))
                    return;
                if (null != z && (c = q ? Se(d, z) : M(d.key, z.key), 1 == c || 0 == c && R))
                    return k && (k[0] = void 0, k[1] = void 0), !0
            }
            c = d.key;
            if (!h ||!s || null == p || 0 != M(p, c)) {
                d = s ? d.q() : c;
                if (2 == b)
                    m.push(d);
                else if (1 == b)
                    m.push(c);
                else if (3 == b)
                    m.push([c,
                    d]);
                else if (4 == b) {
                    var n = Qe(a, d);
                    m.push(n)
                } else 
                    m.push([c, d, Qe(a, d)]);
                k && (k[0] = c, k[1] = d)
            }
            p = c;
            if (u(f) && m.length >= f)
                return !0
        }
    }
    var m = [], p, q=!!k && null != k[0];
    c = c || a.d;
    var s = c != a.d;
    c = Ue(a, c);
    var A = null, z = null;
    u(g) || (g = 0);
    var H =- 1, L=!1, R=!1;
    null != d && (null != d.lower && (A = s && e ? new W(d.lower, "\uffff") : new W(d.lower)), null != d.upper && (z = s&&!e ? new W(d.upper, "\uffff") : new W(d.upper)), L=!!d.lowerOpen, R=!!d.upperOpen);
    if (q) {
        e ? R=!0 : L=!0;
        d = k[0];
        var ia = u(k[1]) ? k[1]: "\uffff";
        e ? z = s ? new W(d, ia) : new W(d) : A = s ? new W(d, ia) : new W(d)
    }
    e ?
    Ne(c, n, z) : Oe(c, n, A);
    return m
}
hh.prototype.Ua = function(a, b, c, d, e) {
    return af(this, 2, a, b, c, d, e)
};
hh.prototype.toString = function() {
    return "ydn.db.con.simple.Store:" + this.f + ":" + this.c.getName()
};
function kh(a, b) {
    this.l = a;
    this.a = b
}
function Re(a, b, c) {
    Ie(function() {
        b.call(c, this.l)
    }, 0, a);
    return function() {
        a.a("complete", null);
        a.a = null;
        a.l = null
    }
};
function lh() {
    this.clear()
}
r = lh.prototype;
r.kb = function() {
    return this
};
r.setItem = function(a, b) {
    u(this.a[a]) || (this.keys.push(a.toString()), this.length = this.keys.length);
    this.a[a] = b
};
r.getItem = function(a) {
    return u(this.a[a]) ? this.a[a] : null
};
r.removeItem = function(a) {
    delete this.a[a];
    Ra(this.keys, a.toString());
    this.length = this.keys.length
};
r.length = 0;
r.key = function(a) {
    a = this.keys[a];
    return u(a) ? this.a[a] : null
};
r.clear = function() {
    this.a = {};
    this.keys = [];
    this.length = 0
};
function mh(a) {
    this.d = a || new lh;
    this.b = NaN
}
r = mh.prototype;
r.uc = I("ydn.db.con.SimpleStorage");
r.Eb = l("b");
r.La = function(a, b) {
    function c(a, b) {
        Ie(function() {
            b ? (F(d.uc, d + " opening fail"), e.A(b)) : (F(d.uc, d + " version " + d.Eb() + " open"), e.D(a))
        })
    }
    var d = this, e = new J;
    this.l = this.d.kb(a);
    this.ta = a;
    this.a = b;
    this.c = {};
    var f = Rg(this.ta);
    this.b = NaN;
    var g = ae(this.l.getItem(f));
    u(g.version)&&!y(g.version) && (g.version = NaN);
    if (g)
        if (g = new Fg(g), Gg(this.a, g)
            )if (!this.a.Fa&&!isNaN(g.version) && this.a.version > g.version)
        c(NaN, new kd("existing version " + g.version + " is larger than " + this.a.version));
    else {
        var h = this.a.version;
        this.b = u(h) ? h : g.version + 1;
        for (h = 0; h < this.a.count(); h++)
            var k = this.a.ya(h);
        if (this.a instanceof Ig)
            for (h = 0; h < g.count(); h++)
                k = g.ya(h), Jg(this.a, k);
        h = this.a.toJSON();
        h.version = this.b || NaN;
        this.l.setItem(f, Q(h));
        c(g.version || NaN)
    } else {
        for (h = 0; h < this.a.count(); h++)
            k = this.a.ya(h);
        this.b = g.version || NaN;
        c(this.b)
    } else 
        g = b.toJSON(), this.b = 1, g.version = this.b, this.l.setItem(f, Q(g)), c(NaN);
    return e
};
r.fb = function() {
    return !!this.ta
};
r.Fb = aa();
r.gb = aa();
r.Aa = ba("memory");
r.Db = aa();
r.nb = function(a, b, c, d) {
    a(new kh(this, function(a, b) {
        d(a, b)
    }))
};
r.X = function(a) {
    Ie(function() {
        var b = Rg(this.ta), b = this.l.getItem(b), b = new Fg(b);
        a(b)
    }, 0, this)
};
function Te(a, b) {
    var c = V(a.a, b);
    if (c)
        a.c[b] || (a.c[b] = new hh(a.ta, a.l, c));
    else 
        throw new Mc('store name "' + b + '" not found.');
    return a.c[b]
}
r.toString = function() {
    return "SimpleStorage:" + this.Aa() + ":" + (this.ta + ":" + this.b)
};
function nh() {
    mh.call(this, this)
}
C(nh, mh);
nh.prototype.kb = function(a) {
    return new oh(a)
};
nh.prototype.Aa = ba("userdata");
function oh(a) {
    this.l = new Og(a);
    this.length = this.keys().length
}
r = oh.prototype;
r.length = 0;
r.clear = function() {
    this.l.clear();
    this.a = []
};
r.keys = function() {
    this.a || (this.a = [], gb(this.l, function(a) {
        this.a.push(a)
    }, this));
    return this.a
};
r.key = function(a) {
    return this.keys()[a]
};
r.setItem = function(a, b) {
    this.a && this.a.push(a);
    var c = this.l;
    c.a.setAttribute(Mg(a), b);
    Ng(c)
};
r.getItem = function(a) {
    a = this.l.a.getAttribute(Mg(a));
    if (!x(a) && null !== a)
        throw "Storage mechanism: Invalid value was encountered";
    return u(a) ? a : null
};
r.removeItem = function(a) {
    this.a = null;
    var b = this.l;
    b.a.removeAttribute(Mg(a));
    Ng(b)
};
function ph() {
    mh.call(this, this)
}
C(ph, mh);
ph.prototype.kb = function() {
    return window.localStorage
};
ph.prototype.Aa = ba("localstorage");
function qh(a) {
    var b = new ph, c = new Ig;
    b.La(a, c);
    b.X(function(a) {
        for (var c = 0; c < a.stores.length; c++)
            Te(b, a.stores[c].name).clear()
    })
}
function rh() {
    mh.call(this, this)
}
C(rh, mh);
rh.prototype.kb = function() {
    return window.sessionStorage
};
rh.prototype.Aa = ba("sessionstorage");
function sh(a) {
    var b = new rh, c = new Ig;
    b.La(a, c);
    b.X(function(a) {
        for (var c = 0; c < a.stores.length; c++)
            Te(b, a.stores[c].name).clear()
    })
};
function th(a, b) {
    u(a) && 5242880 < a && E(this.p, "storage size request ignored, use Quota Management API instead");
    this.w = null;
    this.$a = b || NaN
}
r = th.prototype;
r.La = function(a, b) {
    function c(a, c, d) {
        F(e.p, (d ? "changing" : "upgrading") + " version to " + a.version + " from " + g);
        for (d = 0; d < b.stores.length; d++)
            uh(e, a, c, b.stores[d]);
        c = a.objectStoreNames;
        var f = c.length;
        for (d = 0; d < f; d++)
            Qf(b, c[d]) || (a.deleteObjectStore(c[d]), F(e.p, "store: " + c[d] + " deleted."))
    }
    function d(a, b) {
        f.Ta ? E(e.p, "database already set.") : u(b) ? (E(e.p, b ? b.message : "Error received."), e.w = null, f.A(b)) : (e.w = a, e.w.onabort = function(a) {
            G(e.p, e + ": abort");
            e.gb(a.target.error)
        }, e.w.onerror = function(a) {
            G(e.p, e +
            ": error");
            e.gb(a.target.error)
        }, e.w.onversionchange = function(a) {
            G(e.p, e + " closing connection for onversionchange to: " + a.version);
            e.w && (e.w.onabort = null, e.w.onblocked = null, e.w.onerror = null, e.w.onversionchange = null, e.w.close(), e.w = null, e.Fb(Error(a.type)))
        }, f.D(parseFloat(g)))
    }
    var e = this, f = new J, g = void 0, h = b.version;
    F(e.p, "Opening database: " + a + " ver: " + (b.Fa ? "auto" : h));
    var k;
    k = u(h) ? wc.open(a, h) : wc.open(a);
    k.onsuccess = function(f) {
        var h = f.target.result;
        u(g) || (g = h.version);
        F(e.p, "Database: " + h.name +
        ", ver: " + h.version + " opened.");
        if (b.Fa)
            e.X(function(f) {
                if (b instanceof Ig)
                    for (var g = 0; g < f.stores.length; g++)
                        Qf(b, f.stores[g].getName()) || Jg(b, f.stores[g].Da());
                        f = Gg(b, f);
                        if (0 < f.length) {
                            F(e.p, "Schema change require for difference in " + f);
                            var k = y(h.version) ? h.version + 1: 1;
                            if ("IDBOpenDBRequest"in t) {
                                h.close();
                                var n = wc.open(a, k);
                                n.onupgradeneeded = function(a) {
                                    a = a.target.result;
                                    F(e.p, "re-open for version " + a.version);
                                    c(a, n.transaction, !1)
                                };
                                n.onsuccess = function(a) {
                                    d(a.target.result)
                                };
                                n.onerror = function() {
                                    F(e.p,
                                    e + ": fail.");
                                    d(null)
                                }
                            } else {
                                var p = h.setVersion(k + "");
                                p.a = function(a) {
                                    E(e.p, "migrating from " + h.version + " to " + k + " failed.");
                                    d(null, a)
                                };
                                p.onsuccess = function() {
                                    p.transaction.oncomplete = L;
                                    c(h, p.transaction, !0)
                                };
                                var L = function() {
                                    var b = wc.open(a);
                                    b.onsuccess = function(a) {
                                        a = a.target.result;
                                        F(e.p, e + ": OK.");
                                        d(a)
                                    };
                                    b.onerror = function() {
                                        F(e.p, e + ": fail.");
                                        d(null)
                                    }
                                };
                                null != p.transaction && (p.transaction.oncomplete = L)
                            }
                        } else 
                            d(h)
                    }, void 0, h);
            else if (b.version > h.version) {
                var k = h.setVersion(b.version);
                k.a = function(a) {
                    E(e.p,
                    "migrating from " + h.version + " to " + b.version + " failed.");
                    d(null, a)
                };
                k.onsuccess = function() {
                    c(h, k.transaction, !0)
                }
            } else 
                b.version == h.version ? F(e.p, "database version " + h.version + " ready to go") : E(e.p, "connected database version " + h.version + " is higher than requested version."), e.X(function(a) {
            a = Gg(b, a);
            0 < a.length ? (F(e.p, a), d(null, new Oc("different schema: " + a))) : d(h)
        }, void 0, h)
    };
    k.onupgradeneeded = function(a) {
        a = a.target.result;
        g = NaN;
        F(e.p, "upgrade needed for version " + a.version);
        c(a, k.transaction, !1)
    };
    k.onerror = function(c) {
        ec(e.p, 'open request to database "' + a + '" ' + (u(b.version) ? " with version " + b.version : "") + " cause error of " + k.error.name);
        d(null, c)
    };
    k.onblocked = function(c) {
        ec(e.p, "database " + a + " " + b.version + " block, close other connections.");
        d(null, c)
    };
    y(this.$a)&&!isNaN(this.$a) && Ie(function() {
        "done" != k.readyState && (ec(e.p, e + ": database state is still " + k.readyState), d(null, new sd("connection timeout after " + e.$a)))
    }, this.$a);
    return f
};
r.$a = 18E4;
r.Fb = aa();
r.gb = aa();
r.Aa = ba("indexeddb");
r.fb = function() {
    return !!this.w
};
r.p = I("ydn.db.con.IndexedDb");
r.w = null;
r.Eb = function() {
    return this.w ? parseFloat(this.w.version) : void 0
};
r.X = function(a, b, c) {
    c = c || this.w;
    if (u(b)) {
        if (null === b) {
            if (0 == c.objectStoreNames.length) {
                a(new Fg(c.version));
                return 
            }
            throw new Cd;
        }
        c = b.db
    } else {
        b = [];
        for (var d = c.objectStoreNames.length-1; 0 <= d; d--)
            b[d] = c.objectStoreNames[d];
        if (0 == b.length) {
            a(new Fg(c.version));
            return 
        }
        b = c.transaction(b, uc)
    }
    for (var e = c.objectStoreNames, f = [], g = e.length, d = 0; d < g; d++) {
        for (var h = b.objectStore(e[d]), k = [], n = 0, m = h.indexNames.length; n < m; n++) {
            var p = h.index(h.indexNames[n]);
            k[n] = new sg(p.keyPath, void 0, p.unique, p.multiEntry, p.name)
        }
        f[d] =
        new zg(h.name, h.keyPath, h.autoIncrement, void 0, k)
    }
    b = new Fg(c.version, f);
    a(b)
};
function uh(a, b, c, d) {
    function e() {
        var a = {
            autoIncrement: !!d.b
        };
        null != d.keyPath && (a.keyPath = d.keyPath);
        try {
            return b.createObjectStore(d.getName(), a)
        } catch (c) {
            if ("InvalidAccessError" == c.name)
                throw new nd("creating store for " + d.getName() + " of keyPath: " + d.keyPath + " and autoIncrement: " + d.b);
            if ("ConstraintError" == c.name)
                throw new Oc("creating store for " + d.getName());
            throw c;
        }
    }
    G(a.p, "Creating Object Store for " + d.getName() + " keyPath: " + d.keyPath);
    if (b.objectStoreNames.contains(d.getName()))
        if (c = c.objectStore(d.getName()),
        xg(d.keyPath || "", c.keyPath || "")
            )b.deleteObjectStore(d.getName()), E(a.p, "store: " + d.getName() + " deleted due to keyPath change."), c = e();
    else if (ea(c.autoIncrement) && ea(d.b) && c.autoIncrement != d.b)
        b.deleteObjectStore(d.getName()), E(a.p, "store: " + d.getName() + " deleted due to autoIncrement change."), c = e();
    else {
        for (var f = c.indexNames, g = 0, h = 0, k = 0, n = 0; n < d.a.length; n++) {
            var m = d.a[n], p=!1;
            if (f.contains(m.name)) {
                var q = c.index(m.name), s = null != q.unique && null != m.unique && q.unique != m.unique, A = null != q.multiEntry &&
                null != m.multiEntry && q.multiEntry != m.multiEntry, q = null != q.keyPath && null != m.keyPath&&!!xg(q.keyPath, m.keyPath);
                if (s || A || q)
                    c.deleteIndex(m.name), p=!0, g--, k++
            } else 
                p=!0;
            p && (m.unique || m.multiEntry ? (p = {
                unique: m.unique,
                multiEntry: m.multiEntry
            }, c.createIndex(m.name, m.keyPath, p)) : c.createIndex(m.name, m.keyPath), g++)
        }
        for (n = 0; n < f.length; n++)
            Tf(d, f[n]) || (c.deleteIndex(f[n]), h++);
        G(a.p, "Updated store: " + c.name + ", " + g + " index created, " + h + " index deleted, " + k + " modified.")
    } else {
        c = e();
        for (n = 0; n < d.a.length; n++)
            m =
            d.a[n], G(a.p, "Creating index: " + m.name + " multiEntry: " + m.multiEntry), m.unique || m.multiEntry ? (p = {
            unique: m.unique,
            multiEntry: m.multiEntry
        }, c.createIndex(m.name, m.keyPath, p)) : c.createIndex(m.name, m.keyPath);
        G(a.p, "Created store: " + c.name + " keyPath: " + c.keyPath)
    }
}
r.nb = function(a, b, c, d) {
    var e = this.w;
    if (!b) {
        b = [];
        for (var f = e.objectStoreNames.length-1; 0 <= f; f--)
            b[f] = e.objectStoreNames[f]
    }
    0 == b.length ? a(null) : (b = e.transaction(b, c), b.oncomplete = function(a) {
        d("complete", a)
    }, b.onabort = function(a) {
        d("abort", a)
    }, a(b), a = null)
};
r.Db = function() {
    G(this.p, this + " closing connection");
    this.w.close()
};
r.toString = function() {
    return "IndexedDB:" + (this.w ? this.w.name + ":" + this.w.version : "")
};
function vh(a) {
    this.a = u(a) ? a : 4194304
}
r = vh.prototype;
r.La = function(a, b) {
    function c(b, c) {
        var f = b.version ? parseInt(b.version, 10): 0, g = c.Fa ? isNaN(f) ? 1: f + 1: c.version;
        fc(e.t, a + ": changing version from " + b.version + " to " + g);
        var h=!1, k = 0;
        b.changeVersion(b.version, g + "", function(a) {
            e.X(function(b) {
                h=!0;
                for (var d = 0; d < c.count(); d++) {
                    var f = V(b, c.ya(d).getName()), f = f ? f.hint(c.ya(d)): null;
                    wh(e, a, c.ya(d), function(a) {
                        a && k++
                    }, f)
                }
                for (d = 0; d < b.count(); d++)
                    f = b.ya(d), Qf(c, f.getName()) || (c instanceof Ig ? Jg(c, f) : (f = "DROP TABLE " + rf(f), F(e.t, f), a.executeSql(f, [], aa(), function(a,
                b) {
                    throw b;
                })))
            }, a, b)
        }, function(c) {
            ec(e.t, "SQLError " + c + " " + c.code + "(" + c.message + ") while changing version from " + b.version + " to " + g + " on " + a);
            throw c;
        }, function() {
            if (h) {
                var f = ".";
                k != c.stores.length && (f = " but unexpected stores exists.");
                G(e.t, a + ":" + b.version + " ready" + f);
                d(b)
            } else 
                E(e.t, a + ": changing version voided.")
        })
    }
    function d(a, b) {
        u(b) ? (e.K = null, g.A(b)) : (e.K = a, g.D(parseFloat(f)))
    }
    var e = this, f = NaN, g = new J, h = null;
    try {
        h = t.openDatabase(a, "", a, this.a)
    } catch (k) {
        if ("SECURITY_ERR" == k.name)
            E(this.t, "SECURITY_ERR for opening " +
            a), h = null, this.Zb = new qd(k);
        else 
            throw k;
    }
    if (h) {
        var f = h.version, n = "database " + a + (0 == h.version.length ? "" : " version " + h.version);
        null != b.version && b.version == h.version ? (fc(e.t, "Existing " + n + " opened as requested."), d(h)) : this.X(function(a) {
            (a = Gg(b, a, !0)) ? (0 == h.version.length ? fc(e.t, "New " + n + " created.") : b.Fa ? fc(e.t, "Existing " + n + " opened and schema change for " + a) : fc(e.t, "Existing " + n + " opened and  schema change to version " + b.version + " for " + a), c(h, b)) : (fc(e.t, "Existing " + n + " with same schema opened."),
            d(h))
        }, null, h)
    } else 
        d(null, this.Zb);
    return g
};
r.Aa = ba("websql");
r.Zb = null;
r.K = null;
r.t = I("ydn.db.con.WebSql");
r.Fb = aa();
r.gb = aa();
function xh(a) {
    var b = a.n, c = "CREATE TABLE IF NOT EXISTS " + rf(a) + " (", d = a.c, c = c + (d + " " + b + " PRIMARY KEY ");
    a.b && (c += " AUTOINCREMENT ");
    for (var c = c + " ,_default_ BLOB", e = [], f = [d], g = 0, h = a.a.length; g < h; g++) {
        var k = a.index(g), n = "";
        if (k.multiEntry)
            n = k.unique ? " UNIQUE " : "", k = "CREATE TABLE IF NOT EXISTS " + Fa("ydn.db.me:" + a.getName() + ":" + k.getName()) + " (" + d + " " + b + ", " + k.b + " " + k.f + n + ")", e.push(k);
        else {
            k.unique && (n = " UNIQUE ");
            var m = k.keyPath;
            "BLOB" != k.type && x(m) && (m = "CREATE " + n + " INDEX IF NOT EXISTS " + Fa(a.getName() +
            "-" + k.getName()) + " ON " + rf(a) + " (" + Fa(m) + ")", e.push(m));
            m = k.b;
            -1 == f.indexOf(m) && (c += ", " + m + " " + k.f + n, f.push(m))
        }
    }
    e.unshift(c + ")");
    return e
}
r.Eb = function() {
    return this.K ? parseFloat(this.K.version) : void 0
};
r.X = function(a, b, c) {
    function d(a, b) {
        throw b;
    }
    function e(b, c) {
        if (c && c.rows) {
            for (var d = 0; d < c.rows.length; d++) {
                var e = c.rows.item(d);
                if ("__WebKitDatabaseInfoTable__" != e.name && "sqlite_sequence" != e.name && "table" == e.type) {
                    var q = "sql"in e ? e.sql: void 0;
                    G(f.t, "Parsing table schema from SQL: " + q);
                    for (var s = q.substr(q.indexOf("("), q.lastIndexOf(")")).match(/(?:"[^"]*"|[^,])+/g), A = void 0, z, q = [], H=!1, L=!1, R = 0; R < s.length; R++) {
                        var ia = s[R].match(/\w+|"[^"]+"/g), Ma = Ka(ia, function(a) {
                            return a.toUpperCase()
                        }), U = Ca(ia[0],
                        '"'), ia = tg(Ma[1]);
                        if (-1 != Ma.indexOf("PRIMARY")&&-1 != Ma.indexOf("KEY")) {
                            z = ia;
                            if (x(U)&&!sa(U) && "_ROWID_" != U) {
                                var Aa = U.split(","), A = U;
                                1 < Aa.length && (A = Aa, z = void 0)
                            }
                            -1 != Ma.indexOf("AUTOINCREMENT") && (H=!0)
                        } else if ("_ROWID_" != U)
                            if ("_default_" == U)
                                L=!0;
                            else {
                                var Gd = "UNIQUE" == Ma[2];
                                0 == U.lastIndexOf(e.tbl_name + "-", 0) && (U = U.substr(e.tbl_name.length + 1));
                                Ma = new sg(U, ia, Gd);
                                q.push(Ma)
                            }
                    }
                    if (0 == e.name.lastIndexOf("ydn.db.me:", 0)) {
                        var sb = e.name.split(":");
                        if (3 <= sb.length) {
                            var Kb = sb[1], A = new sg(sb[2], ia, Gd, !0), s = Pa(q,
                            function(a) {
                                return a.getName() == sb[2]
                            });
                            0 <= s ? q[s] = A : q.push(A);
                            s = Pa(h, function(a) {
                                return a.getName() === Kb
                            });
                            0 <= s ? (R = h[s], h[s] = new zg(R.getName(), R.keyPath, H, z, q, void 0, !L)) : h.push(new zg(Kb, void 0, !1, void 0, [A]));
                            G(f.t, 'multi entry index "' + A.getName() + '" found in ' + Kb + (-1 == s ? "*" : ""))
                        } else 
                            E(f.t, 'Invalid multiEntry store name "' + e.name + '"')
                        } else 
                            R = Pa(h, function(a) {
                                return a.getName() === e.name
                            }), 0 <= R ? (s = h[R].index(0), q.push(s), h[R] = new zg(e.name, A, H, z, q, void 0, !L)) : (q = new zg(e.name, A, H, z, q, void 0, !L),
                    h.push(q))
                }
            }
            d = new Fg(g, h);
            a(d)
        }
    }
    var f = this, g = (c = c || this.K) && c.version ? parseFloat(c.version): void 0, g = isNaN(g) ? void 0 : g, h = [];
    b ? b.executeSql("SELECT * FROM sqlite_master", [], e, d) : c.readTransaction(function(b) {
        f.X(a, b, c)
    }, function(a) {
        ec(f.t, "opening tx: " + a.message);
        throw a;
    }, e)
};
function wh(a, b, c, d, e) {
    function f(a) {
        b.executeSql(a, [], function() {
            g++;
            g == h.length && (d(!0), d = null)
        }, function(b, e) {
            g++;
            g == h.length && (d(!1), d = null);
            throw new pd(e, "SQLError creating table: " + c.name + " " + e.message + ' for executing "' + a);
        })
    }
    var g = 0, h = xh(c), k = "Create";
    if (e) {
        e = Wf(c, e);
        if (0 == e.length) {
            G(a.t, "same table " + c.name + " exists.");
            d(!0);
            d = null;
            return 
        }
        k = "Modify";
        E(a.t, "table: " + c.name + " has changed by " + e + " additionallly TABLE ALTERATION is not implemented, dropping old table.");
        h.unshift("DROP TABLE IF EXISTS " +
        Fa(c.name))
    }
    G(a.t, k + " table: " + c.name + ": " + h.join(";"));
    for (a = 0; a < h.length; a++)
        f(h[a])
}
r.fb = function() {
    return !!this.K
};
r.Db = function() {
    this.K = null
};
r.nb = function(a, b, c, d) {
    function e(a) {
        G(h.t, h + ": Tx " + c + " request cause error.");
        d("abort", a)
    }
    function f() {
        d("complete", {
            type: "complete"
        })
    }
    function g(b) {
        a(b)
    }
    var h = this;
    null === this.K && (a(null), d("abort", this.Zb));
    c == uc ? this.K.readTransaction(g, e, f) : c == vc ? this.K.changeVersion(this.K.version, this.K.version + 1 + "", g, e, f) : this.K.transaction(g, e, f)
};
function yh(a) {
    function b() {
        c.t.log(Xb, "all tables in " + a + " deleted.", void 0)
    }
    var c = new vh, d = new Ig;
    F(c.t, "deleting websql database: " + a);
    d = c.La(a, d);
    d.$(function() {
        c.nb(function(b) {
            b.executeSql('SELECT * FROM sqlite_master WHERE type = "table"', [], function(d, g) {
                if (g && g.rows) {
                    for (var h = g.rows.length, k = 0, n = 0; n < h; n++) {
                        var m = g.rows.item(n);
                        "__WebKitDatabaseInfoTable__" != m.name && "sqlite_sequence" != m.name && (k++, G(c.t, "deleting table: " + m.name), b.executeSql("DROP TABLE " + m.name))
                    }
                    F(c.t, k + ' tables deleted from "' +
                    a + '"')
                }
            }, function(a, b) {
                throw b;
            })
        }, [], K, b)
    });
    d.dc(function() {
        E(c.t, "Connecting " + a + " failed.")
    })
}
r.toString = function() {
    return "WebSql:" + (this.K ? ":" + this.K.version : "")
}; /*
 Copyright 2012 YDN Authors, Yathit. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");.
*/
function Ed(a, b, c) {
    Ge.call(this);
    c = c || {};
    var d = "autoSchema connectionTimeout size mechanisms policy isSerial".split(" "), e;
    for (e in c)
        if (c.hasOwnProperty(e)&&-1 == D(d, e))
            throw new N('Unknown attribute "' + e + '" in options.');
    if (c.mechanisms) {
        if (!v(c.mechanisms))
            throw new N("mechanisms attribute must be an array but " + da(c.mechanisms) + " found.");
        for (e = 0; e < c.mechanisms.length; e++)
            if (!(0 <= D(zh, c.mechanisms[e])))
                throw new N('Invalid mechanism "' + c.mechanisms[e] + '"');
    }
    this.va = c.mechanisms || zh;
    this.B = c.size;
    this.Ga = u(c.connectionTimeout) ? c.connectionTimeout : 3E4;
    this.sc = u(c.sc) ? c.sc : !1;
    this.b = null;
    this.f = [];
    this.tb=!1;
    if (b instanceof Fg)
        c = b;
    else if (B(b))
        for (c = c.autoSchema ||!u(b.stores) ? new Ig(b) : new Fg(b), d = b.stores ? b.stores.length : 0, e = 0; e < d; e++) {
            var f = V(c, b.stores[e].name);
            b.stores[e].Sync && E(this.e, "Synchronization option for " + f.getName() + " ignored.")
        } else 
            c = new Ig;
    this.a = c;
    u(a) && this.o(a)
}
C(Ed, Ge);
Ed.prototype.e = I("ydn.db.con.Storage");
Ed.prototype.Ya = function(a) {
    if (u(a)) {
        var b = function(b) {
            a(b.toJSON())
        };
        if (this.b)
            this.b.X(b);
        else {
            var c = this;
            this.Ma(function(a) {
                c.b.X(b, a)
            }, null, uc)
        }
    }
    return this.a ? this.a.toJSON() : null
};
function Vf(a, b) {
    var c = b instanceof zg ? b: Uf(b), d = b.name, e = V(a.a, d);
    if (0 == Wf(c, e).length)
        qc(!1);
    else if (e = e ? "update" : "add", a.a instanceof Ig)
        Jg(a.a, c), a.b ? (a.b.Db(), a.b = null, Ah(a)) : qc(!1);
    else 
        throw new Oc("Cannot " + e + " store: " + d + ". Not auto schema generation mode.");
}
Ed.prototype.o = function(a) {
    if (this.b)
        throw new Lc("Already connected with " + this.d);
    this.d = a;
    Ah(this)
};
Ed.prototype.getName = l("d");
var zh = "indexeddb websql localstorage sessionstorage userdata memory".split(" ");
function Bh(a, b) {
    return "indexeddb" == b ? new th(a.B, a.Ga) : "websql" == b ? new vh(a.B) : "localstorage" == b ? new ph : "sessionstorage" == b ? new rh : "memory" == b ? new mh : "userdata" == b ? new nh : null
}
function Ah(a) {
    function b(b, e) {
        b ? (G(a.e, a + ": ready."), a.lc = NaN, d.gb = function(b) {
            a.dispatchEvent(new qg(a, b))
        }, d.Fb = function(b) {
            a.dispatchEvent(new rg(a, b));
            a.b = null
        }, Ie(function() {
            Ch(a, e);
            Dh(a)
        }), c.D(e)) : (E(a.e, a + ": database connection fail " + e.name), Ie(function() {
            a.dispatchEvent(new rg(a, e));
            if (a.f) {
                a.e.log(Xb, "Purging " + a.f.length + " transactions request.", void 0);
                for (var b; b = a.f.shift();)
                    b.S && b.S("error", e)
            }
        }), c.A(e))
    }
    for (var c = new J, d = null, e = a.va, f = 0; f < e.length; f++) {
        var g = e[f].toLowerCase();
        if ("indexeddb" ==
        g && wc) {
            d = Bh(a, g);
            break
        } else if ("websql" == g && fa(t.openDatabase)) {
            d = Bh(a, g);
            break
        } else if ("localstorage" == g && window.localStorage) {
            d = Bh(a, g);
            break
        } else if ("sessionstorage" == g && window.sessionStorage) {
            d = Bh(a, g);
            break
        } else if ("memory" == g) {
            d = Bh(a, g);
            break
        } else if ("userdata" == g) {
            d = Bh(a, g);
            break
        }
    }
    null === d ? (e = new Nc("No storage mechanism found."), b(!1, new pg("ready", a, NaN, NaN, e))) : d.La(a.d, a.a).aa(function(a) {
        this.b = d;
        b(!0, new pg("ready", this, parseFloat(d.Eb()), parseFloat(a), null))
    }, function(a) {
        E(this.e, this +
        ": opening fail");
        b(!1, a)
    }, a)
}
r = Ed.prototype;
r.qa = function() {
    if (this.b)
        return this.b.Aa()
};
function Ch(a, b) {
    Ie(function() {
        this.dispatchEvent(b)
    }, 1, a)
}
r.bd = function() {
    this.b && (this.b.Db(), this.b = null, G(this.e, this + " closed"))
};
r.lc = NaN;
function Dh(a) {
    var b = a.f.shift();
    b && (G(a.e, "pop tx queue[" + (a.f.length + 1) + "]"), a.Ma(b.ob, b.Oc, b.mode, b.S));
    a.lc = oa()
}
function Eh(a, b, c, d, e) {
    G(a.e, "push tx queue[" + a.f.length + "]");
    a.f.push({
        ob: b,
        Oc: c,
        mode: d,
        S: e
    });
    100 < a.f.length && 0 == a.f.length%100 && E(a.e, "Transaction queue stack size is " + a.f.length + ". It is too large, possibility due to incorrect usage.")
}
r.tb=!1;
r.Ma = function(a, b, c, d) {
    var e = b;
    if (x(b))
        e = [b];
    else if (null != b)
        if (w(b)) {
            if (0 == b.length)
                throw new N("number of store names must more than 0");
                for (var f = 0; f < b.length; f++)
                    if (!x(b[f]))
                        throw new N("store name at " + f + " must be string but found " + typeof b[f]);
        } else 
            throw new N("store names must be an array");
            else 
                e = null;
if (this.b && this.b.fb()&&!this.tb) {
    var g = this, h = u(c) ? c: uc;
    h == vc && (this.tb=!0);
    this.b.nb(function(b) {
        a(b);
        a = null
    }, e, h, function(a, b) {
        fa(d) && (d(a, b), d = void 0);
        h == vc && (g.tb=!1);
        Dh(g)
    })
} else 
    Eh(this,
    a, e, c, d)
};
r.ec = function(a) {
    E(this.e, "Full text indexer option for " + a.getName() + " ignored.")
};
r.Qb = function(a, b, c, d) {
    if ("ready" == a)
        xe(this, a, b, c, d);
    else {
        var e = "created error fail ready deleted updated".split(" "), f = function(a) {
            if (!(0 <= D(e, a)))
                throw new N('Invalid event type "' + a + '"');
        };
        if (w(a))
            for (var g = 0; g < a.length; g++)
                f(a[g]);
        else 
            f(a);
        Ed.G.Qb.call(this, a, b, c, d)
    }
};
r.toString = function() {
    return "Storage:" + this.b
};
function Fh(a, b, c, d) {
    this.d = a;
    this.e = b;
    this.a = Sa(c);
    this.b = d;
    this.c = []
}
Fh.prototype.d = null;
function Gh(a, b, c) {
    if (a.d)
        c && a.c.push(c), b(a.d);
    else 
        throw new Mc("tx committed on ParallelTxExecutor");
}
Fh.prototype.toString = function() {
    return "ParallelTxExecutor: txNo:" + this.e + " mode:" + this.b + " scopes:" + Q(this.a)
};
function Hh(a, b, c, d, e, f) {
    this.l = a;
    this.e = b;
    this.a = this.Qa = 0;
    this.xb = this.ma = null;
    this.c = d;
    this.d = e;
    this.b = c || "single";
    this.Jb = f || 0
}
r = Hh.prototype;
r.Qa = 0;
r.Jb = 0;
r.ma = null;
r.xb = null;
r.sa = I("ydn.db.tr.Parallel");
r.ib = l("Qa");
r.type = function() {
    return this.l.qa()
};
r.Bc = function(a, b) {
    var c;
    if ("multi" == this.b)
        a: if (c = this.ma, !c.a ||!c.b || b != c.b && (c.b != K || b != uc) || a.length > c.a.length)c=!1;
    else {
        for (var d = 0; d < a.length; d++)
            if (-1 == c.a.indexOf(a[d])) {
                c=!1;
                break a
            }
        c=!0
    } else if ("repeat" == this.b)
        a: if (c = this.ma, c.a && c.b && b == c.b && c.a.length == a.length) {
            for (d = 0; d < a.length; d++)
                if (-1 == c.a.indexOf(a[d])) {
                    c=!1;
                    break a
                }
                c=!0
        } else 
            c=!1;
    else 
        c = "all" == this.b?!0 : !1;
    return c
};
r.wa = function(a, b, c, d) {
    function e(c) {
        k.Qa++;
        n = new Fh(c, k.Qa, b, h);
        g = k.N();
        fc(k.sa, g + " BEGIN " + Q(b) + " " + h);
        k.ma = n;
        Gh(k.ma, a, d)
    }
    function f(a, b) {
        fc(k.sa, g + " " + a);
        if (n) {
            for (var c = n, d = 0; d < c.c.length; d++)
                c.c[d](a, b);
            c.c.length = 0;
            c.d = null;
            c.a = null;
            c.c = null
        }
        k.a = 0
    }
    var g;
    this.c && (b = this.c);
    this.d && (c = this.d);
    var h = u(c) ? c: uc, k = this, n;
    if (this.ma && this.ma.d && this.Bc(b, h))
        Gh(this.ma, a, d);
    else {
        if (this.Jb && this.Qa >= this.Jb)
            throw new Lc("Exceed maximum number of transactions of " + this.Jb);
        this.l.Ma(e, b, h, f)
    }
};
r.m = function(a, b, c, d) {
    var e = new Cf(a), f = this;
    this.wa(function(a) {
        f.a++;
        Df(e, a, f.N() + "R" + f.a)
    }, b, c || uc, d);
    return e
};
r.ra = function(a, b, c, d, e) {
    var f = this, g;
    this.wa(function(c) {
        f.a++;
        g = f.N() + "R" + f.a;
        F(f.sa, g + " BEGIN");
        b(c, g, function(b, d) {
            f.xb = c;
            g = f.N() + "R" + f.a;
            d ? (F(f.sa, g + " ERROR"), a.A(b)) : (F(f.sa, g + " SUCCESS"), a.D(b));
            f.xb = null
        });
        b = null;
        F(f.sa, g + " END")
    }, c, d, e)
};
r.N = function() {
    return "B" + this.e + "T" + this.Qa
};
r.toString = function() {
    return "Parallel:" + this.b + ":" + this.N() + (this.xb ? "*" : "")
};
function Ih(a, b) {
    Hh.call(this, a, b, "single")
}
C(Ih, Hh);
r = Ih.prototype;
r.sa = I("ydn.db.tr.AtomicParallel");
r.Bc = ba(!1);
r.m = function(a, b, c) {
    var d, e, f, g = this, h = Ih.G.m.call(this, a, b, c, function(a, b) {
        h.a = null;
        F(g.sa, "transaction " + a);
        if (d)
            "complete" != a && (f=!0, e = b), d(e, f);
        else {
            var c = new sd;
            S(h, c, !0)
        }
    });
    Ef(h, function(a, b, c) {
        f = b;
        e = a;
        d = c
    });
    return h
};
r.ra = function(a, b, c, d, e) {
    var f, g, h = new J;
    h.aa(function(a) {
        g=!1;
        f = a
    }, function(a) {
        g=!0;
        f = a
    });
    Ih.G.ra.call(this, h, b, c, d, function(b, c) {
        if ("complete" != b)
            a.A(c);
        else if (!0 === g)
            a.A(f);
        else if (!1 === g)
            a.D(f);
        else {
            var d = new sd;
            a.A(d)
        }
        e && (e(b, c), e = void 0)
    })
};
r.toString = function() {
    return "Atomic" + Ih.G.toString.call(this)
};
function Jh(a, b, c) {
    Ed.call(this, a, b, c);
    this.Ia = 0;
    a=!0;
    b = "single";
    c && (u(c.isSerial) && (a=!!c.isSerial), c.policy && (b = c.policy));
    c = Kh(this, b, a);
    this.n = Kh(this, "atomic", !1);
    this.c = this.Ha(c, this.n)
}
C(Jh, Ed);
r = Jh.prototype;
r.Ia = 0;
r.Cc = function(a, b, c, d, e) {
    var f;
    "readonly" == d ? f = uc : "readwrite" == d && (f = K);
    a = Kh(this, a, b, c, f, e);
    return this.Ha(a, this.n)
};
r.Ha = function(a, b) {
    return new Of(this, this.a, a, b)
};
function Kh(a, b, c, d, e, f) {
    if (c) {
        if ("multi" == b || "repeat" == b || "all" == b || "single" == b)
            return new Jf(a, a.Ia++, b, d, 0, f);
        if ("atomic" == b)
            return new Nf(a, a.Ia++);
        throw new N('Invalid requestType "' + b + '"');
    }
    if ("multi" == b || "repeat" == b || "all" == b || "single" == b)
        return new Hh(a, a.Ia++, b, d, e, f);
    if ("atomic" == b)
        return new Ih(a, a.Ia++);
    throw new N('Invalid requestType "' + b + '"');
}
r.Nc = function(a, b, c) {
    if (3 < arguments.length)
        throw new N("too many input arguments, run accept not more than 3 input arguments, but " + arguments.length + " found.");
    this.Ia++;
    var d = b || Sf(this.a), e = uc;
    if (c)
        if ("readwrite" == c)
            e = K;
        else if ("readonly" != c)
            throw new N('Invalid transaction mode "' + c + '"');
    var f = Kh(this, "all", !1, d, e, 1), g = this.Ha(f, this.n), h = new Cf("run"), k = this;
    f.wa(function(b) {
        G(k.e, "executing run in transaction on " + f);
        Df(h, b, f.N() + "R0");
        a(g)
    }, d, e, function(a) {
        h.a = null;
        S(h, f.ib(), "complete" !== a)
    });
    return h
};
r.fd = function() {
    return this.c ? this.c.e() : NaN
};
Jh.prototype.branch = Jh.prototype.Cc;
Jh.prototype.run = Jh.prototype.Nc;
Jh.prototype.getTxNo = Jh.prototype.fd;
Of.prototype.getTxNo = Of.prototype.e;
function Z(a, b, c) {
    Jh.call(this, a, b, c);
    a = this.a;
    for (b = 0; b < a.a.length; b++) {
        c = a.a[b];
        var d = V(a, c.getName());
        if (d) {
            if (!Tf(d, "k"))
                throw new N('full text index store "' + d.getName() + '" must have "keyword" index');
            if (!Tf(d, "v"))
                throw new N('full text index store "' + d.getName() + '" must have "keyword" index');
            if ("id" != d.keyPath)
                throw new N('full text index store "' + d.getName() + '" must use "id" as key path.');
        } else 
            throw new N('full text index store "' + c.getName() + '" required.');
        for (d = 0; d < c.count(); d++) {
            var e =
            c.index(d), f = V(a, e.h());
            if (f)
                this.ec(f, c);
            else 
                throw new N('full text source store "' + e.h() + '" does not exist for full text index "' + c.getName() + '"');
        }
    }
}
C(Z, Jh);
r = Z.prototype;
r.Ha = function(a, b) {
    return new Pf(this, this.a, a, b)
};
r.Tb = function() {
    var a = this.qa();
    if ("indexeddb" == a)
        return new ce(this.d, this.a);
    if ("websql" == a)
        return new sf(this.d, this.a);
    if ("memory" == a || "localstorage" == a || "userdata" == a || "sessionstorage" == a)
        return new Ve(this.d, this.a);
    throw new ld("No executor for " + a);
};
r.Hb = function(a, b, c) {
    return this.c.Hb(a, b, c)
};
r.count = function(a, b, c, d) {
    return this.c.count(a, b, c, d)
};
r.Oa = function(a, b) {
    return this.c.Oa(a, b)
};
r.keys = function(a, b, c, d, e, f) {
    return this.c.keys(a, b, c, d, e, f)
};
r.P = function(a, b, c, d, e, f) {
    return this.c.P(a, b, c, d, e, f)
};
r.Pa = function(a, b, c) {
    return this.c.Pa(a, b, c)
};
r.clear = function(a, b, c) {
    return this.c.clear(a, b, c)
};
r.Ib = function(a, b, c) {
    return this.c.Ib(a, b, c)
};
r.toString = function() {
    var a = "Storage:" + this.getName();
    this.b && this.b.fb() && (a += " [" + this.qa() + "]");
    return a
};
function Lh(a) {
    this.a = a
}
Lh.prototype.a = [];
Lh.prototype.b = function(a, b) {
    for (var c = [], d = 0; d < this.a.length; d++) {
        var e = this.a[d], f = "'" === e[0] && "'" === e[e.length-1];
        if ('"' === e[0] && '"' === e[e.length-1])
            e = ab(a, Ca(e, '"').split(".")), c.push(e);
        else if (f)
            c.push(Ca(e, "'"));
        else if (x(e))
            if ("true" === e)
                c.push(!0);
            else if ("false" === e)
                c.push(!1);
            else if ("Date" === e)
                c.push(new Date(parseInt(c.pop(), 10)));
            else if ("now" === e)
                c.push(new Date);
            else if ("!" === e)
                c[c.length-1]=!c[c.length-1];
            else if ("==" === e)
                c.push(c.pop() == c.pop());
            else if ("===" === e)
                c.push(c.pop() ===
                c.pop());
            else if ("!=" === e)
                c.push(c.pop() != c.pop());
            else if ("!==" === e)
                c.push(c.pop() !== c.pop());
            else if ("<=" === e)
                c.push(c.pop() <= c.pop());
            else if ("<" === e)
                c.push(c.pop() < c.pop());
            else if (">=" === e)
                c.push(c.pop() >= c.pop());
            else if (">" === e)
                c.push(c.pop() > c.pop());
            else if ("&" === e)
                c.push(c.pop() & c.pop());
            else if ("|" === e)
                c.push(c.pop() | c.pop());
            else if ("?" === e) {
                var e=!!c.pop(), f = c.pop(), g = c.pop(), e = e ? f : g;
                c.push(e)
            } else 
                "+" === e ? c.push(c.pop() + c.pop()) : "-" === e ? c.push(c.pop() - c.pop()) : "*" === e ? c.push(c.pop() *
                c.pop()) : "/" === e ? c.push(c.pop() / c.pop()) : "%" === e ? c.push(c.pop()%c.pop()) : "at" === e ? (f = c.pop(), e = c.pop(), c.push(e[f])) : "of" === e ? (f = c.pop(), e = c.pop(), e = v(e) ? e.indexOf(f) : -1, c.push(e)) : "in" === e ? (f = c.pop(), e = c.pop(), e = v(e) ? 0 <= e.indexOf(f) : !1, c.push(e)) : "abs" === e ? c[c.length-1] = Math.abs(c[c.length-1]) : "$" == e[0] && /^\$\d$/.test(e) ? (e = parseInt(e.match(/^\$(\d)$/)[1], 10), c.push(arguments[e])) : c.push(parseFloat(e));
        else 
            c.push(e)
    }
    return c[0]
};
Lh.prototype.c = function() {
    return function() {
        var a = 2 < arguments.length ? Array.prototype.slice(arguments, 2): void 0;
        return Lh.prototype.b.apply(null, a)
    }
};
Lh.prototype.toJSON = function() {
    return {
        Tokens: ae(Q(this.a))
    }
};
function Mh(a, b, c) {
    Z.call(this, a, b, c)
}
C(Mh, Z);
r = Mh.prototype;
r.Tb = function() {
    var a = this.qa();
    if ("indexeddb" == a)
        return new de(this.d, this.a);
    if ("websql" == a)
        return new Bf(this.d, this.a);
    if ("memory" == a || "userdata" == a || "localstorage" == a || "sessionstorage" == a)
        return new df(this.d, this.a);
    throw new ld("No executor for " + a);
};
r.Ha = function(a, b) {
    return new lg(this, this.a, a, b)
};
r.xc = function(a, b, c, d) {
    return this.c.vc(a, b, c, d)
};
r.cd = function(a, b) {
    return this.c.wc(a, b)
};
r.map = function(a, b) {
    return this.c.map(a, b)
};
r.reduce = function(a, b, c) {
    return this.c.reduce(a, b, c)
};
function Nh(a) {
    if (!x(a))
        throw new yd;
    this.T = a;
    this.d = K;
    this.a = [];
    Oh(this, a);
    this.cb = ""
}
r = Nh.prototype;
r.T = "";
r.mc = NaN;
r.oc = NaN;
r.Xb=!1;
r.cb = "";
function Oh(a, b) {
    var c = b.split(/\sFROM\s/i);
    if (2 == c.length) {
        var d = c[1], c = c[0].match(/\s*?(SELECT|INSERT|UPDATE|DELETE)\s+(.*)/i);
        if (3 == c.length) {
            a.e = c[1].toUpperCase();
            if ("SELECT" == a.e)
                a.d = uc;
            else if ("INSERT" == a.e)
                a.d = K;
            else if ("UPDATE" == a.e)
                a.d = K;
            else if ("DELETE" == a.e)
                a.d = K;
            else 
                return;
            var c = c[2].trim(), e = c.match(/^(MIN|MAX|COUNT|AVG|SUM)/i);
            e ? (a.c = e[0].toUpperCase(), c = c.replace(/^(MIN|MAX|COUNT|AVG|SUM)/i, "").trim()) : a.c = void 0;
            "(" == c.charAt(0) && (")" == c.charAt(c.length-1) ? c = c.substring(1, c.length -
            1) : new rd("missing closing parentheses"));
            a.o = c;
            c = d.search(/(ORDER BY|LIMIT|OFFSET)/i);
            0 < c ? (a.b = d.substring(c), d = d.substring(0, c)) : a.b = "";
            c = d.search(/WHERE/i);
            0 < c ? (a.f = d.substring(c + 6).trim(), d = d.substring(0, c)) : a.f = "";
            a.a = d.trim().split(",").map(function(a) {
                a = Ca(a, '"');
                a = Ca(a, "'");
                return a.trim()
            })
        }
    }
}
function Ph(a, b) {
    if (b) {
        for (var c = 0; c < b.length; c++)
            a.T = a.T.replace("?", b[c]);
        Oh(a, a.T)
    }
    a.i = Qh(a);
    if (!a.i)
        return a.cb;
    var c = a.b.length, d = /OFFSET\s+(\d+)/i.exec(a.b);
    d && (a.oc = parseInt(d[1], 10), c = a.b.search(/OFFSET/i));
    if (d = /LIMIT\s+(\d+)/i.exec(a.b))
        a.mc = parseInt(d[1], 10), d = a.b.search(/LIMIT/i), d < c && (c = d);
    (c = /ORDER BY\s+(.+)/i.exec(a.b.substr(0, c))) ? (c = c[1].trim(), (d = c.match(/(ASC|DESC)/i)) ? (a.Xb = "DESC" == d[0].toUpperCase(), c = c.replace(/\s+(ASC|DESC)/i, "")) : a.Xb=!1, a.n = Ca(Ca(c, '"'), "'")) : a.n = void 0;
    return ""
}
function Rh(a) {
    if ("*" == a.o)
        return null;
    a = a.o.split(",");
    return a = a.map(function(a) {
        return Ca(a.trim(), '"')
    })
}
r.toJSON = function() {
    return {
        sql: this.T
    }
};
function Qh(a) {
    function b(a) {
        return Pa(c, function(b) {
            return b.za == a
        })
    }
    var c = [], d = /(.+?)(<=|>=|=|>|<)(.+)/i;
    if (0 < a.f.length)
        for (var e = a.f.split("AND"), f = 0; f < e.length; f++) {
            var g = e[f], h = d.exec(g);
            if (h) {
                var k = h[1].trim(), k = Ca(k, '"'), k = Ca(k, "'");
                if (0 < k.length) {
                    var n = h[3].trim(), n = 0 == n.lastIndexOf('"', 0) ? Ca(n, '"'): 0 == n.lastIndexOf("'", 0) ? Ca(n, "'"): parseFloat(n), h = new Zc(k, h[2], n), k = b(k);
                    if (0 <= k) {
                        if (c[k] = c[k].Nb(h), !c[k])
                            return a.cb = 'where clause "' + g + '" conflict', null
                    } else 
                        c.push(h)
                    } else 
                        return a.cb = 'Invalid clause "' +
                        g + '"', null
            } else 
                return a.cb = 'Invalid clause "' + g + '"', null
        }
    return c
}
r.toString = function() {
    return "query:" + this.T
};
function Sh(a, b) {
    this.a = b;
    this.c = a
}
Sh.prototype.b = I("ydn.db.sql.req.nosql.Node");
Sh.prototype.toJSON = function() {
    return {
        sql: this.a
    }
};
Sh.prototype.toString = ba("idb.Node:");
Sh.prototype.bc = function(a, b) {
    var c = Sa(this.a.a)[0], d = this.a.i, e = this.a.mc, e = isNaN(e) ? 100: e, f = this.a.oc, f = isNaN(f) ? 0: f, g = this.a.n, h = Rh(this.a), k = null, n = this.a.Xb;
    if (0 == d.length)
        k = null;
    else if (1 == d.length)
        k = Rc(d[0].a);
    else 
        throw new Jc("too many conditions.");
    null === h || Ef(a, function(a, b, c) {
        var d = a;
        b || (d = a.map(function(a) {
            var b = h.length;
            if (1 == b)
                return xc(a, h[0]);
            for (var c = {}, d = 0; d < b; d++)
                c[h[d]] = xc(a, h[d]);
            return c
        }));
        c(d, b)
    });
    var d = 0 < d.length ? d[0].za: void 0, m = T(a) + " executing on" + c;
    d && (m += ":" + d);
    m +=
    " " + Vc(k);
    F(this.b, m);
    g && g != this.c.keyPath ? b.Y(a, 4, c, g, k, n, e, f, !1) : u(d) && d != this.c.keyPath ? b.Y(a, 4, c, d, k, n, e, f, !1) : b.Y(a, 4, c, null, k, n, e, f, !1)
};
function Th(a, b) {
    Sh.call(this, a, b)
}
C(Th, Sh);
Th.prototype.bc = function(a, b) {
    var c, d = Sa(this.a.a)[0], e = this.a.i, f = null;
    if (0 == e.length)
        f = null;
    else if (1 == e.length)
        f = Rc(e[0].a);
    else 
        throw new Jc("too many conditions.");
    var g = this.a.c, e = 0 < e.length ? e[0].za: void 0, h = T(a) + " executing " + g + " on " + d;
    e && (h += ":" + e);
    h += " " + Vc(f);
    F(this.b, h);
    if ("COUNT" == g)
        f ? b.Sa(a, d, f, e, !1) : b.Sa(a, d, null, void 0, !1);
    else {
        var k, h = Rh(this.a);
        if (!h || 0 == h.length)
            throw new Hd("field name require for reduce operation: " + g);
        h = h[0];
        if ("MIN" == g)
            k = Uh(h);
        else if ("MAX" == g)
            k = Vh(h);
        else if ("AVG" ==
        g)
            c = 0, k = Wh(h);
        else if ("SUM" == g)
            c = 0, k = Xh(h);
        else 
            throw new Sd(g);
        var n;
        n = u(e) ? new ed(d, e, f) : new cd(d, f);
        var m = b.b(a.a, T(a), d, 4);
        hd(n, m);
        m.n = function(b) {
            S(a, b, !0)
        };
        var p = 0;
        m.i = function(b) {
            null != b ? (b = n.a ? m.q() : m.I(), c = k(b, c, p), m.advance(1), p++) : S(a, c)
        }
    }
};
function Wh(a) {
    return function(b, c, d) {
        u(c) || (c = 0);
        return (c * d + b[a]) / (d + 1)
    }
}
function Xh(a) {
    return function(b, c) {
        return c + b[a]
    }
}
function Uh(a) {
    return function(b, c) {
        var d = b[a];
        return u(c) ? c < d ? c : d : d
    }
}
function Vh(a) {
    return function(b, c) {
        var d = b[a];
        return u(c) ? c > d ? c : d : d
    }
};
function Yh(a, b) {
    wd.call(this, a, b)
}
C(Yh, de);
Yh.prototype.g = I("ydn.db.sql.req.IndexedDb");
Yh.prototype.executeSql = function(a, b, c) {
    if (c = Ph(b, c))
        throw new rd(c);
    c = Sa(b.a);
    if (1 == c.length) {
        var d = V(this.a, c[0]);
        if (!d)
            throw new od(c[0]);
        var e = Rh(b);
        if (e)
            for (var f = 0; f < e.length; f++)
                if (!Tf(d, e[f]))
                    throw new od('Index "' + e[f] + '" not found in ' + c[0]);
        (b.c ? new Th(d, b) : new Sh(d, b)).bc(a, this)
    } else 
        throw new Sd(b.T);
};
function Zh(a, b) {
    this.b = b;
    this.d = a;
    this.a = Rh(b)
}
Zh.prototype.c = I("ydn.db.sql.req.websql.Node");
Zh.prototype.toJSON = function() {
    return {
        sql: this.b.T
    }
};
Zh.prototype.toString = ba("websql.Node:");
function $h(a, b) {
    if (a.a) {
        if (1 == a.a.length) {
            if (B(b))
                return ab(b, a.a[0]);
            return 
        }
        for (var c = {}, d = 0; d < a.a.length; d++)
            c[a.a[d]] = ab(b, a.a[d]);
        return c
    }
    return jf(b, a.d)
}
Zh.prototype.Ac = function(a, b, c) {
    var d = this, e = [];
    b.executeSql(this.b.T, c, function(b, c) {
        for (var h = c.rows.length, k = 0; k < h; k++) {
            var n = c.rows.item(k);
            if (B(n))
                var m = $h(d, n);
            e.push(m)
        }
        a(e)
    }, function(b, c) {
        E(d.c, "Sqlite error: " + c.message);
        a(c, !0);
        return !0
    })
};
function ai(a, b) {
    Zh.call(this, a, b)
}
C(ai, Zh);
ai.prototype.Ac = function(a, b, c) {
    var d = this;
    b.executeSql(this.b.T, c, function(b, c) {
        var d = c.rows.length;
        if (1 == d)
            d = Af(c.rows.item(0)), a(d);
        else if (0 == d)
            a(void 0);
        else 
            throw new ld;
    }, function(b, c) {
        E(d.c, "Sqlite error: " + c.message);
        a(c, !0);
        return !0
    })
};
function bi(a, b) {
    wd.call(this, a, b)
}
C(bi, Bf);
bi.prototype.g = I("ydn.db.sql.req.WebSql");
bi.prototype.executeSql = function(a, b, c) {
    var d = Sa(b.a);
    if (1 == d.length) {
        var e = V(this.a, d[0]);
        if (!e)
            throw new od(d[0]);
        var f = Rh(b);
        if (f)
            for (var g = 0; g < f.length; g++)
                if (!Tf(e, f[g]))
                    throw new od('Index "' + f[g] + '" not found in ' + d[0]);
        (b.c ? new ai(e, b) : new Zh(e, b)).Ac(function(b, c) {
            S(a, b, c)
        }, a.a, c)
    } else 
        throw new Sd(b.T);
};
function ci(a, b) {
    wd.call(this, a, b)
}
C(ci, df);
ci.prototype.g = I("ydn.db.sql.req.SimpleStore");
ci.prototype.executeSql = function(a, b, c) {
    if (c = Ph(b, c))
        throw new rd(c);
    c = Sa(b.a);
    if (1 == c.length) {
        var d = V(this.a, c[0]);
        if (!d)
            throw new od(c[0]);
        var e = Rh(b);
        if (e)
            for (var f = 0; f < e.length; f++)
                if (!Tf(d, e[f]))
                    throw new N('Index "' + e[f] + '" not found in ' + c[0]);
        (b.c ? new Th(d, b) : new Sh(d, b)).bc(a, this)
    } else 
        throw new Jc(b.T);
};
function di(a, b, c, d) {
    Of.call(this, a, b, c, d)
}
C(di, lg);
di.prototype.executeSql = function(a, b) {
    for (var c = new Nh(a), d = Sa(c.a), e = 0; e < d.length; e++) {
        var f = V(this.b, d[e]);
        if (!f)
            throw new N("store: " + f + " not exists.");
    }
    F(this.j, "executeSql: " + a + " params: " + b);
    var g = this.a.m("sql", Sa(c.a), c.d);
    X(g, function() {
        Y(this).executeSql(g, c, b || [])
    }, this);
    return g
};
function ei(a, b, c) {
    Z.call(this, a, b, c)
}
C(ei, Mh);
ei.prototype.Tb = function() {
    var a = this.qa();
    if ("indexeddb" == a)
        return new Yh(this.d, this.a);
    if ("websql" == a)
        return new bi(this.d, this.a);
    if ("memory" == a || "localstorage" == a || "userdata" == a || "sessionstorage" == a)
        return new ci(this.d, this.a);
    throw new ld("No executor for " + a);
};
ei.prototype.Ha = function(a, b) {
    return new di(this, this.a, a, b)
};
ei.prototype.executeSql = function(a, b) {
    return this.c.executeSql(a, b)
};
function fi(a, b, c) {
    Z.call(this, a, b, c)
}
C(fi, ei);
Ed.prototype.getType = Ed.prototype.qa;
Ed.prototype.setName = Ed.prototype.o;
Ed.prototype.getName = Ed.prototype.getName;
Ed.prototype.getSchema = Ed.prototype.Ya;
Ed.prototype.transaction = Ed.prototype.Ma;
Ed.prototype.close = Ed.prototype.bd;
pa("ydn.db.version", "0.8.2");
pa("ydn.db.cmp", M);
pa("ydn.db.deleteDatabase", function(a, b) {
    wc && (!b || "indexeddb" == b) && wc && "deleteDatabase"in wc && wc.deleteDatabase(a);
    !fa(t.openDatabase) || b && "websql" != b || yh(a);
    b && "localstorage" != b || qh(a);
    b && "sessionstorage" != b || sh(a)
});
pg.prototype.name = pg.prototype.name;
pg.prototype.getVersion = pg.prototype.ed;
pg.prototype.getOldVersion = pg.prototype.Gc;
pg.prototype.getOldSchema = pg.prototype.Fc;
qg.prototype.getError = qg.prototype.e;
Cf.prototype.abort = Cf.prototype.Zc;
Cf.prototype.canAbort = Cf.prototype.Ec;
Cf.prototype.progress = Cf.prototype.$c;
Cf.prototype.promise = Cf.prototype.Lc;
Mh.prototype.scan = Mh.prototype.cd;
Mh.prototype.map = Mh.prototype.map;
Mh.prototype.reduce = Mh.prototype.reduce;
Mh.prototype.open = Mh.prototype.xc;
lg.prototype.scan = lg.prototype.wc;
lg.prototype.map = lg.prototype.map;
lg.prototype.reduce = lg.prototype.reduce;
lg.prototype.open = lg.prototype.vc;
Ld.prototype.getKey = Ld.prototype.dd;
Ld.prototype.getPrimaryKey = Ld.prototype.q;
Ld.prototype.getValue = Ld.prototype.I;
Ld.prototype.update = Ld.prototype.update;
Ld.prototype.clear = Ld.prototype.clear;
pa("ydn.math.Expression", Lh);
Lh.prototype.evaluate = Lh.prototype.b;
Lh.prototype.compile = Lh.prototype.c;
Lh.parseRpn = function(a) {
    return new Lh(a.match(/[^\s"']+|"[^"]*"|'[^']*'/g))
};
Lh.parseInfix = function() {
    throw new Id("Too lazy to learn Dutch in Shunting Yard station, we speak Polish here.");
};
pa("ydn.db.Iterator", P);
pa("ydn.db.KeyIterator", ad);
pa("ydn.db.ValueIterator", cd);
pa("ydn.db.IndexIterator", bd);
pa("ydn.db.IndexValueIterator", ed);
P.prototype.getState = P.prototype.Hc;
P.prototype.getKeyRange = P.prototype.Ja;
P.prototype.getIndexName = P.prototype.O;
P.prototype.getStoreName = P.prototype.h;
P.prototype.isReversed = P.prototype.V;
P.prototype.isUnique = P.prototype.W;
P.prototype.isKeyIterator = P.prototype.Rc;
P.prototype.isIndexIterator = P.prototype.Jc;
P.prototype.getPrimaryKey = P.prototype.q;
P.prototype.getKey = P.prototype.Qc;
P.prototype.resume = P.prototype.Tc;
P.prototype.reset = P.prototype.Cb;
P.prototype.reverse = P.prototype.tc;
ad.where = function(a, b, c, d, e) {
    return new ad(a, Yc(b, c, d, e))
};
cd.where = dd;
bd.where = function(a, b, c, d, e, f) {
    return new bd(a, b, Yc(c, d, e, f))
};
ed.where = fd;
pa("ydn.db.Streamer", Dd);
Dd.prototype.push = Dd.prototype.push;
Dd.prototype.collect = Dd.prototype.ad;
Dd.prototype.setSink = Dd.prototype.Pc;
Z.prototype.branch = Z.prototype.Cc;
Z.prototype.add = Z.prototype.Hb;
Z.prototype.get = Z.prototype.Oa;
Z.prototype.values = Z.prototype.P;
Z.prototype.put = Z.prototype.Pa;
Z.prototype.clear = Z.prototype.clear;
Z.prototype.remove = Z.prototype.Ib;
Z.prototype.count = Z.prototype.count;
Pf.prototype.add = Pf.prototype.Hb;
Pf.prototype.get = Pf.prototype.Oa;
Pf.prototype.values = Pf.prototype.P;
Pf.prototype.put = Pf.prototype.Pa;
Pf.prototype.clear = Pf.prototype.clear;
Pf.prototype.remove = Pf.prototype.Ib;
Pf.prototype.count = Pf.prototype.count;
pa("ydn.db.Key", td);
td.prototype.id = td.prototype.Uc;
td.prototype.parent = td.prototype.Vc;
td.prototype.storeName = td.prototype.h;
pa("ydn.db.KeyRange", O);
O.upperBound = O.upperBound;
O.lowerBound = O.lowerBound;
O.bound = O.bound;
O.only = O.only;
O.starts = Sc;
og.prototype.store_name = og.prototype.c;
og.prototype.getStoreName = og.prototype.h;
ag.prototype.name = ag.prototype.name;
ag.prototype.getKey = ag.prototype.e;
ag.prototype.getValue = ag.prototype.I;
Yf.prototype.name = Yf.prototype.name;
Yf.prototype.getKeys = Yf.prototype.Ua;
Yf.prototype.getValues = Yf.prototype.qb;
function $(a, b, c, d) {
    this.b = a;
    this.c = b;
    this.type = d || 0;
    this.a = c
}
r = $.prototype;
r.Wc = function() {
    return new $(this.b, this.c, gd(this.a), this.type)
};
r.Yc = function() {
    return new $(this.b, this.c, this.a.tc(), this.type)
};
r.unique = function(a) {
    if (!ea(a))
        throw new N("unique value must be a boolean, but " + typeof a + " found");
    if (!this.a.c)
        throw new N("primary key query is already unique");
    return new $(this.b, this.c, this.a.unique(a), this.type)
};
r.da = function(a) {
    var b = x(a) ? [a]: a;
    if (1 != b.length)
        throw Error("Multi ordering not implemented, wait for next release");
    var c = V(this.c, this.a.h());
    a = this.a;
    var d = a.Ja();
    if (a.c) {
        if (a.O() != b[0])
            if (b = [a.O(), b[0]], d)
                if (d.lower == d.upper)
                    d = Sc([d.lower]), a = new P(a.h(), b.join(", "), d, a.V(), a.W(), a.a, b);
        else 
            throw Error("Not supported");
            else 
                a = new P(a.h(), b.join(", "), null, a.V(), a.W(), a.a, b)
} else if (b[0] != c.keyPath) {
    if (d)
        throw Error("Not possible without using in memory sorting.");
        a = new ed(a.h(), b[0], null, a.V(),
        a.W())
}
return new $(this.b, this.c, a, this.type)
};
r.s = function(a, b, c, d, e) {
    if (this.a.b)
        throw new N("joint query not implemented yet");
    var f = this.a.h(), g = V(this.c, f);
    a = a == g.keyPath ? dd(f, b, c, d, e) : fd(f, a, b, c, d, e);
    return new $(this.b, this.c, a, this.type)
};
r.select = function(a) {
    var b = V(this.c, this.a.h()), c = v(a) ? a: [a], d = this.type;
    a = gd(this.a);
    if (1 == c.length)
        if (c = c[0], "_ROWID_" == c || c === b.keyPath)
            d = 2;
        else if (c && "*" != c)
            if (Tf(b, c)) {
                if (this.a.c) {
                    if (b = this.a.O(), c != b)
                        throw new N('select field name must be "' + b + '", but "' + c + '" found.');
                } else 
                    a = new P(a.h(), c, a.Ja(), a.V(), a.W(), !0);
                    d = 1
            } else 
                throw new N('Invalid select "' + c + '", index not found in store "' + b.getName() + '"');
            else 
                d = 4;
    else if (2 == c.length) {
        if (!this.a.c)
            throw new N("Only primary key can be selected for this query.");
            for (d = 0; 2 > d; d++)
                if ("_ROWID_" != c[d]&&!(u(b.keyPath) && (1 == b.e.length ? b.keyPath === c[d] : w(c[d]) && Va(b.e, c[d])))) {
                    var e = this.a.O();
                    if (c[d] != e)
                        throw new N('select field name must be "' + e + '", but "' + c[d] + '" found.');
                }
                d = 3
    } else 
        throw new N("Selecting more than 2 field names is not supported, but " + c.length + " fields selected.");
    return new $(this.b, this.c, a, d)
};
r.Xc = function(a) {
    var b = 4;
    if (2 == this.type || 3 == this.type || 1 == this.type)
        b = this.type;
    return ng(this.b.c, b, this.a, a || 100)
};
r.Kc = function(a, b) {
    if (1 > arguments.length)
        throw new N("too few arguments");
    if (2 == arguments.length) {
        if (!x(a) && v(a)) {
            if (!v(b))
                throw new N("an array is expected for second argument but, " + be(b) + " of type " + typeof b + " found");
            if (a.length != b.length)
                throw new N("length of two input arguments must be equal but, " + a.length + " and " + b.length + " found");
        }
    } else if (1 == arguments.length) {
        if (!B(a))
            throw new N("an object is expected but, " + be(a) + " of type " + typeof a + " found");
    } else 
        throw new N("too many arguments");
    var c = this.b.xc(function(d) {
        var e = d.I();
        if (x(a))
            yc(e, a, b);
        else if (v(a))
            for (var f = 0; f < a.length; f++)
                yc(e, a[f], b[f]);
        else if (B(a))
            for (f in a)
                a.hasOwnProperty(f) && (e[f] = a[f]);
        d = d.update(e);
        c.$(ma(d.Ic, d))
    }, this.a, K, this);
    return c
};
r.count = function() {
    var a = this.a, b;
    b = a.W() ? this.b.count(a) : a.c ? this.b.count(a.h(), a.O(), a.Ja()) : this.b.count(a.h(), a.Ja());
    a.e != $c && b.Ba(function() {
        "busy" != a.e && a.Cb()
    });
    return b
};
r.clear = function() {
    var a = this.a;
    return a.c ? this.b.clear(a.h(), a.O(), a.kc()) : this.b.clear(a.h(), a.kc())
};
Mh.prototype.ba = function(a, b, c, d, e) {
    if (!x(a))
        throw new TypeError('store name "' + a + '"');
    if (!Qf(this.a, a))
        throw new N('Store "' + a + '" not found.');
    var f;
    if (u(b)) {
        if (!u(c))
            throw new N("boundary value must be defined.");
        f = Yc(b, c, d, e)
    } else if (u(d))
        throw new N("second boundary must not be defined.");
    a = new cd(a, f);
    return new $(this, this.a, a)
};
lg.prototype.ba = function(a, b, c, d, e) {
    if (!x(a))
        throw new TypeError('store name "' + a + '"');
    if (!Qf(this.b, a))
        throw new N('Store "' + a + '" not found.');
    var f;
    if (u(b)) {
        if (!u(c))
            throw new N("boundary value must be defined.");
        f = Yc(b, c, d, e)
    } else if (u(d))
        throw new N("second boundary must not be defined.");
    b = this.l;
    a = new cd(a, f);
    return new $(b, this.b, a)
};
$.prototype.copy = $.prototype.Wc;
$.prototype.count = $.prototype.count;
$.prototype.list = $.prototype.Xc;
$.prototype.order = $.prototype.da;
$.prototype.patch = $.prototype.Kc;
$.prototype.reverse = $.prototype.Yc;
$.prototype.where = $.prototype.s;
Mh.prototype.from = Mh.prototype.ba;
lg.prototype.from = lg.prototype.ba;
ei.prototype.executeSql = ei.prototype.executeSql;
di.prototype.executeSql = di.prototype.executeSql;
pa("ydn.db.Storage", fi);
var hi = new function() {
    this.a = oa()
};
function ii(a) {
    this.d = a || "";
    this.e = hi
}
ii.prototype.a=!0;
ii.prototype.b=!1;
function ji(a) {
    a = new Date(a.f);
    return ki(a.getFullYear()-2E3) + ki(a.getMonth() + 1) + ki(a.getDate()) + " " + ki(a.getHours()) + ":" + ki(a.getMinutes()) + ":" + ki(a.getSeconds()) + "." + ki(Math.floor(a.getMilliseconds() / 10))
}
function ki(a) {
    return 10 > a ? "0" + a : String(a)
}
function li(a, b) {
    var c = (a.f - b) / 1E3, d = c.toFixed(3), e = 0;
    if (1 > c)
        e = 2;
    else 
        for (; 100 > c;)
            e++, c*=10;
    for (; 0 < e--;)
        d = " " + d;
    return d
}
function mi(a) {
    ii.call(this, a)
}
C(mi, ii);
mi.prototype.b=!0;
mi.prototype.c = function(a) {
    var b;
    switch (a.e.value) {
    case Ub.value:
        b = "dbg-sh";
        break;
    case Vb.value:
        b = "dbg-sev";
        break;
    case Wb.value:
        b = "dbg-w";
        break;
    case Xb.value:
        b = "dbg-i";
        break;
    default:
        b = "dbg-f"
    }
    var c = [];
    c.push(this.d, " ");
    this.a && c.push("[", ji(a), "] ");
    c.push("[", Ba(li(a, this.e.a)), "s] ");
    c.push("[", ua(a.c), "] ");
    c.push('<span class="', b, '">', ta(Ba(ua(a.d))));
    this.b && a.b && c.push("<br>", ta(Ba(a.a || "")));
    c.push("</span><br>");
    return c.join("")
};
function ni(a) {
    ii.call(this, a)
}
C(ni, ii);
ni.prototype.c = function(a) {
    var b = [];
    b.push(this.d, " ");
    this.a && b.push("[", ji(a), "] ");
    b.push("[", li(a, this.e.a), "s] ");
    b.push("[", a.c, "] ");
    b.push(a.d, "\n");
    this.b && a.b && b.push(a.a, "\n");
    return b.join("")
};
function oi() {
    this.e = ma(this.f, this);
    this.a = new ni;
    this.a.a=!1;
    this.b = this.a.b=!1;
    this.c = "";
    this.d = {}
}
oi.prototype.f = function(a) {
    if (!this.d[a.c]) {
        var b = this.a.c(a), c = pi;
        if (c)
            switch (a.e) {
            case Ub:
                qi(c, "info", b);
                break;
            case Vb:
                qi(c, "error", b);
                break;
            case Wb:
                qi(c, "warn", b);
                break;
            default:
                qi(c, "debug", b)
            } else 
                window.opera ? window.opera.postError(b) : this.c += b
        }
};
var pi = window.console;
function qi(a, b, c) {
    if (a[b])
        a[b](c);
    else 
        a.log(c)
};
var ri, si=!vb || vb && 9 <= Lb;
!wb&&!vb || vb && vb && 9 <= Lb || wb && Hb("1.9.1");
vb && Hb("9");
function ti(a, b) {
    var c;
    c = a.className;
    c = x(c) && c.match(/\S+/g) || [];
    for (var d = Ua(arguments, 1), e = c.length + d.length, f = c, g = 0; g < d.length; g++)
        0 <= D(f, d[g]) || f.push(d[g]);
    a.className = c.join(" ");
    return c.length == e
};
function ui(a, b) {
    $a(b, function(b, d) {
        "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in vi ? a.setAttribute(vi[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
    })
}
var vi = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: "height",
    maxlength: "maxLength",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width"
};
function wi(a, b, c) {
    function d(c) {
        c && b.appendChild(x(c) ? a.createTextNode(c) : c)
    }
    for (var e = 2; e < c.length; e++) {
        var f = c[e];
        !w(f) || B(f) && 0 < f.nodeType ? d(f) : Ja(xi(f) ? Sa(f) : f, d)
    }
}
function xi(a) {
    if (a && "number" == typeof a.length) {
        if (B(a))
            return "function" == typeof a.item || "string" == typeof a.item;
        if (fa(a))
            return "function" == typeof a.item
    }
    return !1
}
function yi(a) {
    this.a = a || t.document || document
}
function zi(a, b) {
    var c;
    c = a.a;
    var d = b && "*" != b ? b.toUpperCase(): "";
    c.querySelectorAll && c.querySelector && d ? c = c.querySelectorAll(d + "") : c = c.getElementsByTagName(d || "*");
    return c
}
yi.prototype.b = function(a, b, c) {
    var d = this.a, e = arguments, f = e[0], g = e[1];
    if (!si && g && (g.name || g.type)) {
        f = ["<", f];
        g.name && f.push(' name="', ua(g.name), '"');
        if (g.type) {
            f.push(' type="', ua(g.type), '"');
            var h = {};
            cb(h, g);
            delete h.type;
            g = h
        }
        f.push(">");
        f = f.join("")
    }
    f = d.createElement(f);
    g && (x(g) ? f.className = g : v(g) ? ti.apply(null, [f].concat(g)) : ui(f, g));
    2 < e.length && wi(d, f, e);
    return f
};
yi.prototype.contains = function(a, b) {
    if (a.contains && 1 == b.nodeType)
        return a == b || a.contains(b);
    if ("undefined" != typeof a.compareDocumentPosition)
        return a == b || Boolean(a.compareDocumentPosition(b) & 16);
    for (; b && a != b;)
        b = b.parentNode;
    return b == a
};
function Ai(a) {
    this.e = ma(this.f, this);
    this.b = new mi;
    this.c = this.b.a=!1;
    this.a = a;
    this.d = this.a.ownerDocument || this.a.document;
    var b = (a = this.a) ? new yi(9 == a.nodeType ? a : a.ownerDocument || a.document): ri || (ri = new yi), c = null;
    vb ? (a = c = b.a.createStyleSheet(), vb ? a.cssText = ".dbg-sev{color:#F00}.dbg-w{color:#C40}.dbg-sh{font-weight:bold;color:#000}.dbg-i{color:#444}.dbg-f{color:#999}.dbg-ev{color:#0A0}.dbg-m{color:#990}.logmsg{border-bottom:1px solid #CCC;padding:2px}.logsep{background-color: #8C8;}.logdiv{border:1px solid #CCC;background-color:#FCFCFC;font:medium monospace}" :
    a.innerHTML = ".dbg-sev{color:#F00}.dbg-w{color:#C40}.dbg-sh{font-weight:bold;color:#000}.dbg-i{color:#444}.dbg-f{color:#999}.dbg-ev{color:#0A0}.dbg-m{color:#990}.logmsg{border-bottom:1px solid #CCC;padding:2px}.logsep{background-color: #8C8;}.logdiv{border:1px solid #CCC;background-color:#FCFCFC;font:medium monospace}") : (a = zi(b, "head")[0], a || (c = zi(b, "body")[0], a = b.b("head"), c.parentNode.insertBefore(a, c)), b = c = b.b("style"), vb ? b.cssText = ".dbg-sev{color:#F00}.dbg-w{color:#C40}.dbg-sh{font-weight:bold;color:#000}.dbg-i{color:#444}.dbg-f{color:#999}.dbg-ev{color:#0A0}.dbg-m{color:#990}.logmsg{border-bottom:1px solid #CCC;padding:2px}.logsep{background-color: #8C8;}.logdiv{border:1px solid #CCC;background-color:#FCFCFC;font:medium monospace}" :
    b.innerHTML = ".dbg-sev{color:#F00}.dbg-w{color:#C40}.dbg-sh{font-weight:bold;color:#000}.dbg-i{color:#444}.dbg-f{color:#999}.dbg-ev{color:#0A0}.dbg-m{color:#990}.logmsg{border-bottom:1px solid #CCC;padding:2px}.logsep{background-color: #8C8;}.logdiv{border:1px solid #CCC;background-color:#FCFCFC;font:medium monospace}", a.appendChild(c));
    this.a.className += " logdiv"
}
Ai.prototype.f = function(a) {
    var b = 100 >= this.a.scrollHeight - this.a.scrollTop - this.a.clientHeight, c = this.d.createElement("div");
    c.className = "logmsg";
    c.innerHTML = this.b.c(a);
    this.a.appendChild(c);
    b && (this.a.scrollTop = this.a.scrollHeight)
};
Ai.prototype.clear = function() {
    this.a.innerHTML = ""
};
var Bi = null, Ci = null;
I("ydn.debug");
pa("ydn.debug.log", function(a, b, c) {
    if (y(b))
        b = new Tb("log", b);
    else if (x(b)) {
        b = b.toUpperCase();
        if (!cc) {
            cc = {};
            for (var d = 0, e; e = bc[d]; d++)
                cc[e.value] = e, cc[e.name] = e
        }
        b = cc[b] || null
    } else 
        b = Zb;
    I(a || "ydn").b = b;
    u(c) ? Ci || (a = Ci = new Ai(c), !0 != a.c && (c = jc(), b = a.e, c.a || (c.a = []), c.a.push(b), a.c=!0), jc().b = Wb) : Bi || Ci || (a = Bi = new oi, !0 != a.b && (c = jc(), b = a.e, c.a || (c.a = []), c.a.push(b), a.b=!0), jc().b = Wb)
});
function Di(a, b) {
    Pd.call(this, a, b)
}
C(Di, Pd);
Di.prototype.b = ba(!1);
Di.prototype.c = function(a, b) {
    function c(b) {
        u(a[b]) ? (e=!1, d[b]=!0) : (d[b]=!1, 0 <= b-1 && c(b-1))
    }
    var d = [], e=!0;
    c(a.length-1);
    e && (d = []);
    return Qd(this, d, b)
};
function Ei(a, b) {
    Pd.call(this, a, b)
}
C(Ei, Pd);
Ei.prototype.b = ba(!1);
Ei.prototype.c = function(a, b) {
    var c = [], d = b[0];
    if (null == d)
        return [];
    for (var e=!0, f=!1, g = d, h = [], k = 1; k < a.length; k++)
        if (null != b[k]) {
            var n = M(d, b[k]);
            h[k] = n;
            1 === n ? e=!1 : -1 === n && (e=!1, f=!0, 1 === M(b[k], g) && (g = b[k]))
        } else 
            e=!1, f=!0;
    if (e)
        for (f = 0; f < a.length; f++)
            null != b[f] && (c[f]=!0);
    else if (f)
        for (f = 0; f < a.length; f++)
            null != b[f] && 1 === M(g, b[f]) && (c[f] = g);
    else 
        for (f = 1; f < a.length; f++)
            1 === h[f] && (c[f] = d);
    return e ? (this.e++, this.a && this.a.push(g), c) : {
        continuePrimary: c
    }
};
function Fi(a, b) {
    Pd.call(this, a, b);
    this.d = a instanceof Dd&&!!a.Ka
}
C(Fi, Pd);
Fi.prototype.i = I("ydn.db.algo.ZigzagMerge");
Fi.prototype.d=!1;
Fi.prototype.b = function(a, b) {
    var c = Fi.G.b.call(this, a, b);
    if (this.d) {
        var d = a[0].O().split(", ");
        if (1 < d.length) {
            if (d[d.length-1] != this.a.Ka)
                throw new Hd("Output streamer projection field must be same as postfix field in the iterator");
        } else 
            E(this.i, "Unable to check correctness of output streamer.")
    }
    return c
};
Fi.prototype.c = function(a, b) {
    function c(a, b) {
        var c = a.slice(0, a.length-1);
        c.push(b);
        return c
    }
    var d = [];
    if (0 == a.length || null == a[0] || null == a[0])
        return [];
    for (var e=!0, f = 0, g = a[f][a[f].length-1], h = [], k = 1; k < a.length; k++)
        if (null != a[k]) {
            var n = a[k][a[k].length-1], m = M(g, n);
            h[k] = m;
            1 === m ? e=!1 : -1 === m && (e=!1, g = n, f = 1)
        } else 
            return [];
    if (e) {
        for (e = 0; e < a.length; e++)
            null != a[e] && (d[e]=!0);
        this.a && (this.d ? this.a.push(b[0], g) : this.a.push(b[0]));
        return d
    }
    if (0 == f)
        for (e = 1; e < a.length; e++)
            1 === h[e] && (d[e] = c(a[e], g));
    else 
        for (e =
        0; e < a.length; e++)
            e != f && null != a[e] && 1 === M(g, a[e][a[e].length-1]) && (d[e] = c(a[e], g));
    return {
        "continue": d
    }
};
pa("ydn.db.algo.NestedLoop", Di);
pa("ydn.db.algo.ZigzagMerge", Fi);
pa("ydn.db.algo.SortedMerge", Ei);
function Gi(a) {
    this.b = a || []
}
Gi.prototype.a = function(a) {
    return -1 == this.b.indexOf(a) ? a : null
};
function Hi() {}
Hi.prototype.a = function(a) {
    var b = {
        ational: "ate",
        tional: "tion",
        enci: "ence",
        anci: "ance",
        izer: "ize",
        bli: "ble",
        alli: "al",
        entli: "ent",
        eli: "e",
        ousli: "ous",
        ization: "ize",
        ation: "ate",
        ator: "ate",
        alism: "al",
        iveness: "ive",
        fulness: "ful",
        ousness: "ous",
        aliti: "al",
        iviti: "ive",
        biliti: "ble",
        logi: "log"
    }, c = {
        icate: "ic",
        ative: "",
        alize: "al",
        iciti: "ic",
        ical: "ic",
        ful: "",
        ness: ""
    };
    a = a.toLowerCase();
    var d, e, f = a;
    if (3 > a.length)
        return a;
    var g, h;
    a = a.substr(0, 1);
    "y" == a && (f = a.toUpperCase() + f.substr(1));
    g = /^(.+?)(ss|i)es$/;
    e = /^(.+?)([^s])s$/;
    g.test(f) ? f = f.replace(g, "$1$2") : e.test(f) && (f = f.replace(e, "$1$2"));
    g = /^(.+?)eed$/;
    e = /^(.+?)(ed|ing)$/;
    g.test(f) ? (e = g.exec(f), g = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, g.test(e[1]) && (g = /.$/, f = f.replace(g, ""))) : e.test(f) && (e = e.exec(f), d = e[1], e = /^([^aeiou][^aeiouy]*)?[aeiouy]/, e.test(d) && (f = d, e = /(at|bl|iz)$/, h = /([^aeiouylsz])\1$/, d = /^[^aeiou][^aeiouy]*[aeiouy][^aeiouwxy]$/, e.test(f) ? f = f + "e" : h.test(f) ? (g = /.$/, f = f.replace(g, "")) : d.test(f) && (f = f + "e")));
    g = /^(.+?)y$/;
    g.test(f) && (e = g.exec(f),
    d = e[1], g = /^([^aeiou][^aeiouy]*)?[aeiouy]/, g.test(d) && (f = d + "i"));
    g = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
    g.test(f) && (e = g.exec(f), d = e[1], e = e[2], g = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, g.test(d) && (f = d + b[e]));
    g = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
    g.test(f) && (e = g.exec(f), d = e[1], e = e[2], g = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, g.test(d) && (f = d + c[e]));
    g =
    /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
    e = /^(.+?)(s|t)(ion)$/;
    g.test(f) ? (e = g.exec(f), d = e[1], g = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, g.test(d) && (f = d)) : e.test(f) && (e = e.exec(f), d = e[1] + e[2], e = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, e.test(d) && (f = d));
    g = /^(.+?)e$/;
    g.test(f) && (e = g.exec(f), d = e[1], g = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/,
    e = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*([aeiouy][aeiou]*)?$/, h = /^[^aeiou][^aeiouy]*[aeiouy][^aeiouwxy]$/, g.test(d) || e.test(d)&&!h.test(d)) && (f = d);
    g = /ll$/;
    e = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/;
    g.test(f) && e.test(f) && (g = /.$/, f = f.replace(g, ""));
    "y" == a && (f = a.toLowerCase() + f.substr(1));
    return f
};
function Ii(a) {
    this.b = a
}
Ii.prototype.a = function(a) {
    a = a.toLowerCase();
    a = a.replace(/([^c])\1/g, "$1");
    a = a.match(/^(kn|gn|pn|ae|wr)/) ? a.substr(1, a.length-1) : a;
    a = a.replace(/mb$/, "m");
    a = a.replace(/ck/g, "k");
    a = function(a) {
        a = a.replace(/([^s]|^)(c)(h)/g, "$1x$3").trim();
        a = a.replace(/cia/g, "xia");
        a = a.replace(/c(i|e|y)/g, "s$1");
        return a = a.replace(/c/g, "k")
    }(a);
    a = function(a) {
        a = a.replace(/d(ge|gy|gi)/g, "j$1");
        return a = a.replace(/d/g, "t")
    }(a);
    a = function(a) {
        a = a.replace(/gh(^$|[^aeiou])/g, "h$1");
        return a = a.replace(/g(n|ned)$/g, "$1")
    }(a);
    a = function(a) {
        a = a.replace(/([^g]|^)(g)(i|e|y)/g, "$1j$3");
        a = a.replace(/gg/g, "g");
        return a = a.replace(/g/g, "k")
    }(a);
    a = a.replace(/([aeiou])h([^aeiou])/g, "$1$2");
    a = a.replace(/ph/g, "f");
    a = a.replace(/q/g, "k");
    a = a.replace(/s(h|io|ia)/g, "x$1");
    a = function(a) {
        a = a.replace(/^x/, "s");
        return a = a.replace(/x/g, "ks")
    }(a);
    a = function(a) {
        a = a.replace(/t(ia|io)/g, "x$1");
        return a = a.replace(/th/, "0")
    }(a);
    a = a.replace(/tch/g, "ch");
    a = a.replace(/v/g, "f");
    a = a.replace(/^wh/, "w");
    a = a.replace(/w([^aeiou]|$)/g, "$1");
    a = a.replace(/y([^aeiou]|$)/g,
    "$1");
    a = a.replace(/z/, "s");
    a = a.charAt(0) + a.substr(1, a.length).replace(/[aeiou]/g, "");
    a.length >= this.b && (a = a.substring(0, this.b));
    return a = a.toUpperCase()
};
var Ji = new Ii(32), Ki = new Hi, Li = new Gi("a a's able about above according accordingly across actually after afterwards again against ain't all allow allows almost alone along already also although always am among amongst an and another any anybody anyhow anyone anything anyway anyways anywhere apart appear appreciate appropriate are aren't around as aside ask asking associated at available away awfully b be became because become becomes becoming been before beforehand behind being believe below beside besides best better between beyond both brief but by c c'mon c's came can can't cannot cant cause causes certain certainly changes clearly co com come comes concerning consequently consider considering contain containing contains corresponding could couldn't course currently d definitely described despite did didn't different do does doesn't doing don't done down downwards during e each edu eg eight either else elsewhere enough entirely especially et etc even ever every everybody everyone everything everywhere ex exactly example except f far few fifth first five followed following follows for former formerly forth four from further furthermore g get gets getting given gives go goes going gone got gotten greetings h had hadn't happens hardly has hasn't have haven't having he he's hello help hence her here here's hereafter hereby herein hereupon hers herself hi him himself his hither hopefully how howbeit however i i'd i'll i'm i've ie if ignored immediate in inasmuch inc indeed indicate indicated indicates inner insofar instead into inward is isn't it it'd it'll it's its itself j just k keep keeps kept know knows known l last lately later latter latterly least less lest let let's like liked likely little look looking looks ltd m mainly many may maybe me mean meanwhile merely might more moreover most mostly much must my myself n name namely nd near nearly necessary need needs neither never nevertheless new next nine no nobody non none noone nor normally not nothing novel now nowhere o obviously of off often oh ok okay old on once one ones only onto or other others otherwise ought our ours ourselves out outside over overall own p particular particularly per perhaps placed please plus possible presumably probably provides q que quite qv r rather rd re really reasonably regarding regardless regards relatively respectively right s said same saw say saying says second secondly see seeing seem seemed seeming seems seen self selves sensible sent serious seriously seven several shall she should shouldn't since six so some somebody somehow someone something sometime sometimes somewhat somewhere soon sorry specified specify specifying still sub such sup sure t t's take taken tell tends th than thank thanks thanx that that's thats the their theirs them themselves then thence there there's thereafter thereby therefore therein theres thereupon these they they'd they'll they're they've think third this thorough thoroughly those though three through throughout thru thus to together too took toward towards tried tries truly try trying twice two u un under unfortunately unless unlikely until unto up upon us use used useful uses using usually uucp v value various very via viz vs w want wants was wasn't way we we'd we'll we're we've welcome well went were weren't what what's whatever when whence whenever where where's whereafter whereas whereby wherein whereupon wherever whether which while whither who who's whoever whole whom whose why will willing wish with within without won't wonder would wouldn't x y yes yet you you'd you'll you're you've your yours yourself yourselves z zero".split(" "));
function Mi() {
    this.data = categ_letters_numbers_data;
    this.a = 0
}
function Ni(a, b) {
    for (var c = a.a, d = a.data[c], d = 1, e = 0; 0 <= c && c < a.data.length;) {
        d = a.data[c];
        if (d instanceof Array)
            if (b < d[0])
                d =- 1;
            else if (b > d[1])
                d = 1;
            else 
                return a.a = c, !0;
        else {
            if (d == b)
                return a.a = c, !0;
            d = b < d?-1 : 1
        }
        if (0 == e)
            e = d;
        else if (e != d)
            break;
        c += d;
        if (c > a.data.length || 0 > c)
            break
    }
    return !1
}
function Oi(a, b) {
    for (var c = 0, d = 0, e = a.length, f = 0; f < e; ++f) {
        a:
        {
            var d = a.charCodeAt(f), g = new Mi;
            if (y(d))
                d = Ni(g, d);
            else {
                for (var h = 0, k = d.length; h < k; ++h)
                    if (!1 === Ni(g, d[h])) {
                        d=!1;
                        break a
                    }
                d=!0
            }
        }
        d || ((d = f - c) && b(c, d), c = f + 1)
    }(d = e - c) && b(c, d)
};
var Pi, Qi;
Qi = Pi=!1;
var Ri = qb();
Ri && (-1 != Ri.indexOf("Firefox") ? Pi=!0 : -1 != Ri.indexOf("Camino")||-1 != Ri.indexOf("iPhone")||-1 != Ri.indexOf("iPod")||-1 != Ri.indexOf("iPad")||-1 != Ri.indexOf("Android")||-1 != Ri.indexOf("Chrome") && (Qi=!0));
var Si = Pi, Ti = Qi;
function Ui(a, b) {
    this.f = b;
    this.value = a
}
Ui.prototype.I = l("value");
Ui.prototype.b = ba(1);
var Vi=!yb && (Ti || Si);
Ui.prototype.cc = l("value");
Ui.prototype.toString = function() {
    return "Entry:" + this.value
};
function Wi(a, b, c, d, e, f) {
    Ui.call(this, d, e);
    this.e = a;
    this.c = b;
    this.d = c;
    this.ub = f || []
}
C(Wi, Ui);
r = Wi.prototype;
r.ab = function() {
    return {
        k: this.f,
        v: this.value.toLowerCase(),
        id: this.cc(),
        loc: this.ub
    }
};
r.cc = function() {
    var a = [this.e, this.d, this.c, this.value];
    return Vi ? a : Ac(a)
};
r.h = l("e");
r.q = l("d");
r.toString = function() {
    return ["IndexEntry", this.e, this.d, this.value].join(":")
};
function Xi(a, b, c, d, e) {
    Ui.call(this, b, c);
    this.i = d;
    this.a = e;
    this.type = a;
    this.fc = 1
}
C(Xi, Ui);
Xi.prototype.b = function() {
    return this.a * this.type * this.fc
};
Xi.prototype.cc = function() {
    return this.value + "|" + this.i
};
function Yi(a, b) {
    Wi.call(this, b.h(), b.c, b.q(), b.I(), b.f, []);
    this.n = a;
    this.a = [b]
}
C(Yi, Wi);
Yi.prototype.count = function() {
    return this.a.length
};
function Zi(a, b) {
    for (var c = b.a[0], d = 0; d < a.a.length; d++)
        if (a.a[d].c == c.c && a.a[d].value == c.value)
            return;
    a.a.push(c)
}
Yi.prototype.b = function() {
    for (var a = 0, b = 0; b < this.a.length; b++)
        var c = this.a[b], d = Dg(this.n, c.h(), c.c), c = c.b(), a = a + c * d.c;
    return a
};
function Za(a, b) {
    var c = a.b(), d = b.b();
    return c <= d ? 1 : -1
}
Yi.prototype.ab = function() {
    for (var a = {
        value: this.value,
        primaryKey: this.d,
        storeName: this.e,
        score: this.b(),
        tokens: []
    }, b = 0; b < this.a.length; b++)
        a.tokens[b] = this.a[b].ab();
    return a
};
Yi.prototype.toString = function() {
    return ["RankEntry", this.e, this.d, this.value].join(":") + "[" + this.a.length + "]"
};
function $i(a) {
    var b = [], c;
    a = a.split(/\s+/);
    for (var d = 0; d < a.length; d++) {
        c = a[d];
        for (var e = c.length-1, f = Array(e)
            , g = 0;
        g < e;
        g++)f[g] = c.substring(g, g + 2);
        c = f;
        b.push.apply(b, c)
    }
    return b
};
function fg(a, b, c, d, e, f, g) {
    Wi.call(this, b, c, d, e, f, g);
    this.a = a
}
C(fg, Wi);
fg.prototype.b = function() {
    var a, b = this.value;
    a = $i(this.a.value.toLowerCase().replace(/^\s+|\s+$/g, ""));
    var b = $i(b.toLowerCase().replace(/^\s+|\s+$/g, "")), c = 0, d = a.length + b.length, e, f, g, h;
    for (e = 0; e < a.length; e++)
        for (g = a[e], f = 0; f < b.length; f++)
            if (h = b[f], g == h) {
                c++;
                delete b[f];
                break
            }
    a = 2 * c / d;
    b = Math.log(this.ub.length + 1);
    c = this.a.b();
    return b * a * c
};
fg.prototype.ab = function() {
    return {
        keyPath: this.c,
        value: this.value,
        loc: this.ub.slice()
    }
};
fg.prototype.toString = function() {
    return ["ResultEntry", this.e, this.d, this.value].join(":")
};
function aj(a, b) {
    this.a = a;
    this.b = b;
    this.d = [];
    this.c = 0
}
function eg(a, b) {
    for (var c, d, e = a.a.getName(), f = 0; f < a.b.length; f++) {
        var g = a.b[f], h = g.type;
        0.4 == h || 0.6 == h ? (d = "v", c = g.I().toLowerCase(), c = Sc(c)) : (d = "v", c = g.I().toLowerCase(), c = O.only(c));
        b(e, d, c, g);
        a.c++;
        0.6 == h && (d = "k", c = g.f, c = O.only(c), b(e, d, c, g), a.c++)
    }
}
function dg(a) {
    for (var b = [a.a.getName()], c = 0; c < a.a.count(); c++) {
        var d = a.a.index(c).h();
        -1 == b.indexOf(d) && b.push(d)
    }
    return b
}
aj.prototype.e = function() {
    for (var a = [], b = [], c = 0; c < this.d.length; c++) {
        var d = this.d[c];
        if (0 == d.a.type)
            -1 == Pa(b, function(a) {
                return a.q() == d.q() && a.h() == d.h()
            }) && b.push(d);
        else {
            var e = new Yi(this.a, d), f = Pa(a, function(a) {
                return a.q() == e.q() && a.h() == e.h()
            });
            if (0 <= f) {
                var g = a[f];
                Ia.splice.call(a, f, 1);
                Zi(g, e);
                e = g
            }
            Ya(a, e)
        }
    }
    for (f = 0; f < b.length; f++)
        for (g = b[f], c = a.length-1; 0 <= c; --c) {
            var h = a[c];
            if (g.q() == h.q() && g.h() == h.h()) {
                a.splice(f, 1);
                break
            }
        }
    return a.map(function(a) {
        return a.ab()
    })
};
function bj(a) {
    this.a = a;
    if ("en" == a.c) {
        a = a.d || ["stop", "stemmer", "metaphone"];
        for (var b = [], c = 0; c < a.length; c++)
            if ("metaphone" == a[c])
                b.push(Ji);
            else if ("stemmer" == a[c])
                b.push(Ki);
            else if ("stop" == a[c])
                b.push(Li);
            else 
                throw Error('Invalid normalizer "' + a[c] + '" for English lang');
        a = b
    } else 
        a = [];
    this.b = a
}
function cj(a, b) {
    for (var c = 0; c < a.b.length; c++) {
        var d = a.b[c].a(b);
        if (d)
            b = d;
        else 
            return null
    }
    return b
}
function dj(a, b) {
    var c = [], d = [];
    Oi(b, function(a, e) {
        c.push(b.substr(a, e));
        d.push(a)
    });
    for (var e = [], f = 0; f < c.length; f++)
        e[f] = cj(a, c[f]);
    for (var g = [], h = 0, f = 0; f < c.length; f++) {
        var k = c[f], n = e[f], m = "*" == b.charAt(d[f] + k.length), p = m ? d[f] + k.length + 1: d[f] + k.length, p = '"' == b.charAt(d[f]-1) && '"' == b.charAt(p), q = "-" == b.charAt(p ? d[f]-2 : d[f]-1), s = 0.8;
        m ? s = 0.4 : p ? s = 1 : q ? s = 0 : null != n && (s = 0.6);
        k = new Xi(s, k, n, d[f], 1 / (f + 2));
        g.push(k);
        h += k.b()
    }
    for (f = 0; f < g.length; ++f)
        g[f].fc = 1 / h;
    return g
}
bj.prototype.c = function(a, b, c) {
    var d = [], e = [];
    Oi(a, function(b, c) {
        d.push(a.substr(b, c));
        e.push(b)
    });
    for (var f = [], g = 0; g < d.length; g++)
        f[g] = cj(this, d[g]);
    var h = b.h();
    b = b.a;
    for (var k = [], g = 0; g < d.length; g++) {
        var n = d[g], m = f[g];
        if (null != m) {
            var p = Oa(k, function(a) {
                return a.I() == n
            });
            p || (p = new Wi(h, b, c, n, m), k.push(p));
            p.ub.push(e[g])
        }
    }
    return k
};
function ej(a, b, c, d) {
    for (var e = [], f = 0; f < a.a.count(); f++) {
        var g = a.a.index(f);
        if (g.h() == b) {
            var h = xc(d, g.a);
            x(h) && (e = e.concat(a.c(h, g, c)))
        }
    }
    return e
};
Z.prototype.ec = function(a, b) {
    var c = this;
    b.a = new bj(b);
    Ag(a, function(d, e) {
        function f(b) {
            var e = a.getName();
            Ef(d, function(a, f, g) {
                if (f)
                    g(a, f);
                else {
                    Ff(d, a);
                    var h = new td(e, b);
                    ig(c.c, [h]).Ba(function() {
                        g(a, f)
                    })
                }
            })
        }
        function g(b) {
            var e = a.getName();
            Ef(d, function(a, f, g) {
                f ? g(a, f) : (Ff(d, a), b && (b = Qc(O.bound([e, b.lower], [e, b.upper, "\uffff"]))), jg(c.c, e, b).Ba(function() {
                    g(a, f)
                }))
            })
        }
        function h(e) {
            var f = a.getName();
            Ef(d, function(a, g, h) {
                Ff(d, a);
                if (g)
                    h(a, g);
                else {
                    var k = b.getName();
                    v(a) || (a = [a]);
                    for (var z = 0; z < a.length; z++) {
                        var H =
                        a[z];
                        ud(H) && (H = ej(b.a, f, H, e[z]).map(function(a) {
                            return a.ab()
                        }), H = hg(c.c, k, H), z == a.length-1 && H.Ba(function() {
                            h(a, g)
                        }))
                    }
                }
            })
        }
        var k = d.b;
        "put" == k ? h([e[1]]) : "put:array" == k ? h(e[1]) : "add" == k ? h([e[1]]) : "add:array" == k ? h(e[1]) : "rm:iter" == k || "clear" == k ? g(e[1]) : "rm" == k && f(e[1])
    })
};
Z.prototype.wb = function(a, b) {
    var c = Hg(this.a, a);
    if (!c)
        throw new N('full text index catalog "' + a + '" not found.');
    var c = c.a, d = dj(c, b), c = 0 == d.length ? null: new aj(c.a, d);
    return c ? cg(this.c, c) : (F(this.e, 'query "' + b + '" contains only noise and search is ignored'), Hf("search", null))
};
Z.prototype.search = Z.prototype.wb;
aj.prototype.collect = aj.prototype.e;
var categ_letters_numbers_data = [[48, 57], [65, 90], [97, 122], 170, [178, 179], 181, [185, 186], [188, 190], [192, 214], [216, 246], [248, 705], [710, 721], [736, 740], 748
, 750, [880, 884], [886, 887], [890, 893], 902, [904, 906], 908, [910, 929], [931, 1013], [1015, 1153], [1162, 1319], [1329, 1366], 1369
, [1377, 1415], [1488, 1514], [1520, 1522], [1568, 1610], [1632, 1641], [1646, 1647], [1649, 1747], 1749, [1765, 1766], [1774, 1788], 1791
, 1808, [1810, 1839], [1869, 1957], 1969, [1984, 2026], [2036, 2037], 2042, [2048, 2069], 2074, 2084, 2088, [2112, 2136], 2208, [2210, 2220]
, [2308, 2361], 2365, 2384, [2392, 2401], [2406, 2415], [2417, 2423], [2425, 2431], [2437, 2444], [2447, 2448], [2451, 2472], [2474, 2480]
, 2482, [2486, 2489], 2493, 2510, [2524, 2525], [2527, 2529], [2534, 2545], [2548, 2553], [2565, 2570], [2575, 2576], [2579, 2600]
, [2602, 2608], [2610, 2611], [2613, 2614], [2616, 2617], [2649, 2652], 2654, [2662, 2671], [2674, 2676], [2693, 2701], [2703, 2705]
, [2707, 2728], [2730, 2736], [2738, 2739], [2741, 2745], 2749, 2768, [2784, 2785], [2790, 2799], [2821, 2828], [2831, 2832], [2835, 2856]
, [2858, 2864], [2866, 2867], [2869, 2873], 2877, [2908, 2909], [2911, 2913], [2918, 2927], [2929, 2935], 2947, [2949, 2954], [2958, 2960]
, [2962, 2965], [2969, 2970], 2972, [2974, 2975], [2979, 2980], [2984, 2986], [2990, 3001], 3024, [3046, 3058], [3077, 3084], [3086, 3088]
, [3090, 3112], [3114, 3123], [3125, 3129], 3133, [3160, 3161], [3168, 3169], [3174, 3183], [3192, 3198], [3205, 3212], [3214, 3216]
, [3218, 3240], [3242, 3251], [3253, 3257], 3261, 3294, [3296, 3297], [3302, 3311], [3313, 3314], [3333, 3340], [3342, 3344], [3346, 3386]
, 3389, 3406, [3424, 3425], [3430, 3445], [3450, 3455], [3461, 3478], [3482, 3505], [3507, 3515], 3517, [3520, 3526], [3585, 3632]
, [3634, 3635], [3648, 3654], [3664, 3673], [3713, 3714], 3716, [3719, 3720], 3722, 3725, [3732, 3735], [3737, 3743], [3745, 3747], 3749
, 3751, [3754, 3755], [3757, 3760], [3762, 3763], 3773, [3776, 3780], 3782, [3792, 3801], [3804, 3807], 3840, [3872, 3891], [3904, 3911]
, [3913, 3948], [3976, 3980], [4096, 4138], [4159, 4169], [4176, 4181], [4186, 4189], 4193, [4197, 4198], [4206, 4208], [4213, 4225], 4238
, [4240, 4249], [4256, 4293], 4295, 4301, [4304, 4346], [4348, 4680], [4682, 4685], [4688, 4694], 4696, [4698, 4701], [4704, 4744]
, [4746, 4749], [4752, 4784], [4786, 4789], [4792, 4798], 4800, [4802, 4805], [4808, 4822], [4824, 4880], [4882, 4885], [4888, 4954]
, [4969, 4988], [4992, 5007], [5024, 5108], [5121, 5740], [5743, 5759], [5761, 5786], [5792, 5866], [5870, 5872], [5888, 5900]
, [5902, 5905], [5920, 5937], [5952, 5969], [5984, 5996], [5998, 6000], [6016, 6067], 6103, 6108, [6112, 6121], [6128, 6137], [6160, 6169]
, [6176, 6263], [6272, 6312], 6314, [6320, 6389], [6400, 6428], [6470, 6509], [6512, 6516], [6528, 6571], [6593, 6599], [6608, 6618]
, [6656, 6678], [6688, 6740], [6784, 6793], [6800, 6809], 6823, [6917, 6963], [6981, 6987], [6992, 7001], [7043, 7072], [7086, 7141]
, [7168, 7203], [7232, 7241], [7245, 7293], [7401, 7404], [7406, 7409], [7413, 7414], [7424, 7615], [7680, 7957], [7960, 7965]
, [7968, 8005], [8008, 8013], [8016, 8023], 8025, 8027, 8029, [8031, 8061], [8064, 8116], [8118, 8124], 8126, [8130, 8132], [8134, 8140]
, [8144, 8147], [8150, 8155], [8160, 8172], [8178, 8180], [8182, 8188], [8304, 8305], [8308, 8313], [8319, 8329], [8336, 8348], 8450, 8455
, [8458, 8467], 8469, [8473, 8477], 8484, 8486, 8488, [8490, 8493], [8495, 8505], [8508, 8511], [8517, 8521], 8526, [8528, 8585]
, [9312, 9371], [9450, 9471], [10102, 10131], [11264, 11310], [11312, 11358], [11360, 11492], [11499, 11502], [11506, 11507], 11517
, [11520, 11557], 11559, 11565, [11568, 11623], 11631, [11648, 11670], [11680, 11686], [11688, 11694], [11696, 11702], [11704, 11710]
, [11712, 11718], [11720, 11726], [11728, 11734], [11736, 11742], 11823, [12293, 12295], [12321, 12329], [12337, 12341], [12344, 12348]
, [12353, 12438], [12445, 12447], [12449, 12538], [12540, 12543], [12549, 12589], [12593, 12686], [12690, 12693], [12704, 12730]
, [12784, 12799], [12832, 12841], [12872, 12879], [12881, 12895], [12928, 12937], [12977, 12991], 13312, 19893, 19968, 40908
, [40960, 42124], [42192, 42237], [42240, 42508], [42512, 42539], [42560, 42606], [42623, 42647], [42656, 42735], [42775, 42783]
, [42786, 42888], [42891, 42894], [42896, 42899], [42912, 42922], [43000, 43009], [43011, 43013], [43015, 43018], [43020, 43042]
, [43056, 43061], [43072, 43123], [43138, 43187], [43216, 43225], [43250, 43255], 43259, [43264, 43301], [43312, 43334], [43360, 43388]
, [43396, 43442], [43471, 43481], [43520, 43560], [43584, 43586], [43588, 43595], [43600, 43609], [43616, 43638], 43642, [43648, 43695]
, 43697, [43701, 43702], [43705, 43709], 43712, 43714, [43739, 43741], [43744, 43754], [43762, 43764], [43777, 43782], [43785, 43790]
, [43793, 43798], [43808, 43814], [43816, 43822], [43968, 44002], [44016, 44025], 44032, 55203, [55216, 55238], [55243, 55291]
, [63744, 64109], [64112, 64217], [64256, 64262], [64275, 64279], 64285, [64287, 64296], [64298, 64310], [64312, 64316], 64318
, [64320, 64321], [64323, 64324], [64326, 64433], [64467, 64829], [64848, 64911], [64914, 64967], [65008, 65019], [65136, 65140]
, [65142, 65276], [65296, 65305], [65313, 65338], [65345, 65370], [65382, 65470], [65474, 65479], [65482, 65487], [65490, 65495]
, [65498, 65500], [65536, 65547], [65549, 65574], [65576, 65594], [65596, 65597], [65599, 65613], [65616, 65629], [65664, 65786]
, [65799, 65843], [65856, 65912], 65930, [66176, 66204], [66208, 66256], [66304, 66334], [66336, 66339], [66352, 66378], [66432, 66461]
, [66464, 66499], [66504, 66511], [66513, 66517], [66560, 66717], [66720, 66729], [67584, 67589], 67592, [67594, 67637], [67639, 67640]
, 67644, [67647, 67669], [67672, 67679], [67840, 67867], [67872, 67897], [67968, 68023], [68030, 68031], 68096, [68112, 68115]
, [68117, 68119], [68121, 68147], [68160, 68167], [68192, 68222], [68352, 68405], [68416, 68437], [68440, 68466], [68472, 68479]
, [68608, 68680], [69216, 69246], [69635, 69687], [69714, 69743], [69763, 69807], [69840, 69864], [69872, 69881], [69891, 69926]
, [69942, 69951], [70019, 70066], [70081, 70084], [70096, 70105], [71296, 71338], [71360, 71369], [73728, 74606], [74752, 74850]
, [77824, 78894], [92160, 92728], [93952, 94020], 94032, [94099, 94111], [110592, 110593], [119648, 119665], [119808, 119892]
, [119894, 119964], [119966, 119967], 119970, [119973, 119974], [119977, 119980], [119982, 119993], 119995, [119997, 120003]
, [120005, 120069], [120071, 120074], [120077, 120084], [120086, 120092], [120094, 120121], [120123, 120126], [120128, 120132], 120134
, [120138, 120144], [120146, 120485], [120488, 120512], [120514, 120538], [120540, 120570], [120572, 120596], [120598, 120628]
, [120630, 120654], [120656, 120686], [120688, 120712], [120714, 120744], [120746, 120770], [120772, 120779], [120782, 120831]
, [126464, 126467], [126469, 126495], [126497, 126498], 126500, 126503, [126505, 126514], [126516, 126519], 126521, 126523, 126530
, 126535, 126537, 126539, [126541, 126543], [126545, 126546], 126548, 126551, 126553, 126555, 126557, 126559, [126561, 126562], 126564
, [126567, 126570], [126572, 126578], [126580, 126583], [126585, 126588], 126590, [126592, 126601], [126603, 126619], [126625, 126627]
, [126629, 126633], [126635, 126651], [127232, 127242], 131072, 173782, 173824, 177972, 177984, 178205, [194560, 195101]];;

})();
//# sourceMappingURL=ydn.db-dev.js.map

