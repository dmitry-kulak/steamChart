import express from 'express';
import fs from 'fs';

const itemsData = JSON.parse(fs.readFileSync('./data/itemsData.json', 'utf-8'));
const itemsList = JSON.parse(fs.readFileSync('./data/itemsList.json', 'utf-8'));

const app = express();
app.use(express.json());

app.get('/api/items', (req, res) => {
  return res.send(itemsList);
});

app.get('/api/chart/:id', (req, res) => {
  return res.send(itemsData.find((item) => item.id === Number(req.params.id)));
});

app.listen(process.env.PORT || 3001);
