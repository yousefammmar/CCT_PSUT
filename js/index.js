/* ==========================================================
   index.js — home page behaviour
   All text (hero, highlights, provider cards, footer strip) is plain HTML in
   index.html. To send a provider card somewhere else, change the arrow link's
   href in that card. This file only starts the behaviour.
   ========================================================== */

/** The whole provider card opens its page, not only the small arrow (the arrow stays the keyboard target). */
function makeCardsClickable() {
  document.querySelectorAll(".provider-card").forEach((card) => {
    const link = card.querySelector(".provider-card__arrow");
    if (!link) return;
    card.dataset.href = link.getAttribute("href");
    card.addEventListener("click", (e) => {
      if (!e.target.closest("a")) window.location.href = card.dataset.href;
    });
  });
}

/** Entry point for the home page. */
function initHomePage() {
  makeCardsClickable();
  Shared.init();
}

document.addEventListener("DOMContentLoaded", initHomePage);
