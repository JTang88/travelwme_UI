const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, '../public')), bodyParser());

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

const port = 3111;

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
