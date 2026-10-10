const menu = document.querySelector(".menu");
const links = document.querySelector("#links");
menu.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});
links.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  links.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
}));
document.querySelector("#form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = new FormData(event.currentTarget).get("name");
  document.querySelector("#status").textContent = `Thanks, ${name}. Your message is ready to send — email me directly below.`;
  event.currentTarget.reset();
});
document.querySelector("#year").textContent = new Date().getFullYear();

const footer = document.querySelector("footer");
footer.addEventListener("pointermove", (event) => {
  const bounds = footer.getBoundingClientRect();
  footer.style.setProperty("--footer-x", `${event.clientX - bounds.left}px`);
  footer.style.setProperty("--footer-y", `${event.clientY - bounds.top}px`);
});
footer.addEventListener("pointerenter", () => footer.style.setProperty("--footer-glow", "1"));
footer.addEventListener("pointerleave", () => {
  footer.style.removeProperty("--footer-x");
  footer.style.removeProperty("--footer-y");
  footer.style.removeProperty("--footer-glow");
});

document.querySelectorAll(".filter").forEach((filter) => {
  filter.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");
    const category = filter.dataset.filter;
    document.querySelectorAll(".project-card").forEach((project) => {
      project.classList.toggle("hidden", category !== "all" && project.dataset.category !== category);
    });
  });
});

const navLinks = [...document.querySelectorAll("#links a[href^='#']")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach((section) => sectionObserver.observe(section));

const progress = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${scrollable ? window.scrollY / scrollable : 0})`;
}, { passive: true });

const header = document.querySelector("header");
header.addEventListener("pointermove", (event) => {
  const bounds = header.getBoundingClientRect();
  header.style.setProperty("--glass-x", `${event.clientX - bounds.left}px`);
  header.style.setProperty("--glass-y", `${event.clientY - bounds.top}px`);
});
header.addEventListener("pointerleave", () => {
  header.style.removeProperty("--glass-x");
  header.style.removeProperty("--glass-y");
});

const heroArt = document.querySelector(".art");
heroArt.addEventListener("pointermove", (event) => {
  const bounds = heroArt.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  heroArt.style.setProperty("--parallax-x", `${x * 10}px`);
  heroArt.style.setProperty("--parallax-y", `${y * 8}px`);
  heroArt.style.setProperty("--art-shine-x", `${event.clientX - bounds.left}px`);
  heroArt.style.setProperty("--art-shine-y", `${event.clientY - bounds.top}px`);
});
heroArt.addEventListener("pointerleave", () => {
  heroArt.style.removeProperty("--parallax-x");
  heroArt.style.removeProperty("--parallax-y");
  heroArt.style.removeProperty("--art-shine-x");
  heroArt.style.removeProperty("--art-shine-y");
});

document.querySelectorAll(".cards article").forEach((card) => {
  const activate = () => {
    document.querySelectorAll(".cards article").forEach((item) => {
      item.classList.remove("selected");
      item.setAttribute("aria-pressed", "false");
    });
    card.classList.add("selected");
    card.setAttribute("aria-pressed", "true");
  };
  card.addEventListener("click", activate);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate();
    }
  });
});

document.querySelectorAll(".cards article, .project-card, .timeline > div, .facts > div").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 3;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -3;
    card.style.setProperty("--tilt-x", `${x}deg`);
    card.style.setProperty("--tilt-y", `${y}deg`);
    card.style.setProperty("--shine-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--shine-y", `${event.clientY - bounds.top}px`);
  });
  card.addEventListener("pointerleave", () => {
    card.style.removeProperty("--tilt-x");
    card.style.removeProperty("--tilt-y");
    card.style.removeProperty("--shine-x");
    card.style.removeProperty("--shine-y");
  });
});

document.querySelectorAll(".timeline > div").forEach((entry) => {
  entry.setAttribute("tabindex", "0");
  entry.setAttribute("aria-expanded", "false");
  const activate = () => {
    document.querySelectorAll(".timeline > div").forEach((item) => {
      item.classList.remove("selected");
      item.setAttribute("aria-expanded", "false");
    });
    entry.classList.add("selected");
    entry.setAttribute("aria-expanded", "true");
  };
  entry.addEventListener("click", activate);
  entry.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate();
    }
  });
});

const dialog = document.querySelector("#project-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDetails = document.querySelector("#dialog-details");
document.querySelectorAll(".project-open").forEach((project) => {
  project.addEventListener("click", () => {
    dialogTitle.textContent = project.dataset.title;
    dialogDetails.textContent = project.dataset.details;
    dialog.showModal();
  });
});
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelectorAll(".award").forEach((award) => {
  award.addEventListener("click", () => {
    document.querySelectorAll(".award").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    award.classList.add("active");
    award.setAttribute("aria-pressed", "true");
  });

  award.addEventListener("pointermove", (event) => {
    const bounds = award.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 4;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -4;
    award.style.setProperty("--tilt-x", `${x}deg`);
    award.style.setProperty("--tilt-y", `${y}deg`);
    award.style.setProperty("--shine-x", `${event.clientX - bounds.left}px`);
    award.style.setProperty("--shine-y", `${event.clientY - bounds.top}px`);
  });

  award.addEventListener("pointerleave", () => {
    award.style.removeProperty("--tilt-x");
    award.style.removeProperty("--tilt-y");
    award.style.removeProperty("--shine-x");
    award.style.removeProperty("--shine-y");
  });
});

const revealItems = document.querySelectorAll(".section > .wrap, .achievements > .wrap, .contact > .wrap");
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
  item.classList.add("reveal");
  revealObserver.observe(item);
});
