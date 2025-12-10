class HomeAdminPage {
  constructor(page) {
    this.page = page;

    this.welcomeText = page.getByRole('heading', { name: /Bem\s?Vindo/i });

    this.cadastrarUsuariosBtn = page.getByTestId('cadastrar-usuarios');
    this.listarUsuariosBtn = page.getByTestId('listar-usuarios');

    this.cadastrarProdutosBtn = page.getByTestId('cadastrar-produtos');
    this.listarProdutosBtn = page.getByTestId('listar-produtos');

    this.relatoriosBtn = page.getByTestId('link-relatorios');
  }
}

module.exports = HomeAdminPage;
