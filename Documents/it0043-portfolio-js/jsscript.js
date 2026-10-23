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
// Applies the selected theme and updates the button for assistive technology.
  function applyTheme(isDark) {
    document.documentElement.classList.toggle("dark-mode", isDark);
    button.setAttribute("aria-pressed", String(isDark));
  }

  applyTheme(startsDark);

  // Changes the theme when the visitor activates the theme button.
  function toggleTheme() {
    const isDark = !document.documentElement.classList.contains("dark-mode");
    applyTheme(isDark);

    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // Theme switching still works for this page view.
    }
  }

  button.addEventListener("click", toggleTheme);
}
// Builds one project card from an object in the projects array.
function createProjectCard(project) {
  const card = document.createElement("article");
  const title = document.createElement("h3");
  const description = document.createElement("p");
  const link = document.createElement("a");

  title.textContent = project.title;
  description.textContent = project.description;
  link.textContent = "View project";
  link.href = project.link;

  card.append(title, description, link);
  return card;
}

// Renders project cards from data so the content is maintained in one array.
function renderProjects() {
  const container = document.querySelector("#project-list");
  if (!container) return;

  if (projects.length === 0) {
    container.textContent = "Projects will be added soon.";
    return;
  }

  const cards = projects.map(createProjectCard);
  container.replaceChildren(...cards);
}
// Checks every field on submission and explains each problem beside its field.
function setupContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const nameField = form.querySelector("#name");
  const emailField = form.querySelector("#email");
  const messageField = form.querySelector("#message");
  const status = form.querySelector("#form-status");

  if (!nameField || !emailField || !messageField || !status) return;

  // Displays or clears the message associated with one field.
  function setFieldError(field, message) {
    const error = document.querySelector(`#${field.id}-error`);
    error.textContent = message;
    field.setAttribute("aria-invalid", String(Boolean(message)));
  }

  // Validates the fields and updates the page without a generic alert.
  function handleSubmit(event) {
    event.preventDefault();
    status.textContent = "";

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const message = messageField.value.trim();

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    setFieldError(nameField, name ? "" : "Please enter your name.");
    setFieldError(
      emailField,
      validEmail ? "" : "Please enter a valid email address."
    );
    setFieldError(
      messageField,
      message ? "" : "Please enter a message."
    );

    const hasErrors = [name, validEmail, message].some(
      (value) => !value
    );

    if (hasErrors) {
      status.textContent = "Please correct the highlighted fields.";
      return;
    }

    status.textContent = "The form passed validation.";
    form.reset();
  }

  form.addEventListener("submit", handleSubmit);
}

setupNavigation();
setupDarkMode();
renderProjects();
setupContactForm();
