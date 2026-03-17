(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const yearEl = $("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const THEME_KEY = "portfolio-theme";
  const root = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function setTheme(theme) {
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    localStorage.setItem(THEME_KEY, theme);
    const label = $("[data-theme-label]");
    if (label) label.textContent = theme === "light" ? "Claro" : "Oscuro";
  }

  setTheme(getPreferredTheme());

  const toggle = $("[data-theme-toggle]");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      setTheme(next);
    });
  }

  const navToggle = $(".nav__toggle");
  const navLinks = $("[data-collapsible]");

  function setNavCollapsed(collapsed) {
    if (!navToggle || !navLinks) return;
    navLinks.dataset.collapsed = collapsed ? "true" : "false";
    navToggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
  }

  if (navToggle && navLinks) {
    setNavCollapsed(true);
    navToggle.addEventListener("click", () => {
      const isCollapsed = navLinks.dataset.collapsed !== "false";
      setNavCollapsed(!isCollapsed);
    });

    $$(".nav__links a").forEach((a) => {
      a.addEventListener("click", () => setNavCollapsed(true));
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setNavCollapsed(true);
    });
  }

  $$("[data-placeholder-link]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Actualiza este enlace con tu URL real (GitHub/LinkedIn) en index.html.");
    });
  });
})();
