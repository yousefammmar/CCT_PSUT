/* ==========================================================
   Shared_Script.js — helpers used by every page
   Exposes a single global: Shared
   ========================================================== */
const Shared = (() => {
  /** Smooth-scroll to the element matching `selector`. */
  function scrollToSection(selector) {
    const target = document.querySelector(selector);
    if (!target) return;
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: instant ? "auto" : "smooth", block: "start" });
  }

  /** Any element with data-scroll-target="#id" scrolls to that section on click. */
  function initScrollButtons() {
    document.querySelectorAll("[data-scroll-target]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToSection(el.dataset.scrollTarget);
      });
    });
  }

  /** Alternate course cards between sliding in from the left and the right. */
  function assignDirections() {
    document.querySelectorAll(".path > li, .ms-grid > li, .rh-grid > li, .cs-grid > li").forEach((li, i) => {
      li.classList.add(i % 2 === 0 ? "reveal--left" : "reveal--right");
    });
  }

  /** Reveal .reveal elements as they enter the viewport; items entering together are staggered ~90 ms apart. */
  function initReveal() {
    assignDirections();
    const items = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      items.forEach((i) => i.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.filter((en) => en.isIntersecting).forEach((en, i) => {
        en.target.style.setProperty("--d", `${i * 90}ms`);
        en.target.classList.add("is-visible");
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach((i) => io.observe(i));
  }

  /** Draw the roadmap connector as the reader scrolls: sets --draw (0–1) on .path / .cs-grid. */
  function initDrawLines() {
    const lines = document.querySelectorAll(".path, .cs-grid");
    if (!lines.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      lines.forEach((el) => {
        const r = el.getBoundingClientRect();
        const reach = window.innerHeight * 0.75;
        const p = Math.min(1, Math.max(0, (reach - r.top) / r.height));
        el.style.setProperty("--draw", p.toFixed(3));
      });
    };
    const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    update();
  }

  /** Re-scan for .reveal elements added after load (e.g. rendered cards). */
  const refresh = initReveal;

  /** Elements with data-tilt lean toward the pointer (sets --rx / --ry in degrees). */
  function initTilt() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    document.querySelectorAll("[data-tilt]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
      });
      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
  }

  /** Sticky second row under the header: Home + each provider. Links are resolved from the current folder. */
  const NAV_PAGES = [
    { label: "Home", file: "index.html", root: true },
    { label: "AWS", file: "AWS.html" },
    { label: "Oracle", file: "Oracle.html" },
    { label: "Cisco", file: "Cisco.html" },
    { label: "Microsoft", file: "Microsoft.html" },
    { label: "Red Hat", file: "RedHat.html" },
  ];

  function renderNav() {
    const header = document.querySelector(".site-header");
    if (!header || header.querySelector(".site-nav")) return;
    const inHtml = location.pathname.includes("/html/");
    const href = (p) => (p.root ? (inHtml ? "../index.html" : "index.html") : (inHtml ? p.file : "html/" + p.file));
    const current = decodeURIComponent(location.pathname.split("/").pop() || "index.html");
    const items = NAV_PAGES.map((p) =>
      `<li><a href="${href(p)}"${p.file === current ? ' aria-current="page"' : ""}>${p.label}</a></li>`).join("");
    header.insertAdjacentHTML("beforeend", `
      <nav class="site-nav" aria-label="Main">
        <div class="container site-nav__inner">
          <ul>${items}</ul>
        </div>
      </nav>`);
  }

  /** Four-item "why train with us" strip. Fills <ul class="features" id="..."> for the given provider. */
  const FEATURE_ICON_ATTRS = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
  const FEATURE_ICONS = {
    cap:   `<svg ${FEATURE_ICON_ATTRS}><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11.500V16c0 1.500 2.700 3 6 3s6-1.500 6-3v-4.500M22 9v6"/></svg>`,
    cert:  `<svg ${FEATURE_ICON_ATTRS}><rect x="4" y="3" width="16" height="13" rx="2"/><path d="M8 8h8M8 11.500h5"/><circle cx="16" cy="17" r="2.500"/><path d="m14.500 19.500-.5 2.500 2-1 2 1-.5-2.500"/></svg>`,
    chart: `<svg ${FEATURE_ICON_ATTRS}><path d="M5 20v-6M12 20V6M19 20v-10"/></svg>`,
    bag:   `<svg ${FEATURE_ICON_ATTRS}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></svg>`,
  };

  function renderFeatureStrip(containerId, provider) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const items = [
      { icon: "cap",   title: "Hands-On Learning",         text: "Practical labs and real-world scenarios" },
      { icon: "cert",  title: "Expert Instructors",        text: `Learn from certified ${provider} professionals` },
      { icon: "chart", title: "Certification Preparation", text: `Build the skills needed for ${provider} certifications` },
      { icon: "bag",   title: "Advance Your Career",       text: "Gain in-demand skills for new opportunities" },
    ];
    el.innerHTML = items.map((f) => `
      <li class="feature">
        <div class="feature__icon">${FEATURE_ICONS[f.icon]}</div>
        <div><strong>${f.title}</strong><span>${f.text}</span></div>
      </li>`).join("");
  }

  function init() { renderNav(); initScrollButtons(); initReveal(); initDrawLines(); initTilt(); }

  return { renderNav, renderFeatureStrip, scrollToSection, initScrollButtons, initReveal, initTilt, refresh, init };
})();
