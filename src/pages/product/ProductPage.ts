import { type Page, type Locator, expect } from '@playwright/test';

export class ProductPage {
  private readonly page: Page;

  private readonly productHeader: Locator;
  private readonly addToCartButton: Locator;
  private readonly successAlert: Locator;
  private readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productHeader = page.locator('#content h1').first();
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
    this.successAlert = page.getByRole('alert');
    this.cartButton = page.locator('#cart-total-drawer, .btn-inverse');
  }

  async goto(productUrl: string) {
    await this.page.goto(productUrl);
  }

  async expectLoaded() {
    await expect(this.productHeader).toBeVisible();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async expectSuccessMessage() {
    await expect(this.successAlert).toBeVisible();
    await expect(this.successAlert).toContainText('Success: You have added');
  }

  async expectCartUpdated() {
    await expect(this.cartButton).not.toContainText('0 item(s)');
  }

  async expectProductName(name: string) {
    const header = this.page.getByRole('heading', { name: name });
    await expect(header).toBeVisible();
  }
}
