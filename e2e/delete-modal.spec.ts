import { test, expect } from '@playwright/test';

test.describe('Delete Post Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cms');
    // Select a post first
    const firstPost = page.getByTestId('post-item').first();
    await firstPost.click();
  });

  test('opens delete confirmation modal', async ({ page }) => {
    // Click delete button
    await page.getByRole('button', { name: /delete/i }).click();

    // Modal should appear
    const modal = page.getByTestId('delete-modal');
    await expect(modal).toBeVisible();

    // Modal should have confirmation text
    await expect(modal).toContainText(/delete/i);
    await expect(modal).toContainText(/confirm/i);
  });

  test('cancels delete and closes modal', async ({ page }) => {
    // Open delete modal
    await page.getByRole('button', { name: /delete/i }).click();

    const modal = page.getByTestId('delete-modal');
    await expect(modal).toBeVisible();

    // Click cancel button
    await page.getByRole('button', { name: /cancel/i }).click();

    // Modal should be closed
    await expect(modal).not.toBeVisible();
  });

  test('confirms delete removes post from list', async ({ page }) => {
    // Get initial post count
    const initialPosts = await page.getByTestId('post-item').count();

    // Open delete modal
    await page.getByRole('button', { name: /delete/i }).click();

    const modal = page.getByTestId('delete-modal');
    await expect(modal).toBeVisible();

    // Click confirm delete button
    await page.getByRole('button', { name: /confirm|yes|delete/i }).last().click();

    // Wait for modal to close
    await expect(modal).not.toBeVisible();

    // Post count should decrease by 1
    const finalPosts = await page.getByTestId('post-item').count();
    expect(finalPosts).toBe(initialPosts - 1);
  });
});
