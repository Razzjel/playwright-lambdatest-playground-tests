import { test } from '../../src/fixtures';
import { ProductPage } from '../../src/pages/product/ProductPage';

test.describe('Shopping Cart - Add Items', () => {
  test('User can add product to shopping cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    const productUrl = '/index.php?route=product/product&product_id=57';

    await productPage.goto(productUrl);
    await productPage.addToCart();
    await productPage.expectSuccessMessage();
    await productPage.expectCartUpdated();
  });
});
