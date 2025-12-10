const BasePage = require('./BasePage');

class LojaPage extends BasePage {
  constructor(page) {
    super(page);
    this.storeTitle = page.locator('text=Serverest Store, h1, h2').first();
    this.searchInput = page.locator('input[placeholder*="Pesquisar"], input[aria-label*="Pesquisar"], input[name="search"]');
    this.productCard = page.locator('.product, .card, .product-card, article').first();
    this.productByName = (name) => page.locator(`text=${name}`);
    this.detailsBtn = page.locator('button:has-text("Detalhes"), a:has-text("Detalhes")');
  }

  async openStore() {
    await this.goto('/');
  }

  async searchProduct(name) {
    if (await this.searchInput.count() > 0) {
      await this.searchInput.fill(name);
      await this.searchInput.press('Enter').catch(()=>{});
    }
  }

  async seeProductDetails(name) {
    await this.searchProduct(name);
    await this.productByName(name).first().waitFor({ state: 'visible', timeout: 7000 });
    await this.productByName(name).first().click();
  }
}

module.exports = LojaPage;
