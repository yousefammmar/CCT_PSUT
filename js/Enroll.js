/* ==========================================================
   Enroll.js — registration steps pages (Red Hat and Microsoft)
   All text (steps, notes, contact, links) is plain HTML in
   html/RedHat-Enroll.html and html/Microsoft-Enroll.html.
   To add a link, search those files for "TODO LINK" and follow the comment.
   This file only starts the shared behaviour (fade-in on scroll, header shadow).
   ========================================================== */

/** Entry point for the registration pages. */
function initEnrollPage() {
  Shared.init();
}

document.addEventListener("DOMContentLoaded", initEnrollPage);
