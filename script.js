const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");

if (navToggle && mobileNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = !mobileNav.hasAttribute("hidden");
    if (isOpen) {
      mobileNav.setAttribute("hidden", "");
      navToggle.setAttribute("aria-expanded", "false");
    } else {
      mobileNav.removeAttribute("hidden");
      navToggle.setAttribute("aria-expanded", "true");
    }
  });

  // Close mobile nav after clicking a link
  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileNav.setAttribute("hidden", "");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

if (form && statusEl) {
  form.addEventListener("submit", async (e) => {
    // Let the browser do basic required-field validation first
    if (!form.checkValidity()) return;

    e.preventDefault();
    statusEl.textContent = "Sending…";

    try {
      const formData = new FormData(form);
      const res = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        form.reset();
        statusEl.textContent = "Thanks — message received. We’ll get back to you.";
      } else {
        statusEl.textContent = "Something went wrong sending that. Please try again in a minute.";
      }
    } catch {
      statusEl.textContent = "Network issue — please try again in a minute.";
    }
  });
}
