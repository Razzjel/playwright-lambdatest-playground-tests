## Tech Stack

*   **Core:** [Playwright](https://playwright.dev/)
*   **Language:** TypeScript
*   **Environment:** [Lambdatest playground](https://ecommerce-playground.lambdatest.io/)
*   **Linter:** ESLint & Prettier

## Installation

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2. **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```

## Running Tests

### Run All Tests
Executes all tests in headless mode.
```bash
npx playwright test
```

## UI Mode
Opens the interactive Playwright UI with time-travel debugging and network logs.

```bash
npx playwright test --ui
```

Run Specific Test File
```bash
npx playwright test ./tests/discovery/search.spec.ts
```

Debugging tests
```bash
npx playwright test ./tests/discovry/search.spec.ts --debug
```

Generate Report
Opens the HTML test report after execution.
```bash
npx playwright show-report
```