// VIDEO LIGHTBOX FUNCTIONALITY
const videoThumbs = document.querySelectorAll(".video-thumb");
const lightbox = document.createElement("div");
const lightboxVideo = document.createElement("video");
const closeBtn = document.createElement("button");

lightbox.style.cssText = `
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center;
  visibility: hidden; opacity: 0; transition: opacity 0.3s;
  z-index: 10000;
`;
lightboxVideo.controls = true;
lightboxVideo.style.maxWidth = "90vw";
lightboxVideo.style.maxHeight = "80vh";
closeBtn.innerText = "×";
closeBtn.style.cssText = `
  position: absolute; top: 30px; right: 30px; font-size: 2.5rem;
  color: white; background: none; border: none; cursor: pointer;
`;
lightbox.appendChild(lightboxVideo);
lightbox.appendChild(closeBtn);
document.body.appendChild(lightbox);

videoThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const videoSrc = thumb.getAttribute("data-video");
    lightboxVideo.src = videoSrc;
    lightbox.style.visibility = "visible";
    lightbox.style.opacity = "1";
    lightboxVideo.play();
  });
});

function closeLightbox() {
  lightboxVideo.pause();
  lightbox.style.opacity = "0";
  setTimeout(() => {
    lightbox.style.visibility = "hidden";
    lightboxVideo.src = "";
  }, 300);
}

closeBtn.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.style.visibility === "visible") {
    closeLightbox();
  }
});

// SMOOTH SCROLLING FOR NAVIGATION LINKS
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// BASIC CONTACT FORM VALIDATION
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const message = form.querySelector("textarea").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    alert("Thank you! Your message has been received.");
    form.reset();
  });
}

// DYNAMIC YEAR IN FOOTER
window.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Select all internal anchor links starting with #
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // Only trigger if the href links to an element available on the page
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
