import { test, expect } from "@playwright/test";

import { PAGES } from "config";

test("Clicking on logo should redirect to Home page", async ({ page }) => {
  await page.goto(PAGES.LEADERBOARD);

  await page.getByAltText("Fastned-logo").click();
  await expect(page).toHaveURL(PAGES.HOME);
});

test("select type of EV and press the button", async ({ page }) => {
  await page.goto(PAGES.HOME);

  const disabledClass = /disabled/;

  const EVs = await page.getByTestId("ev").all();
  const buttonToStart = await page.getByRole("link", {
    name: "Start your session",
  });

  expect(EVs).toHaveLength(3);

  await expect(buttonToStart).toHaveClass(disabledClass);

  await EVs[0].click();

  await expect(buttonToStart).not.toHaveClass(disabledClass);

  await buttonToStart.click();

  await expect(page).toHaveURL(PAGES.GAME + "/easy");
});
