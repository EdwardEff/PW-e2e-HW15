import { test, expect } from "@playwright/test";
import "dotenv/config";

const { APP_URL } = process.env;
if (!APP_URL) throw new Error("APP_URL is not defined");

let faker: any;

test.beforeAll(async () => {
    faker = (await import("@faker-js/faker")).faker;
});

test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState("networkidle");
});

test("Login button disabled when one field is empty", async ({ page }) => {
    const username = faker.internet.username();

    const login = page.getByTestId("username-input");
    const submit = page.getByTestId("signIn-button");

    await expect(submit).toBeEnabled();
    await login.fill(username);
    await expect(submit).toBeDisabled();
});

test("Auth error modal appears for invalid credentials", async ({ page }) => {
    await page.getByTestId("username-input").fill(faker.internet.username());
    await page.getByTestId("password-input").fill(faker.internet.password());
    await page.getByTestId("signIn-button").click();

    await expect(
        page.getByTestId("authorizationError-popup")
    ).toBeVisible();
});
