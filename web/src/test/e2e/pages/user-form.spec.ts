import { test, expect } from "@playwright/test";

import { PAGES } from "config";

const seconds = 1;
const scorePageUrl = PAGES.SCORE + "/" + seconds;

test("fill correct form and submit", async ({ page }) => {
  await page.goto(scorePageUrl);

  await page.getByPlaceholder("name").fill("name");
  await page.getByPlaceholder("email").fill("email@email.nl");
  await page.click("text=Submit");

  // error state
  // const errorMessage = await page.getByText("Error").textContent();
  // await expect().toContainText("Error");

  // expect(page).toHaveURL(PAGES.LEADERBOARD);
});

test("fail submit empty form / check all req fields", async ({ page }) => {
  await page.goto(scorePageUrl);
  await page.click("text=Submit");

  const errorMessage = await page.getByText("This field is required").all();

  expect(errorMessage).toHaveLength(2);
});

test("fail min length", async ({ page }) => {
  await page.goto(scorePageUrl);

  await page.getByPlaceholder("name").fill("n");

  const errorMessage = await page.getByText(
    "This field must be at least 3 characters long"
  );
  expect(errorMessage).toBeTruthy();
});

test("fail only letters", async ({ page }) => {
  await page.goto(scorePageUrl);

  await page.getByPlaceholder("name").fill("333");

  const errorMessage = await page.getByText("Only letters are allowed");

  expect(errorMessage).toBeTruthy();
});

test("fail only email", async ({ page }) => {
  await page.goto(scorePageUrl);

  await page.getByPlaceholder("email").fill("email");

  const errorMessage = await page.getByText("Please enter a valid email");

  expect(errorMessage).toBeTruthy();
});
