import { type Page, type Locator, expect } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly url = "/index.php?route=account/login";

  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  private readonly logoutButton: Locator;
  private readonly myOrdersSection: Locator;
  private readonly myAccountButton: Locator;
  private readonly accountDropdown: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByLabel("E-Mail Address");
    this.passwordInput = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });

    this.myAccountButton = page.getByRole("button", { name: "My Account" });
    this.accountDropdown = page
      .locator(".dropdown")
      .filter({ hasText: "My Account" });
    this.logoutButton = this.accountDropdown.getByRole("link", {
      name: "Logout",
    });

    this.myOrdersSection = page.getByText("My orders").first();
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  async openMyAccount() {
    await this.myAccountButton.click();
  }

  async logout() {
    await this.myAccountButton.hover();
    await this.logoutButton.click();
  }

  async expectLoaded() {
    await expect(this.myOrdersSection).toBeVisible();
  }

  async expectLoggedOut() {
    await expect(this.myOrdersSection).toBeHidden();
  }
}
