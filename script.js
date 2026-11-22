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
    source: "Group-5 ResQConnect project report and Android source code."
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
    role: "I was the lead developer on a four-person team with Raiden Clark Caña, Paul Eric Capellan, and Kassidy Glean Javier.",
    takeaway: "An opportunity to connect a desktop interface with structured records and the business rules behind borrowing and returns.",
    limitations: "An academic desktop prototype focused on library circulation. Production authentication and multi-user operation were outside the project scope.",
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
const frameIndex = showcase.querySelector(".frame-index");
const frameKeys = [...frameIndex.querySelectorAll("[data-frame]")];
const captions = ["Lines of logic", "Space to think", "Room to collaborate"];
const motion = matchMedia("(prefers-reduced-motion: reduce)");
const play = document.querySelector("#frame-play");
let frame = 0;
let playing = !motion.matches;
let inView = true;
let hovering = false;
let timer;
function advance(direction) {
  frames[frame].classList.remove("current");
  frame = (frame + direction + frames.length) % frames.length;
  frames[frame].classList.add("current");
  showcase.style.setProperty("--frame-turn", `${frame * 30}deg`);
  frameKeys.forEach((key, index) => key.setAttribute("aria-pressed", String(index === frame)));
  document.querySelector("#frame-caption").textContent = `${String(frame + 1).padStart(2, "0")} / ${String(frames.length).padStart(2, "0")} · ${captions[frame]}`;
}
function syncPlayback() {
  clearInterval(timer);
  const running = playing && inView && !hovering && !document.hidden;
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
frameKeys.forEach((key, index) => {
  key.style.setProperty("--preview", `url("${frames[index].currentSrc || frames[index].src}")`);
  key.addEventListener("click", () => {
    advance(index - frame);
    playing = false;
    syncPlayback();
  });
});
frameIndex.hidden = false;
// The focus mark responds to the pointer; text and controls keep their positions.
const finder = showcase.querySelector(".viewfinder");
const allowTracking = matchMedia("(min-width: 1100px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
let trackingFrame = 0;
function centerFinder() {
  cancelAnimationFrame(trackingFrame);
  trackingFrame = 0;
  finder.style.removeProperty("--look-x");
  finder.style.removeProperty("--look-y");
}
let pointerX, pointerY;
showcase.addEventListener("pointermove", event => {
  if (!allowTracking.matches || event.pointerType !== "mouse") return;
  pointerX = event.clientX;
  pointerY = event.clientY;
  if (trackingFrame) return;
  trackingFrame = requestAnimationFrame(() => {
    const box = showcase.getBoundingClientRect();
    finder.style.setProperty("--look-x", `${((pointerX - box.left) / box.width - .5) * 32}px`);
    finder.style.setProperty("--look-y", `${((pointerY - box.top) / box.height - .5) * 24}px`);
    trackingFrame = 0;
  });
});
showcase.addEventListener("pointerleave", centerFinder);
allowTracking.addEventListener("change", centerFinder);
showcase.addEventListener("focusin", event => {
  if (!showcase.contains(event.relatedTarget) && event.target.matches(":focus-visible")) {
    playing = false;
    syncPlayback();
  }
});
showcase.querySelector(".frame-controls").addEventListener("pointerenter", event => {
  if (event.pointerType === "mouse") { hovering = true; syncPlayback(); }
});
showcase.querySelector(".frame-controls").addEventListener("pointerleave", () => { hovering = false; syncPlayback(); });
motion.addEventListener("change", () => { playing = !motion.matches; syncPlayback(); });
document.addEventListener("visibilitychange", syncPlayback);
new IntersectionObserver(([entry]) => {
  inView = entry.isIntersecting;
  syncPlayback();
}).observe(showcase);
document.querySelector(".frame-controls").hidden = false;
syncPlayback();

const chapters = new IntersectionObserver(entries => {
  for (const {target, isIntersecting} of entries) {
    if (!isIntersecting) continue;
    if (!motion.matches) target.classList.add("chapter-arrives");
    chapters.unobserve(target);
  }
}, {threshold:.12});
document.querySelectorAll(".section-heading, .project-info, .contact-row, .about-copy").forEach(el => chapters.observe(el));

const studioTime = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit" });
let clockTimer;
function updateClock() {
  clearTimeout(clockTimer);
  const now = new Date();
  const clock = document.querySelector("#manila-clock");
  clock.dateTime = now.toISOString();
  clock.textContent = studioTime.format(now);
  if (!document.hidden) clockTimer = setTimeout(updateClock, 60000 - (now.getTime() % 60000));
}
document.addEventListener("visibilitychange", updateClock);
updateClock();

// The rate sheet is the source for both the calculator and the inquiry email.
const serviceSelect = document.querySelector("#estimate-service");
const hoursInput = document.querySelector("#estimate-hours");
const totalOutput = document.querySelector("#estimate-total");
const inquiry = document.querySelector("#rates a[href^='mailto:']");
const baseInquiry = inquiry.href;
document.querySelectorAll(".rate-list > div").forEach(row => {
  const service = row.querySelector("dt").firstChild.textContent.trim();
  const rate = Number(row.querySelector("dd").textContent.match(/\d+/)[0]);
  serviceSelect.add(new Option(service, rate));
});
function estimate() {
  const hours = hoursInput.valueAsNumber;
  if (hoursInput.value === "" && !hoursInput.validity.badInput) {
    totalOutput.value = "—";
    hoursInput.removeAttribute("aria-invalid");
    inquiry.href = baseInquiry;
    return;
  }
  if (!hoursInput.validity.valid || !Number.isFinite(hours)) {
    totalOutput.value = "Enter 1–999 whole hours";
    hoursInput.setAttribute("aria-invalid", "true");
    inquiry.href = baseInquiry;
    return;
  }
  hoursInput.removeAttribute("aria-invalid");
  const amount = Number(serviceSelect.value) * hours;
  totalOutput.value = `$${amount.toLocaleString("en-US")}`;
  const message = `Hi Loryen,\n\nI’m interested in ${serviceSelect.selectedOptions[0].text}. I’m considering ${hours} hours at $${serviceSelect.value}/hr (${totalOutput.value} estimated labor).\n\nMy project: `;
  inquiry.href = `${baseInquiry}&body=${encodeURIComponent(message)}`;
}
serviceSelect.addEventListener("change", estimate);
hoursInput.addEventListener("input", estimate);
estimate();
document.querySelector(".estimate-panel").hidden = false;
