import { type Page, type Locator, expect } from '@playwright/test';

export class SearchResultsPage {
  private readonly page: Page;

  private readonly searchInput: Locator;
  private readonly searchButton: Locator;

  private readonly productGrid: Locator;
  private readonly noResultsMessage: Locator;

  private readonly minPriceInput: Locator;
  private readonly maxPriceInput: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.searchButton = page.getByRole('button', { name: 'SEARCH' });
    this.productGrid = page.locator('.product-layout, .product-thumb');
    this.noResultsMessage = page.getByText('There is no product that matches the search criteria');
    this.minPriceInput = page.getByRole('spinbutton', { name: 'Minimum Price' }).last();
    this.maxPriceInput = page.getByRole('spinbutton', { name: 'Maximum Price' }).last();
  }

  async searchFor(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async expectResultsFound() {
    await expect(this.productGrid.first()).toBeVisible();

    const count = await this.productGrid.count();
    expect(count).toBeGreaterThan(0);
  }

  async expectNoResults() {
    await expect(this.productGrid).toBeHidden();
    await expect(this.noResultsMessage).toContainText(
      'There is no product that matches the search criteria'
    );
  }

  async filterByPriceRange(minPrice: string, maxPrice: string) {
    await this.page.waitForTimeout(3000);
    await this.minPriceInput.clear();
    await this.minPriceInput.fill(minPrice);
    await this.maxPriceInput.clear();
    await this.maxPriceInput.fill(maxPrice);
    await this.maxPriceInput.press('Enter');
    await this.page.waitForTimeout(3000);
  }
}
