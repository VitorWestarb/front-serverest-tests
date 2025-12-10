const { test, expect } = require('@playwright/test');
const fs = require('fs');

const LoginPage = require('../pages/LoginPage');
const HomeAdminPage = require('../pages/HomeAdminPage');
const ProductPage = require('../pages/CadastroProdutoPage');
const CadastroUsuarioPage = require('../pages/CadastroUsuarioPage');
const LojaPage = require('../pages/LojaPage');


const adminUser = JSON.parse(
  fs.readFileSync('./tests/data/adminUser.json', 'utf-8')
);

test.describe('Cenário 4 - Cadastro de Produto ADMIN', () => {

  test('Deve cadastrar um produto com sucesso', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const home = new HomeAdminPage(page);
    const productPage = new ProductPage(page);

    // Login
    await loginPage.open();
    await loginPage.email.fill(adminUser.email);
    await loginPage.password.fill(adminUser.password);
    await loginPage.loginBtn.click();

    await expect(page).toHaveURL(/admin\/home/);
    await expect(home.welcomeText).toBeVisible();

    // Acessar cadastro de produtos
    await productPage.acessarPelaHome();

    // Validar textos obrigatórios
    await expect(page.getByText('Nome: *')).toBeVisible();
    await expect(page.getByText('Preço: *')).toBeVisible();
    await expect(page.getByText('Descrição: *')).toBeVisible();
    await expect(page.getByText('Quantidade: *')).toBeVisible();
    await expect(page.getByText('Imagem: *')).toBeVisible();

    // 🔹 DEFINIÇÃO DO PRODUTO (o que estava faltando)
    const produto = {
      nome: `Produto Teste ${Date.now()}`,
      preco: '50',
      descricao: 'Produto automatizado',
      quantidade: '10',
      imagem: '' // não usamos pq agora é upload real
    };

    // Preencher e salvar
    await productPage.preencherFormulario(produto);
    await productPage.salvar();

    // Validar lista de produtos
    await expect(page).toHaveURL(/listarprodutos/);
    await expect(page.getByRole('heading', { name: 'Lista dos Produtos' })).toBeVisible();

    fs.writeFileSync('./tests/temp/produtoCriado.json', JSON.stringify({ nome: produto.nome }));


    console.log("✔ Produto cadastrado com sucesso!");
  });

});


test('Usuário comum visualiza produto criado no cenário 4', async ({ page }) => {
  const generate = require('../helpers/generate'); 
  const fs = require('fs');

  await page.goto('https://front.serverest.dev/login');

  await page.getByTestId('cadastrar').click();

  const novoUsuario = {
    nome: generate.randomName(),
    email: generate.randomEmail(),
    senha: generate.randomPassword()
  };

  await page.getByTestId('nome').fill(novoUsuario.nome);
  await page.getByTestId('email').fill(novoUsuario.email);
  await page.getByTestId('password').fill(novoUsuario.senha);

  await page.getByTestId('cadastrar').click();

  await expect(page.getByRole('heading', { name: 'Serverest Store' })).toBeVisible();

  await page.getByRole('heading', { name: 'Produtos' }).click();

  const { nome: produtoCriado } = JSON.parse(
    fs.readFileSync('./tests/temp/produtoCriado.json', 'utf-8')
  );

  await page.getByTestId('pesquisar').fill(produtoCriado);
  await page.getByTestId('botaoPesquisar').click();

  await expect(page.getByText(produtoCriado)).toBeVisible({ timeout: 7000 });

  console.log(`✔ Produto "${produtoCriado}" visível para usuário comum`);
});

