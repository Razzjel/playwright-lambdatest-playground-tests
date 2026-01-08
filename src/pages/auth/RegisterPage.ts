import { type Page, type Locator, expect } from "@playwright/test";

export interface RegisterUserData {
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
  password: string;
  privacyPolicy: boolean;
}

export class RegisterPage {
  private readonly page: Page;
  private readonly url: string = "/index.php?route=account/register";

  private readonly firstnameInput: Locator;
  private readonly lastnameInput: Locator;
  private readonly telephoneInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly passwordConfirmInput: Locator;
  private readonly submitButton: Locator;
  private readonly privacyPolicyCheckbox: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstnameInput = page.getByRole("textbox", { name: "First Name" });
    this.lastnameInput = page.getByRole("textbox", { name: "Last Name" });
    this.emailInput = page.getByRole("textbox", { name: "E-Mail" });
    this.telephoneInput = page.getByRole("textbox", { name: "Telephone" });
    this.passwordInput = page.locator(
      '#input-password, input[name="password"]',
    );
    this.passwordConfirmInput = page.locator(
      '#input-confirm, input[name="confirm"]',
    );

    this.privacyPolicyCheckbox = page.getByRole("checkbox", { name: "agree" });

    this.submitButton = page.getByRole("button", { name: "Continue" });

    this.errorMessage = page.locator('.error-message, [role="alert"]');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async register(user: RegisterUserData) {
    await this.fillForm(user);
    await this.submit();
  }

  async fillForm(user: RegisterUserData) {
    await this.firstnameInput.fill(user.firstname);
    await this.lastnameInput.fill(user.lastname);
    await this.emailInput.fill(user.email);
    await this.telephoneInput.fill(user.telephone);
    await this.passwordInput.fill(user.password);
    await this.passwordConfirmInput.fill(user.password);
    if (user.privacyPolicy == true) {
      await this.privacyPolicyCheckbox.check({ force: true });
    }
  }

  async submit() {
    await this.submitButton.click();
  }

  async getValidationMessage(): Promise<string | null> {
    if (await this.errorMessage.isVisible()) {
      return await this.errorMessage.textContent();
    }
    return null;
  }
}
