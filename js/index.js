/* ==========================================================
   index.js — home page logic
   Sections: 1 Data · 2 Icons · 3 Renderers · 4 Init
   ========================================================== */

/* 1. Data ------------------------------------------------- */
// Provider arrows go to the provider's own page when it exists, otherwise to the AWS page.
const AWS_PAGE_URL = "html/AWS.html";

const PROVIDERS = [
  { id: "aws",       name: "AWS",       field: "Cloud Certifications",          logo: "aws.svg",       text: "Build in-demand cloud skills with Amazon Web Services certifications." },
  { id: "oracle",    page: "html/Oracle.html", name: "Oracle",    field: "Professional Certifications",   logo: "oracle.svg",    text: "Develop expertise in database, cloud, and enterprise solutions with Oracle certifications." },
  { id: "cisco",     page: "html/Cisco.html", name: "Cisco",     field: "Networking Certifications",     logo: "cisco.svg",     text: "Gain industry-recognized skills in networking, security, and infrastructure with Cisco certifications." },
  { id: "microsoft", page: "html/Microsoft.html", name: "Microsoft", field: "Role-Based Certifications",     logo: "microsoft.svg", text: "Advance your career with certifications in cloud, data, productivity, and security." },
  { id: "redhat",    page: "html/RedHat.html", name: "Red Hat",   field: "Infrastructure Certifications", logo: "redhat.svg",    text: "Build expertise in open source technologies and enterprise infrastructure with Red Hat certifications." },
];

const HIGHLIGHTS = [
  { icon: "cap",   text: "Globally Recognized Certifications" },
  { icon: "users", text: "Expert Training and Support" },
  { icon: "chart", text: "Skills for a Brighter Future" },
];

const FOOTER_ITEMS = [
  { icon: "medal", title: "Industry-Relevant Skills", text: "Certifications that make an impact" },
  { icon: "users", title: "Learn from Experts",       text: "Hands-on training and guidance" },
  { icon: "chart", title: "Advance Your Future",      text: "More opportunities, greater success" },
];

/* 2. Icons ------------------------------------------------ */
const ICONS = {
  cap:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3zm-6 9.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-3.8l-6 3.3-6-3.3z"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="3.2"/><circle cx="5" cy="9.5" r="2.4"/><circle cx="19" cy="9.5" r="2.4"/><path d="M12 13c-3.3 0-6 1.8-6 4v2h12v-2c0-2.2-2.7-4-6-4zM5 13c-2.3 0-4 1.2-4 3v2h3.5v-1.5c0-1.4.6-2.6 1.6-3.5H5zm14 0h-.1c1 .9 1.6 2.100 1.600 3.500V18H24v-2c0-1.800-1.700-3-4-3z"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="13" width="4" height="8" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>',
  medal: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="9" r="6"/><path d="M8 14 6 22l6-3 6 3-2-8a7.500 7.500 0 0 1-8 0z"/></svg>',
};

/* 3. Renderers -------------------------------------------- */
function renderHighlights() {
  document.getElementById("highlights-list").innerHTML = HIGHLIGHTS.map((h) => `
    <div class="highlight reveal">
      <div class="highlight__icon">${ICONS[h.icon]}</div>
      <span>${h.text}</span>
    </div>`).join("");
}

function renderProviders() {
  document.getElementById("providers-grid").innerHTML = PROVIDERS.map((p) => `
    <article class="provider-card reveal" id="provider-${p.id}">
      <div class="provider-card__logo"><img src="assets/images/${p.logo}" alt=""></div>
      <h3>${p.name}</h3>
      <h4>${p.field}</h4>
      <p>${p.text}</p>
      <a class="provider-card__arrow" href="${p.page || AWS_PAGE_URL}" aria-label="Open the ${p.page ? p.name : "AWS"} courses page from ${p.name}">→</a>
    </article>`).join("");
}

function renderFooterStrip() {
  document.getElementById("footer-strip").innerHTML = FOOTER_ITEMS.map((f) => `
    <div class="footer-strip__item">
      ${ICONS[f.icon]}
      <div><strong>${f.title}</strong><span>${f.text}</span></div>
    </div>`).join("");
}

/** The whole provider card opens its page, not only the small arrow (the arrow stays the keyboard target). */
function makeCardsClickable() {
  document.querySelectorAll(".provider-card").forEach((card) => {
    const link = card.querySelector(".provider-card__arrow");
    card.dataset.href = link.getAttribute("href");
    card.addEventListener("click", (e) => { if (!e.target.closest("a")) window.location.href = card.dataset.href; });
  });
}

/* 4. Init ------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHighlights();
  renderProviders();
  renderFooterStrip();
  makeCardsClickable();
  Shared.init(); // after rendering so .reveal items are observed
});
