class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async title() {
    return this.page.title();
  }

  async waitForText(text, opts = {}) {
    const locator = this.page.locator(`text=${text}`);
    await locator.first().waitFor({ state: 'visible', timeout: opts.timeout ?? 10000 });
    return locator;
  }

  async isVisible(selector, opts = {}) {
    return this.page.locator(selector).isVisible({ timeout: opts.timeout ?? 5000 }).catch(() => false);
  }
  
  async validateText(locator, expectedText) {
  const text = await locator.textContent();

  if (!text) {
    console.warn(`⚠️  Texto não encontrado no locator: ${locator}`);
    return;
  }

  if (text.trim() !== expectedText.trim()) {
    console.warn(`🚨 BUG DE TEXTO DETECTADO!
    Esperado : "${expectedText}"
    Encontrado: "${text.trim()}"`);
  }
}
}



module.exports = BasePage;
