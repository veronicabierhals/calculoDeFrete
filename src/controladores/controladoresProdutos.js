const produtos = require("../bancodedados/produtos");
const { getStateFromZipcode } = require("utils-playground");
const { verificarProdutoExistente } = require("../intermediario");

const listarProduto = (req, res) => {
  return res.status(200).json(produtos);
};

const detalharProduto = (req, res) => {
  verificarProdutoExistente(req, res, () => {
    return res.status(200).json(req.produtoExiste);
  });
};

const calcularFrete = async (req, res) => {
  const { cep } = req.params;
  const { produtoExiste } = req;

  try {
    const estado = await getStateFromZipcode(cep);
    let valorFrete;

    if (
      estado === "BA" ||
      estado === "SE" ||
      estado === "AL" ||
      estado === "PB"
    ) {
      valorFrete = produtoExiste.valor * 0.1;
    } else if (estado === "SP" || estado === "RJ") {
      valorFrete = produtoExiste.valor * 0.15;
    } else {
      valorFrete = produtoExiste.valor * 0.12;
    }

    return res.status(200).json({
      mensagem: produtoExiste,
      estado,
      valorFrete,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro ao calcular o frete. Digite um CEP válido." });
  }
};

module.exports = {
  listarProduto,
  detalharProduto,
  calcularFrete,
};
