/* ==========================================================
   AWS.js — AWS page logic
   Sections: 1 Config · 2 Data · 3 Icons · 4 Renderers · 5 Init
   ========================================================== */

/* 1. Config ----------------------------------------------- */
// The enrollment page has not been built yet — change this one line when it exists.
const ENROLL_PAGE_URL = "Enroll.html";

/* 2. Data ------------------------------------------------- */
// `badge` is the name printed on each course's AWS Academy-style shield badge.
const COURSES = [
  { title: "AWS Cloud Foundation Course",            badge: "Cloud Foundations", icon: "cloud",  description: "An introductory course providing an overall understanding of cloud computing, covering cloud concepts, core AWS services, security, architecture, pricing, and support." },
  { title: "Machine Learning Foundation Course",     badge: "Machine Learning Foundations", icon: "brain",  description: "Introduces AI and machine learning concepts and terminology. Students learn to select and apply AWS ML services and gain practical experience labeling, building, training, and deploying ML models. The course contains approximately 20 hours of content." },
  { title: "Cloud Architecting Course",              badge: "Cloud Architecting",        icon: "cubes",  description: "An intermediate course covering the fundamentals of building IT infrastructure on AWS. It develops skills relevant to the AWS Certified Solutions Architect – Associate certification and includes lectures, hands-on labs, and project work." },
  { title: "AWS Generative AI Foundation Course",    badge: "Generative AI Foundations",    icon: "spark",  description: "Introduces AI with an emphasis on generative AI, covering its fundamental concepts, capabilities, principles, use cases, and associated AWS services and tools in cloud computing." },
  { title: "AWS Cloud Security Foundation Course",   badge: "Cloud Security Foundations",         icon: "shield", description: "Provides foundational knowledge of cybersecurity principles and AWS security services for cloud computing through guided hands-on learning, demonstrations, instructional material, and real-world scenarios." },
  { title: "AWS Cloud Developing Course",            badge: "Cloud Developing",        icon: "code",   description: "An intermediate course developing technical expertise in cloud application development. Students learn to use the AWS SDK and apply best practices for building and deploying applications, while preparing for the AWS Certified Developer – Associate certification." },
];

/* 3. Icons ------------------------------------------------ */
const S = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
const ICONS = {
  shield: `<svg ${S}><path d="M12 3 4 6v6c0 4.500 3.400 8 8 9 4.600-1 8-4.500 8-9V6l-8-3z"/><path d="m9 12 2 2 4-4"/></svg>`,
  brain:  `<svg ${S}><circle cx="12" cy="12" r="3"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="m7 7 3 3M17 7l-3 3M7 17l3-3M17 17l-3-3"/></svg>`,
  cloud:  `<svg ${S}><path d="M7 18a4 4 0 0 1-.5-8A5.500 5.500 0 0 1 17 8.500 4.800 4.800 0 0 1 17 18H7z"/></svg>`,
  cubes:  `<svg ${S}><path d="m12 3 4 2.300v4.500L12 12 8 9.800V5.300L12 3zM8 13l4 2.300v4.500L8 22l-4-2.200v-4.500L8 13zM16 13l4 2.300v4.500L16 22l-4-2.200v-4.500L16 13z"/></svg>`,
  spark:  `<svg ${S}><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6zM19 3v4M17 5h4"/></svg>`,
  code:   `<svg ${S}><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>`,
};

/* 4. Renderers -------------------------------------------- */
function renderBadge(course) {
  return `<div class="badge" role="img" aria-label="${course.badge} badge">
    <div class="badge__aws">aws</div>
    <div class="badge__academy">ACADEMY</div>
    <div class="badge__label">${course.badge}</div>
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
  Shared.renderFeatureStrip("features", "AWS");
  Shared.init();
});
