const express = require('express');
const http = require("http");
let bodyParser = require('body-parser');
const path = require('path');
let app = express();
const server = http.createServer(app);

app.use(express.static(__dirname + '/../public'), bodyParser());

const port = 3111;

server.listen(port, function() {
  console.log(`listening on port ${port}`);
});