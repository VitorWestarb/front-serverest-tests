const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    this.url = '/login';

    this.titleLoginText = page.getByRole('heading', { name: 'Login' });

    this.email = page.getByTestId('email');
    
    this.password = page.getByTestId('senha');

    this.loginBtn = page.getByTestId('entrar');

    this.registerLink = page.getByTestId('cadastrar');

    this.loginError = page.locator('text=Email e/ou senha inválidos');
  }

  async open() {
    await this.goto(this.url);
  }

  async fillCredentials({ email, password }) {
    await this.email.fill(email);
    await this.password.fill(password);
  }

  async submit() {
    await this.loginBtn.click();
  }

  async login({ email, password }) {
    await this.open();
    await this.fillCredentials({ email, password });
    await this.submit();
  }
}

module.exports = LoginPage;
