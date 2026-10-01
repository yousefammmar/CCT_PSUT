/* ==========================================================
   Microsoft.js — Microsoft page logic
   Sections: 1 Config · 2 Data · 3 Renderers · 4 Init
   ========================================================== */

/* 1. Config ----------------------------------------------- */
// The enrollment page has not been built yet — change this one line when it exists.
const ENROLL_PAGE_URL = "Enroll.html";
const BADGE_DIR = "../assets/images/badges/microsoft/";

/* 2. Data ------------------------------------------------- */
// `color` picks the card gradient (see Microsoft.css).
// `badge` is the file in BADGE_DIR. When it is null, a placeholder shield is drawn
// from `level` ("fundamentals" | "associate") until the official badge file is added.
const COURSES = [
  { title: "Azure Fundamentals", color: "teal", badge: "azure-fundamentals.png",
    description: "Provides foundational knowledge of cloud computing and Microsoft Azure, including core Azure services, architecture, management, and governance." },
  { title: "Azure AI Fundamentals", color: "blue", badge: "azure-ai-fundamentals.png",
    description: "Introduces the fundamentals of artificial intelligence and machine learning on Azure, including common AI workloads and the Azure services used to implement them." },
  { title: "Azure Data Fundamentals", color: "purple", badge: "azure-data-fundamentals.png",
    description: "Introduces core data concepts and Azure data services, including relational and non-relational data, big data, and analytics workloads." },
  { title: "Azure Security Engineer Associate", color: "orange", badge: "azure-security-engineer-associate.png",
    description: "Develops skills for implementing security controls and protecting Azure environments, including identity, security operations, data protection, and infrastructure security." },
  { title: "Dynamics 365 Fundamentals (ERP)", color: "green", badge: null, level: "fundamentals", badgeText: "DYNAMICS 365 FUNDAMENTALS (ERP)",
    description: "Provides foundational knowledge of Dynamics 365 ERP capabilities, with a focus on optimizing finance and operations functions and understanding how Dynamics 365 integrates with other technologies." },
  { title: "Identity and Access Administrator Associate", color: "blue", badge: null, level: "associate", badgeText: "IDENTITY AND ACCESS ADMINISTRATOR",
    description: "Develops skills in managing identities and access using Microsoft Entra ID, including authentication, authorization, access management, and identity security." },
  { title: "Information Protection and Compliance Administrator Associate", color: "purple", badge: null, level: "associate", badgeText: "INFORMATION PROTECTION AND COMPLIANCE ADMINISTRATOR",
    description: "Covers the skills needed to protect organizational information and manage compliance using Microsoft security and compliance solutions, including Microsoft Purview." },
  { title: "Microsoft 365 Fundamentals", color: "orange", badge: "microsoft-365-fundamentals.png",
    description: "Provides foundational knowledge of Microsoft 365 services and capabilities, including Office applications, Teams, Viva, collaboration, productivity, and cloud-based work environments." },
  { title: "Power Platform Fundamentals", color: "teal", badge: "power-platform-fundamentals.png",
    description: "Introduces Microsoft Power Platform and its capabilities for analyzing data, building applications, automating processes, and creating AI-powered solutions using low-code/no-code tools." },
  { title: "Security, Compliance, and Identity Fundamentals", color: "blue", badge: "security-compliance-identity-fundamentals.png",
    description: "Introduces foundational concepts in security, compliance, and identity across Microsoft Azure and Microsoft 365, including Zero Trust, Microsoft Entra, security solutions, and Microsoft Purview." },
];

/* 3. Renderers -------------------------------------------- */
function stars(count) {
  return Array.from({ length: count }, (_, i) => {
    const x = 60 + (i - (count - 1) / 2) * 22;
    return `<path d="m${x} 116 3.200 6.500 7.200 1-5.200 5 1.300 7.100-6.500-3.400-6.500 3.400 1.300-7.100-5.200-5 7.200-1z" fill="#fff"/>`;
  }).join("");
}

/** Placeholder shield in the Microsoft Certified style, used until an official badge image exists. */
function renderPlaceholderBadge(course) {
  const count = course.level === "associate" ? 2 : 1;
  const lines = course.badgeText.match(/.{1,16}(\s|$)/g).map((l) => l.trim()).slice(0, 4);
  const text = lines.map((l, i) =>
    `<text x="60" y="${76 + (i - (lines.length - 1) / 2) * 9}" text-anchor="middle" font-size="7.500" font-weight="700" fill="#2b2b2b">${l}</text>`).join("");
  return `<svg class="badge-art" viewBox="0 0 120 150" role="img" aria-label="${course.title} badge (placeholder)">
    <path d="M10 8h100v78c0 28-22 48-50 58C32 134 10 114 10 86z" fill="#0a2a66"/>
    <path d="M16 14h88v72c0 24-19 42-44 51-25-9-44-27-44-51z" fill="#0f5fb8"/>
    <path d="M16 14h88v34H16z" fill="#fff"/>
    <text x="60" y="30" text-anchor="middle" font-size="11" font-weight="700" fill="#0a2a66">Microsoft</text>
    <text x="60" y="41" text-anchor="middle" font-size="7" letter-spacing="1.500" fill="#4a5578">CERTIFIED</text>
    <rect x="6" y="55" width="108" height="42" rx="8" fill="#fff" stroke="#555" stroke-width="2.500"/>
    ${text}
    ${stars(count)}
  </svg>`;
}

function renderBadge(course) {
  if (course.badge) {
    return `<img class="badge-art" src="${BADGE_DIR}${course.badge}" alt="${course.title} badge" loading="lazy">`;
  }
  return renderPlaceholderBadge(course);
}

function renderCourseCard(course, index) {
  const number = String(index + 1).padStart(2, "0");
  const side = index % 2 === 0 ? "left" : "right";
  return `<li class="ms-card ms-card--${course.color} ms-card--${side} reveal">
    <span class="ms-card__num" aria-hidden="true">${number}</span>
    <div class="ms-card__text">
      <h3>${course.title}</h3>
      <p>${course.description}</p>
    </div>
    <div class="ms-card__badge">${renderBadge(course)}</div>
  </li>`;
}

function renderCourses() {
  document.getElementById("course-grid").innerHTML = COURSES.map(renderCourseCard).join("");
}

function setupEnrollButton() {
  document.getElementById("enroll-btn").href = ENROLL_PAGE_URL;
}

/* 4. Init ------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCourses();
  setupEnrollButton();
  Shared.renderFeatureStrip("features", "Microsoft");
  Shared.init();
});
