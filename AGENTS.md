# AGENTS.md

## Purpose

This file documents project-specific rules that cannot be fully enforced by automated tools such as linters and formatters, as well as common mistakes and pitfalls specific to this project.

Document the following:

* Project-specific conventions that cannot be enforced by automated tools.
* Common mistakes and pitfalls that are easy to overlook in this project.
* Requirements that differ from general best practices but are necessary for this project.

Do not duplicate rules that are already adequately enforced by linters, formatters, or other automated checks. Focus on rules that require human judgment or project-specific context.

## Naming Conventions

* **React components**, including UI components, must use `PascalCase`.

  * Examples: `UserProfile`, `SubmitButton`, `Header`
* **Regular functions** must use `camelCase`.

  * Examples: `getUserProfile`, `handleSubmit`, `formatDate`

## Layout and UI Component Conventions

* **Use layout components** for arranging and positioning UI elements. Avoid writing `div` elements directly for layout or styling purposes whenever possible.
* Use the existing layout components under `components/layouts/` instead of implementing layout logic with raw HTML elements and custom styles.

  Available layout components:

  ```text
  components/
  └── layouts/
      ├── Center/
      │   └── Center.tsx
      ├── Cluster/
      │   └── Cluster.tsx
      ├── Container/
      │   └── Container.tsx
      └── Stack/
          └── Stack.tsx
  ```

* **Use text and link components** instead of directly using HTML elements such as `p`, `h1`–`h6`, and `a` for text content, headings, and links.
* Use the existing components under `components/elements/` to maintain consistent typography and link styling across the application.

  Available element components:

  ```text
  components/
  └── elements/
      ├── Heading/
      │   └── Heading.tsx
      ├── Link/
      │   └── Link.tsx
      └── Text/
          └── Text.tsx
  ```

### Implementation Rules

* Prefer `Center`, `Cluster`, `Container`, and `Stack` for layout composition. Select the component that best matches the intended layout.
* Use `Heading` for headings, `Text` for text content, and `Link` for links.
* Do not introduce new layout, typography, or link styles using raw HTML elements when an existing component provides the required functionality.
* If an existing component does not support the required behavior, consider extending the component or adding an appropriate reusable component before implementing one-off styling.
* Direct use of HTML elements is acceptable when semantically necessary, when implementing non-visual structural elements, or when the existing components cannot reasonably support the required behavior.
* Follow the existing component APIs and styling conventions. Do not assume props or functionality that have not been implemented.
