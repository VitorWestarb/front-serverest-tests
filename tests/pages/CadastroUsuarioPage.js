const BasePage = require('./BasePage');

class CadastroUsuarioPage extends BasePage {
  constructor(page) {
    super(page);
    this.cadastroTitle = page.getByRole('heading', { name: 'Cadastro' });
    this.name = page.locator('input[name="nome"], input[placeholder*="Nome"], input[aria-label*="nome"]');
    this.email = page.locator('input[name="email"], input[placeholder*="Email"], input[type="email"]');
    this.password = page.locator('input[name="senha"], input[type="password"]');
    this.adminCheckbox = page.getByTestId('checkbox');
    this.cadastrarBtn = page.locator('button:has-text("Cadastrar"), button:has-text("Salvar")');
    this.successMsg = page.getByRole('link', { name: 'Cadastro realizado com sucesso' });
  }

  async openFromLogin() {
    await this.page.locator('text=Cadastre-se, a:has-text("Cadastre-se")').click();
  }

  async createAdmin({ name, email, password }) {
    await this.goto('/login');
    await this.openFromLogin();
    await this.name.fill(name);
    await this.email.fill(email);
    await this.password.fill(password);
    if ((await this.adminCheckbox.count()) > 0) {
      try {
        const checked = await this.adminCheckbox.isChecked();
        if (!checked) await this.adminCheckbox.check();
      } catch {
        await this.adminCheckbox.first().click().catch(()=>{});
      }
    }
    await this.cadastrarBtn.click();
    await this.successMsg.waitFor({ state: 'visible', timeout: 10000 });
  }

  async createUser({ name, email, password }) {
  await this.name.fill(name);
  await this.email.fill(email);
  await this.cadastrarBtn.click();
  await this.successMsg.waitFor({ state: 'visible' });
}
}

module.exports = CadastroUsuarioPage;
