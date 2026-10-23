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
