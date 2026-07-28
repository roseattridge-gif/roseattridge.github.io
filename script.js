const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");

const syncHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 24);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("open");
  document.body.classList.toggle("menu-open", Boolean(isOpen));
  menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
  const label = menuButton.querySelector("span");
  if (label) label.textContent = isOpen ? "Close" : "Menu";
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
    const label = menuButton?.querySelector("span");
    if (label) label.textContent = "Menu";
  });
});

if (year) year.textContent = new Date().getFullYear();
