// Acorn: Copyright 2012 Marijn Haverbeke, MIT License
(function (X, k) {
    if ("object" == typeof exports && "object" == typeof module) return k(exports);
    if ("function" == typeof define && define.amd) return define(["exports"], k);
    k(X.acorn || (X.acorn = {}))
})(this, function (X) {
    function k(a, b) {
        var c = f;
        for (var e = 1, g = 0; ;) {
            ja.lastIndex = g;
            var w = ja.exec(c);
            if (w && w.index < a) ++e, g = w.index + w[0].length; else break
        }
        c = {line: e, column: a - g};
        b += " (" + c.line + ":" + c.column + ")";
        b = new SyntaxError(b);
        b.pos = a;
        b.loc = c;
        b.raisedAt = d;
        throw b;
    }

    function ka(a) {
        a = a.split(" ");
        for (var b = Object.create(null),
                 c = 0; c < a.length; c++) b[a[c]] = !0;
        return function (e) {
            return b[e] || !1
        }
    }

    function M() {
        this.line = N;
        this.column = d - E
    }

    function u(a, b) {
        Q = d;
        m.locations && (ua = new M);
        h = a;
        Y();
        B = b;
        Z = a.beforeExpr
    }

    function va() {
        for (var a = d, b = m.onComment && m.locations && new M, c = f.charCodeAt(d += 2); d < R && 10 !== c && 13 !== c && 8232 !== c && 8233 !== c;) ++d, c = f.charCodeAt(d);
        if (m.onComment) m.onComment(!1, f.slice(a + 2, d), a, d, b, m.locations && new M)
    }

    function Y() {
        for (; d < R;) {
            var a = f.charCodeAt(d);
            if (32 === a) ++d; else if (13 === a) ++d, a = f.charCodeAt(d), 10 === a && ++d,
            m.locations && (++N, E = d); else if (10 === a || 8232 === a || 8233 === a) ++d, m.locations && (++N, E = d); else if (8 < a && 14 > a) ++d; else if (47 === a) if (a = f.charCodeAt(d + 1), 42 === a) {
                a = void 0;
                var b = m.onComment && m.locations && new M, c = d, e = f.indexOf("*/", d += 2);
                -1 === e && k(d - 2, "Unterminated comment");
                d = e + 2;
                if (m.locations) for (ja.lastIndex = c; (a = ja.exec(f)) && a.index < d;) ++N, E = a.index + a[0].length;
                if (m.onComment) m.onComment(!0, f.slice(c + 2, e), c, d, b, m.locations && new M)
            } else if (47 === a) va(); else break; else if (160 === a) ++d; else if (5760 <= a && Eb.test(String.fromCharCode(a))) ++d;
            else break
        }
    }

    function Fb(a) {
        switch (a) {
            case 46:
                return a = f.charCodeAt(d + 1), 48 <= a && 57 >= a ? a = Ta(!0) : (++d, a = u(Ua)), a;
            case 40:
                return ++d, u(F);
            case 41:
                return ++d, u(D);
            case 59:
                return ++d, u(G);
            case 44:
                return ++d, u(J);
            case 91:
                return ++d, u(wa);
            case 93:
                return ++d, u(xa);
            case 123:
                return ++d, u(aa);
            case 125:
                return ++d, u(S);
            case 58:
                return ++d, u(ba);
            case 63:
                return ++d, u(Va);
            case 48:
                if (a = f.charCodeAt(d + 1), 120 === a || 88 === a) return d += 2, a = ca(16), null == a && k(t + 2, "Expected hexadecimal number"), la(f.charCodeAt(d)) && k(d, "Identifier directly after number"),
                    u(da, a);
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                return Ta(!1);
            case 34:
            case 39:
                a:{
                    d++;
                    for (var b = ""; ;) {
                        d >= R && k(t, "Unterminated string constant");
                        var c = f.charCodeAt(d);
                        if (c === a) {
                            ++d;
                            a = u(ma, b);
                            break a
                        }
                        if (92 === c) {
                            c = f.charCodeAt(++d);
                            var e = /^[0-7]+/.exec(f.slice(d, d + 3));
                            for (e && (e = e[0]); e && 255 < parseInt(e, 8);) e = e.slice(0, -1);
                            "0" === e && (e = null);
                            ++d;
                            if (e) A && k(d - 2, "Octal literal in strict mode"), b += String.fromCharCode(parseInt(e, 8)), d += e.length - 1; else switch (c) {
                                case 110:
                                    b += "\n";
                                    break;
                                case 114:
                                    b += "\r";
                                    break;
                                case 120:
                                    b += String.fromCharCode(na(2));
                                    break;
                                case 117:
                                    b += String.fromCharCode(na(4));
                                    break;
                                case 85:
                                    b += String.fromCharCode(na(8));
                                    break;
                                case 116:
                                    b += "\t";
                                    break;
                                case 98:
                                    b += "\b";
                                    break;
                                case 118:
                                    b += "\v";
                                    break;
                                case 102:
                                    b += "\f";
                                    break;
                                case 48:
                                    b += "\x00";
                                    break;
                                case 13:
                                    10 === f.charCodeAt(d) && ++d;
                                case 10:
                                    m.locations && (E = d, ++N);
                                    break;
                                default:
                                    b += String.fromCharCode(c)
                            }
                        } else 13 !== c && 10 !== c && 8232 !== c && 8233 !== c || k(t, "Unterminated string constant"), b += String.fromCharCode(c), ++d
                    }
                }
                return a;
            case 47:
                return a = f.charCodeAt(d + 1), Z ? (++d, a = Wa()) : a = 61 === a ? v(O, 2) : v(Xa, 1), a;
            case 37:
            case 42:
                return a = 61 === f.charCodeAt(d + 1) ? v(O, 2) : v(Gb, 1), a;
            case 124:
            case 38:
                return b = f.charCodeAt(d + 1), a = b === a ? v(124 === a ? Ya : Za, 2) : 61 === b ? v(O, 2) : v(124 === a ? Hb : Ib, 1), a;
            case 94:
                return a = 61 === f.charCodeAt(d + 1) ? v(O, 2) : v(Jb, 1), a;
            case 43:
            case 45:
                return b = f.charCodeAt(d + 1), b === a ? 45 == b && 62 == f.charCodeAt(d + 2) && oa.test(f.slice(K, d)) ? (d += 3, va(), Y(), a = T()) : a = v(Kb, 2) : a = 61 === b ? v(O, 2) : v(Lb, 1), a;
            case 60:
            case 62:
                return b = f.charCodeAt(d +
                    1), c = 1, b === a ? (c = 62 === a && 62 === f.charCodeAt(d + 2) ? 3 : 2, a = 61 === f.charCodeAt(d + c) ? v(O, c + 1) : v(Mb, c)) : 33 == b && 60 == a && 45 == f.charCodeAt(d + 2) && 45 == f.charCodeAt(d + 3) ? (d += 4, va(), Y(), a = T()) : (61 === b && (c = 61 === f.charCodeAt(d + 2) ? 3 : 2), a = v(Nb, c)), a;
            case 61:
            case 33:
                return a = 61 === f.charCodeAt(d + 1) ? v(Ob, 61 === f.charCodeAt(d + 2) ? 3 : 2) : v(61 === a ? $a : ab, 1), a;
            case 126:
                return v(ab, 1)
        }
        return !1
    }

    function T(a) {
        a ? d = t + 1 : t = d;
        m.locations && (ya = new M);
        if (a) return Wa();
        if (d >= R) return u(za);
        var b = f.charCodeAt(d);
        if (la(b) || 92 === b) return bb();
        a = Fb(b);
        if (!1 === a) {
            b = String.fromCharCode(b);
            if ("\\" === b || cb.test(b)) return bb();
            k(d, "Unexpected character '" + b + "'")
        }
        return a
    }

    function v(a, b) {
        var c = f.slice(d, d + b);
        d += b;
        u(a, c)
    }

    function Wa() {
        for (var a, b, c = d; ;) {
            d >= R && k(c, "Unterminated regular expression");
            var e = f.charAt(d);
            oa.test(e) && k(c, "Unterminated regular expression");
            if (a) a = !1; else {
                if ("[" === e) b = !0; else if ("]" === e && b) b = !1; else if ("/" === e && !b) break;
                a = "\\" === e
            }
            ++d
        }
        a = f.slice(c, d);
        ++d;
        (b = db()) && !/^[gmi]*$/.test(b) && k(c, "Invalid regexp flag");
        try {
            var g =
                new RegExp(a, b)
        } catch (w) {
            w instanceof SyntaxError && k(c, w.message), k(w)
        }
        return u(eb, g)
    }

    function ca(a, b) {
        for (var c = d, e = 0, g = 0, w = null == b ? Infinity : b; g < w; ++g) {
            var z = f.charCodeAt(d);
            z = 97 <= z ? z - 97 + 10 : 65 <= z ? z - 65 + 10 : 48 <= z && 57 >= z ? z - 48 : Infinity;
            if (z >= a) break;
            ++d;
            e = e * a + z
        }
        return d === c || null != b && d - c !== b ? null : e
    }

    function Ta(a) {
        var b = d, c = !1, e = 48 === f.charCodeAt(d);
        a || null !== ca(10) || k(b, "Invalid number");
        46 === f.charCodeAt(d) && (++d, ca(10), c = !0);
        a = f.charCodeAt(d);
        if (69 === a || 101 === a) a = f.charCodeAt(++d), 43 !== a && 45 !== a || ++d,
        null === ca(10) && k(b, "Invalid number"), c = !0;
        la(f.charCodeAt(d)) && k(d, "Identifier directly after number");
        a = f.slice(b, d);
        var g;
        c ? g = parseFloat(a) : e && 1 !== a.length ? /[89]/.test(a) || A ? k(b, "Invalid number") : g = parseInt(a, 8) : g = parseInt(a, 10);
        return u(da, g)
    }

    function na(a) {
        a = ca(16, a);
        null === a && k(t, "Bad character escape sequence");
        return a
    }

    function db() {
        U = !1;
        for (var a, b = !0, c = d; ;) {
            var e = f.charCodeAt(d);
            if (fb(e)) U && (a += f.charAt(d)), ++d; else if (92 === e) {
                U || (a = f.slice(c, d));
                U = !0;
                117 != f.charCodeAt(++d) && k(d, "Expecting Unicode escape sequence \\uXXXX");
                ++d;
                e = na(4);
                var g = String.fromCharCode(e);
                g || k(d - 1, "Invalid Unicode escape");
                (b ? la(e) : fb(e)) || k(d - 4, "Invalid Unicode escape");
                a += g
            } else break;
            b = !1
        }
        return U ? a : f.slice(c, d)
    }

    function bb() {
        var a = db(), b = V;
        !U && Pb(a) && (b = Qb[a]);
        return u(b, a)
    }

    function n() {
        Aa = t;
        K = Q;
        Ba = ua;
        T()
    }

    function Ca(a) {
        A = a;
        d = t;
        if (m.locations) for (; d < E;) E = f.lastIndexOf("\n", E - 2) + 1, --N;
        Y();
        T()
    }

    function gb() {
        this.type = null;
        this.start = t;
        this.end = null
    }

    function hb() {
        this.start = ya;
        this.end = null;
        null !== Da && (this.source = Da)
    }

    function x() {
        var a = new gb;
        m.locations && (a.loc = new hb);
        m.directSourceFile && (a.sourceFile = m.directSourceFile);
        m.ranges && (a.range = [t, 0]);
        return a
    }

    function L(a) {
        var b = new gb;
        b.start = a.start;
        m.locations && (b.loc = new hb, b.loc.start = a.loc.start);
        m.ranges && (b.range = [a.range[0], 0]);
        return b
    }

    function l(a, b) {
        a.type = b;
        a.end = K;
        m.locations && (a.loc.end = Ba);
        m.ranges && (a.range[1] = K);
        return a
    }

    function Ea(a) {
        return "ExpressionStatement" === a.type && "Literal" === a.expression.type && "use strict" === a.expression.value
    }

    function p(a) {
        if (h === a) return n(),
            !0
    }

    function pa() {
        return !m.strictSemicolons && (h === za || h === S || oa.test(f.slice(K, t)))
    }

    function P() {
        p(G) || pa() || H()
    }

    function q(a) {
        h === a ? n() : H()
    }

    function H() {
        k(t, "Unexpected token")
    }

    function qa(a) {
        "Identifier" !== a.type && "MemberExpression" !== a.type && k(a.start, "Assigning to rvalue");
        A && "Identifier" === a.type && ra(a.name) && k(a.start, "Assigning to " + a.name + " in strict mode")
    }

    function C() {
        (h === Xa || h === O && "/=" == B) && T(!0);
        var a = h, b = x();
        switch (a) {
            case Fa:
            case ib:
                n();
                var c = a === Fa;
                p(G) || pa() ? b.label = null : h !== V ? H() :
                    (b.label = I(), P());
                for (var e = 0; e < r.length; ++e) {
                    var g = r[e];
                    if (null == b.label || g.name === b.label.name) {
                        if (null != g.kind && (c || "loop" === g.kind)) break;
                        if (b.label && c) break
                    }
                }
                e === r.length && k(b.start, "Unsyntactic " + a.keyword);
                return l(b, c ? "BreakStatement" : "ContinueStatement");
            case jb:
                return n(), P(), l(b, "DebuggerStatement");
            case kb:
                return n(), r.push(Ga), b.body = C(), r.pop(), q(Ha), b.test = ea(), P(), l(b, "DoWhileStatement");
            case lb:
                n();
                r.push(Ga);
                q(F);
                if (h === G) return Ia(b, null);
                if (h === Ja) return a = x(), n(), mb(a, !0), l(a,
                    "VariableDeclaration"), 1 === a.declarations.length && p(sa) ? nb(b, a) : Ia(b, a);
                a = y(!1, !0);
                return p(sa) ? (qa(a), nb(b, a)) : Ia(b, a);
            case Ka:
                return n(), La(b, !0);
            case ob:
                return n(), b.test = ea(), b.consequent = C(), b.alternate = p(pb) ? C() : null, l(b, "IfStatement");
            case qb:
                return fa || m.allowReturnOutsideFunction || k(t, "'return' outside of function"), n(), p(G) || pa() ? b.argument = null : (b.argument = y(), P()), l(b, "ReturnStatement");
            case Ma:
                n();
                b.discriminant = ea();
                b.cases = [];
                q(aa);
                for (r.push(Rb); h != S;) h === Na || h === rb ? (a = h === Na, e && l(e,
                    "SwitchCase"), b.cases.push(e = x()), e.consequent = [], n(), a ? e.test = y() : (c && k(Aa, "Multiple default clauses"), c = !0, e.test = null), q(ba)) : (e || H(), e.consequent.push(C()));
                e && l(e, "SwitchCase");
                n();
                r.pop();
                return l(b, "SwitchStatement");
            case sb:
                return n(), oa.test(f.slice(K, t)) && k(K, "Illegal newline after throw"), b.argument = y(), P(), l(b, "ThrowStatement");
            case tb:
                return n(), b.block = ha(), b.handler = null, h === ub && (a = x(), n(), q(F), a.param = I(), A && ra(a.param.name) && k(a.param.start, "Binding " + a.param.name + " in strict mode"),
                    q(D), a.body = ha(), b.handler = l(a, "CatchClause")), b.finalizer = p(vb) ? ha() : null, b.handler || b.finalizer || k(b.start, "Missing catch or finally clause"), l(b, "TryStatement");
            case Ja:
                return n(), mb(b), P(), l(b, "VariableDeclaration");
            case Ha:
                return n(), b.test = ea(), r.push(Ga), b.body = C(), r.pop(), l(b, "WhileStatement");
            case wb:
                return A && k(t, "'with' in strict mode"), n(), b.object = ea(), b.body = C(), l(b, "WithStatement");
            case aa:
                return ha();
            case G:
                return n(), l(b, "EmptyStatement");
            default:
                c = B;
                g = y();
                if (a === V && "Identifier" ===
                    g.type && p(ba)) {
                    for (e = 0; e < r.length; ++e) r[e].name === c && k(g.start, "Label '" + c + "' is already declared");
                    r.push({name: c, kind: h.isLoop ? "loop" : h === Ma ? "switch" : null});
                    b.body = C();
                    r.pop();
                    b.label = g;
                    return l(b, "LabeledStatement")
                }
                b.expression = g;
                P();
                return l(b, "ExpressionStatement")
        }
    }

    function ea() {
        q(F);
        var a = y();
        q(D);
        return a
    }

    function ha(a) {
        var b = x(), c = !0, e = !1;
        b.body = [];
        for (q(aa); !p(S);) {
            var g = C();
            b.body.push(g);
            if (c && a && Ea(g)) {
                var w = e;
                Ca(e = !0)
            }
            c = !1
        }
        e && !w && Ca(!1);
        return l(b, "BlockStatement")
    }

    function Ia(a, b) {
        a.init =
            b;
        q(G);
        a.test = h === G ? null : y();
        q(G);
        a.update = h === D ? null : y();
        q(D);
        a.body = C();
        r.pop();
        return l(a, "ForStatement")
    }

    function nb(a, b) {
        a.left = b;
        a.right = y();
        q(D);
        a.body = C();
        r.pop();
        return l(a, "ForInStatement")
    }

    function mb(a, b) {
        a.declarations = [];
        for (a.kind = "var"; ;) {
            var c = x();
            c.id = I();
            A && ra(c.id.name) && k(c.id.start, "Binding " + c.id.name + " in strict mode");
            c.init = p($a) ? y(!0, b) : null;
            a.declarations.push(l(c, "VariableDeclarator"));
            if (!p(J)) break
        }
        return a
    }

    function y(a, b) {
        var c = Oa(b);
        if (!a && h === J) {
            a = L(c);
            for (a.expressions =
                     [c]; p(J);) a.expressions.push(Oa(b));
            return l(a, "SequenceExpression")
        }
        return c
    }

    function Oa(a) {
        var b = Pa(Qa(), -1, a);
        if (p(Va)) {
            var c = L(b);
            c.test = b;
            c.consequent = y(!0);
            q(ba);
            c.alternate = y(!0, a);
            b = l(c, "ConditionalExpression")
        }
        return h.isAssign ? (c = L(b), c.operator = B, c.left = b, n(), c.right = Oa(a), qa(b), l(c, "AssignmentExpression")) : b
    }

    function Pa(a, b, c) {
        var e = h.binop;
        if (null != e && (!c || h !== sa) && e > b) {
            var g = L(a);
            g.left = a;
            g.operator = B;
            a = h;
            n();
            g.right = Pa(Qa(), e, c);
            e = l(g, a === Ya || a === Za ? "LogicalExpression" : "BinaryExpression");
            return Pa(e, b, c)
        }
        return a
    }

    function Qa() {
        if (h.prefix) {
            var a = x(), b = h.isUpdate;
            a.operator = B;
            Z = a.prefix = !0;
            n();
            a.argument = Qa();
            b ? qa(a.argument) : A && "delete" === a.operator && "Identifier" === a.argument.type && k(a.start, "Deleting local variable in strict mode");
            return l(a, b ? "UpdateExpression" : "UnaryExpression")
        }
        for (b = ia(ta()); h.postfix && !pa();) a = L(b), a.operator = B, a.prefix = !1, a.argument = b, qa(b), n(), b = l(a, "UpdateExpression");
        return b
    }

    function ia(a, b) {
        if (p(Ua)) {
            var c = L(a);
            c.object = a;
            c.property = I(!0);
            c.computed =
                !1;
            return ia(l(c, "MemberExpression"), b)
        }
        return p(wa) ? (c = L(a), c.object = a, c.property = y(), c.computed = !0, q(xa), ia(l(c, "MemberExpression"), b)) : !b && p(F) ? (c = L(a), c.callee = a, c.arguments = Ra(D, !1), ia(l(c, "CallExpression"), b)) : a
    }

    function ta() {
        switch (h) {
            case xb:
                var a = x();
                n();
                return l(a, "ThisExpression");
            case V:
                return I();
            case da:
            case ma:
            case eb:
                return a = x(), a.value = B, a.raw = f.slice(t, Q), n(), l(a, "Literal");
            case yb:
            case zb:
            case Ab:
                return a = x(), a.value = h.atomValue, a.raw = h.keyword, n(), l(a, "Literal");
            case F:
                a = ya;
                var b =
                    t;
                n();
                var c = y();
                c.start = b;
                c.end = Q;
                m.locations && (c.loc.start = a, c.loc.end = ua);
                m.ranges && (c.range = [b, Q]);
                q(D);
                return c;
            case wa:
                return a = x(), n(), a.elements = Ra(xa, !0, !0), l(a, "ArrayExpression");
            case aa:
                a = x();
                b = !0;
                c = !1;
                a.properties = [];
                for (n(); !p(S);) {
                    if (b) b = !1; else if (q(J), m.allowTrailingCommas && p(S)) break;
                    var e = {key: h === da || h === ma ? ta() : I(!0)}, g = !1;
                    if (p(ba)) {
                        e.value = y(!0);
                        var w = e.kind = "init"
                    } else "Identifier" !== e.key.type || "get" !== e.key.name && "set" !== e.key.name ? H() : (g = c = !0, w = e.kind = e.key.name, e.key = h === da ||
                    h === ma ? ta() : I(!0), h !== F && H(), e.value = La(x(), !1));
                    if ("Identifier" === e.key.type && (A || c)) for (var z = 0; z < a.properties.length; ++z) {
                        var W = a.properties[z];
                        if (W.key.name === e.key.name) {
                            var Sa = w == W.kind || g && "init" === W.kind || "init" === w && ("get" === W.kind || "set" === W.kind);
                            Sa && !A && "init" === w && "init" === W.kind && (Sa = !1);
                            Sa && k(e.key.start, "Redefinition of property")
                        }
                    }
                    a.properties.push(e)
                }
                return l(a, "ObjectExpression");
            case Ka:
                return a = x(), n(), La(a, !1);
            case Bb:
                return a = x(), n(), a.callee = ia(ta(), !0), p(F) ? a.arguments = Ra(D,
                    !1) : a.arguments = Sb, l(a, "NewExpression");
            default:
                H()
        }
    }

    function La(a, b) {
        h === V ? a.id = I() : b ? H() : a.id = null;
        a.params = [];
        var c = !0;
        for (q(F); !p(D);) c ? c = !1 : q(J), a.params.push(I());
        c = fa;
        var e = r;
        fa = !0;
        r = [];
        a.body = ha(!0);
        fa = c;
        r = e;
        if (A || a.body.body.length && Ea(a.body.body[0])) for (c = a.id ? -1 : 0; c < a.params.length; ++c) if (e = 0 > c ? a.id : a.params[c], (Cb(e.name) || ra(e.name)) && k(e.start, "Defining '" + e.name + "' in strict mode"), 0 <= c) for (var g = 0; g < c; ++g) e.name === a.params[g].name && k(e.start, "Argument name clash in strict mode");
        return l(a, b ? "FunctionDeclaration" : "FunctionExpression")
    }

    function Ra(a, b, c) {
        for (var e = [], g = !0; !p(a);) {
            if (g) g = !1; else if (q(J), b && m.allowTrailingCommas && p(a)) break;
            c && h === J ? e.push(null) : e.push(y(!0))
        }
        return e
    }

    function I(a) {
        var b = x();
        a && "everywhere" == m.forbidReserved && (a = !1);
        h === V ? (!a && (m.forbidReserved && Tb(B) || A && Cb(B)) && -1 == f.slice(t, Q).indexOf("\\") && k(t, "The keyword '" + B + "' is reserved"), b.name = B) : a && h.keyword ? b.name = h.keyword : H();
        Z = !1;
        n();
        return l(b, "Identifier")
    }

    X.version = "0.5.0";
    var m, f, R, Da;
    X.parse = function (a, b) {
        f = String(a);
        R = f.length;
        m = b || {};
        for (var c in Db) Object.prototype.hasOwnProperty.call(m, c) || (m[c] = Db[c]);
        Da = m.sourceFile || null;
        N = 1;
        d = E = 0;
        Z = !0;
        Y();
        c = m.program;
        Aa = K = d;
        m.locations && (Ba = new M);
        fa = A = null;
        r = [];
        T();
        a = c || x();
        b = !0;
        c || (a.body = []);
        for (; h !== za;) c = C(), a.body.push(c), b && Ea(c) && Ca(!0), b = !1;
        return l(a, "Program")
    };
    var Db = {
            strictSemicolons: !1,
            allowTrailingCommas: !0,
            forbidReserved: !1,
            allowReturnOutsideFunction: !1,
            locations: !1,
            onComment: null,
            ranges: !1,
            program: null,
            sourceFile: null,
            directSourceFile: null
        }, d, t, Q, ya, ua, h, B, Z, N, E, Aa, K, Ba, fa, r, A, Sb = [], da = {type: "num"}, eb = {type: "regexp"},
        ma = {type: "string"}, V = {type: "name"}, za = {type: "eof"}, Fa = {keyword: "break"},
        Na = {keyword: "case", beforeExpr: !0}, ub = {keyword: "catch"}, ib = {keyword: "continue"},
        jb = {keyword: "debugger"}, rb = {keyword: "default"}, kb = {keyword: "do", isLoop: !0},
        pb = {keyword: "else", beforeExpr: !0}, vb = {keyword: "finally"}, lb = {keyword: "for", isLoop: !0},
        Ka = {keyword: "function"}, ob = {keyword: "if"}, qb = {keyword: "return", beforeExpr: !0},
        Ma = {keyword: "switch"},
        sb = {keyword: "throw", beforeExpr: !0}, tb = {keyword: "try"}, Ja = {keyword: "var"},
        Ha = {keyword: "while", isLoop: !0}, wb = {keyword: "with"}, Bb = {keyword: "new", beforeExpr: !0},
        xb = {keyword: "this"}, yb = {keyword: "null", atomValue: null}, zb = {keyword: "true", atomValue: !0},
        Ab = {keyword: "false", atomValue: !1}, sa = {keyword: "in", binop: 7, beforeExpr: !0}, Qb = {
            "break": Fa,
            "case": Na,
            "catch": ub,
            "continue": ib,
            "debugger": jb,
            "default": rb,
            "do": kb,
            "else": pb,
            "finally": vb,
            "for": lb,
            "function": Ka,
            "if": ob,
            "return": qb,
            "switch": Ma,
            "throw": sb,
            "try": tb,
            "var": Ja,
            "while": Ha,
            "with": wb,
            "null": yb,
            "true": zb,
            "false": Ab,
            "new": Bb,
            "in": sa,
            "instanceof": {keyword: "instanceof", binop: 7, beforeExpr: !0},
            "this": xb,
            "typeof": {keyword: "typeof", prefix: !0, beforeExpr: !0},
            "void": {keyword: "void", prefix: !0, beforeExpr: !0},
            "delete": {keyword: "delete", prefix: !0, beforeExpr: !0}
        }, wa = {type: "[", beforeExpr: !0}, xa = {type: "]"}, aa = {type: "{", beforeExpr: !0}, S = {type: "}"},
        F = {type: "(", beforeExpr: !0}, D = {type: ")"}, J = {type: ",", beforeExpr: !0},
        G = {type: ";", beforeExpr: !0}, ba = {type: ":", beforeExpr: !0},
        Ua = {type: "."}, Va = {type: "?", beforeExpr: !0}, Xa = {binop: 10, beforeExpr: !0},
        $a = {isAssign: !0, beforeExpr: !0}, O = {isAssign: !0, beforeExpr: !0},
        Kb = {postfix: !0, prefix: !0, isUpdate: !0}, ab = {prefix: !0, beforeExpr: !0},
        Ya = {binop: 1, beforeExpr: !0}, Za = {binop: 2, beforeExpr: !0}, Hb = {binop: 3, beforeExpr: !0},
        Jb = {binop: 4, beforeExpr: !0}, Ib = {binop: 5, beforeExpr: !0}, Ob = {binop: 6, beforeExpr: !0},
        Nb = {binop: 7, beforeExpr: !0}, Mb = {binop: 8, beforeExpr: !0}, Lb = {binop: 9, prefix: !0, beforeExpr: !0},
        Gb = {binop: 10, beforeExpr: !0}, Tb = ka("class enum extends super const export import"),
        Cb = ka("implements interface let package private protected public static yield"), ra = ka("eval arguments"),
        Pb = ka("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this"),
        Eb = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/,
        cb = RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]"),
        Ub = RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]"),
        oa = /[\n\r\u2028\u2029]/, ja = /\r\n|[\n\r\u2028\u2029]/g, la = function (a) {
            return 65 > a ? 36 === a : 91 > a ? !0 : 97 > a ? 95 === a : 123 > a ? !0 : 170 <= a && cb.test(String.fromCharCode(a))
        }, fb = function (a) {
            return 48 > a ? 36 === a : 58 > a ? !0 : 65 > a ? !1 : 91 > a ? !0 : 97 > a ? 95 === a : 123 > a ? !0 : 170 <= a && Ub.test(String.fromCharCode(a))
        }, U, Ga = {kind: "loop"}, Rb = {kind: "switch"}
});
// JS-Interpreter: Copyright 2013 Google LLC, Apache 2.0
var h;

function k(a, b) {
    "string" === typeof a && (a = l(a, "code"));
    var d = a.constructor;
    this.ya = function () {
        return new d({options: {}})
    };
    var c = this.ya(), e;
    for (e in a) c[e] = "body" === e ? a[e].slice() : a[e];
    this.ea = c;
    this.Va = b;
    this.ka = !1;
    this.U = [];
    this.Fa = 0;
    this.Wa = Object.create(null);
    a = /^step([A-Z]\w*)$/;
    var f, g;
    for (g in this) "function" === typeof this[g] && (f = g.match(a)) && (this.Wa[f[1]] = this[g].bind(this));
    this.J = n(this, this.ea, null);
    this.Ga = this.J.object;
    this.ea = l(this.U.join("\n"), "polyfills");
    this.U = void 0;
    p(this.ea);
    f =
        new r(this.ea, this.J);
    f.done = !1;
    this.l = [f];
    this.bb();
    this.value = void 0;
    this.ea = c;
    f = new r(this.ea, this.J);
    f.done = !1;
    this.l.length = 0;
    this.l[0] = f
}

var aa = {locations: !0, ecmaVersion: 5}, ba = {configurable: !0, enumerable: !0, writable: !1},
    t = {configurable: !0, enumerable: !1, writable: !0}, u = {configurable: !0, enumerable: !1, writable: !1},
    v = {configurable: !1, enumerable: !1, writable: !1}, ca = {configurable: !1, enumerable: !0, writable: !0},
    da = {STEP_ERROR: !0}, w = {SCOPE_REFERENCE: !0}, y = {VALUE_IN_DESCRIPTOR: !0}, z = {REGEXP_TIMEOUT: !0}, ea = [],
    A = null, B = null, D = "undefined" === typeof globalThis ? this : globalThis,
    fa = ["onmessage = function(e) {", "var result;", "var data = e.data;", "switch (data[0]) {",
        "case 'split':", "result = data[1].split(data[2], data[3]);", "break;", "case 'match':", "result = data[1].match(data[2]);", "break;", "case 'search':", "result = data[1].search(data[2]);", "break;", "case 'replace':", "result = data[1].replace(data[2], data[3]);", "break;", "case 'exec':", "var regexp = data[1];", "regexp.lastIndex = data[2];", "result = [regexp.exec(data[3]), data[1].lastIndex];", "break;", "default:", "throw Error('Unknown RegExp operation: ' + data[0]);", "}", "postMessage(result);", "close();", "};"];

function E(a) {
    var b = a >>> 0;
    return b === Number(a) ? b : NaN
}

function F(a) {
    var b = a >>> 0;
    return String(b) === String(a) && 4294967295 !== b ? b : NaN
}

function p(a, b, d) {
    b ? a.start = b : delete a.start;
    d ? a.end = d : delete a.end;
    for (var c in a) if ("loc" !== c && a.hasOwnProperty(c)) {
        var e = a[c];
        e && "object" === typeof e && p(e, b, d)
    }
}

k.prototype.REGEXP_MODE = 2;
k.prototype.REGEXP_THREAD_TIMEOUT = 1E3;
k.prototype.POLYFILL_TIMEOUT = 1E3;
h = k.prototype;
h.K = !1;
h.va = !1;
h.hb = 0;

function l(a, b) {
    var d = {}, c;
    for (c in aa) d[c] = aa[c];
    d.sourceFile = b;
    return D.acorn.parse(a, d)
}

h.gb = function (a) {
    var b = this.l[0];
    if (!b || "Program" !== b.node.type) throw Error("Expecting original AST to start with a Program node");
    "string" === typeof a && (a = l(a, "appendCode" + this.hb++));
    if (!a || "Program" !== a.type) throw Error("Expecting new AST to start with a Program node");
    G(this, a, b.scope);
    Array.prototype.push.apply(b.node.body, a.body);
    b.node.body.Oa = null;
    b.done = !1
};
h.Qa = function () {
    var a = this.l;
    do {
        var b = a[a.length - 1];
        if (!b) return !1;
        var d = b.node, c = d.type;
        if ("Program" === c && b.done) return !1;
        if (this.ka) break;
        var e = B;
        B = this;
        try {
            var f = this.Wa[c](a, b, d)
        } catch (m) {
            if (m !== da) throw this.value !== m && (this.value = void 0), m;
        } finally {
            B = e
        }
        f && a.push(f);
        if (this.K) throw this.value = void 0, Error("Getter not supported in this context");
        if (this.va) throw this.value = void 0, Error("Setter not supported in this context");
        if (!g && !d.end) var g = Date.now() + this.POLYFILL_TIMEOUT
    } while (!d.end && g >
    Date.now());
    return !0
};
h.bb = function () {
    for (; !this.ka && this.Qa();) ;
    return this.ka
};

function ha(a, b) {
    a.g(b, "NaN", NaN, v);
    a.g(b, "Infinity", Infinity, v);
    a.g(b, "undefined", void 0, v);
    a.g(b, "window", b, ba);
    a.g(b, "this", b, v);
    a.g(b, "self", b);
    a.H = new H(null);
    a.P = new H(a.H);
    ia(a, b);
    ja(a, b);
    b.ja = a.H;
    a.g(b, "constructor", a.s, t);
    ka(a, b);
    la(a, b);
    ma(a, b);
    na(a, b);
    oa(a, b);
    pa(a, b);
    qa(a, b);
    ra(a, b);
    sa(a, b);
    var d = a.i(function () {
        throw EvalError("Can't happen");
    }, !1);
    d.eval = !0;
    a.g(b, "eval", d, t);
    a.g(b, "parseInt", a.i(parseInt, !1), t);
    a.g(b, "parseFloat", a.i(parseFloat, !1), t);
    a.g(b, "isNaN", a.i(isNaN, !1), t);
    a.g(b,
        "isFinite", a.i(isFinite, !1), t);
    d = [[escape, "escape"], [unescape, "unescape"], [decodeURI, "decodeURI"], [decodeURIComponent, "decodeURIComponent"], [encodeURI, "encodeURI"], [encodeURIComponent, "encodeURIComponent"]];
    for (var c = 0; c < d.length; c++) a.g(b, d[c][1], a.i(function (e) {
        return function (f) {
            try {
                return e(f)
            } catch (g) {
                I(a, a.eb, g.message)
            }
        }
    }(d[c][0]), !1), t);
    a.OBJECT = a.s;
    a.OBJECT_PROTO = a.H;
    a.FUNCTION = a.I;
    a.FUNCTION_PROTO = a.P;
    a.ARRAY = a.da;
    a.ARRAY_PROTO = a.wa;
    a.REGEXP = a.F;
    a.REGEXP_PROTO = a.xa;
    a.DATE = a.R;
    a.DATE_PROTO =
        a.Sa;
    a.Va && a.Va(a, b)
}

h.rb = 0;

function ia(a, b) {
    var d = /^[A-Za-z_$][\w$]*$/;
    var c = function (e) {
        var f = arguments.length ? String(arguments[arguments.length - 1]) : "",
            g = Array.prototype.slice.call(arguments, 0, -1).join(",").trim();
        if (g) {
            g = g.split(/\s*,\s*/);
            for (var m = 0; m < g.length; m++) {
                var q = g[m];
                d.test(q) || I(a, a.T, "Invalid function argument: " + q)
            }
            g = g.join(", ")
        }
        try {
            var C = l("(function(" + g + ") {" + f + "})", "function" + a.rb++)
        } catch (x) {
            I(a, a.T, "Invalid code: " + x.message)
        }
        1 !== C.body.length && I(a, a.T, "Invalid code in function body.");
        return J(a, C.body[0].expression,
            a.J, "anonymous")
    };
    a.I = a.i(c, !0);
    a.g(b, "Function", a.I, t);
    a.g(a.I, "prototype", a.P, t);
    a.g(a.P, "constructor", a.I, t);
    a.P.Da = function () {
    };
    a.P.Da.id = a.Fa++;
    a.P.$a = !0;
    a.g(a.P, "length", 0, u);
    a.P.D = "Function";
    c = function (e, f) {
        var g = a.l[a.l.length - 1];
        g.W = this;
        g.v = e;
        g.C = [];
        null !== f && void 0 !== f && (f instanceof H ? g.C = ta(a, f) : I(a, a.j, "CreateListFromArrayLike called on non-object"));
        g.Ka = !1
    };
    K(a, a.I, "apply", c);
    c = function (e) {
        var f = a.l[a.l.length - 1];
        f.W = this;
        f.v = e;
        f.C = [];
        for (var g = 1; g < arguments.length; g++) f.C.push(arguments[g]);
        f.Ka = !1
    };
    K(a, a.I, "call", c);
    a.U.push("Object.defineProperty(Function.prototype, 'bind',", "{configurable: true, writable: true, value:", "function bind(oThis) {", "if (typeof this !== 'function') {", "throw TypeError('What is trying to be bound is not callable');", "}", "var aArgs   = Array.prototype.slice.call(arguments, 1),", "fToBind = this,", "fNOP    = function() {},", "fBound  = function() {", "return fToBind.apply(this instanceof fNOP", "? this", ": oThis,", "aArgs.concat(Array.prototype.slice.call(arguments)));",
        "};", "if (this.prototype) {", "fNOP.prototype = this.prototype;", "}", "fBound.prototype = new fNOP();", "return fBound;", "}", "});", "");
    c = function () {
        return String(this)
    };
    K(a, a.I, "toString", c);
    a.g(a.I, "toString", a.i(c, !1), t);
    c = function () {
        return this.valueOf()
    };
    K(a, a.I, "valueOf", c);
    a.g(a.I, "valueOf", a.i(c, !1), t)
}

function ja(a, b) {
    function d(e) {
        void 0 !== e && null !== e || I(a, a.j, "Cannot convert '" + e + "' to object")
    }

    var c = function (e) {
        if (void 0 === e || null === e) return L(a) ? this : a.m(a.H);
        if (!(e instanceof H)) {
            var f = a.m(M(a, e));
            f.data = e;
            return f
        }
        return e
    };
    a.s = a.i(c, !0);
    a.g(a.s, "prototype", a.H, t);
    a.g(a.H, "constructor", a.s, t);
    a.g(b, "Object", a.s, t);
    c = function (e) {
        d(e);
        return N(a, Object.getOwnPropertyNames(e instanceof H ? e.h : e))
    };
    a.g(a.s, "getOwnPropertyNames", a.i(c, !1), t);
    c = function (e) {
        d(e);
        e instanceof H && (e = e.h);
        return N(a,
            Object.keys(e))
    };
    a.g(a.s, "keys", a.i(c, !1), t);
    c = function (e) {
        if (null === e) return a.m(null);
        e instanceof H || I(a, a.j, "Object prototype may only be an Object or null");
        return a.m(e)
    };
    a.g(a.s, "create", a.i(c, !1), t);
    a.U.push("(function() {", "var create_ = Object.create;", "Object.create = function create(proto, props) {", "var obj = create_(proto);", "props && Object.defineProperties(obj, props);", "return obj;", "};", "})();", "");
    c = function (e, f, g) {
        f = String(f);
        e instanceof H || I(a, a.j, "Object.defineProperty called on non-object");
        g instanceof H || I(a, a.j, "Property description must be an object");
        !e.h[f] && e.preventExtensions && I(a, a.j, "Can't define property '" + f + "', object is not extensible");
        a.g(e, f, y, g.h);
        return e
    };
    a.g(a.s, "defineProperty", a.i(c, !1), t);
    a.U.push("(function() {", "var defineProperty_ = Object.defineProperty;", "Object.defineProperty = function defineProperty(obj, prop, d1) {", "var d2 = {};", "if ('configurable' in d1) d2.configurable = d1.configurable;", "if ('enumerable' in d1) d2.enumerable = d1.enumerable;", "if ('writable' in d1) d2.writable = d1.writable;",
        "if ('value' in d1) d2.value = d1.value;", "if ('get' in d1) d2.get = d1.get;", "if ('set' in d1) d2.set = d1.set;", "return defineProperty_(obj, prop, d2);", "};", "})();", "Object.defineProperty(Object, 'defineProperties',", "{configurable: true, writable: true, value:", "function defineProperties(obj, props) {", "var keys = Object.keys(props);", "for (var i = 0; i < keys.length; i++) {", "Object.defineProperty(obj, keys[i], props[keys[i]]);", "}", "return obj;", "}", "});", "");
    c = function (e, f) {
        e instanceof H ||
        I(a, a.j, "Object.getOwnPropertyDescriptor called on non-object");
        f = String(f);
        if (f in e.h) {
            var g = Object.getOwnPropertyDescriptor(e.h, f), m = e.N[f];
            e = e.O[f];
            f = a.m(a.H);
            m || e ? (a.g(f, "get", m), a.g(f, "set", e)) : (a.g(f, "value", g.value), a.g(f, "writable", g.writable));
            a.g(f, "configurable", g.configurable);
            a.g(f, "enumerable", g.enumerable);
            return f
        }
    };
    a.g(a.s, "getOwnPropertyDescriptor", a.i(c, !1), t);
    c = function (e) {
        d(e);
        return M(a, e)
    };
    a.g(a.s, "getPrototypeOf", a.i(c, !1), t);
    c = function (e) {
        return !!e && !e.preventExtensions
    };
    a.g(a.s, "isExtensible", a.i(c, !1), t);
    c = function (e) {
        e instanceof H && (e.preventExtensions = !0);
        return e
    };
    a.g(a.s, "preventExtensions", a.i(c, !1), t);
    K(a, a.s, "toString", H.prototype.toString);
    K(a, a.s, "toLocaleString", H.prototype.toString);
    K(a, a.s, "valueOf", H.prototype.valueOf);
    c = function (e) {
        d(this);
        return this instanceof H ? String(e) in this.h : this.hasOwnProperty(e)
    };
    K(a, a.s, "hasOwnProperty", c);
    c = function (e) {
        d(this);
        return this instanceof H ? Object.prototype.propertyIsEnumerable.call(this.h, e) : this.propertyIsEnumerable(e)
    };
    K(a, a.s, "propertyIsEnumerable", c);
    c = function (e) {
        for (; ;) {
            e = M(a, e);
            if (!e) return !1;
            if (e === this) return !0
        }
    };
    K(a, a.s, "isPrototypeOf", c)
}

function ka(a, b) {
    var d = function (c) {
        var e = L(a) ? this : O(a), f = arguments[0];
        if (1 === arguments.length && "number" === typeof f) isNaN(E(f)) && I(a, a.Ta, "Invalid array length"), e.h.length = f; else {
            for (f = 0; f < arguments.length; f++) e.h[f] = arguments[f];
            e.h.length = f
        }
        return e
    };
    a.da = a.i(d, !0);
    a.wa = a.da.h.prototype;
    a.g(b, "Array", a.da, t);
    d = function (c) {
        return c && "Array" === c.D
    };
    a.g(a.da, "isArray", a.i(d, !1), t);
    a.g(a.wa, "length", 0, {configurable: !1, enumerable: !1, writable: !0});
    a.wa.D = "Array";
    a.U.push("(function() {", "function createArrayMethod_(f) {",
        "Object.defineProperty(Array.prototype, f.name,", "{configurable: true, writable: true, value: f});", "}", "createArrayMethod_(", "function pop() {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "if (!len || len < 0) {", "o.length = 0;", "return undefined;", "}", "len--;", "var x = o[len];", "delete o[len];", "o.length = len;", "return x;", "}", ");", "createArrayMethod_(", "function push(var_args) {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "for (var i = 0; i < arguments.length; i++) {",
        "o[len] = arguments[i];", "len++;", "}", "o.length = len;", "return len;", "}", ");", "createArrayMethod_(", "function shift() {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "if (!len || len < 0) {", "o.length = 0;", "return undefined;", "}", "var value = o[0];", "for (var i = 0; i < len - 1; i++) {", "if ((i + 1) in o) {", "o[i] = o[i + 1];", "} else {", "delete o[i];", "}", "}", "delete o[i];", "o.length = len - 1;", "return value;", "}", ");", "createArrayMethod_(", "function unshift(var_args) {",
        "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "if (!len || len < 0) {", "len = 0;", "}", "for (var i = len - 1; i >= 0; i--) {", "if (i in o) {", "o[i + arguments.length] = o[i];", "} else {", "delete o[i + arguments.length];", "}", "}", "for (var i = 0; i < arguments.length; i++) {", "o[i] = arguments[i];", "}", "return (o.length = len + arguments.length);", "}", ");", "createArrayMethod_(", "function reverse() {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;",
        "if (!len || len < 2) {", "return o;", "}", "for (var i = 0; i < len / 2 - 0.5; i++) {", "var x = o[i];", "var hasX = i in o;", "if ((len - i - 1) in o) {", "o[i] = o[len - i - 1];", "} else {", "delete o[i];", "}", "if (hasX) {", "o[len - i - 1] = x;", "} else {", "delete o[len - i - 1];", "}", "}", "return o;", "}", ");", "createArrayMethod_(", "function indexOf(searchElement, fromIndex) {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "var n = fromIndex | 0;", "if (!len || n >= len) {",
        "return -1;", "}", "var i = Math.max(n >= 0 ? n : len - Math.abs(n), 0);", "while (i < len) {", "if (i in o && o[i] === searchElement) {", "return i;", "}", "i++;", "}", "return -1;", "}", ");", "createArrayMethod_(", "function lastIndexOf(searchElement, fromIndex) {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "if (!len) {", "return -1;", "}", "var n = len - 1;", "if (arguments.length > 1) {", "n = fromIndex | 0;", "if (n) {", "n = (n > 0 || -1) * Math.floor(Math.abs(n));", "}", "}",
        "var i = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);", "while (i >= 0) {", "if (i in o && o[i] === searchElement) {", "return i;", "}", "i--;", "}", "return -1;", "}", ");", "createArrayMethod_(", "function slice(start, end) {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "start |= 0;", "start = (start >= 0) ? start : Math.max(0, len + start);", "if (typeof end !== 'undefined') {", "if (end !== Infinity) {", "end |= 0;", "}", "if (end < 0) {", "end = len + end;", "} else {", "end = Math.min(end, len);",
        "}", "} else {", "end = len;", "}", "var size = end - start;", "var cloned = new Array(size);", "for (var i = 0; i < size; i++) {", "if ((start + i) in o) {", "cloned[i] = o[start + i];", "}", "}", "return cloned;", "}", ");", "createArrayMethod_(", "function splice(start, deleteCount, var_args) {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "start |= 0;", "if (start < 0) {", "start = Math.max(len + start, 0);", "} else {", "start = Math.min(start, len);", "}", "if (arguments.length < 1) {",
        "deleteCount = len - start;", "} else {", "deleteCount |= 0;", "deleteCount = Math.max(0, Math.min(deleteCount, len - start));", "}", "var removed = [];", "for (var i = start; i < start + deleteCount; i++) {", "if (i in o) {", "removed.push(o[i]);", "} else {", "removed.length++;", "}", "if ((i + deleteCount) in o) {", "o[i] = o[i + deleteCount];", "} else {", "delete o[i];", "}", "}", "for (var i = start + deleteCount; i < len - deleteCount; i++) {", "if ((i + deleteCount) in o) {", "o[i] = o[i + deleteCount];", "} else {",
        "delete o[i];", "}", "}", "for (var i = len - deleteCount; i < len; i++) {", "delete o[i];", "}", "len -= deleteCount;", "var arl = arguments.length - 2;", "for (var i = len - 1; i >= start; i--) {", "if (i in o) {", "o[i + arl] = o[i];", "} else {", "delete o[i + arl];", "}", "}", "len += arl;", "for (var i = 2; i < arguments.length; i++) {", "o[start + i - 2] = arguments[i];", "}", "o.length = len;", "return removed;", "}", ");", "createArrayMethod_(", "function concat(var_args) {", "if (!this) throw TypeError();", "var o = Object(this);",
        "var cloned = [];", "for (var i = -1; i < arguments.length; i++) {", "var value = (i === -1) ? o : arguments[i];", "if (Array.isArray(value)) {", "for (var j = 0, l = value.length; j < l; j++) {", "if (j in value) {", "cloned.push(value[j]);", "} else {", "cloned.length++;", "}", "}", "} else {", "cloned.push(value);", "}", "}", "return cloned;", "}", ");", "createArrayMethod_(", "function join(opt_separator) {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "var sep = typeof opt_separator === 'undefined' ?",
        "',' : ('' + opt_separator);", "var str = '';", "for (var i = 0; i < len; i++) {", "if (i && sep) {", "str += sep;", "}", "str += (o[i] === null || o[i] === undefined) ? '' : o[i];", "}", "return str;", "}", ");", "createArrayMethod_(", "function every(callbackfn, thisArg) {", "if (!this || typeof callbackfn !== 'function') throw TypeError();", "var t, k = 0;", "var o = Object(this), len = o.length >>> 0;", "if (arguments.length > 1) t = thisArg;", "while (k < len) {", "if (k in o && !callbackfn.call(t, o[k], k, o)) return false;",
        "k++;", "}", "return true;", "}", ");", "createArrayMethod_(", "function filter(fun, var_args) {", "if (this === void 0 || this === null || typeof fun !== 'function') throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "var res = [];", "var thisArg = arguments.length >= 2 ? arguments[1] : void 0;", "for (var i = 0; i < len; i++) {", "if (i in o) {", "var val = o[i];", "if (fun.call(thisArg, val, i, o)) res.push(val);", "}", "}", "return res;", "}", ");", "createArrayMethod_(", "function forEach(callback, thisArg) {",
        "if (!this || typeof callback !== 'function') throw TypeError();", "var t, k = 0;", "var o = Object(this), len = o.length >>> 0;", "if (arguments.length > 1) t = thisArg;", "while (k < len) {", "if (k in o) callback.call(t, o[k], k, o);", "k++;", "}", "}", ");", "createArrayMethod_(", "function map(callback, thisArg) {", "if (!this || typeof callback !== 'function') throw TypeError();", "var t, k = 0;", "var o = Object(this), len = o.length >>> 0;", "if (arguments.length > 1) t = thisArg;", "var a = new Array(len);",
        "while (k < len) {", "if (k in o) a[k] = callback.call(t, o[k], k, o);", "k++;", "}", "return a;", "}", ");", "createArrayMethod_(", "function reduce(callback /*, initialValue*/) {", "if (!this || typeof callback !== 'function') throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "var k = 0, value;", "if (arguments.length === 2) {", "value = arguments[1];", "} else {", "while (k < len && !(k in o)) k++;", "if (k >= len) {", "throw TypeError('Reduce of empty array with no initial value');", "}", "value = o[k++];",
        "}", "for (; k < len; k++) {", "if (k in o) value = callback(value, o[k], k, o);", "}", "return value;", "}", ");", "createArrayMethod_(", "function reduceRight(callback /*, initialValue*/) {", "if (null === this || 'undefined' === typeof this || 'function' !== typeof callback) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "var k = len - 1, value;", "if (arguments.length >= 2) {", "value = arguments[1];", "} else {", "while (k >= 0 && !(k in o)) k--;", "if (k < 0) {", "throw TypeError('Reduce of empty array with no initial value');",
        "}", "value = o[k--];", "}", "for (; k >= 0; k--) {", "if (k in o) value = callback(value, o[k], k, o);", "}", "return value;", "}", ");", "createArrayMethod_(", "function some(fun/*, thisArg*/) {", "if (!this || typeof fun !== 'function') throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "var thisArg = arguments.length >= 2 ? arguments[1] : void 0;", "for (var i = 0; i < len; i++) {", "if (i in o && fun.call(thisArg, o[i], i, o)) {", "return true;", "}", "}", "return false;", "}", ");", "createArrayMethod_(",
        "function sort(opt_comp) {", "if (!this) throw TypeError();", "if (typeof opt_comp !== 'function') {", "opt_comp = undefined;", "}", "for (var i = 0; i < this.length; i++) {", "var changes = 0;", "for (var j = 0; j < this.length - i - 1; j++) {", "if (opt_comp ? (opt_comp(this[j], this[j + 1]) > 0) :", "(String(this[j]) > String(this[j + 1]))) {", "var swap = this[j];", "var hasSwap = j in this;", "if ((j + 1) in this) {", "this[j] = this[j + 1];", "} else {", "delete this[j];", "}", "if (hasSwap) {", "this[j + 1] = swap;",
        "} else {", "delete this[j + 1];", "}", "changes++;", "}", "}", "if (!changes) break;", "}", "return this;", "}", ");", "createArrayMethod_(", "function toLocaleString() {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "var out = [];", "for (var i = 0; i < len; i++) {", "out[i] = (o[i] === null || o[i] === undefined) ? '' : o[i].toLocaleString();", "}", "return out.join(',');", "}", ");", "})();", "")
}

function la(a, b) {
    var d = function (c) {
        c = arguments.length ? D.String(c) : "";
        return L(a) ? (this.data = c, this) : c
    };
    a.G = a.i(d, !0);
    a.g(b, "String", a.G, t);
    a.g(a.G, "fromCharCode", a.i(String.fromCharCode, !1), t);
    b = "charAt charCodeAt concat indexOf lastIndexOf slice substr substring toLocaleLowerCase toLocaleUpperCase toLowerCase toUpperCase trim".split(" ");
    for (d = 0; d < b.length; d++) K(a, a.G, b[d], String.prototype[b[d]]);
    d = function (c, e, f) {
        e = a.L(e);
        f = a.L(f);
        try {
            return String(this).localeCompare(c, e, f)
        } catch (g) {
            I(a, a.B, "localeCompare: " +
                g.message)
        }
    };
    K(a, a.G, "localeCompare", d);
    d = function (c, e, f) {
        var g = String(this);
        e = e ? Number(e) : void 0;
        if (P(a, c, a.F) && (c = c.data, Q(a, c, f), 2 === a.REGEXP_MODE)) {
            if (A) c = R(a, "string.split(separator, limit)", {
                string: g,
                separator: c,
                limit: e
            }, c, f), c !== z && f(N(a, c)); else {
                var m = a.Y(), q = S(a, c, m, f);
                m.onmessage = function (C) {
                    clearTimeout(q);
                    f(N(a, C.data))
                };
                m.postMessage(["split", g, c, e])
            }
            return
        }
        c = g.split(c, e);
        f(N(a, c))
    };
    T(a, a.G, "split", d);
    d = function (c, e) {
        var f = String(this);
        c = P(a, c, a.F) ? c.data : new RegExp(c);
        Q(a, c, e);
        if (2 ===
            a.REGEXP_MODE) if (A) c = R(a, "string.match(regexp)", {
            string: f,
            regexp: c
        }, c, e), c !== z && e(c && N(a, c)); else {
            var g = a.Y(), m = S(a, c, g, e);
            g.onmessage = function (q) {
                clearTimeout(m);
                e(q.data && N(a, q.data))
            };
            g.postMessage(["match", f, c])
        } else c = f.match(c), e(c && N(a, c))
    };
    T(a, a.G, "match", d);
    d = function (c, e) {
        var f = String(this);
        P(a, c, a.F) ? c = c.data : c = new RegExp(c);
        Q(a, c, e);
        if (2 === a.REGEXP_MODE) if (A) c = R(a, "string.search(regexp)", {
            string: f,
            regexp: c
        }, c, e), c !== z && e(c); else {
            var g = a.Y(), m = S(a, c, g, e);
            g.onmessage = function (q) {
                clearTimeout(m);
                e(q.data)
            };
            g.postMessage(["search", f, c])
        } else e(f.search(c))
    };
    T(a, a.G, "search", d);
    d = function (c, e, f) {
        var g = String(this);
        e = String(e);
        if (P(a, c, a.F) && (c = c.data, Q(a, c, f), 2 === a.REGEXP_MODE)) {
            if (A) c = R(a, "string.replace(substr, newSubstr)", {
                string: g,
                substr: c,
                newSubstr: e
            }, c, f), c !== z && f(c); else {
                var m = a.Y(), q = S(a, c, m, f);
                m.onmessage = function (C) {
                    clearTimeout(q);
                    f(C.data)
                };
                m.postMessage(["replace", g, c, e])
            }
            return
        }
        f(g.replace(c, e))
    };
    T(a, a.G, "replace", d);
    a.U.push("(function() {", "var replace_ = String.prototype.replace;",
        "String.prototype.replace = function replace(substr, newSubstr) {", "if (typeof newSubstr !== 'function') {", "return replace_.call(this, substr, newSubstr);", "}", "var str = this;", "if (substr instanceof RegExp) {", "var subs = [];", "var m = substr.exec(str);", "while (m) {", "m.push(m.index, str);", "var inject = newSubstr.apply(null, m);", "subs.push([m.index, m[0].length, inject]);", "m = substr.global ? substr.exec(str) : null;", "}", "for (var i = subs.length - 1; i >= 0; i--) {", "str = str.substring(0, subs[i][0]) + subs[i][2] + str.substring(subs[i][0] + subs[i][1]);",
        "}", "} else {", "var i = str.indexOf(substr);", "if (i !== -1) {", "var inject = newSubstr(str.substr(i, substr.length), i, str);", "str = str.substring(0, i) + inject + str.substring(i + substr.length);", "}", "}", "return str;", "};", "})();", "")
}

function ma(a, b) {
    a.Ra = a.i(function (d) {
        d = D.Boolean(d);
        return L(a) ? (this.data = d, this) : d
    }, !0);
    a.g(b, "Boolean", a.Ra, t)
}

function na(a, b) {
    var d = function (c) {
        c = arguments.length ? D.Number(c) : 0;
        return L(a) ? (this.data = c, this) : c
    };
    a.S = a.i(d, !0);
    a.g(b, "Number", a.S, t);
    b = ["MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"];
    for (d = 0; d < b.length; d++) a.g(a.S, b[d], Number[b[d]], v);
    d = function (c) {
        try {
            return Number(this).toExponential(c)
        } catch (e) {
            I(a, a.B, e.message)
        }
    };
    K(a, a.S, "toExponential", d);
    d = function (c) {
        try {
            return Number(this).toFixed(c)
        } catch (e) {
            I(a, a.B, e.message)
        }
    };
    K(a, a.S, "toFixed", d);
    d = function (c) {
        try {
            return Number(this).toPrecision(c)
        } catch (e) {
            I(a,
                a.B, e.message)
        }
    };
    K(a, a.S, "toPrecision", d);
    d = function (c) {
        try {
            return Number(this).toString(c)
        } catch (e) {
            I(a, a.B, e.message)
        }
    };
    K(a, a.S, "toString", d);
    d = function (c, e) {
        c = c ? a.L(c) : void 0;
        e = e ? a.L(e) : void 0;
        return Number(this).toLocaleString(c, e)
    };
    K(a, a.S, "toLocaleString", d)
}

function oa(a, b) {
    var d = function (e, f) {
        if (!L(a)) return D.Date();
        var g = [null].concat(Array.from(arguments));
        this.data = new (Function.prototype.bind.apply(D.Date, g));
        return this
    };
    a.R = a.i(d, !0);
    a.Sa = a.R.h.prototype;
    a.g(b, "Date", a.R, t);
    a.g(a.R, "now", a.i(Date.now, !1), t);
    a.g(a.R, "parse", a.i(Date.parse, !1), t);
    a.g(a.R, "UTC", a.i(Date.UTC, !1), t);
    b = "getDate getDay getFullYear getHours getMilliseconds getMinutes getMonth getSeconds getTime getTimezoneOffset getUTCDate getUTCDay getUTCFullYear getUTCHours getUTCMilliseconds getUTCMinutes getUTCMonth getUTCSeconds getYear setDate setFullYear setHours setMilliseconds setMinutes setMonth setSeconds setTime setUTCDate setUTCFullYear setUTCHours setUTCMilliseconds setUTCMinutes setUTCMonth setUTCSeconds setYear toDateString toISOString toJSON toGMTString toLocaleDateString toLocaleString toLocaleTimeString toTimeString toUTCString".split(" ");
    for (var c = 0; c < b.length; c++) d = function (e) {
        return function (f) {
            var g = this.data;
            g instanceof Date || I(a, a.j, e + " not called on a Date");
            for (var m = [], q = 0; q < arguments.length; q++) m[q] = a.L(arguments[q]);
            return g[e].apply(g, m)
        }
    }(b[c]), K(a, a.R, b[c], d)
}

function pa(a, b) {
    var d = function (c, e) {
        if (L(a)) var f = this; else {
            if (void 0 === e && P(a, c, a.F)) return c;
            f = a.m(a.xa)
        }
        c = void 0 === c ? "" : String(c);
        e = e ? String(e) : "";
        /^[gmi]*$/.test(e) || I(a, a.T, "Invalid regexp flag");
        try {
            var g = new D.RegExp(c, e)
        } catch (m) {
            I(a, a.T, m.message)
        }
        U(a, f, g);
        return f
    };
    a.F = a.i(d, !0);
    a.xa = a.F.h.prototype;
    a.g(b, "RegExp", a.F, t);
    a.g(a.F.h.prototype, "global", void 0, u);
    a.g(a.F.h.prototype, "ignoreCase", void 0, u);
    a.g(a.F.h.prototype, "multiline", void 0, u);
    a.g(a.F.h.prototype, "source", "(?:)", u);
    a.U.push("Object.defineProperty(RegExp.prototype, 'test',",
        "{configurable: true, writable: true, value:", "function test(str) {", "return !!this.exec(str);", "}", "});");
    d = function (c, e) {
        function f(x) {
            if (x) {
                var Y = N(a, x);
                a.g(Y, "index", x.index);
                a.g(Y, "input", x.input);
                return Y
            }
            return null
        }

        var g = this.data;
        c = String(c);
        g.lastIndex = Number(a.A(this, "lastIndex"));
        Q(a, g, e);
        if (2 === a.REGEXP_MODE) if (A) c = R(a, "regexp.exec(string)", {
            string: c,
            regexp: g
        }, g, e), c !== z && (a.g(this, "lastIndex", g.lastIndex), e(f(c))); else {
            var m = a.Y(), q = S(a, g, m, e), C = this;
            m.onmessage = function (x) {
                clearTimeout(q);
                a.g(C, "lastIndex", x.data[1]);
                e(f(x.data[0]))
            };
            m.postMessage(["exec", g, g.lastIndex, c])
        } else c = g.exec(c), a.g(this, "lastIndex", g.lastIndex), e(f(c))
    };
    T(a, a.F, "exec", d)
}

function qa(a, b) {
    function d(c) {
        var e = a.i(function (f) {
            var g = L(a) ? this : a.la(e);
            V(a, g, f);
            return g
        }, !0);
        a.g(e, "prototype", a.la(a.B), t);
        a.g(e.h.prototype, "name", c, t);
        a.g(b, c, e, t);
        return e
    }

    a.B = a.i(function (c) {
        var e = L(a) ? this : a.la(a.B);
        V(a, e, c);
        return e
    }, !0);
    a.g(b, "Error", a.B, t);
    a.g(a.B.h.prototype, "message", "", t);
    a.g(a.B.h.prototype, "name", "Error", t);
    d("EvalError");
    a.Ta = d("RangeError");
    a.Ua = d("ReferenceError");
    a.T = d("SyntaxError");
    a.j = d("TypeError");
    a.eb = d("URIError")
}

function ra(a, b) {
    var d = a.m(a.H);
    a.g(b, "Math", d, t);
    var c = "E LN2 LN10 LOG2E LOG10E PI SQRT1_2 SQRT2".split(" ");
    for (b = 0; b < c.length; b++) a.g(d, c[b], Math[c[b]], u);
    c = "abs acos asin atan atan2 ceil cos exp floor log max min pow random round sin sqrt tan".split(" ");
    for (b = 0; b < c.length; b++) a.g(d, c[b], a.i(Math[c[b]], !1), t)
}

function sa(a, b) {
    function d(e) {
        try {
            var f = JSON.parse(String(e))
        } catch (g) {
            I(a, a.T, g.message)
        }
        return a.ta(f)
    }

    var c = a.m(a.H);
    a.g(b, "JSON", c, t);
    a.g(c, "parse", a.i(d, !1));
    d = function (e, f, g) {
        f && "Function" === f.D ? I(a, a.j, "Function replacer on JSON.stringify not supported") : f && "Array" === f.D ? (f = ta(a, f), f = f.filter(function (q) {
            return "string" === typeof q || "number" === typeof q
        })) : f = null;
        "string" !== typeof g && "number" !== typeof g && (g = void 0);
        e = a.L(e);
        try {
            var m = JSON.stringify(e, f, g)
        } catch (q) {
            I(a, a.j, q.message)
        }
        return m
    };
    a.g(c, "stringify", a.i(d, !1))
}

function P(a, b, d) {
    if (null === b || void 0 === b || !d) return !1;
    d = d.h.prototype;
    if (b === d) return !0;
    for (b = M(a, b); b;) {
        if (b === d) return !0;
        b = b.ja
    }
    return !1
}

function U(a, b, d) {
    b.data = new RegExp(d.source, d.flags);
    a.g(b, "lastIndex", d.lastIndex, t);
    a.g(b, "source", d.source, u);
    a.g(b, "global", d.global, u);
    a.g(b, "ignoreCase", d.ignoreCase, u);
    a.g(b, "multiline", d.multiline, u)
}

function V(a, b, d) {
    d && a.g(b, "message", String(d), t);
    d = [];
    for (var c = a.l.length - 1; 0 <= c; c--) {
        var e = a.l[c], f = e.node;
        "CallExpression" === f.type && (e = e.W) && d.length && (d[d.length - 1].kb = a.A(e, "name"));
        !f.loc || d.length && "CallExpression" !== f.type || d.push({jb: f.loc})
    }
    c = String(a.A(b, "name"));
    f = String(a.A(b, "message"));
    f = c + ": " + f + "\n";
    for (c = 0; c < d.length; c++) {
        var g = d[c].jb;
        e = d[c].kb;
        g = g.source + ":" + g.start.line + ":" + g.start.column;
        f = e ? f + ("  at " + e + " (" + g + ")\n") : f + ("  at " + g + "\n")
    }
    a.g(b, "stack", f.trim(), t)
}

h.Y = function () {
    var a = this.Y.ib;
    a || (a = new Blob([fa.join("\n")], {type: "application/javascript"}), this.Y.ib = a);
    return new Worker(URL.createObjectURL(a))
};

function R(a, b, d, c, e) {
    var f = {timeout: a.REGEXP_THREAD_TIMEOUT};
    try {
        return A.runInNewContext(b, d, f)
    } catch (g) {
        e(null), I(a, a.B, "RegExp Timeout: " + c)
    }
    return z
}

function Q(a, b, d) {
    if (0 === a.REGEXP_MODE) var c = !1; else if (1 === a.REGEXP_MODE) c = !0; else if (A) c = !0; else if ("function" === typeof Worker && "function" === typeof URL) c = !0; else if ("function" === typeof require) {
        try {
            A = require("vm")
        } catch (e) {
        }
        c = !!A
    } else c = !1;
    c || (d(null), I(a, a.B, "Regular expressions not supported: " + b))
}

function S(a, b, d, c) {
    return setTimeout(function () {
        d.terminate();
        c(null);
        try {
            I(a, a.B, "RegExp Timeout: " + b)
        } catch (e) {
        }
    }, a.REGEXP_THREAD_TIMEOUT)
}

h.la = function (a) {
    return this.m(a && a.h.prototype)
};
h.m = function (a) {
    if ("object" !== typeof a) throw Error("Non object prototype");
    a = new H(a);
    P(this, a, this.B) && (a.D = "Error");
    return a
};

function O(a) {
    var b = a.m(a.wa);
    a.g(b, "length", 0, {configurable: !1, enumerable: !1, writable: !0});
    b.D = "Array";
    return b
}

function ua(a, b, d) {
    var c = a.m(a.P);
    d ? (d = a.m(a.H), a.g(c, "prototype", d, t), a.g(d, "constructor", c, t)) : c.$a = !0;
    a.g(c, "length", b, u);
    c.D = "Function";
    return c
}

function J(a, b, d, c) {
    var e = ua(a, b.params.length, !0);
    e.Ea = d;
    e.node = b;
    a.g(e, "name", b.id ? String(b.id.name) : c || "", u);
    return e
}

h.i = function (a, b) {
    b = ua(this, a.length, b);
    b.Da = a;
    a.id = this.Fa++;
    this.g(b, "name", a.name, u);
    return b
};
h.Xa = function (a) {
    var b = ua(this, a.length, !0);
    b.Ha = a;
    a.id = this.Fa++;
    this.g(b, "name", a.name, u);
    return b
};
h.ta = function (a) {
    if (a instanceof H) throw Error("Object is already pseudo");
    if ("object" !== typeof a && "function" !== typeof a || null === a) return a;
    if (a instanceof RegExp) {
        var b = this.m(this.xa);
        U(this, b, a);
        return b
    }
    if (a instanceof Date) return b = this.m(this.Sa), b.data = new Date(a.valueOf()), b;
    if ("function" === typeof a) {
        var d = this;
        b = Object.getOwnPropertyDescriptor(a, "prototype");
        return this.i(function () {
                var e = Array.prototype.slice.call(arguments).map(function (f) {
                    return d.L(f)
                });
                e = a.apply(d, e);
                return d.ta(e)
            },
            !!b)
    }
    if (Array.isArray(a)) {
        b = O(this);
        for (var c = 0; c < a.length; c++) c in a && this.g(b, c, this.ta(a[c]));
        return b
    }
    b = this.m(this.H);
    for (c in a) this.g(b, c, this.ta(a[c]));
    return b
};
h.L = function (a, b) {
    if ("object" !== typeof a && "function" !== typeof a || null === a) return a;
    if (!(a instanceof H)) throw Error("Object is not pseudo");
    if (P(this, a, this.F)) return b = new RegExp(a.data.source, a.data.flags), b.lastIndex = a.data.lastIndex, b;
    if (P(this, a, this.R)) return new Date(a.data.valueOf());
    b = b || {Ma: [], Ca: []};
    var d = b.Ma.indexOf(a);
    if (-1 !== d) return b.Ca[d];
    b.Ma.push(a);
    if (P(this, a, this.da)) {
        d = [];
        b.Ca.push(d);
        for (var c = this.A(a, "length"), e = 0; e < c; e++) W(this, a, e) && (d[e] = this.L(this.A(a, e), b))
    } else for (c in d =
        {}, b.Ca.push(d), a.h) e = this.L(a.h[c], b), Object.defineProperty(d, c, {
        value: e,
        writable: !0,
        enumerable: !0,
        configurable: !0
    });
    b.Ma.pop();
    b.Ca.pop();
    return d
};

function N(a, b) {
    for (var d = O(a), c = Object.getOwnPropertyNames(b), e = 0; e < c.length; e++) a.g(d, c[e], b[c[e]]);
    return d
}

function ta(a, b) {
    var d = [], c;
    for (c in b.h) d[c] = a.A(b, c);
    d.length = E(a.A(b, "length")) || 0;
    return d
}

function M(a, b) {
    switch (typeof b) {
        case "number":
            return a.S.h.prototype;
        case "boolean":
            return a.Ra.h.prototype;
        case "string":
            return a.G.h.prototype
    }
    return b ? b.ja : null
}

h.A = function (a, b) {
    if (this.K) throw Error("Getter not supported in that context");
    b = String(b);
    void 0 !== a && null !== a || I(this, this.j, "Cannot read property '" + b + "' of " + a);
    if ("object" === typeof a && !(a instanceof H)) throw TypeError("Expecting native value or pseudo object");
    if ("length" === b) {
        if (P(this, a, this.G)) return String(a).length
    } else if (64 > b.charCodeAt(0) && P(this, a, this.G)) {
        var d = F(b);
        if (!isNaN(d) && d < String(a).length) return String(a)[d]
    }
    do if (a.h && b in a.h) return (d = a.N[b]) ? (this.K = !0, d) : a.h[b]; while (a =
        M(this, a))
};

function W(a, b, d) {
    if (!(b instanceof H)) throw TypeError("Primitive data type has no properties");
    d = String(d);
    if ("length" === d && P(a, b, a.G)) return !0;
    if (P(a, b, a.G)) {
        var c = F(d);
        if (!isNaN(c) && c < String(b).length) return !0
    }
    do if (b.h && d in b.h) return !0; while (b = M(a, b));
    return !1
}

h.g = function (a, b, d, c) {
    if (this.va) throw Error("Setter not supported in that context");
    b = String(b);
    void 0 !== a && null !== a || I(this, this.j, "Cannot set property '" + b + "' of " + a);
    if ("object" === typeof a && !(a instanceof H)) throw TypeError("Expecting native value or pseudo object");
    c && ("get" in c || "set" in c) && ("value" in c || "writable" in c) && I(this, this.j, "Invalid property descriptor. Cannot both specify accessors and a value or writable attribute");
    var e = !this.l || va(this).M;
    if (a instanceof H) {
        if (P(this, a, this.G)) {
            var f =
                F(b);
            if ("length" === b || !isNaN(f) && f < String(a).length) {
                e && I(this, this.j, "Cannot assign to read only property '" + b + "' of String '" + a.data + "'");
                return
            }
        }
        if ("Array" === a.D) if (f = a.h.length, "length" === b) {
            if (c) {
                if (!("value" in c)) return;
                d = c.value
            }
            d = E(d);
            isNaN(d) && I(this, this.Ta, "Invalid array length");
            if (d < f) for (g in a.h) {
                var g = F(g);
                !isNaN(g) && d <= g && delete a.h[g]
            }
        } else isNaN(g = F(b)) || (a.h.length = Math.max(f, g + 1));
        if (!a.preventExtensions || b in a.h) if (c) {
            e = {};
            "get" in c && c.get && (a.N[b] = c.get, e.get = this.g.vb);
            "set" in
            c && c.set && (a.O[b] = c.set, e.set = this.g.wb);
            "configurable" in c && (e.configurable = c.configurable);
            "enumerable" in c && (e.enumerable = c.enumerable);
            "writable" in c && (e.writable = c.writable, delete a.N[b], delete a.O[b]);
            "value" in c ? (e.value = c.value, delete a.N[b], delete a.O[b]) : d !== y && (e.value = d, delete a.N[b], delete a.O[b]);
            try {
                Object.defineProperty(a.h, b, e)
            } catch (m) {
                I(this, this.j, "Cannot redefine property: " + b)
            }
            "get" in c && !c.get && delete a.N[b];
            "set" in c && !c.set && delete a.O[b]
        } else {
            if (d === y) throw ReferenceError("Value not specified");
            for (c = a; !(b in c.h);) if (c = M(this, c), !c) {
                c = a;
                break
            }
            if (c.O && c.O[b]) return this.va = !0, c.O[b];
            if (c.N && c.N[b]) e && I(this, this.j, "Cannot set property '" + b + "' of object '" + a + "' which only has a getter"); else try {
                a.h[b] = d
            } catch (m) {
                e && I(this, this.j, "Cannot assign to read only property '" + b + "' of object '" + a + "'")
            }
        } else e && I(this, this.j, "Can't add property '" + b + "', object is not extensible")
    } else e && I(this, this.j, "Can't create property '" + b + "' on '" + a + "'")
};
h.g.vb = function () {
    throw Error("Placeholder getter");
};
h.g.wb = function () {
    throw Error("Placeholder setter");
};

function K(a, b, d, c) {
    a.g(b.h.prototype, d, a.i(c, !1), t)
}

function T(a, b, d, c) {
    a.g(b.h.prototype, d, a.Xa(c), t)
}

function va(a) {
    a = a.l[a.l.length - 1].scope;
    if (!a) throw Error("No scope found");
    return a
}

function n(a, b, d) {
    var c = !1;
    if (d && d.M) c = !0; else {
        var e = b.body && b.body[0];
        e && e.Za && "Literal" === e.Za.type && "use strict" === e.Za.value && (c = !0)
    }
    e = a.m(null);
    c = new wa(d, c, e);
    d || ha(a, c.object);
    G(a, b, c);
    return c
}

function xa(a, b, d) {
    if (!b) throw Error("parentScope required");
    a = d || a.m(null);
    return new wa(b, b.M, a)
}

function ya(a, b) {
    for (var d = va(a); d && d !== a.J;) {
        if (b in d.object.h) return d.object.h[b];
        d = d.Ea
    }
    if (d === a.J && W(a, d.object, b)) return a.A(d.object, b);
    d = a.l[a.l.length - 1].node;
    "UnaryExpression" === d.type && "typeof" === d.operator || I(a, a.Ua, b + " is not defined")
}

function za(a, b, d) {
    for (var c = va(a), e = c.M; c && c !== a.J;) {
        if (b in c.object.h) {
            c.object.h[b] = d;
            return
        }
        c = c.Ea
    }
    if (c === a.J && (!e || W(a, c.object, b))) return a.g(c.object, b, d);
    I(a, a.Ua, b + " is not defined")
}

function G(a, b, d) {
    if (b.Oa) var c = b.Oa; else {
        c = Object.create(null);
        switch (b.type) {
            case "VariableDeclaration":
                for (var e = 0; e < b.declarations.length; e++) c[b.declarations[e].id.name] = !0;
                break;
            case "FunctionDeclaration":
                c[b.id.name] = b;
                break;
            case "BlockStatement":
            case "CatchClause":
            case "DoWhileStatement":
            case "ForInStatement":
            case "ForStatement":
            case "IfStatement":
            case "LabeledStatement":
            case "Program":
            case "SwitchCase":
            case "SwitchStatement":
            case "TryStatement":
            case "WithStatement":
            case "WhileStatement":
                var f = b.constructor,
                    g;
                for (g in b) if ("loc" !== g) {
                    var m = b[g];
                    if (m && "object" === typeof m) if (Array.isArray(m)) for (e = 0; e < m.length; e++) {
                        if (m[e] && m[e].constructor === f) {
                            var q = G(a, m[e], d);
                            for (g in q) c[g] = q[g]
                        }
                    } else if (m.constructor === f) for (g in q = G(a, m, d), q) c[g] = q[g]
                }
        }
        b.Oa = c
    }
    for (g in c) !0 === c[g] ? a.g(d.object, g, void 0, ca) : a.g(d.object, g, J(a, c[g], d), ca);
    return c
}

function L(a) {
    return a.l[a.l.length - 1].isConstructor
}

function Aa(a, b) {
    return b[0] === w ? ya(a, b[1]) : a.A(b[0], b[1])
}

function Ba(a, b, d) {
    return b[0] === w ? za(a, b[1], d) : a.g(b[0], b[1], d)
}

function I(a, b, d) {
    if (!a.J) throw void 0 === d ? b : d;
    void 0 !== d && (b = a.la(b), V(a, b, d));
    X(a, 4, b);
    throw da;
}

function X(a, b, d, c) {
    if (0 === b) throw TypeError("Should not unwind for NORMAL completions");
    var e = a.l;
    a:for (; 0 < e.length; e.pop()) {
        var f = e[e.length - 1];
        switch (f.node.type) {
            case "TryStatement":
                f.V = {type: b, value: d, label: c};
                return;
            case "CallExpression":
            case "NewExpression":
                if (3 === b) {
                    f.value = d;
                    return
                }
                if (4 !== b) throw Error("Unsynatctic break/continue not rejected by Acorn");
                break;
            case "Program":
                f.done = !0;
                break a
        }
        if (1 === b) {
            if (c ? f.labels && -1 !== f.labels.indexOf(c) : f.pa || f.ub) {
                e.pop();
                return
            }
        } else if (2 === b && (c ? f.labels &&
            -1 !== f.labels.indexOf(c) : f.pa)) return
    }
    P(a, d, a.B) ? (b = {
        EvalError: EvalError,
        RangeError: RangeError,
        ReferenceError: ReferenceError,
        SyntaxError: SyntaxError,
        TypeError: TypeError,
        URIError: URIError
    }, c = String(a.A(d, "name")), e = a.A(d, "message").valueOf(), b = (b[c] || Error)(e), b.stack = String(a.A(d, "stack"))) : b = String(d);
    a.value = b;
    throw b;
}

function Z(a, b, d) {
    if (!a.K) throw Error("Unexpected call to createGetter");
    a.K = !1;
    d = Array.isArray(d) ? d[0] : d;
    var c = new a.ya;
    c.type = "CallExpression";
    a = new r(c, a.l[a.l.length - 1].scope);
    a.ga = 2;
    a.v = d;
    a.W = b;
    a.Ja = !0;
    a.C = [];
    return a
}

function Ca(a, b, d, c) {
    if (!a.va) throw Error("Unexpected call to createSetter");
    a.va = !1;
    d = Array.isArray(d) ? d[0] : a.Ga;
    var e = new a.ya;
    e.type = "CallExpression";
    a = new r(e, a.l[a.l.length - 1].scope);
    a.ga = 2;
    a.v = d;
    a.W = b;
    a.Ja = !0;
    a.C = [c];
    return a
}

function Da(a, b) {
    return void 0 === b || null === b ? a.Ga : b instanceof H ? b : (a = a.m(M(a, b)), a.data = b, a)
}

h.sb = function () {
    return this.J
};
h.tb = function () {
    return this.l
};
h.xb = function (a) {
    this.l = a
};

function r(a, b) {
    this.node = a;
    this.scope = b
}

function wa(a, b, d) {
    this.Ea = a;
    this.M = b;
    this.object = d
}

function H(a) {
    this.N = Object.create(null);
    this.O = Object.create(null);
    this.h = Object.create(null);
    this.ja = a
}

h = H.prototype;
h.ja = null;
h.D = "Object";
h.data = null;
h.toString = function () {
    if (!B) return "[object Interpreter.Object]";
    if (!(this instanceof H)) return String(this);
    if ("Array" === this.D) {
        var a = ea;
        a.push(this);
        try {
            var b = [], d = this.h.length, c = !1;
            1024 < d && (d = 1E3, c = !0);
            for (var e = 0; e < d; e++) {
                var f = this.h[e];
                b[e] = f instanceof H && -1 !== a.indexOf(f) ? "..." : f
            }
            c && b.push("...")
        } finally {
            a.pop()
        }
        return b.join(",")
    }
    if ("Error" === this.D) {
        a = ea;
        if (-1 !== a.indexOf(this)) return "[object Error]";
        d = this;
        do if ("name" in d.h) {
            b = d.h.name;
            break
        } while (d = d.ja);
        d = this;
        do if ("message" in d.h) {
            c =
                d.h.message;
            break
        } while (d = d.ja);
        a.push(this);
        try {
            b = b && String(b), c = c && String(c)
        } finally {
            a.pop()
        }
        return c ? b + ": " + c : String(b)
    }
    return null !== this.data ? String(this.data) : "[object " + this.D + "]"
};
h.valueOf = function () {
    return !B || void 0 === this.data || null === this.data || this.data instanceof RegExp ? this : this.data instanceof Date ? this.data.valueOf() : this.data
};
k.prototype.stepArrayExpression = function (a, b, d) {
    d = d.elements;
    var c = b.u || 0;
    b.za ? (this.g(b.za, c, b.value), c++) : (b.za = O(this), b.za.h.length = d.length);
    for (; c < d.length;) {
        if (d[c]) return b.u = c, new r(d[c], b.scope);
        c++
    }
    a.pop();
    a[a.length - 1].value = b.za
};
k.prototype.stepAssignmentExpression = function (a, b, d) {
    if (!b.Z) return b.Z = !0, b = new r(d.left, b.scope), b.fa = !0, b;
    if (!b.oa) {
        b.qa || (b.qa = b.value);
        b.ma && (b.aa = b.value);
        if (!b.ma && "=" !== d.operator && (a = Aa(this, b.qa), b.aa = a, this.K)) return b.ma = !0, Z(this, a, b.qa);
        b.oa = !0;
        "=" === d.operator && "Identifier" === d.left.type && (b.Aa = d.left.name);
        return new r(d.right, b.scope)
    }
    if (b.ha) a.pop(), a[a.length - 1].value = b.Na; else {
        var c = b.aa, e = b.value;
        switch (d.operator) {
            case "=":
                c = e;
                break;
            case "+=":
                c += e;
                break;
            case "-=":
                c -= e;
                break;
            case "*=":
                c *= e;
                break;
            case "/=":
                c /= e;
                break;
            case "%=":
                c %= e;
                break;
            case "<<=":
                c <<= e;
                break;
            case ">>=":
                c >>= e;
                break;
            case ">>>=":
                c >>>= e;
                break;
            case "&=":
                c &= e;
                break;
            case "^=":
                c ^= e;
                break;
            case "|=":
                c |= e;
                break;
            default:
                throw SyntaxError("Unknown assignment expression: " + d.operator);
        }
        if (d = Ba(this, b.qa, c)) return b.ha = !0, b.Na = c, Ca(this, d, b.qa, c);
        a.pop();
        a[a.length - 1].value = c
    }
};
k.prototype.stepBinaryExpression = function (a, b, d) {
    if (!b.Z) return b.Z = !0, new r(d.left, b.scope);
    if (!b.oa) return b.oa = !0, b.aa = b.value, new r(d.right, b.scope);
    a.pop();
    var c = b.aa;
    b = b.value;
    switch (d.operator) {
        case "==":
            d = c == b;
            break;
        case "!=":
            d = c != b;
            break;
        case "===":
            d = c === b;
            break;
        case "!==":
            d = c !== b;
            break;
        case ">":
            d = c > b;
            break;
        case ">=":
            d = c >= b;
            break;
        case "<":
            d = c < b;
            break;
        case "<=":
            d = c <= b;
            break;
        case "+":
            d = c + b;
            break;
        case "-":
            d = c - b;
            break;
        case "*":
            d = c * b;
            break;
        case "/":
            d = c / b;
            break;
        case "%":
            d = c % b;
            break;
        case "&":
            d =
                c & b;
            break;
        case "|":
            d = c | b;
            break;
        case "^":
            d = c ^ b;
            break;
        case "<<":
            d = c << b;
            break;
        case ">>":
            d = c >> b;
            break;
        case ">>>":
            d = c >>> b;
            break;
        case "in":
            b instanceof H || I(this, this.j, "'in' expects an object, not '" + b + "'");
            d = W(this, b, c);
            break;
        case "instanceof":
            P(this, b, this.I) || I(this, this.j, "Right-hand side of instanceof is not an object");
            d = c instanceof H ? P(this, c, b) : !1;
            break;
        default:
            throw SyntaxError("Unknown binary operator: " + d.operator);
    }
    a[a.length - 1].value = d
};
k.prototype.stepBlockStatement = function (a, b, d) {
    var c = b.u || 0;
    if (d = d.body[c]) return b.u = c + 1, new r(d, b.scope);
    a.pop()
};
k.prototype.stepBreakStatement = function (a, b, d) {
    X(this, 1, void 0, d.label && d.label.name)
};
k.prototype.fb = 0;
k.prototype.stepCallExpression = function (a, b, d) {
    if (!b.ga) {
        b.ga = 1;
        var c = new r(d.callee, b.scope);
        c.fa = !0;
        return c
    }
    if (1 === b.ga) {
        b.ga = 2;
        c = b.value;
        if (Array.isArray(c)) {
            if (b.W = Aa(this, c), c[0] === w ? b.lb = "eval" === c[1] : b.v = c[0], c = b.W, this.K) return b.ga = 1, Z(this, c, b.value)
        } else b.W = c;
        b.C = [];
        b.u = 0
    }
    c = b.W;
    if (!b.Ja) {
        0 !== b.u && b.C.push(b.value);
        if (d.arguments[b.u]) return new r(d.arguments[b.u++], b.scope);
        if ("NewExpression" === d.type) {
            c instanceof H && !c.$a || I(this, this.j, c + " is not a constructor");
            if (c === this.da) b.v =
                O(this); else {
                var e = c.h.prototype;
                if ("object" !== typeof e || null === e) e = this.H;
                b.v = this.m(e)
            }
            b.isConstructor = !0
        }
        b.Ja = !0
    }
    if (b.Ka) a.pop(), a[a.length - 1].value = b.isConstructor && "object" !== typeof b.value ? b.v : b.value; else {
        b.Ka = !0;
        c instanceof H || I(this, this.j, c + " is not a function");
        if (a = c.node) {
            d = n(this, a.body, c.Ea);
            for (var f = 0; f < a.params.length; f++) this.g(d.object, a.params[f].name, b.C.length > f ? b.C[f] : void 0);
            e = O(this);
            for (f = 0; f < b.C.length; f++) this.g(e, f, b.C[f]);
            this.g(d.object, "arguments", e);
            (f = a.id && a.id.name) &&
            this.g(d.object, f, c);
            d.M || (b.v = Da(this, b.v));
            this.g(d.object, "this", b.v, ba);
            b.value = void 0;
            return new r(a.body, d)
        }
        if (c.eval) if (c = b.C[0], "string" !== typeof c) b.value = c; else {
            try {
                f = l(String(c), "eval" + this.fb++)
            } catch (m) {
                I(this, this.T, "Invalid code: " + m.message)
            }
            c = new this.ya;
            c.type = "EvalProgram_";
            c.body = f.body;
            p(c, d.start, d.end);
            d = b.lb ? b.scope : this.J;
            d.M ? d = n(this, f, d) : G(this, f, d);
            this.value = void 0;
            return new r(c, d)
        } else if (c.Da) b.scope.M || (b.v = Da(this, b.v)), b.value = c.Da.apply(b.v, b.C); else if (c.Ha) {
            var g =
                this;
            f = c.Ha.length - 1;
            f = b.C.concat(Array(f)).slice(0, f);
            f.push(function (m) {
                b.value = m;
                g.ka = !1
            });
            this.ka = !0;
            b.scope.M || (b.v = Da(this, b.v));
            c.Ha.apply(b.v, f)
        } else I(this, this.j, c.D + " is not callable")
    }
};
k.prototype.stepConditionalExpression = function (a, b, d) {
    var c = b.ba || 0;
    if (0 === c) return b.ba = 1, new r(d.test, b.scope);
    if (1 === c) {
        b.ba = 2;
        if ((c = !!b.value) && d.consequent) return new r(d.consequent, b.scope);
        if (!c && d.alternate) return new r(d.alternate, b.scope);
        this.value = void 0
    }
    a.pop();
    "ConditionalExpression" === d.type && (a[a.length - 1].value = b.value)
};
k.prototype.stepContinueStatement = function (a, b, d) {
    X(this, 2, void 0, d.label && d.label.name)
};
k.prototype.stepDebuggerStatement = function (a) {
    a.pop()
};
k.prototype.stepDoWhileStatement = function (a, b, d) {
    "DoWhileStatement" === d.type && void 0 === b.X && (b.value = !0, b.X = !0);
    if (!b.X) return b.X = !0, new r(d.test, b.scope);
    if (!b.value) a.pop(); else if (d.body) return b.X = !1, b.pa = !0, new r(d.body, b.scope)
};
k.prototype.stepEmptyStatement = function (a) {
    a.pop()
};
k.prototype.stepEvalProgram_ = function (a, b, d) {
    var c = b.u || 0;
    if (d = d.body[c]) return b.u = c + 1, new r(d, b.scope);
    a.pop();
    a[a.length - 1].value = this.value
};
k.prototype.stepExpressionStatement = function (a, b, d) {
    if (!b.$) return this.value = void 0, b.$ = !0, new r(d.expression, b.scope);
    a.pop();
    this.value = b.value
};
k.prototype.stepForInStatement = function (a, b, d) {
    if (!b.pb && (b.pb = !0, d.left.declarations && d.left.declarations[0].init)) return b.scope.M && I(this, this.T, "for-in loop variable declaration may not have an initializer."), new r(d.left, b.scope);
    if (!b.na) return b.na = !0, b.ca || (b.ca = b.value), new r(d.right, b.scope);
    b.pa || (b.pa = !0, b.o = b.value, b.Pa = Object.create(null));
    if (void 0 === b.Ba) a:for (; ;) {
        if (b.o instanceof H) for (b.ia || (b.ia = Object.getOwnPropertyNames(b.o.h)); ;) {
            var c = b.ia.shift();
            if (void 0 === c) break;
            if (Object.prototype.hasOwnProperty.call(b.o.h,
                c) && !b.Pa[c] && (b.Pa[c] = !0, Object.prototype.propertyIsEnumerable.call(b.o.h, c))) {
                b.Ba = c;
                break a
            }
        } else if (null !== b.o && void 0 !== b.o) for (b.ia || (b.ia = Object.getOwnPropertyNames(b.o)); ;) {
            c = b.ia.shift();
            if (void 0 === c) break;
            b.Pa[c] = !0;
            if (Object.prototype.propertyIsEnumerable.call(b.o, c)) {
                b.Ba = c;
                break a
            }
        }
        b.o = M(this, b.o);
        b.ia = null;
        if (null === b.o) {
            a.pop();
            return
        }
    }
    if (!b.Ya) if (b.Ya = !0, a = d.left, "VariableDeclaration" === a.type) b.ca = [w, a.declarations[0].id.name]; else return b.ca = null, b = new r(a, b.scope), b.fa = !0, b;
    b.ca ||
    (b.ca = b.value);
    if (!b.ha && (b.ha = !0, a = b.Ba, c = Ba(this, b.ca, a))) return Ca(this, c, b.ca, a);
    b.Ba = void 0;
    b.Ya = !1;
    b.ha = !1;
    if (d.body) return new r(d.body, b.scope)
};
k.prototype.stepForStatement = function (a, b, d) {
    switch (b.ba) {
        default:
            b.ba = 1;
            if (d.init) return new r(d.init, b.scope);
            break;
        case 1:
            b.ba = 2;
            if (d.test) return new r(d.test, b.scope);
            break;
        case 2:
            b.ba = 3;
            if (d.test && !b.value) a.pop(); else return b.pa = !0, new r(d.body, b.scope);
            break;
        case 3:
            if (b.ba = 1, d.update) return new r(d.update, b.scope)
    }
};
k.prototype.stepFunctionDeclaration = function (a) {
    a.pop()
};
k.prototype.stepFunctionExpression = function (a, b, d) {
    a.pop();
    b = a[a.length - 1];
    b.value = J(this, d, b.scope, b.Aa)
};
k.prototype.stepIdentifier = function (a, b, d) {
    a.pop();
    if (b.fa) a[a.length - 1].value = [w, d.name]; else {
        b = ya(this, d.name);
        if (this.K) return Z(this, b, this.Ga);
        a[a.length - 1].value = b
    }
};
k.prototype.stepIfStatement = k.prototype.stepConditionalExpression;
k.prototype.stepLabeledStatement = function (a, b, d) {
    a.pop();
    a = b.labels || [];
    a.push(d.label.name);
    b = new r(d.body, b.scope);
    b.labels = a;
    return b
};
k.prototype.stepLiteral = function (a, b, d) {
    a.pop();
    b = d.value;
    b instanceof RegExp && (d = this.m(this.xa), U(this, d, b), b = d);
    a[a.length - 1].value = b
};
k.prototype.stepLogicalExpression = function (a, b, d) {
    if ("&&" !== d.operator && "||" !== d.operator) throw SyntaxError("Unknown logical operator: " + d.operator);
    if (!b.Z) return b.Z = !0, new r(d.left, b.scope);
    if (b.oa) a.pop(), a[a.length - 1].value = b.value; else if ("&&" === d.operator && !b.value || "||" === d.operator && b.value) a.pop(), a[a.length - 1].value = b.value; else return b.oa = !0, new r(d.right, b.scope)
};
k.prototype.stepMemberExpression = function (a, b, d) {
    if (!b.na) return b.na = !0, new r(d.object, b.scope);
    if (d.computed) if (b.qb) d = b.value; else return b.o = b.value, b.qb = !0, new r(d.property, b.scope); else b.o = b.value, d = d.property.name;
    a.pop();
    if (b.fa) a[a.length - 1].value = [b.o, d]; else {
        d = this.A(b.o, d);
        if (this.K) return Z(this, d, b.o);
        a[a.length - 1].value = d
    }
};
k.prototype.stepNewExpression = k.prototype.stepCallExpression;
k.prototype.stepObjectExpression = function (a, b, d) {
    var c = b.u || 0, e = d.properties[c];
    if (b.o) {
        var f = b.Aa;
        b.ua[f] || (b.ua[f] = {});
        b.ua[f][e.kind] = b.value;
        b.u = ++c;
        e = d.properties[c]
    } else b.o = this.m(this.H), b.ua = Object.create(null);
    if (e) {
        var g = e.key;
        if ("Identifier" === g.type) f = g.name; else if ("Literal" === g.type) f = g.value; else throw SyntaxError("Unknown object structure: " + g.type);
        b.Aa = f;
        return new r(e.value, b.scope)
    }
    for (g in b.ua) d = b.ua[g], "get" in d || "set" in d ? this.g(b.o, g, y, {
        configurable: !0, enumerable: !0, get: d.get,
        set: d.set
    }) : this.g(b.o, g, d.init);
    a.pop();
    a[a.length - 1].value = b.o
};
k.prototype.stepProgram = function (a, b, d) {
    if (a = d.body.shift()) return b.done = !1, new r(a, b.scope);
    b.done = !0
};
k.prototype.stepReturnStatement = function (a, b, d) {
    if (d.argument && !b.$) return b.$ = !0, new r(d.argument, b.scope);
    X(this, 3, b.value)
};
k.prototype.stepSequenceExpression = function (a, b, d) {
    var c = b.u || 0;
    if (d = d.expressions[c]) return b.u = c + 1, new r(d, b.scope);
    a.pop();
    a[a.length - 1].value = b.value
};
k.prototype.stepSwitchStatement = function (a, b, d) {
    if (!b.X) return b.X = 1, new r(d.discriminant, b.scope);
    1 === b.X && (b.X = 2, b.yb = b.value, b.Ia = -1);
    for (; ;) {
        var c = b.La || 0, e = d.cases[c];
        if (b.sa || !e || e.test) if (e || b.sa || -1 === b.Ia) if (e) {
            if (!b.sa && !b.cb && e.test) return b.cb = !0, new r(e.test, b.scope);
            if (b.sa || b.value === b.yb) {
                b.sa = !0;
                var f = b.u || 0;
                if (e.consequent[f]) return b.ub = !0, b.u = f + 1, new r(e.consequent[f], b.scope)
            }
            b.cb = !1;
            b.u = 0;
            b.La = c + 1
        } else {
            a.pop();
            break
        } else b.sa = !0, b.La = b.Ia; else b.Ia = c, b.La = c + 1
    }
};
k.prototype.stepThisExpression = function (a) {
    a.pop();
    a[a.length - 1].value = ya(this, "this")
};
k.prototype.stepThrowStatement = function (a, b, d) {
    if (b.$) I(this, b.value); else return b.$ = !0, new r(d.argument, b.scope)
};
k.prototype.stepTryStatement = function (a, b, d) {
    if (!b.mb) return b.mb = !0, new r(d.block, b.scope);
    if (b.V && 4 === b.V.type && !b.ob && d.handler) return b.ob = !0, a = xa(this, b.scope), this.g(a.object, d.handler.param.name, b.V.value), b.V = void 0, new r(d.handler.body, a);
    if (!b.nb && d.finalizer) return b.nb = !0, new r(d.finalizer, b.scope);
    a.pop();
    b.V && X(this, b.V.type, b.V.value, b.V.label)
};
k.prototype.stepUnaryExpression = function (a, b, d) {
    if (!b.$) return b.$ = !0, a = new r(d.argument, b.scope), a.fa = "delete" === d.operator, a;
    a.pop();
    var c = b.value;
    switch (d.operator) {
        case "-":
            c = -c;
            break;
        case "+":
            c = +c;
            break;
        case "!":
            c = !c;
            break;
        case "~":
            c = ~c;
            break;
        case "delete":
            d = !0;
            if (Array.isArray(c)) {
                var e = c[0];
                e === w && (e = b.scope);
                c = String(c[1]);
                try {
                    delete e.h[c]
                } catch (f) {
                    b.scope.M ? I(this, this.j, "Cannot delete property '" + c + "' of '" + e + "'") : d = !1
                }
            }
            c = d;
            break;
        case "typeof":
            c = c && "Function" === c.D ? "function" : typeof c;
            break;
        case "void":
            c = void 0;
            break;
        default:
            throw SyntaxError("Unknown unary operator: " + d.operator);
    }
    a[a.length - 1].value = c
};
k.prototype.stepUpdateExpression = function (a, b, d) {
    if (!b.Z) return b.Z = !0, a = new r(d.argument, b.scope), a.fa = !0, a;
    b.ra || (b.ra = b.value);
    b.ma && (b.aa = b.value);
    if (!b.ma) {
        var c = Aa(this, b.ra);
        b.aa = c;
        if (this.K) return b.ma = !0, Z(this, c, b.ra)
    }
    if (b.ha) a.pop(), a[a.length - 1].value = b.Na; else {
        c = Number(b.aa);
        if ("++" === d.operator) var e = c + 1; else if ("--" === d.operator) e = c - 1; else throw SyntaxError("Unknown update expression: " + d.operator);
        d = d.prefix ? e : c;
        if (c = Ba(this, b.ra, e)) return b.ha = !0, b.Na = d, Ca(this, c, b.ra, e);
        a.pop();
        a[a.length - 1].value = d
    }
};
k.prototype.stepVariableDeclaration = function (a, b, d) {
    d = d.declarations;
    var c = b.u || 0, e = d[c];
    b.ab && e && (za(this, e.id.name, b.value), b.ab = !1, e = d[++c]);
    for (; e;) {
        if (e.init) return b.u = c, b.ab = !0, b.Aa = e.id.name, new r(e.init, b.scope);
        e = d[++c]
    }
    a.pop()
};
k.prototype.stepWithStatement = function (a, b, d) {
    if (!b.na) return b.na = !0, new r(d.object, b.scope);
    a.pop();
    a = xa(this, b.scope, b.value);
    return new r(d.body, a)
};
k.prototype.stepWhileStatement = k.prototype.stepDoWhileStatement;
D.Interpreter = k;
k.prototype.step = k.prototype.Qa;
k.prototype.run = k.prototype.bb;
k.prototype.appendCode = k.prototype.gb;
k.prototype.createObject = k.prototype.la;
k.prototype.createObjectProto = k.prototype.m;
k.prototype.createAsyncFunction = k.prototype.Xa;
k.prototype.createNativeFunction = k.prototype.i;
k.prototype.getProperty = k.prototype.A;
k.prototype.setProperty = k.prototype.g;
k.prototype.nativeToPseudo = k.prototype.ta;
k.prototype.pseudoToNative = k.prototype.L;
k.prototype.getGlobalScope = k.prototype.sb;
k.prototype.getStateStack = k.prototype.tb;
k.prototype.setStateStack = k.prototype.xb;
k.VALUE_IN_DESCRIPTOR = y;
