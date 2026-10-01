/* ==========================================================
   Cisco.js — Cisco page logic
   Sections: 1 Config · 2 Data · 3 Renderers · 4 Init
   ========================================================== */

/* 1. Config ----------------------------------------------- */
// The enrollment page has not been built yet — change this one line when it exists.
const ENROLL_PAGE_URL = "Enroll.html";
const ICON_DIR = "../assets/images/icons/cisco/";

/* 2. Data ------------------------------------------------- */
// `icon` is the file in ICON_DIR. Numbers are taken from the order of this list.
const COURSES = [
  { title: "Data Science Essentials with Python", icon: "01.png",
    description: "Learn Python for data analysis using Pandas and Matplotlib, with hands-on, project-based activities." },
  { title: "Cybersecurity Essentials", icon: "02.png",
    description: "Build foundational cybersecurity knowledge covering threats, vulnerabilities, network security, data protection, risk, and incident response." },
  { title: "Cyber Threat Management", icon: "03.png",
    description: "Develop skills in cybersecurity governance, threat intelligence, vulnerability assessment, risk management, and incident response." },
  { title: "Network Support and Security", icon: "04.png",
    description: "Develop network troubleshooting, help-desk, cybersecurity, and secure user-access skills for network support roles." },
  { title: "Introduction to Cybersecurity", icon: "05.png",
    description: "Explore the fundamentals of cybersecurity, cyber threats, vulnerabilities, data protection, privacy, and security careers." },
  { title: "Networking Basics", icon: "06.png",
    description: "Learn fundamental networking concepts, devices, media, protocols, IP addressing, and basic network configuration." },
  { title: "C++ Essentials 1", icon: "07.png",
    description: "Build foundational C++ programming skills, including core programming concepts, syntax, data types, and control structures." },
  { title: "C Essentials 1", icon: "08.png",
    description: "Learn the fundamentals of the C programming language, including syntax, data types, variables, and flow control." },
  { title: "English for IT 1", icon: "09.png",
    description: "Develop English communication skills for IT, including technical vocabulary, grammar, workplace communication, and professional scenarios." },
];

/* 3. Renderers -------------------------------------------- */
function renderCourseItem(course, index) {
  const number = String(index + 1).padStart(2, "0");
  const side = index % 2 === 0 ? "left" : "right";
  const num = `<span class="cs-item__num" aria-hidden="true">${number}</span>`;
  const card = `<article class="cs-item__card">
      <div>
        <h3>${course.title}</h3>
        <p>${course.description}</p>
      </div>
      <div class="cs-item__icon"><img src="${ICON_DIR}${course.icon}" alt="" loading="lazy"></div>
    </article>`;
  return `<li class="cs-item cs-item--${side} reveal">${side === "left" ? num + card : card + num}</li>`;
}

function renderCourses() {
  document.getElementById("course-grid").innerHTML = COURSES.map(renderCourseItem).join("");
}

function setupEnrollButton() {
  document.getElementById("enroll-btn").href = ENROLL_PAGE_URL;
}

/* 4. Init ------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCourses();
  Shared.renderFeatureStrip("features", "Cisco");
  setupEnrollButton();
  Shared.init();
});
