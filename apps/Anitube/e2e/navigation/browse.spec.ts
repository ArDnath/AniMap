import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should browse anime by genre using navigation links", async ({
    page,
  }) => {
    // 1. Click the Browse navigation link
    await page.locator("header nav a", { hasText: "BROWSE" }).click();

    // 2. Confirm redirect to genre index
    await page.waitForURL(/\/genre/);

    // 3. Ensure genre cards are populated
    const firstGenre = page.locator("a[href^='/genre/']").first();
    await expect(firstGenre).toBeVisible();
  });
});
