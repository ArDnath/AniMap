import { test, expect } from "@playwright/test";

test.describe("Search Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should search for anime from the header input and redirect to search results page", async ({
    page,
  }) => {
    const searchInput = page
      .locator("input[aria-label='Search anime']")
      .first();

    // 1. Focus search input, type query, and hit Enter
    await searchInput.fill("Naruto");
    await searchInput.press("Enter");

    // 2. Check redirect and URL path
    await page.waitForURL(/\/search\?q=Naruto/);
    expect(page.url()).toContain("/search?q=Naruto");

    // 3. Verify the search results header
    const searchHeader = page.locator("h1");
    await expect(searchHeader).toContainText(/Naruto/i);

    // 4. Check that at least one anime card search result is loaded
    const animeCard = page.locator("a[href^='/anime/']").first();
    await expect(animeCard).toBeVisible();
  });
});
