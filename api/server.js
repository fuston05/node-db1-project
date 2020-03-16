const express = require("express");
const accountsRouter= require('../accountsRouter');
const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter);

server.get('/', (req, res) => {
  res.status(200).json('Welcome to my humble server!')
})//end server.get

module.exports = server;
