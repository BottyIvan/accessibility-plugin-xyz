class m {
  constructor() {
    this.fontSize = localStorage.getItem("fontSize") ? parseInt(localStorage.getItem("fontSize")) : 16, this.updatePosition = (e) => {
      e && requestAnimationFrame(() => {
        const i = e.getBoundingClientRect(), s = this.popup.getBoundingClientRect(), n = i.bottom + window.scrollY, o = i.left + window.scrollX, a = window.innerHeight - 16 - s.height, d = window.innerWidth - 16 - s.width, p = 16, r = 16, h = Math.min(Math.max(n, p), a), u = Math.min(Math.max(o, r), d);
        this.popup.style.top = `${h}px`, this.popup.style.left = `${u}px`;
      });
    }, this.popup = document.createElement("div"), this.popup.className = "accessibility-popup-inline", this.popup.setAttribute("role", "alert"), this.popup.setAttribute("aria-live", "assertive"), this.popup.style.fontSize = `${this.fontSize}px`, document.body.appendChild(this.popup), window.addEventListener("resize", () => this.updatePosition()), window.addEventListener("scroll", () => this.updatePosition());
  }
  showMessage(e, i) {
    this.popup.textContent = e, this.popup.style.display = "block", i && this.updatePosition(i);
  }
  hide() {
    this.popup.style.display = "none";
  }
}
class g {
  constructor() {
    this.fontSize = localStorage.getItem("fontSize") ? parseInt(localStorage.getItem("fontSize")) : 16, this.popup = document.createElement("div"), this.popup.className = "accessibility-popup-fixed", this.popup.setAttribute("role", "alert"), this.popup.setAttribute("aria-live", "assertive"), this.popup.style.fontSize = `${this.fontSize}px`, document.body.appendChild(this.popup), document.body.appendChild(this.popup);
  }
  showMessage(e) {
    this.popup.textContent = e, this.popup.style.display = "block";
  }
  hide() {
    this.popup.style.display = "none";
  }
}
function y(t) {
  const e = document.createElement("div");
  e.className = "slider-container";
  const i = document.createElement("label");
  i.textContent = "Font Size:", i.htmlFor = "font-size-slider";
  const s = document.createElement("input");
  s.type = "range", s.id = "font-size-slider";
  const n = localStorage.getItem("fontSize") || "16px";
  return s.value = parseInt(n, 10).toString(), s.min = "10", s.max = "34", s.className = "font-size-slider", s.addEventListener("input", (o) => {
    const a = o.target.value;
    t(`${a}px`);
  }), e.appendChild(i), e.appendChild(s), e;
}
function b(t) {
  const e = document.createElement("div");
  e.className = "select-container";
  const i = document.createElement("label");
  i.textContent = "Mode:", i.htmlFor = "select-mode";
  const s = document.createElement("select");
  s.id = "select-mode", s.className = "select-mode";
  const n = localStorage.getItem("mode") || "fixed";
  return s.innerHTML = `
    <option value="fixed">Fixed Bottom</option>
    <option value="inline">Inline</option>
  `, s.value = n, s.addEventListener("change", (o) => {
    const a = o.target.value;
    t(a);
  }), e.appendChild(i), e.appendChild(s), e;
}
function f() {
  const t = document.createElement("button");
  t.className = "accessibility-icon", t.style.backgroundColor = "#fff", t.style.border = "1px solid #ccc", t.style.borderRadius = "50%", t.style.padding = "8px", t.style.cursor = "pointer", t.style.width = "40px", t.style.height = "40px", t.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)", t.style.transition = "background-color 0.3s ease", t.setAttribute("aria-label", "Accessibility Settings");
  const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  e.setAttribute("width", "16"), e.setAttribute("height", "16"), e.setAttribute("fill", "currentColor"), e.setAttribute("class", "bi bi-universal-access"), e.setAttribute("viewBox", "0 0 16 16");
  const i = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return i.setAttribute(
    "d",
    "M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6 5.5l-4.535-.442A.531.531 0 0 1 1.531 4H14.47a.531.531 0 0 1 .066 1.058L10 5.5V9l.452 6.42a.535.535 0 0 1-1.053.174L8.243 9.97c-.064-.252-.422-.252-.486 0l-1.156 5.624a.535.535 0 0 1-1.053-.174L6 9z"
  ), e.appendChild(i), t.appendChild(e), t;
}
function v() {
  const t = document.createElement("div");
  return t.style.position = "absolute", t.style.bottom = "50px", t.style.right = "0", t.style.padding = "16px", t.style.backgroundColor = "white", t.style.border = "1px solid #ccc", t.style.display = "none", t.style.flexDirection = "column", t.style.transition = "opacity 0.3s ease", t.className = "settings-panel", t;
}
function x() {
  const t = document.createElement("div");
  t.style.position = "fixed", t.style.bottom = "0", t.style.right = "0", t.style.padding = "16px", t.style.backgroundColor = "white", t.style.border = "1px solid #ccc", t.className = "settings";
  const e = v();
  e.appendChild(
    y((s) => {
      localStorage.setItem("fontSize", s);
    })
  ), e.appendChild(
    b((s) => {
      localStorage.setItem("mode", s);
    })
  ), t.appendChild(e);
  const i = f();
  t.appendChild(i), document.body.appendChild(t), i.addEventListener("click", () => {
    e.style.display = e.style.display === "none" ? "flex" : "none", e.style.opacity = e.style.display === "none" ? "0" : "1";
  }), window.addEventListener("click", (s) => {
    e.style.display === "flex" && !t.contains(s.target) && (e.style.display = "none", e.style.opacity = "0");
  });
}
const l = class l {
  constructor() {
    const e = localStorage.getItem("mode") || "fixed";
    document.body.dataset.accessibilityMode = e, this.popupInline = e === "inline" ? new m() : void 0, this.popup = e !== "inline" ? new g() : void 0, this.init();
  }
  init() {
    this.enableTextHighlight(), this.enableFormGuidance(), x();
  }
  enableTextHighlight() {
    document.addEventListener("mouseover", this.handleMouseOver.bind(this), {
      passive: !0
    }), document.addEventListener("mouseout", this.handleMouseOut.bind(this), {
      passive: !0
    });
  }
  handleMouseOver(e) {
    const i = e.target;
    if (i && l.interactiveTags.has(i.tagName)) {
      const s = `${l.interactiveTags.get(
        i.tagName
      )}: ${i.textContent}`;
      this.showMessage(s, i), i.classList.add("highlight");
    }
  }
  handleMouseOut(e) {
    const i = e.target;
    i && l.interactiveTags.has(i.tagName) && (this.hideMessage(), i.classList.remove("highlight"));
  }
  enableFormGuidance() {
    document.querySelectorAll("input, textarea, select").forEach((e) => {
      e.addEventListener("focus", () => this.handleFocus(e), {
        passive: !0
      }), e.addEventListener("blur", this.hideMessage.bind(this), {
        passive: !0
      });
    });
  }
  handleFocus(e) {
    var a;
    const i = document.querySelector(
      `label[for="${e.id}"]`
    );
    let s = (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement) && e.placeholder.trim() || ((a = i == null ? void 0 : i.textContent) == null ? void 0 : a.trim()) || "Please fill out this field";
    const o = [.../* @__PURE__ */ new Map([
      ["aria-required", "⚠️ Required field."],
      ["aria-invalid", "❌ The entered value is not valid."],
      ["aria-describedby", "ℹ️ Additional information available."],
      ["aria-labelledby", "🔖 This field has an associated label."],
      ["aria-disabled", "🚫 This field is disabled."],
      ["aria-readonly", "🔒 This field is read-only."]
    ])].filter(([d]) => e.hasAttribute(d)).map(([, d]) => d).join(" ");
    o && (s += ` ${o}`), this.showMessage(s, e);
  }
  showMessage(e, i) {
    var s, n;
    (s = this.popupInline) == null || s.showMessage(e, i), (n = this.popup) == null || n.showMessage(e);
  }
  hideMessage() {
    var e, i;
    (e = this.popupInline) == null || e.hide(), (i = this.popup) == null || i.hide();
  }
};
l.interactiveTags = /* @__PURE__ */ new Map([
  ["P", "Paragraph"],
  ["H1", "Heading 1"],
  ["H2", "Heading 2"],
  ["H3", "Heading 3"],
  ["H4", "Heading 4"],
  ["H5", "Heading 5"],
  ["H6", "Heading 6"],
  ["A", "Anchor"],
  ["BUTTON", "Button"],
  ["INPUT", "Input field"],
  ["TEXTAREA", "Text area"],
  ["SELECT", "Select dropdown"],
  ["LABEL", "Label"],
  ["LI", "List item"],
  ["TD", "Table cell"],
  ["TH", "Table header cell"]
]);
let c = l;
export {
  c as AccessibilityPlugin
};
