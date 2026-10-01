/* ==========================================================
   Oracle.js — Oracle page logic
   Sections: 1 Config · 2 Data · 3 Icons · 4 Renderers · 5 Init
   ========================================================== */

/* 1. Config ----------------------------------------------- */
// The enrollment page has not been built yet — change this one line when it exists.
const ENROLL_PAGE_URL = "Enroll.html";

/* 2. Data ------------------------------------------------- */
// `badge` is the label on the round Oracle seal; `icon` picks the drawing from ICONS.
const COURSES = [
  { title: "Application Development Foundations – English", badge: "APEX", icon: "apex",
    description: "Learn techniques and tools to develop database-driven web applications using no-code/low-code Oracle APEX on an Autonomous Database (Cloud)." },
  { title: "Artificial Intelligence with Machine Learning in Java – English", badge: "AI / ML", icon: "brain",
    description: "Learn and practice machine learning concepts within artificial intelligence using Java, including terminology, syntax, and steps to create machine learning solutions." },
  { title: "Data Center Operations Foundations – English", badge: "Data Center", icon: "server",
    description: "Learn the fundamental concepts of data center operations and critical facilities management, including safety practices, electrical and HVAC systems, monitoring and alarm response, and standard operating procedures." },
];

/* 3. Icons ------------------------------------------------ */
const S = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
const ICONS = {
  apex:   `<svg ${S}><path d="M7 17a4 4 0 0 1-.5-8A5.500 5.500 0 0 1 17 8.500 4.800 4.800 0 0 1 17 17"/><path d="m10 14-2 2 2 2M14 14l2 2-2 2M12.500 13.500l-1 5"/></svg>`,
  brain:  `<svg ${S}><path d="M9 3a4 4 0 0 0-4 4 3.500 3.500 0 0 0-1 6.500A3.500 3.500 0 0 0 8 19a3 3 0 0 0 4 1V4a3 3 0 0 0-3-1zM15 3a4 4 0 0 1 4 4 3.500 3.500 0 0 1 1 6.500A3.500 3.500 0 0 1 16 19a3 3 0 0 1-4 1"/><path d="M8 9h2M14 9h2M8 14h2M14 14h2"/></svg>`,
  server: `<svg ${S}><rect x="4" y="3" width="16" height="5" rx="1.500"/><rect x="4" y="10" width="16" height="5" rx="1.500"/><rect x="4" y="17" width="16" height="4" rx="1.500"/><path d="M7 5.500h2M7 12.500h2M7 19h2"/></svg>`,
};

/* 4. Renderers -------------------------------------------- */
function renderBadge(course) {
  return `<div class="badge" role="img" aria-label="Oracle ${course.badge} badge">
    <div class="badge__brand">ORACLE</div>
    <div class="badge__label">${course.badge}</div>
    ${ICONS[course.icon]}
  </div>`;
}

function renderCourseItem(course, index) {
  const side = index % 2 === 0 ? "left" : "right";
  return `<li class="path-item path-item--${side} reveal">
    <div class="path-item__badge">${renderBadge(course)}</div>
    <article class="path-item__card">
      <div>
        <h3>${course.title}</h3>
        <p>${course.description}</p>
      </div>
      <div class="path-item__icon">${ICONS[course.icon]}</div>
    </article>
  </li>`;
}

function renderCourses() {
  document.getElementById("course-path").innerHTML = COURSES.map(renderCourseItem).join("");
}

function setupEnrollButton() {
  document.getElementById("enroll-btn").href = ENROLL_PAGE_URL;
}

/* 5. Init ------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCourses();
  setupEnrollButton();
  Shared.renderFeatureStrip("features", "Oracle");
  Shared.init();
});
