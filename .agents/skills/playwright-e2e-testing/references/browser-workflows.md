# Browser Workflows and Debugging

This repository's standalone Playwright suite starts Storybook through
`playwright.config.ts`. Use its iframe URL when interacting with a story so
locators address the rendered component rather than Storybook's manager UI.

## Open the intended story

Find the story's ID in Storybook's `index.json` or by inspecting its generated
story URL. Do not infer the ID from the component filename. Navigate through
the configured `baseURL`:

```ts
await page.goto('/iframe.html?id=example-formexample--default&viewMode=story');
await expect(page.getByRole('heading', { name: 'フォーム例' })).toBeVisible();
```

Wait for meaningful rendered content before performing interactions. Storybook
may need extra time to compile the story on its first request; web-first
assertions wait for the UI without adding arbitrary sleeps.

## Exercise a browser workflow

Prefer the same semantic controls a user would find. A form test can submit the
empty form and assert its visible errors:

```ts
await page.getByRole('button', { name: '送信' }).click();
await expect(page.getByText('氏名を入力してください。', { exact: true })).toBeVisible();
```

If labels overlap with the accessible name of another control, identify the
intended role and exact name:

```ts
await page.getByRole('textbox', { name: 'パスワード *' }).fill('short');
```

Validate outcomes at the UI boundary, such as messages, changed content, or
navigation. Avoid assertions on React state, CSS classes, or internal
implementation details.

## Run and diagnose

Run one spec while iterating, then the suite after changing shared setup:

```sh
npm run test:e2e -- e2e/form.spec.ts
npm run test:e2e
```

Playwright starts and manages Storybook automatically. If a browser fails to
launch because Chromium is not installed, install the configured browser:

```sh
npx playwright install chromium
```

For a failing test, inspect the reported locator, browser error context, and
trace. Determine whether the issue is the story ID, server startup, accessible
name, or actual UI behavior. Fix the cause and rerun the failing workflow;
don't replace a meaningful assertion with a weaker one merely to pass.

Do not run a separate Storybook process at the same port while Playwright is
using `webServer`. Outside CI, the configured server may reuse an existing
Storybook process.
