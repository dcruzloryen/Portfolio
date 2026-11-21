const projects = {
  resq: {
    screens: [
      ["assets/resq-sos.jpg", "Request flood assistance", "Home screen showing GPS connection status and the orange flood SOS button."],
      ["assets/resq-weather.jpg", "Check local weather", "Local conditions, rain chance, and an hourly forecast for the device location."],
      ["assets/resq-dispatch.jpg", "Track active requests", "Rescuer dispatch map with three active flood requests listed below it."]
    ],
    title: "ResQConnect",
    category: "ANDROID APPLICATION / TEAM PROJECT",
    tags: ["Kotlin", "Supabase", "osmdroid", "Backend & maps"],
    summary: "An academic Android prototype for coordinating flood-related requests for assistance. Community users submit SOS requests, while rescuers use role-specific workflows to respond and monitor progress.",
    features: [
      "Connect Android workflows to Supabase authentication, persistent records, and real-time updates.",
      "Display emergency and rescuer locations using osmdroid map views and markers.",
      "Support emergency reporting, response-status information, and stored request history.",
      "Integrate device location and access to external navigation."
    ],
    role: "I developed the full application backend and integrated the map features. This was a four-person team project with Paul Gianfranco Arriola, Janus Xerxes Panogalinga, and Adrian Josh Villapando. Database preparation was not my responsibility.",
    takeaway: "This project brought together backend-connected application flows and location-based interfaces, with a focus on keeping emergency information connected across user and rescuer experiences.",
    limitations: "Academic prototype, not an official emergency service or production deployment. Location and live updates depend on permissions, device behavior, and connectivity. Map connectors are not calculated road routes, and the app does not guarantee rescue availability or arrival times.",
    source: "Group-5 ResQConnect documentation and the supplied Android source archive. The archive was reviewed for technology and map-integration context; the app was not built or independently validated.",
    repository: "https://github.com/paulgianarriola11-max/ResQConnect",
    repositoryNote: "The team repository currently returns 404 to public visitors; access may be restricted."
  },
  library: {
    title: "Relational Library Tracker",
    category: "JAVA DESKTOP APPLICATION / TEAM PROJECT",
    tags: ["Java Swing", "Oracle SQL", "JDBC"],
    summary: "A desktop library-management prototype that connects book inventory, student registration, and circulation records in a single workflow.",
    features: [
      "Search and manage books by title, author, genre, and shelf location.",
      "Connect student profiles with borrowing and return records.",
      "Calculate seven-day due dates and separate active borrows from return history.",
      "Organize books, students, and borrowing records through relational data."
    ],
    role: "Lead developer, as identified in the project documentation. The documented work covers Java Swing interfaces, database structure, circulation logic, and CRUD operations. Team: Raiden Clark Caña, Paul Eric Capellan, Loryen Art Dela Cruz, and Kassidy Glean Javier.",
    takeaway: "An opportunity to connect a desktop interface with structured records and the business rules behind borrowing and returns.",
    limitations: "Academic prototype. Production authentication and multi-user operation are outside the documented scope; the supplied report contains conflicting database-connectivity statements.",
    source: "Library Tracker documentation, April 2026.",
    image: "assets/library.png",
    imageAlt: "Library inventory interface from the original project documentation."
  },
  website: {
    title: "Personal Portfolio",
    category: "RESPONSIVE WEBSITE / PERSONAL PROJECT",
    tags: ["HTML", "CSS", "JavaScript", "Responsive design"],
    summary: "The website you are exploring: a lightweight portfolio designed to make my projects, contributions, and contact information easy to find.",
    features: [
      "Responsive layouts for mobile and desktop screens.",
      "Category filters with announced result counts.",
      "Native project dialogs with keyboard support and focus restoration.",
      "Original CSS illustrations, reduced-motion support, and direct contact links."
    ],
    takeaway: "The priority is a clear visitor journey: understand my focus, explore the work, and get in touch—without a heavy framework or unnecessary dependencies.",
    limitations: "A static website with direct email and telephone links rather than a form or backend. No visitor information is collected by a custom form.",
    source: "This site's HTML, CSS, and JavaScript."
  },
  network: {
    title: "Casal Campus Network",
    category: "NETWORK DESIGN / ACADEMIC PROJECT",
    tags: ["Cisco Packet Tracer", "VLANs", "DHCP", "DNS"],
    summary: "A campus topology that maps departmental networks to switches, routers, and shared services.",
    features: [
      "Separate departments into virtual LANs.",
      "Plan IP addressing and DHCP for campus devices.",
      "Diagram the connections between routers, switches, and DNS services."
    ],
    takeaway: "The topology shows how a physical connection differs from a logical boundary: departments can share switching infrastructure while belonging to separate VLANs.",
    limitations: "An academic design rather than a deployed network. The addressing tables and routing descriptions would need reconciliation before implementation.",
    source: "Casal Campus Network paper, topology diagram on page 7.",
    image: "assets/network.png",
    imageAlt: "Original Casal Campus Network topology diagram."
  }
};

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".project");
cards.forEach((card, index) => card.style.setProperty("--project-number", `"${String(index + 1).padStart(2, "0")}"`));
filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(filter => {
      const selected = filter === button;
      filter.classList.toggle("active", selected);
      filter.setAttribute("aria-pressed", String(selected));
    });
    let visible = 0;
    cards.forEach(card => {
      card.hidden = button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) visible++;
    });
    document.querySelector("#filter-status").textContent =
      `Showing ${visible} ${visible === 1 ? "project" : "projects"}`;
  });
});

const dialog = document.querySelector("#project-dialog");
const content = document.querySelector("#dialog-content");
let opener;
function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}
document.querySelectorAll("[data-project]").forEach(button => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    opener = button;
    content.replaceChildren();
    content.append(element("p", project.category, "eyebrow"));
    const title = element("h2", project.title);
    title.id = "dialog-title";
    content.append(title);
    const tags = element("div", "", "tags");
    project.tags.forEach(tag => tags.append(element("span", tag)));
    content.append(tags, element("p", project.summary));
    if (project.screens) {
      const gallery = element("div", "", "screen-gallery");
      for (const [src, caption, alt] of project.screens) {
        const figure = element("figure");
        const image = element("img");
        image.src = src;
        image.alt = alt;
        figure.append(image, element("figcaption", caption));
        gallery.append(figure);
      }
      content.append(element("h3", "Inside the application"), gallery);
    }
    content.append(element("h3", "What the project covers"));
    const list = element("ul");
    project.features.forEach(feature => list.append(element("li", feature)));
    content.append(list);
    if (project.role) content.append(element("h3", "My contribution"), element("p", project.role, "role"));
    content.append(
      element("h3", "Development perspective"),
      element("p", project.takeaway),
      element("h3", "Project scope"),
      element("p", project.limitations)
    );
    if (project.repository) {
      const link = element("a", "Team repository ↗", "text-link");
      link.href = project.repository;
      content.append(element("h3", "Source code"), link);
      if (project.repositoryNote) content.append(element("p", project.repositoryNote));
    }
    content.append(element("h3", "Project reference"), element("p", project.source));
    if (project.image) {
      const image = element("img");
      image.src = project.image;
      image.alt = project.imageAlt;
      content.append(image);
    }
    dialog.showModal();
    content.scrollTop = 0;
    document.body.classList.add("dialog-open");
  });
});
document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  // Keyboard-generated clicks must not be mistaken for backdrop clicks.
  if (event.target !== dialog || event.detail === 0) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  opener?.focus();
});
document.querySelector("#year").textContent = new Date().getFullYear();

const showcase = document.querySelector(".showcase");
const frames = [...showcase.querySelectorAll(".frames img")];
const captions = ["Lines of logic", "Space to think", "Room to collaborate"];
const motion = matchMedia("(prefers-reduced-motion: reduce)");
const play = document.querySelector("#frame-play");
let frame = 0;
let playing = !motion.matches;
let inView = true;
let timer;
function advance(direction) {
  frames[frame].classList.remove("current");
  frame = (frame + direction + frames.length) % frames.length;
  frames[frame].classList.add("current");
  document.querySelector("#frame-caption").textContent = `0${frame + 1} / 03 · ${captions[frame]}`;
}
function syncPlayback() {
  clearInterval(timer);
  const running = playing && inView && !document.hidden;
  if (running) timer = setInterval(() => advance(1), 8000);
  showcase.classList.toggle("paused", !running);
  play.textContent = playing ? "Ⅱ" : "▷";
  play.setAttribute("aria-label", playing ? "Pause slideshow" : "Play slideshow");
}
for (const [id, direction] of [["frame-prev", -1], ["frame-next", 1]]) {
  document.getElementById(id).addEventListener("click", () => {
    advance(direction);
    syncPlayback();
  });
}
play.addEventListener("click", () => { playing = !playing; syncPlayback(); });
motion.addEventListener("change", () => { playing = !motion.matches; syncPlayback(); });
document.addEventListener("visibilitychange", syncPlayback);
new IntersectionObserver(([entry]) => {
  inView = entry.isIntersecting;
  syncPlayback();
}).observe(showcase);
document.querySelector(".frame-controls").hidden = false;
syncPlayback();
