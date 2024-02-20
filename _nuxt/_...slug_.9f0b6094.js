import L from "./DocumentDrivenEmpty.3182d55e.js";
import k from "./ContentRenderer.4d17d45c.js";
import x from "./DocumentDrivenNotFound.bbf8c9f9.js";
import {
  z as O,
  a as m,
  j as N,
  $ as R,
  m as g,
  u as a,
  a0 as f,
  a1 as D,
  a2 as i,
  a3 as $,
  a4 as j,
  k as B,
  s as E,
  o as u,
  e as l,
  t as w,
  a5 as A,
  a6 as p,
  H as _,
  c as d,
} from "./entry.7928d96f.js";
import { u as S } from "./head.cc1b5e59.js";
import "./ContentRendererMarkdown.fa82df27.js";
import "./index.a6ef77ff.js";
const T = m({
    name: "LayoutLoader",
    inheritAttrs: !1,
    props: { name: String },
    async setup(s, t) {
      const n = await f[s.name]().then((e) => e.default || e);
      return () => B(n, t.attrs, t.slots);
    },
  }),
  b = m({
    name: "NuxtLayout",
    inheritAttrs: !1,
    props: { name: { type: [String, Boolean, Object], default: null } },
    setup(s, t) {
      const n = $("_route"),
        e = n === N() ? R() : n,
        o = g(() => a(s.name) ?? e.meta.layout ?? "default");
      return () => {
        const r = o.value && o.value in f,
          c = e.meta.layoutTransition ?? D;
        return i(j, r && c, {
          default: () =>
            i(
              T,
              r && { key: o.value, name: o.value, ...t.attrs },
              t.slots
            ).default(),
        }).default();
      };
    },
  }),
  q = { class: "prose m-auto slide-enter-content" },
  H = { key: 0, class: "mb-0 slide-enter" },
  K = m({
    __name: "[...slug]",
    setup(s) {
      const { page: t, layout: n } = E(),
        e = t.value.title;
      return (
        t.value,
        S(t),
        (o, r) => {
          const c = L,
            y = k,
            v = x,
            h = b;
          return (
            u(),
            l("div", q, [
              a(e) ? (u(), l("h1", H, w(a(e)), 1)) : A("", !0),
              p(
                h,
                { name: a(n) || "default" },
                {
                  default: _(() => [
                    a(t)
                      ? (u(),
                        d(
                          y,
                          { key: a(t)._id, value: a(t) },
                          {
                            empty: _(({ value: C }) => [
                              p(c, { value: C }, null, 8, ["value"]),
                            ]),
                            _: 1,
                          },
                          8,
                          ["value"]
                        ))
                      : (u(), d(v, { key: 1 })),
                  ]),
                  _: 1,
                },
                8,
                ["name"]
              ),
            ])
          );
        }
      );
    },
  });
export { K as default };
