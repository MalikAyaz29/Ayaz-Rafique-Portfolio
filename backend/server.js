require("dotenv").config();

const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

// ✅ tools folder same directory me hai
const calculate = require("./tools/calculator");
const sortNumbers = require("./tools/sort");
const searchNumber = require("./tools/search");

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// public folder root par hai
app.use(express.static(path.join(__dirname, "..", "public")));

// ---------- Pages ----------
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
);

app.get("/about", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public", "about.html"))
);

app.get("/projects", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public", "projects.html"))
);

app.get("/tools", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public", "tools.html"))
);

app.get("/contact", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public", "contact.html"))
);

// ---------- Email ----------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.json({ success: false });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

// ---------- TOOLS APIs (JS VERSION) ----------

// Calculator
app.get("/api/calculate", (req, res) => {
  const { n1, n2, op } = req.query;
  const result = calculate(n1, n2, op);
  res.send(String(result));
});

// Sort
app.get("/api/sort", (req, res) => {
  res.send(sortNumbers(req.query.nums));
});

// Search
app.get("/api/search", (req, res) => {
  const { data, target } = req.query;
  res.send(searchNumber(data, target));
});

// ---------- Server ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
