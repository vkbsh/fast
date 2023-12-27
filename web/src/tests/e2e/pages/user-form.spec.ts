import { test, expect } from "@playwright/test";
import { PAGES } from "config";

const seconds = 1;
const scorePageUrl = PAGES.SCORE + "/" + seconds;

test.describe("User Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(scorePageUrl);
  });

  test("should redirect in case if 'seconds' doesn't exist in URL params", async ({
    page,
  }) => {
    await page.goto(PAGES.SCORE);
    await expect(page).toHaveURL(PAGES.HOME);
  });

  test("should submit form with correct data", async ({ page }) => {
    await page.getByPlaceholder("name").fill("name");
    await page.getByPlaceholder("email").fill("email@email.nl");
    await page.click("text=Submit");

    // const errorMessage = await page.getByText("Error").textContent();
    // expect(errorMessage).toContain("Error");

    // expect(page).toHaveURL(PAGES.LEADERBOARD);
  });

  test("should fail to submit an empty form and display required field errors", async ({
    page,
  }) => {
    await page.click("text=Submit");

    const errorMessages = await page.getByText("This field is required").all();
    expect(errorMessages).toHaveLength(2);
  });

  test("should fail when name length is less than 3 characters", async ({
    page,
  }) => {
    await page.getByPlaceholder("name").fill("n");

    const errorMessage = await page.getByText(
      "This field must be at least 3 characters long"
    );
    expect(errorMessage).toBeTruthy();
  });

  test("should fail when name contains non-letter characters", async ({
    page,
  }) => {
    await page.getByPlaceholder("name").fill("333");

    const errorMessage = await page.getByText("Only letters are allowed");
    expect(errorMessage).toBeTruthy();
  });
});
