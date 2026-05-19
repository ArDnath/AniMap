import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load the home page with correct metadata and layout", async ({
    page,
  }) => {
    // 1. Verify page title
    await expect(page).toHaveTitle(/Animap/);

    // 2. Verify header brand logo text is ANIMAP
    const brandLogo = page.locator("header a", { hasText: "ANIMAP" });
    await expect(brandLogo).toBeVisible();

    // 3. Verify Hero Section is rendered
    const heroSection = page.locator("section").first();
    await expect(heroSection).toBeVisible();
    await expect(heroSection.locator("h1")).toBeVisible(); // Hero Featured Title

    // 4. Verify main category grid sections exist
    const trendingHeader = page.locator("text=TRENDING_NOW");
    await expect(trendingHeader).toBeVisible();

    const popularHeader = page.locator("text=POPULAR");
    await expect(popularHeader).toBeVisible();
  });
});
