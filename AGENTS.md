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
