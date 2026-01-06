import { test, expect, Locator } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await page.waitForLoadState("load");

  // Click the get started link.
  const getStartedButton = page.locator("a[class^=getStarted_]");
  await getStartedButton.click();

  const InstallationHeader: Locator = page.locator("header h1");
  await expect(InstallationHeader).toBeVisible();
  await expect(InstallationHeader).toHaveText("Installation");
});
