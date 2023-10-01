const produtos = require("./bancodedados/produtos");

function verificarProdutoExistente(req, res, next) {
  const { idProduto } = req.params;

  if (isNaN(idProduto)) {
    return res.status(400).json({
      mensagem: "O valor do parâmetro ID da URL não é um número válido.",
    });
  }

  const produtoExiste = produtos.find((produto) => {
    return produto.id === Number(idProduto);
  });

  if (!produtoExiste) {
    return res.status(404).json({ mensagem: "Não existe produto para o ID informado." });
  }

  req.produtoExiste = produtoExiste;
  next();
}

module.exports = {
  verificarProdutoExistente,
};
