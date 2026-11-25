const motion = matchMedia("(prefers-reduced-motion: reduce)");
const toolReel = document.querySelector(".tool-reel");
const toolSet = toolReel.querySelector(".tool-set");
const repeatSet = toolSet.cloneNode(true);
repeatSet.removeAttribute("aria-label");
repeatSet.setAttribute("aria-hidden", "true");
toolSet.after(repeatSet);
toolReel.classList.add("tool-ready");
// Anchor targets stay below the sticky header even when enlarged text wraps.
const header = document.querySelector(".header");
function measureHeader() {
  const height = header.offsetHeight;
  // In landscape or with enlarged type, let a tall header scroll out of the way.
  const sticky = height <= window.innerHeight / 4;
  header.classList.toggle("is-sticky", sticky);
  document.documentElement.style.setProperty("--masthead-height", `${height}px`);
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
if (typeof dialog.showModal === "function") document.querySelectorAll(".study").forEach(study => {
  const summary = study.querySelector("summary");
  const button = document.createElement("button");
  button.type = "button";
  button.className = "button secondary";
  button.textContent = summary.textContent;
  button.dataset.project = study.dataset.study;
  button.setAttribute("aria-label", summary.getAttribute("aria-label"));
  button.setAttribute("aria-haspopup", "dialog");
  study.before(button);
  study.hidden = true;
  button.addEventListener("click", () => {
    opener = button;
    content.replaceChildren(study.querySelector(".study-body").cloneNode(true));
    // Load the selected study's evidence even below the modal's scrollport.
    content.querySelectorAll("img").forEach(image => { image.loading = "eager"; });
    content.querySelector("h2").id = "dialog-title";
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
  // A queued close event may arrive after another study has already opened.
  if (dialog.open) return;
  document.body.classList.remove("dialog-open");
  content.replaceChildren();
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
const estimateLink = document.querySelector(".contact-intro .button");
estimateLink.href = "#estimate";
estimateLink.querySelector("span").textContent = "Estimate a website project";

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
