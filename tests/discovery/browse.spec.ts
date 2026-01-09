import { test, expect } from '../../src/fixtures';
import { CategoryPage } from '../../src/pages/product/CategoryPage';
import { ProductPage } from '../../src/pages/product/ProductPage';

test.describe('Category Browsing', () => {
  test('User can browse categories and verify product details match', async ({ page }) => {
    const categoryPage = new CategoryPage(page);
    const productPage = new ProductPage(page);

    await page.goto('/');

    await categoryPage.openCategoryMenu();
    await categoryPage.selectCategory('MP3 Players');
    await categoryPage.expectProductsVisible();

    const listProductName = await categoryPage.getProductName(0);

    expect(listProductName).toBeTruthy();

    await categoryPage.openProduct(0);

    await productPage.expectProductName(listProductName);
  });
});
