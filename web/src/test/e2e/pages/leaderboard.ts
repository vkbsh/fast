import { test, expect } from "@playwright/test";

import { PAGES } from "config";

// TODO:
// - [ ] check table.
// - [ ] check labels .
// - [ ] check error state
// - [ ] check button Play again.
// - [ ] check redirect to next page.

test("visit leaderboard", async ({ page }) => {
  await page.goto(PAGES.LEADERBOARD);
});
