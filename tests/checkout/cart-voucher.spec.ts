import { test, expect } from '../../src/fixtures';
import { CartPage } from '../../src/pages/checkout/CartPage';

test.describe('Checkout - Vouchers', () => {
  test('System rejects invalid coupon code', async ({ page }) => {
    await page.goto('/index.php?route=product/product&product_id=57');
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    await expect(page.getByRole('alert')).toBeVisible();

    const cartPage = new CartPage(page);
    await cartPage.goto();

    const invalidCode = 'Invalid-coupon-code-1';
    await cartPage.applyCoupon(invalidCode);

    await cartPage.expectCouponError();
  });
});
