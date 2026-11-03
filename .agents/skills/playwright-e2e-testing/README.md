# Playwright E2E Testing

Guidance for creating and debugging standalone Playwright E2E tests in this
repository. Tests run in Chromium against the Storybook instance started by
Playwright's `webServer` configuration.

Use this skill for complete browser workflows, accessible locators, and
user-visible application behavior. For component integration tests with Vitest
browser mode and React Testing Library, use the
[integration-testing skill](../integration-testing/SKILL.md).

Run the full E2E suite with:

```sh
npm run test:e2e
```

See [SKILL.md](./SKILL.md) for the complete workflow and
[browser-workflows.md](./references/browser-workflows.md) for Storybook
navigation and failure-diagnosis guidance.
