import { test, expect } from '@playwright/test';

test.describe('Modal Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cms');
    // Select a post and open delete modal
    const firstPost = page.getByTestId('post-item').first();
    await firstPost.click();
    await page.getByRole('button', { name: /delete/i }).click();
  });

  test('traps focus within modal', async ({ page }) => {
    const modal = page.getByTestId('delete-modal');
    await expect(modal).toBeVisible();

    // Get all focusable elements in the modal
    const focusableElements = modal.locator('button, [tabindex]:not([tabindex="-1"])');
    const count = await focusableElements.count();

    expect(count).toBeGreaterThan(0);

    // Tab through all elements and verify focus stays in modal
    for (let i = 0; i < count + 1; i++) {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');

      // Verify focused element is within the modal
      const isInModal = await modal.locator(':focus').count();
      expect(isInModal).toBe(1);
    }
  });

  test('closes modal on Escape key', async ({ page }) => {
    const modal = page.getByTestId('delete-modal');
    await expect(modal).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');

    // Modal should be closed
    await expect(modal).not.toBeVisible();
  });

  test('closes modal on overlay click', async ({ page }) => {
    const modal = page.getByTestId('delete-modal');
    await expect(modal).toBeVisible();

    // Click on the overlay (backdrop)
    // The overlay is usually the parent element with a semi-transparent background
    await page.locator('[data-testid="modal-overlay"]').click({ position: { x: 10, y: 10 } });

    // Modal should be closed
    await expect(modal).not.toBeVisible();
  });
});
