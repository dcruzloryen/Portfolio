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
    role: "I developed the application backend and integrated the map features on a four-person team.",
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
    role: "I was the lead developer on a four-person team.",
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
    summary: "I built this site for people reviewing my software projects and business owners planning a website. Visitors can go straight to the project archive or the hourly rate sheet.",
    features: [
      "Responsive layouts for mobile and desktop screens.",
      "Category filters with announced result counts.",
      "Native project dialogs with keyboard support and focus restoration.",
      "Scroll-triggered fades with immediate access for keyboard navigation and reduced-motion preferences.",
      "USD and PHP hourly estimates that carry the chosen service and hours into an email draft."
    ],
    roleTitle: "Project focus",
    role: "Website presentation, responsive layouts, and clear project storytelling.",
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
    roleTitle: "Project focus",
    role: "VLAN segmentation, IP addressing, and shared-service planning in Cisco Packet Tracer.",
    takeaway: "The topology shows how a physical connection differs from a logical boundary: departments can share switching infrastructure while belonging to separate VLANs.",
    limitations: "An academic design rather than a deployed network. The addressing tables and routing descriptions would need reconciliation before implementation.",
    source: "Casal Campus Network paper, topology diagram on page 7.",
    image: "assets/network.png",
    imageAlt: "Original Casal Campus Network topology diagram."
  }
};

const motion = matchMedia("(prefers-reduced-motion: reduce)");
// Anchor targets stay below the sticky header even when enlarged text wraps.
const header = document.querySelector(".header");
function measureHeader() {
  const height = header.offsetHeight;
  // In landscape or with enlarged type, let a tall header scroll out of the way.
  const sticky = height <= window.innerHeight / 4;
  header.classList.toggle("in-flow", !sticky);
  document.documentElement.style.setProperty("--header-height", `${sticky ? height : 0}px`);
}
measureHeader();
if ("ResizeObserver" in window) new ResizeObserver(measureHeader).observe(header);
window.addEventListener("resize", measureHeader);
const displayAnimations = new Map();
function animateOnce(node, frames, duration) {
  displayAnimations.get(node)?.cancel();
  if (motion.matches || !node.animate) return;
  const animation = node.animate(frames, { duration, easing: "cubic-bezier(.2,.75,.25,1)" });
  displayAnimations.set(node, animation);
  const release = () => { if (displayAnimations.get(node) === animation) displayAnimations.delete(node); };
  animation.onfinish = animation.oncancel = release;
}
function softenChange(node) {
  animateOnce(node, [
    { opacity: .65, transform: "translateY(3px)" },
    { opacity: 1, transform: "translateY(0)" }
  ], 180);
}
motion.addEventListener("change", () => {
  if (motion.matches) displayAnimations.forEach(animation => animation.cancel());
});
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".project");
filters.forEach(button => {
  button.addEventListener("click", () => {
    if (button.getAttribute("aria-pressed") === "true") return;
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

document.querySelector(".filters").hidden = false;
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
  if (typeof dialog.showModal !== "function") return;
  button.disabled = false;
  button.hidden = false;
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
    if (project.role) content.append(element("h3", project.roleTitle || "My contribution"), element("p", project.role, "role"));
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
    if (!dialog.open) dialog.showModal();
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
  if (opener?.isConnected) opener.focus();
});
document.querySelector("#year").textContent = new Date().getFullYear();

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
const phpPerDollar = 64;
let currency = "USD";
function money(usd) {
  return new Intl.NumberFormat("en-US", {style:"currency", currency, currencyDisplay:"narrowSymbol", maximumFractionDigits:0, minimumFractionDigits:0})
    .format(currency === "PHP" ? usd * phpPerDollar : usd);
}
document.querySelectorAll(".rate-list > div").forEach(row => {
  const term = row.querySelector("dt");
  const service = term.firstChild.textContent.trim();
  const rate = Number(row.querySelector("data").value);
  const option = new Option(term.dataset.short || service, rate);
  option.dataset.service = service;
  serviceSelect.add(option);
});
function showTotal(value) {
  if (totalOutput.value === value) return;
  totalOutput.value = value;
  softenChange(totalOutput);
}
function estimate() {
  const hours = hoursInput.valueAsNumber;
  if (hoursInput.value === "" && !hoursInput.validity.badInput) {
    showTotal("—");
    hoursInput.removeAttribute("aria-invalid");
    inquiry.href = baseInquiry;
    return;
  }
  if (!hoursInput.validity.valid || !Number.isFinite(hours)) {
    showTotal("Enter 1–999 whole hours");
    hoursInput.setAttribute("aria-invalid", "true");
    inquiry.href = baseInquiry;
    return;
  }
  hoursInput.removeAttribute("aria-invalid");
  const amount = Number(serviceSelect.value) * hours;
  showTotal(money(amount));
  const message = `Hi Loryen,\n\nI’m interested in ${serviceSelect.selectedOptions[0].dataset.service}. I’m considering ${hours} hours at the starting rate of ${money(Number(serviceSelect.value))}/hr (${totalOutput.value} estimated labor, ${currency}).\n\nMy project: `;
  inquiry.href = `${baseInquiry}&body=${encodeURIComponent(message)}`;
}
serviceSelect.addEventListener("change", estimate);
hoursInput.addEventListener("input", estimate);
const currencySwitch = document.querySelector(".currency-switch");
currencySwitch.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
  if (button.dataset.currency === currency) return;
  currency = button.dataset.currency;
  currencySwitch.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b === button)));
  document.querySelectorAll(".rate-list data").forEach(rate => {
    rate.textContent = `${money(Number(rate.value))}/hr`;
    softenChange(rate);
  });
  estimate();
}));
currencySwitch.hidden = false;
estimate();
document.querySelector(".estimate-panel").hidden = false;
document.querySelector(".contact-intro .button").href = "#estimate";

// Only prepare below-the-fold content. Restored positions and deep links are
// readable on arrival, and the browser retains control of wheel/touch scrolling.
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    for (const {target, isIntersecting} of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      delete target.dataset.entry;
      if (!target.matches(":focus-within, :target")) animateOnce(target, [
        { opacity: 0, translate: "0 18px" }, { opacity: 1, translate: "0 0" }
      ], 600);
    }
  });
  const blocks = document.querySelectorAll(".section-heading, .filters, .project, .about-layout > div, .skills-grid > div, .currency-switch, .rate-list > div, .rate-terms, .estimate-panel, #rates > .button, .contact-intro, .contact-card");
  const upcoming = Array.from(blocks).filter(node => node.getBoundingClientRect().top >= innerHeight);
  upcoming.forEach(node => {
    node.dataset.entry = "pending";
    observer.observe(node);
  });
}

// Update only the hovered card, at most once per painted frame.
const trackLight = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
document.querySelectorAll(".project, .skills-grid > div").forEach(card => {
  let frame = 0, x, y;
  card.addEventListener("pointermove", event => {
    if (!trackLight.matches || event.pointerType === "touch") return;
    x = event.clientX;
    y = event.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--light-x", `${x - bounds.left}px`);
      card.style.setProperty("--light-y", `${y - bounds.top}px`);
    });
  });
  card.addEventListener("pointerleave", () => {
    cancelAnimationFrame(frame);
    frame = 0;
  });
});
