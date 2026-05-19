import { test, expect } from "@playwright/test";

test.describe("Theme Toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should toggle page theme when clicking theme button", async ({
    page,
  }) => {
    const htmlElement = page.locator("html");
    const themeButton = page
      .locator("button[aria-label='Toggle theme']")
      .first();

    // Verify initial theme state (dark mode doesn't have '.light' class)
    await expect(htmlElement).not.toHaveClass(/light/);

    // Click theme toggle button to switch to light mode
    await themeButton.click();
    await expect(htmlElement).toHaveClass(/light/);

    // Click again to switch back to dark mode
    await themeButton.click();
    await expect(htmlElement).not.toHaveClass(/light/);
  });
});
