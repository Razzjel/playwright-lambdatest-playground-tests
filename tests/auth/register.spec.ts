import { test, expect } from "../../src/fixtures";
import { RegisterPage } from "../../src/pages/auth/RegisterPage";

test.describe("Registration", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://ecommerce-playground.lambdatest.io/");
    await page.getByRole("button", { name: "My Account" }).hover();
    await page.getByText("Register").click();
    await expect(page.getByText("Register Account")).toBeVisible();
  });

  test("Registration passes when correct data is provided", async ({ page, userData }) => {
    const registerPage = new RegisterPage(page);
    console.log(`Testuję usera: ${userData.email}`);

    await registerPage.goto();
    await registerPage.register(userData);

    await expect(
      page.getByText("Your Account Has Been Created!"),
    ).toBeVisible();
  });

  test("Registration fails when invalid email is provided", async ({
    page,
    userData,
  }) => {
    const invalidUser = {
      ...userData,
      privacyPolicy: false,
    };

    const registerPage = new RegisterPage(page);
    console.log(`Testuję usera: ${userData.email}`);

    await registerPage.goto();
    await registerPage.register(invalidUser);

    await expect(
      page.getByText("Warning: You must agree to the Privacy Policy!"),
    ).toBeVisible();
  });
});
