const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');
const path = require('path');

class ProductPage extends BasePage {

  constructor(page) {
    super(page);
    this.page = page;

    this.menuSuperiorCadastrar = page.getByTestId('cadastrar-produtos');
    this.titleCadastro = page.getByRole('heading', { name: 'Cadastro de Produtos' });

    this.nome = page.getByTestId('nome');
    this.preco = page.getByTestId('preco');
    this.descricao = page.getByTestId('descricao');
    this.quantidade = page.getByTestId('quantity');
    this.imagem = page.getByTestId('imagem');

    this.cadastrarBtn = page.getByTestId('cadastarProdutos');
  }

  async acessarPelaHome() {
    await this.menuSuperiorCadastrar.click();
    await expect(this.titleCadastro).toBeVisible();
  }

  async preencherFormulario({ nome, preco, descricao, quantidade }) {
    await this.nome.fill(nome);
    await this.preco.fill(preco);
    await this.descricao.fill(descricao);
    await this.quantidade.fill(quantidade);

    const filePath = path.resolve(process.cwd(), 'tests/uploads/playwright-logo.png');
    await this.imagem.setInputFiles(filePath);
  }

  async salvar() {
    await this.cadastrarBtn.click();
  }
}

module.exports = ProductPage;
