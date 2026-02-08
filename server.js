const express = require("express");
const app = express();

app.use(express.json());

app.post("/collect", (req, res) => {
  console.log("Cookies reçus :", req.body.cookies);
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
