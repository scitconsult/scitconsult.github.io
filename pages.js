const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    const subject = encodeURIComponent("New IVNABIN Contact Message");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:joshuakehindechrist@gmail.com?subject=${subject}&body=${body}`;

    const success = document.createElement("p");
    success.className = "form-success";
    success.textContent = "Your email app should open now. Send the message there.";

    const existing = document.querySelector(".form-success");
    if (existing) {
      existing.remove();
    }
    contactForm.insertAdjacentElement("beforebegin", success);
  });
}

const supportsCustomCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (supportsCustomCursor) {
  document.body.classList.add("custom-cursor");

  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  document.body.append(ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  const animateCursor = () => {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateCursor);
  };

  animateCursor();

  const interactiveItems = document.querySelectorAll("a, button, input, textarea");
  interactiveItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      ring.style.width = "54px";
      ring.style.height = "54px";
      ring.classList.add("is-hover");
    });

    item.addEventListener("mouseleave", () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.classList.remove("is-hover");
    });
  });
}
