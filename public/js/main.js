// main.js — ONLY contact form logic

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector("textarea").value.trim();

    if (!name || !email || !message) {
      alert("❌ Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Message sent successfully!");
        form.reset();
      } else {
        alert("❌ Failed to send message");
      }
    } catch (err) {
      alert("❌ Server error. Try again later.");
    }
  });
});

