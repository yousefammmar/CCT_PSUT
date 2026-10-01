/* ==========================================================
   RedHat.js — Red Hat page logic
   Sections: 1 Config · 2 Data · 3 Renderers · 4 Init
   ========================================================== */

/* 1. Config ----------------------------------------------- */
// The enrollment page has not been built yet — change this one line when it exists.
const ENROLL_PAGE_URL = "Enroll.html";
const ICON_DIR = "../assets/images/icons/redhat/";

/* 2. Data ------------------------------------------------- */
// `icon` is the file in ICON_DIR. Each course's badge is its path number on a hat seal.
const COURSES = [
  { title: "Getting Started with Linux Fundamentals (RH104)", icon: "01.png",
    description: "Introduces Linux concepts and basic Linux tools for beginners with little or no prior Linux experience." },
  { title: "Red Hat System Administration I (RH124)", icon: "02.png",
    description: "Foundational Red Hat Enterprise Linux administration including CLI, files, users, services, networking, remote access, software management, and basic security." },
  { title: "Red Hat System Administration II (RH134)", icon: "03.png",
    description: "Advanced Linux administration including installation, storage, file systems, SELinux, services, boot, troubleshooting, tuning, shell scripting, and containers." },
  { title: "Red Hat System Administration III – Linux Automation (RH294)", icon: "04.png",
    description: "Linux automation with Red Hat Ansible Automation Platform, inventories, playbooks, roles, and reusable automation." },
  { title: "Red Hat Application Development I – Programming in Java EE (AD183)", icon: "05.png",
    description: "Enterprise Java development including EJB, JPA, REST, CDI, messaging, and security." },
  { title: "Red Hat OpenStack Administration I (CL110)", icon: "06.png",
    description: "Core operations for Red Hat OpenStack private cloud including projects, resources, privileges, networking, storage, monitoring, and troubleshooting." },
  { title: "Introduction to OpenShift Applications (DO101)", icon: "07.png",
    description: "Application deployment, scaling, and troubleshooting on OpenShift." },
  { title: "Red Hat OpenShift Administration I: Containers & Kubernetes (DO180)", icon: "08.png",
    description: "Deploy, manage, and troubleshoot containerized applications as Kubernetes workloads on OpenShift clusters." },
  { title: "Red Hat OpenShift Development I – Introduction to Containers with Podman (DO188)", icon: "09.png",
    description: "Build, run, and manage containers using Podman and OpenShift, including images, networking, storage, and multi-container apps." },
  { title: "Python Programming with Red Hat (AD141)", icon: "10.png",
    description: "Beginner Python programming covering syntax, control flow, functions, data structures, files, JSON, regular expressions, debugging, modules, and libraries." },
];

/* 3. Renderers -------------------------------------------- */
const HAT_SVG = `<svg class="badge__hat" viewBox="0 0 64 40" aria-hidden="true">
  <path fill="#cc0000" d="M6 30c0-6 6-8 12-9 2-8 6-14 12-14s9 6 11 12c6 2 11 5 11 11 0 3-6 6-23 6S6 33 6 30z"/>
  <path fill="#151515" d="M18 21c3 3 10 4 23 3 3-.2 5-.6 7-1.200-2-1.500-5-2.500-8-3-6 2-14 2-22 1.200z"/>
</svg>`;

function renderBadge(index) {
  const number = String(index + 1).padStart(2, "0");
  return `<div class="badge" role="img" aria-label="Step ${number}">
    ${HAT_SVG}
    <div class="badge__num">${number}</div>
  </div>`;
}

function renderCourseItem(course, index) {
  const side = index % 2 === 0 ? "left" : "right";
  return `<li class="path-item path-item--${side} reveal">
    <div class="path-item__badge">${renderBadge(index)}</div>
    <article class="path-item__card">
      <div>
        <h3>${course.title}</h3>
        <p>${course.description}</p>
      </div>
      <div class="path-item__icon"><img src="${ICON_DIR}${course.icon}" alt="" loading="lazy"></div>
    </article>
  </li>`;
}

function renderCourses() {
  document.getElementById("course-path").innerHTML = COURSES.map(renderCourseItem).join("");
}

function setupEnrollButton() {
  document.getElementById("enroll-btn").href = ENROLL_PAGE_URL;
}

/* 4. Init ------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCourses();
  setupEnrollButton();
  Shared.renderFeatureStrip("features", "Red Hat");
  Shared.init();
});
