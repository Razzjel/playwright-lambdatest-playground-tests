import { test, expect } from "@playwright/test";

test("Register user", async ({ page }) => {
  await page.goto("https://ecommerce-playground.lambdatest.io/");
  await page.getByRole("button", { name: "My account" }).hover();
  await page.getByText("Register").click();

  await expect(page.getByText("Register Account")).toBeVisible();
});
