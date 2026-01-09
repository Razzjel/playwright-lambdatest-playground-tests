import { type Page, type Locator, expect } from '@playwright/test';

export class CategoryPage {
  private readonly page: Page;

  private readonly shopByCategoryButton: Locator;
  private readonly categoryMenu: Locator;

  private readonly productList: Locator;
  private readonly productThumbnails: Locator;
  private readonly productTitles: Locator;

  constructor(page: Page) {
    this.page = page;

    this.shopByCategoryButton = page.getByText('Shop by Category');
    this.categoryMenu = page.locator('#menu, .navbar-nav, .category-list');

    this.productList = page.locator('.product-layout');

    this.productThumbnails = page.locator('.product-thumb .image a');
    this.productTitles = page.locator('.product-thumb h4 a');
  }

  async openCategoryMenu() {
    await this.shopByCategoryButton.click();
  }

  async selectCategory(categoryName: string) {
    await this.categoryMenu.getByRole('link', { name: categoryName }).first().click();
  }

  async expectProductsVisible() {
    await expect(this.productList.first()).toBeVisible();
  }

  async openProduct(index = 0) {
    await this.expectProductsVisible();
    await this.productThumbnails.nth(index).click();
  }

  async getProductName(index = 0): Promise<string> {
    await this.expectProductsVisible();
    const name = await this.productTitles.nth(index).textContent();
    return name?.trim() ?? '';
  }
}
