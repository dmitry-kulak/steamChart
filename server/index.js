const express = require('express')
const fs = require('fs')
const path = require('path')

const itemsData = JSON.parse(fs.readFileSync('./data/itemsData.json', 'utf-8'));
const itemsList = JSON.parse(fs.readFileSync('./data/itemsList.json', 'utf-8'));

const app = express();

const staticFiles = express.static(path.join(__dirname, '../client/build'))

app.use(express.json());
app.use(staticFiles)

app.get('/api/items', (req, res) => {
  return res.send(itemsList);
});

app.get('/api/chart/:id', (req, res) => {
  return res.send(itemsData.find((item) => item.id === Number(req.params.id)));
});

app.use('/*', staticFiles)

app.listen(process.env.PORT || 5000, () => console.log('server is running'));
