import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import "dotenv/config";

const { APP_URL } = process.env;
if (!APP_URL) throw new Error("APP_URL is not defined");

const username = faker.internet.username();
const password = faker.internet.password();

test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState("networkidle");
});

test("Login button disabled when one field is empty", async ({ page }) => {
    const login = page.getByTestId("username-input");
    const submit = page.getByTestId("signIn-button");

    await expect(submit).toBeEnabled();
    await login.fill(username);
    await expect(submit).toBeDisabled();
});

test("Auth error modal appears for invalid credentials", async ({ page }) => {
    await page.getByTestId("username-input").fill(username);
    await page.getByTestId("password-input").fill(password);
    await page.getByTestId("signIn-button").click();

    await expect(
        page.getByTestId("authorizationError-popup")
    ).toBeVisible();
});
