import { test } from "../../src/fixtures";
import { LoginPage } from "../../src/pages/auth/LoginPage";

test("Create user, check session persistance, logout and login again", async ({
  page,
  registeredUser,
}) => {
  const loginPage = new LoginPage(page);

  await page.getByRole("link", { name: "Continue" }).click();

  await page.reload();
  await loginPage.expectLoaded();

  await loginPage.logout();

  await loginPage.expectLoggedOut();

  await loginPage.goto();
  await loginPage.login(registeredUser.email, registeredUser.password);

  await loginPage.expectLoaded();
});
