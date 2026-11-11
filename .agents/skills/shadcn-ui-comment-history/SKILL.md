---

name: shadcn-ui-comment-history
description: Compare the project's shadcn/ui primitives in src/components/ui with the latest shadcn registry version, then document intentional local differences using only KEEP and CUSTOMIZE comments grounded in the project's MDX design documentation.
---

# shadcn/ui Comment History

## Goal

Document why intentional local differences in `src/components/ui` should be
preserved when compared with the latest shadcn/ui registry version. This skill
is for review and comment-only documentation; it does not upgrade components
or apply registry changes.

## Workflow

### 1. Select the components

- If the user names components, inspect only those components.
- Otherwise, enumerate the component source files under `src/components/ui/`.
- Use each component's actual shadcn registry name. The filename without its
  extension is the default candidate; verify the mapping when the names differ.
- If a local component does not exist in the registry or cannot be resolved,
  report it instead of substituting a different component.

### 2. Read the local implementation and design documentation

- Read each selected local component and its directly relevant imports or
  styles so that local behavior is understood before interpreting the diff.
- Treat the MDX files under `src/stories/` as the source of truth for design
  decisions. Read the relevant document before assigning a `CUSTOMIZE` reason.
- Current design references include:
  - `src/stories/Colors.mdx` for color tokens and semantic colors.
  - `src/stories/Corners.mdx` for radii and radius exceptions.
  - `src/stories/Layer.mdx` for shadows and z-index layers.
- Check `src/index.css` when a design document or component refers to a CSS
  token defined there.
- Do not infer a design rule from the implementation alone. If no MDX guidance
  supports a design-based difference, leave the reason unresolved and report
  it rather than inventing a rule.

### 3. Compare with the latest registry

Run the requested diff command from the repository root for each selected
component, replacing both placeholders with that component's registry name:

```sh
npx shadcn@latest add <component-name> --diff <component-name>
```

- Inspect the command output as a comparison; do not accept, copy, or apply
  upstream changes.
- If the command fails, the component cannot be found, or the output is not a
  diff, report the exact issue. Do not silently switch to another command or
  claim that the comparison succeeded.
- Check the worktree before and after the command. If the command changes
  project files, stop and report those changes rather than discarding them.

### 4. Classify and annotate intentional differences

Use exactly these two labels for comments added or updated by this workflow:

- `KEEP`: A local implementation that must remain for accessibility or
  interaction correctness, such as semantic behavior, keyboard/focus support,
  ARIA state, or an accessibility-critical contrast treatment.
- `CUSTOMIZE`: An intentional local design decision supported by the MDX
  design documentation, such as a token, radius, shadow, layer, or visual
  treatment.

Add a short, concrete reason beside the relevant local code. Prefer Japanese
comment text to match the existing `src/components/ui` comments. For example:

```tsx
// KEEP: フォーカス可視化に必要
// CUSTOMIZE: Corners.mdx の基本角丸に合わせる
```

For JSX comments, use the same labels in JSX comment syntax:

```tsx
{
	/* KEEP: 読み上げ用の状態を維持 */
}
```

- Comment on meaningful local deviations, not every line that happens to
  differ from upstream.
- Keep the code behavior unchanged. Do not rebase, refactor, or otherwise
  modify component logic as part of this task.
- Do not create other labels such as `CUSTOM`, `DESIGN`, or `UPSTREAM`.
- Do not label an unexplained difference as `CUSTOMIZE`; state it as unresolved
  in the final report instead.
- If accessibility and design requirements appear to conflict, preserve the
  accessibility behavior and report the conflict. Do not weaken accessibility
  to match a visual rule.

### 5. Verify and report

- Review the final diff to ensure only comments changed and every new or
  updated label is exactly `KEEP` or `CUSTOMIZE`.
- Report the component names, diff-command results, the MDX documents used,
  and any registry failures or unresolved design decisions.
- Do not claim a component was compared if its diff command did not succeed.
- Do not run broad tests for comment-only changes unless the user requests
  them or the edits unexpectedly changed executable code.

## Scope

- Inspect and annotate files under `src/components/ui/` only, unless the user
  explicitly requests a different scope.
- Treat the project's MDX design documentation as authoritative for design
  customization. Do not edit the MDX documents as part of comparison or
  annotation.
- Preserve unrelated worktree changes.
