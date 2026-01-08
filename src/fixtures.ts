import { test as base, expect } from "@playwright/test";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { generateUser, type UserData } from "./utils/data-generator";

type MyFixtures = {
  userData: UserData;
  registeredUser: UserData;
};

export const test = base.extend<MyFixtures>({
  userData: async ({}, use) => {
    await use(generateUser());
  },

  registeredUser: async ({ page }, use) => {
    const user = generateUser();

    const loginPage = new RegisterPage(page);
    await loginPage.goto();
    await loginPage.register(user);
    await use(user);
  },
});

export { expect };
