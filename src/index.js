const express = require("express");
const app = express();
const roteador = require("./roteadores")

app.use(express.json());

app.use(roteador);

app.listen(3000);