const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const products = [
  { id: 1, name: "Neo", category: "motorcycles", price: 12000000, inStock: true },
  { id: 2, name: "TVS Sport 180", category: "motorcycles", price: 8200000, inStock: true },
  { id: 3, name: "Haojue CG125", category: "motorcycles", price: 9800000, inStock: true },
  { id: 4, name: "TVS King", category: "tricycles", price: 28000000, inStock: true },
  { id: 5, name: "Amortisseur arrière renforcé", category: "parts", price: 145000, inStock: true },
];

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", location: "Kissidougou, Guinée", phone: "+224661615859" });
});

app.get("/api/products", (req, res) => {
  const category = req.query.category;
  res.json(category ? products.filter((product) => product.category === category) : products);
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Nom, e-mail et message sont obligatoires." });
  }
  res.status(201).json({ status: "received", recipient: "Moustapha Kallo" });
});

app.post("/api/orders", (req, res) => {
  const { customer, items } = req.body;
  if (!customer || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Informations client ou panier manquants." });
  }
  res.status(201).json({ orderNumber: `KM-${Date.now()}`, status: "received" });
});

app.get("/:page", (req, res, next) => {
  const page = req.params.page;
  if (!/^[\w-]+\.html$/.test(page)) return next();
  res.sendFile(path.join(__dirname, page), (error) => {
    if (error) next();
  });
});

app.listen(port, () => {
  console.log(`Kissidougou Moto démarré sur http://localhost:${port}`);
});
