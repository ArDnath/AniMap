import { test, expect } from "@playwright/test";

test.describe("Anime Details", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should navigate to anime details page when clicking a card", async ({
    page,
  }) => {
    // 1. Click the first available anime card in the Trending Now section
    const firstAnimeCard = page.locator("a[href^='/anime/']").first();
    const animeHref = await firstAnimeCard.getAttribute("href");
    expect(animeHref).not.toBeNull();

    await firstAnimeCard.click();

    // 2. Verify redirect to the correct anime path
    await page.waitForURL(new RegExp(animeHref!));
    expect(page.url()).toContain(animeHref);

    // 3. Verify key details page sections are loaded
    await expect(page.locator("h1")).toBeVisible(); // Main title of anime
    await expect(page.locator("text=Format")).toBeVisible();
    await expect(page.locator("text=Episodes")).toBeVisible();
  });
});
