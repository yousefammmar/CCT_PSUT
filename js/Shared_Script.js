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

  /** Section headings (label, title, intro) rise in together, ~90 ms apart, like the cards below them. */
  function markSectionHeads() {
    document.querySelectorAll(".section > .container > :is(.eyebrow, .heading, .lead)").forEach((el) => el.classList.add("reveal"));
  }

  /** A soft shadow fades in under the sticky header once the page has scrolled (a 1px sentinel at the top is observed, no scroll listener). */
  function initHeaderShadow() {
    const header = document.querySelector(".site-header");
    if (!header || !("IntersectionObserver" in window)) return;
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none";
    document.body.prepend(sentinel);
    new IntersectionObserver(([entry]) => header.classList.toggle("is-scrolled", !entry.isIntersecting)).observe(sentinel);
  }

  /** Alternate course cards between sliding in from the left and the right. */
  function assignDirections() {
    document.querySelectorAll(".path > li, .ms-grid > li, .rh-grid > li, .cs-grid > li").forEach((li, i) => {
      li.classList.add(i % 2 === 0 ? "reveal--left" : "reveal--right");
    });
  }

  /** Reveal .reveal elements as they enter the viewport; items entering together are staggered ~90 ms apart. */
  function initReveal() {
    markSectionHeads();
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

  /** Elements with data-tilt lean toward the pointer (sets a perspective rotate directly on the element). */
  function initTilt() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    document.querySelectorAll("[data-tilt]").forEach((el) => {
      const lean = (rx, ry) => { el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`; };
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        lean((-y * 8).toFixed(2), (x * 8).toFixed(2));
      });
      el.addEventListener("pointerleave", () => lean(0, 0));
    });
  }

  /** Starts every behaviour the site shares. Each page script calls this once. */
  function init() {
    initScrollButtons();
    initReveal();
    initHeaderShadow();
    initTilt();
  }

  return { scrollToSection, initScrollButtons, initReveal, initHeaderShadow, initTilt, init };
})();
