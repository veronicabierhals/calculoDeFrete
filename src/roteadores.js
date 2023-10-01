const express = require("express");

const { listarProduto, detalharProduto, calcularFrete } = require("./controladores/controladoresProdutos");
const { verificarProdutoExistente } = require("./intermediario");

const roteador = express();


roteador.get("/produtos", listarProduto);

roteador.get("/produtos/:idProduto", detalharProduto);

roteador.get("/produtos/:idProduto/frete/:cep", verificarProdutoExistente, calcularFrete);

module.exports = roteador;