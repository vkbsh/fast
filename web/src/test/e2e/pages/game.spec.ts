import { test, expect } from "@playwright/test";

import { PAGES } from "config";

test("has timer", async ({ page }) => {
  await page.goto(PAGES.GAME + "/easy");

  const timer = await page.getByTestId("timer");
  expect(timer).toBeTruthy();
});

const easyLevelUrl = PAGES.GAME + "/easy";
const hardLevelUrl = PAGES.GAME + "/hard";
const nightmareLevelUrl = PAGES.GAME + "/nightmare";

test("grid length based on level type", async ({ page }) => {
  const pages = [
    { url: easyLevelUrl, numberOfCols: 3 * 3 },
    { url: hardLevelUrl, numberOfCols: 4 * 4 },
    { url: nightmareLevelUrl, numberOfCols: 5 * 5 },
  ];

  for (const { url, numberOfCols } of pages) {
    await page.goto(url);
    expect(page).toHaveURL(url);

    const gridCols = await page.getByTestId("grid-col").all();
    expect(gridCols).toHaveLength(numberOfCols);
  }
});

test("rotate grid item", async ({ page }) => {
  await page.goto(easyLevelUrl);

  const gridCols = await page.getByTestId("grid-col").all();
  const dataTestRotate = "data-test-rotate";

  const col = gridCols[0];

  const beforeRotate = await col.getAttribute(dataTestRotate);

  await col.click();

  const afterRotate = await col.getAttribute(dataTestRotate);

  expect(beforeRotate).not.toBe(afterRotate);
});
