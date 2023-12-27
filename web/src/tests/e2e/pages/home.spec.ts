import { test, expect } from "@playwright/test";
import { PAGES } from "config";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGES.HOME);
  });

  test("should redirect to Home page when logo is clicked", async ({
    page,
  }) => {
    await page.goto(PAGES.LEADERBOARD);
    const logo = page.getByAltText("Fastned-logo");

    await logo.click();

    await expect(page).toHaveURL(PAGES.HOME);
  });

  test("should enable the button when an EV is selected", async ({ page }) => {
    const EVs = await page.getByTestId("ev").all();
    const buttonToStart = await page.getByRole("button", {
      name: "Start your session",
    });

    expect(EVs).toHaveLength(3);
    await expect(buttonToStart).toBeDisabled();

    await EVs[0].click();

    await expect(buttonToStart).not.toBeDisabled();
  });

  test("should navigate to the game page when the button is clicked", async ({
    page,
  }) => {
    const EVs = await page.getByTestId("ev").all();
    const buttonToStart = await page.getByRole("button", {
      name: "Start your session",
    });

    await EVs[0].click();
    await buttonToStart.click();

    await expect(page).toHaveURL(PAGES.GAME + "/easy");
  });
});
