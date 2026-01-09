import { test } from '../../src/fixtures';
import { LoginPage } from '../../src/pages/auth/LoginPage';

test.describe('Login operations', () => {
  test('User session persists after reload and user can re-authenticate', async ({
    page,
    registeredUser,
  }) => {
    const loginPage = new LoginPage(page);

    await page.getByRole('link', { name: 'Continue' }).click();

    await page.reload();
    await loginPage.expectLoaded();

    await loginPage.logout();

    await loginPage.expectLoggedOut();

    await loginPage.goto();
    await loginPage.login(registeredUser.email, registeredUser.password);

    await loginPage.expectLoaded();
  });
});
