# Automation Design Notes & Decisions

This document tracks key architectural decisions, known limitations, and workarounds implemented in the Playwright framework for the Lambdatest Playground automated tests.

## Architecture

### Page Object Model (POM)
The framework strictly follows the POM pattern. All selector logic and page interactions are within `src/pages/`, keeping test files clean and readable.

### Custom Fixtures
I utilize custom Playwright fixtures (`src/fixtures`) to inject Page Objects directly into tests. This simplifies registration for tests that require user account.

### Test Structure (`describe` blocks)
Every test file, even those with a single scenario, is wrapped in a `test.describe` block.
*   **Reasoning:** Improves report hierarchy, allows for easier file-level tagging and simplifies future expansion (adding `beforeEach` hooks).

## Challenges & Workarounds

### 1. Price Range Filtering (Search Results)
The "Price Range" filter functionality presented significant automation challenges due to its implementation.

*   **The Problem:** Objects in the the product grid dynamically. However, standard Playwright wait strategies proved unreliable:
    *   `waitForURL`: The URL update often lagged behind the UI or didn't trigger a measurable navigation event.
    *   `networkidle`: Background requests kept the network active longer than necessary, causing timeouts.

*   **The Workaround:** A hard wait (`waitForTimeout(3000)`) was implemented in `filterByPriceRange`.
    *   **Justification:** While generally discouraged in Playwright, this explicit pause ensures JavaScript has enough time to process the input and refresh the grid, stabilizing the test execution where "smart waits" failed consistently.

### 2. Filter Input Interaction
The filter inputs do not have a dedicated "Apply" button.
*   **Implementation:** The test simulates a user pressing `Enter` on the input field.

## Not Implemented

### Coupon Code
The current demo environment does not allow users to generate valid coupon codes, so writing a test for a successful coupon application is not possible. 

I considered using a different e-commerce store just for this test, but decided against it. Introducing a second store would require significant changes to the POM design, which I wanted to keep clean and focused on a single application.
