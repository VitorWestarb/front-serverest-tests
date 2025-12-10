const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const LoginPage = require('../pages/LoginPage');
const CadastroUsuarioPage = require('../pages/CadastroUsuarioPage');
const HomeAdminPage = require('../pages/HomeAdminPage');

const generate = require('../helpers/generate');

const dataPath = path.join(__dirname, '../data/adminUser.json');

test.describe('Fluxo de Autenticação - Cadastro e Login ADMIN', () => {

  test('Cenário 1 - Cadastro de Usuário ADMIN', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cadastroPage = new CadastroUsuarioPage(page);

    const nome = generate.randomName();
    const email = generate.randomEmail();
    const senha = generate.randomPassword();

    await loginPage.open();
    await loginPage.registerLink.click();

    await expect(page.getByRole('heading', { name: 'Cadastro' })).toBeVisible();

    await cadastroPage.name.fill(nome);
    await cadastroPage.email.fill(email);
    await cadastroPage.password.fill(senha);
    await cadastroPage.adminCheckbox.check();
    await cadastroPage.cadastrarBtn.click();

    await expect(cadastroPage.successMsg).toBeVisible({ timeout: 3000 });
    await expect(page).toHaveURL(/admin\/home/);

    fs.writeFileSync(dataPath, JSON.stringify({ email, password: senha }, null, 2));
  });

  test('Cenário 2 - Login ADMIN com usuário criado no cenário 1', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const adminHome = new HomeAdminPage(page);

    const user = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    await loginPage.open();

    await loginPage.email.fill(user.email);
    await loginPage.password.fill(user.password);
    await loginPage.loginBtn.click();

    await expect(page).toHaveURL(/admin\/home/);

    await expect(adminHome.welcomeText).toBeVisible();
    await expect(adminHome.cadastrarUsuariosBtn).toBeVisible();
    await expect(adminHome.listarUsuariosBtn).toBeVisible();
    await expect(adminHome.cadastrarProdutosBtn).toBeVisible();
    await expect(adminHome.listarProdutosBtn).toBeVisible();
    await expect(adminHome.relatoriosBtn).toBeVisible();
  });

  test('Cenário 3 - Login ADMIN com senha incorreta (negativo)', async ({ page }) => {
  const loginPage = new LoginPage(page);

  const user = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  await loginPage.open();

  await loginPage.email.fill(user.email);
  await loginPage.password.fill('senha_incorreta_123');
  await loginPage.loginBtn.click();

  await expect(loginPage.loginError).toBeVisible({
    timeout: 3000
  });

  await expect(page).toHaveURL(/login/);
  });

});
