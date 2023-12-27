import { test, expect } from "@playwright/test";
import { PAGES } from "config";

test.describe("Game page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGES.GAME + "/easy");
  });

  test("should display a timer", async ({ page }) => {
    const timer = await page.getByTestId("timer");
    expect(timer).toBeTruthy();
  });

  test("should have a grid length based on level type", async ({ page }) => {
    const levels = [
      { url: PAGES.GAME + "/easy", numberOfCols: 3 * 3 },
      { url: PAGES.GAME + "/hard", numberOfCols: 4 * 4 },
      { url: PAGES.GAME + "/nightmare", numberOfCols: 5 * 5 },
    ];

    for (const { url, numberOfCols } of levels) {
      await page.goto(url);
      expect(page).toHaveURL(url);

      const gridCols = await page.getByTestId("grid-col").all();
      expect(gridCols).toHaveLength(numberOfCols);
    }
  });

  test("should rotate a grid item when clicked", async ({ page }) => {
    const gridCols = await page.getByTestId("grid-col").all();
    const dataTestRotate = "data-test-rotate";

    const col = gridCols[0];
    const beforeRotate = await col.getAttribute(dataTestRotate);

    await col.click();

    const afterRotate = await col.getAttribute(dataTestRotate);
    expect(beforeRotate).not.toBe(afterRotate);
  });
});
