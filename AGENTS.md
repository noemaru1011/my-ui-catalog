# AGENTS.md

## Purpose

Document the following:

- Project-specific conventions that cannot be enforced by automated tools.
- Common mistakes and pitfalls that are easy to overlook in this project.
- Requirements that differ from general best practices but are necessary for this project.

Do not duplicate rules that are already adequately enforced by linters, formatters, or other automated checks. Focus on rules that require human judgment or project-specific context.

## Naming Conventions

- **React components**, including UI components, must use `PascalCase`.
  - Examples: `UserProfile`, `SubmitButton`, `Header`
- **Regular functions** must use `camelCase`.
  - Examples: `getUserProfile`, `handleSubmit`, `formatDate`

## Skills

- Project-specific skills and their usage instructions are documented in the `.agents/skills/` directory.
- Check `.agents/skills/index.md` to identify relevant skills before starting a task.
- Follow the instructions in the relevant skill documentation when working on a task covered by a skill.
