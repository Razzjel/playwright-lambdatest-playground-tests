import { type Page, type Locator, expect } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly url = '/index.php?route=checkout/cart';

  private readonly quantityInput: Locator;
  private readonly updateButton: Locator;
  private readonly removeButton: Locator;
  private readonly successMessage: Locator;
  private readonly emptyContent: Locator;

  private readonly couponAccordionLink: Locator;
  private readonly couponInput: Locator;
  private readonly applyCouponButton: Locator;
  private readonly errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;

    this.quantityInput = page.locator('input[name^="quantity"]').first();
    this.updateButton = page.getByTitle('Update');
    this.removeButton = page.locator('button.btn-danger, [onclick*="remove"]').first();

    this.successMessage = page.getByText('Success: You have modified your shopping cart!');
    this.emptyContent = page.locator('#content').getByText('Your shopping cart is empty!');

    this.couponAccordionLink = page.getByText('Use Coupon Code');
    this.couponInput = page.getByRole('textbox', { name: 'Enter your coupon here' });
    this.applyCouponButton = page.locator('#button-coupon');
    this.errorAlert = page.locator('.alert-danger, .text-danger');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async updateQuantity(newQty: string) {
    await this.quantityInput.fill(newQty);
    await this.updateButton.click();
    await expect(this.successMessage).toBeVisible();
  }

  async removeItem() {
    await this.removeButton.click();
  }

  async applyCoupon(code: string) {
    if (!(await this.couponInput.isVisible())) {
      await this.couponAccordionLink.click();
      await this.couponInput.waitFor({ state: 'visible' });
    }
    await this.couponInput.fill(code);
    await this.applyCouponButton.click();
  }

  async expectEmpty() {
    await expect(this.emptyContent).toBeVisible();
  }

  async expectCouponError() {
    await expect(this.errorAlert).toBeVisible();
  }
}
