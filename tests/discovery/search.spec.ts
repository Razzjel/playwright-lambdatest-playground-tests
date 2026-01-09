import { test } from '../../src/fixtures';
import { SearchResultsPage } from '../../src/pages/product/SearchResultPage';

test.describe('Product Discovery - Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Search with filter reduces results count', async ({ page }) => {
    const searchPage = new SearchResultsPage(page);
    await searchPage.searchFor('Apple');
    await searchPage.expectResultsFound();

    const minPrice = '10';
    const maxPrice = '100';
    await searchPage.filterByPriceRange(minPrice, maxPrice);
    await searchPage.expectNoResults();
  });
});
