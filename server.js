const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 4000;
const DB_FILE = './inventory.json';

app.use(cors());
app.use(express.json());

const loadInventory = () => {
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]');
  return JSON.parse(fs.readFileSync(DB_FILE));
};

const saveInventory = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

app.get('/api/inventory', (req, res) => {
  res.json(loadInventory());
});

app.post('/api/inventory', (req, res) => {
  const newItem = req.body;
  const data = loadInventory();
  data.push(newItem);
  saveInventory(data);
  res.status(201).json({ message: 'Saved', item: newItem });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
