const projects = [
  {
    title: "Portfolio Website",
    description: "A responsive website that introduces my work.",
    link: "#"
  },
  {
    title: "Music App logo",
    description: "A concept logo for an app for sharing reviews of albums and songs.",
    link: "#"
  },
  {
    title: "Logo Design",
    description: "A visual identity created for a small business.",
    link: "#"
  }
];

// Sets up the menu so visitors can use it on smaller screens.
function setupNavigation() {
  const button = document.querySelector("#nav-toggle");
  const menu = document.querySelector("#site-nav");

  if (!button || !menu) return;

// Keeps the button state and menu visibility in sync.
  function closeMenu() {
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
  }
// Opens or closes the menu when the button is activated.
  function toggleMenu() {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    menu.hidden = isOpen;
    button.setAttribute("aria-expanded", String(!isOpen));
  }

  button.addEventListener("click", toggleMenu);

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}
// Applies a theme and remembers the visitor's choice when storage is available.
function setupDarkMode() {
  const button = document.querySelector("#theme-toggle");
  if (!button) return;

  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("theme");
  } catch {
    // The page can still work when browser storage is unavailable.
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const startsDark = savedTheme ? savedTheme === "dark" : prefersDark;
