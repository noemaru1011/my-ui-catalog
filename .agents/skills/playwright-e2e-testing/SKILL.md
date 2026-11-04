---

name: playwright-e2e-testing
description: "Use when creating, updating, or debugging standalone Playwright E2E tests that run a real browser against the application or Storybook. Covers Playwright Test, browser workflows, accessible locators, server startup, and this repository's npm run test:e2e setup."
---

# Playwright E2E Testing

## Goal

Verify user-visible behavior across the running application in a real browser.
Exercise the browser, rendered UI, and application behavior together; avoid
testing implementation details or replacing the feature under test with mocks.

Use this skill when:

- Creating or debugging standalone Playwright Test specs.
- Verifying a complete browser workflow against the app or Storybook.
- Testing navigation, form submission, validation, or other behavior across
  multiple UI components.

For component tests using Vitest browser mode, React Testing Library, and
`userEvent`, use the `integration-testing` skill instead. Playwright in Vitest
browser mode is not the same as a standalone Playwright E2E test.

## Project Setup

- Standalone browser tests live in `e2e/` and use `*.spec.ts`.
- Playwright Test is imported from `playwright/test`.
- `playwright.config.ts` runs tests in Chromium and starts this project's
  Storybook at `http://127.0.0.1:6006` through `webServer`.
- The current E2E suite tests the Storybook iframe, not a separately served
  production application. `e2e/form.spec.ts` covers visible validation for the
  form example.
- The `test:e2e` npm script runs the full suite and starts Storybook
  automatically:

  ```sh
  npm run test:e2e
  ```

- To run a specific spec:

  ```sh
  npm run test:e2e -- e2e/form.spec.ts
  ```

- Prefer the configured test script instead of starting Storybook separately.
  Playwright reuses an existing server outside CI; avoid leaving conflicting
  Storybook processes running.

## Workflow

### 1. Inspect the feature and test setup

Read `playwright.config.ts`, `package.json`, the target story and feature
code. Confirm the Storybook story ID, accessible labels, expected behavior,
and that the existing `webServer` starts Storybook.

Keep the test in `e2e/` and follow the existing TypeScript and Japanese test
naming conventions. Reuse the configured browser and server lifecycle unless
the requested coverage requires a deliberate configuration change.

### 2. Test complete user-visible workflows

Use Playwright's `test`, `expect`, and fixtures from `playwright/test`. Navigate
to the actual page or Storybook story, perform actions as a user would, and
assert the resulting UI or navigation.

For Storybook stories, use the story ID from the actual Storybook manifest or
URL; do not guess IDs. Wait for a meaningful page element before interacting
with the story.

Cover representative success and failure paths, such as:

- Page or story loads with the expected content.
- Invalid form submission displays the expected validation feedback.
- Valid input allows the intended action and displays the expected outcome.
- Navigation, disabled/loading states, and async errors when implemented.

Keep tests focused on observable behavior. Don't repeat exhaustive component
prop coverage already handled by unit tests.

### 3. Use resilient browser interactions

- Prefer accessible locators: `getByRole`, `getByLabel`, `getByText`, and
  `getByPlaceholder`.
- Use `getByRole` with a specific accessible name when a label also names a
  related button, as with password visibility controls.
- Await Playwright actions and use web-first assertions such as
  `await expect(locator).toBeVisible()`.
- Assert exact user-visible outcomes; avoid fixed sleeps, arbitrary CSS
  selectors, and direct DOM inspection.
- If an accessible locator is ambiguous, inspect the rendered accessible
  names and narrow it with a semantic role or exact name. Do not weaken the
  assertion to make it pass.
- Avoid mocking feature logic, form validation, or navigation behavior being
  tested. Stub only external services when necessary for deterministic tests.

### 4. Run and diagnose tests

Run the smallest relevant test first, then the full suite if shared setup or
configuration changed:

```sh
npm run test:e2e -- e2e/<spec>.spec.ts
npm run test:e2e
```

If Playwright reports that the Chromium executable is missing, install only
the configured browser:

```sh
npx playwright install chromium
```

On failure, inspect the browser error context and trace, identify whether the
cause is a bad route, inaccessible/ambiguous locator, server startup, or
application behavior, then fix the cause and rerun the test. Do not report a
test as passing unless its command completed successfully.

## Common Pitfalls

- Vitest component tests run in a browser but do not launch the standalone
  Playwright Test runner or the full Storybook server.
- The default Storybook E2E URL uses its iframe; manager-page selectors are
  not available inside that page.
- `getByLabel` may match non-input controls that share the same accessible
  name. Use the appropriate role and exact name.
- Storybook's first render may take longer while Vite compiles modules. Wait
  for the expected page element rather than sleeping for a fixed duration.
- A test that only asserts the server responds does not verify the feature.
- Do not add a second server lifecycle or install another test framework when
  the configured Playwright setup already covers the workflow.

## References

- [Browser workflows and debugging](./references/browser-workflows.md)
