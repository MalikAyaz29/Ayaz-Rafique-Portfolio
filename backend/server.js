require("dotenv").config();

const express = require("express");
const path = require("path");
const { exec } = require("child_process");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ---------- Pages ----------
app.use(express.static(path.join(__dirname, "..", "public")));

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


// ---------- Email Setup (UNCHANGED) ----------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ---------- Contact API (UNCHANGED) ----------
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.json({ success: false });
  }

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

// ---------- TOOLS APIs (FIXED) ----------

const cppPath = path.join(__dirname, "Cpp");

// Calculator
app.get("/api/calculate", (req, res) => {
  const { n1, n2, op } = req.query;
  const exe = path.join(cppPath, "Calculator.exe");

  exec(`"${exe}" ${n1} ${n2} ${op}`, (err, stdout) => {
    if (err) return res.send("Error");
    res.send(stdout.trim());
  });
});

// Sort
app.get("/api/sort", (req, res) => {
  const exe = path.join(cppPath, "Sort.exe");

  exec(`"${exe}" "${req.query.nums}"`, (err, stdout) => {
    if (err) return res.send("Error");
    res.send(stdout.trim());
  });
});

// Search
app.get("/api/search", (req, res) => {
  const exe = path.join(cppPath, "Search.exe");

  exec(
    `"${exe}" "${req.query.data}" "${req.query.target}"`,
    (err, stdout) => {
      if (err) return res.send("Error");
      res.send(stdout.trim());
    }
  );
});

// ---------- Server ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

