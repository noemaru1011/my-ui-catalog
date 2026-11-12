---

name: shadcn-ui-comment-history
description: Compare the project's shadcn/ui primitives in src/components/ui with the latest shadcn registry version, then document intentional local differences that must be preserved using KEEP comments.
---

# shadcn/ui Comment History

## Goal

Document why intentional local implementation differences in `src/components/ui` must be preserved when compared with the latest shadcn/ui registry version.

This skill is for review and comment-only documentation. It does not upgrade components or apply registry changes.

## Workflow

### 1. Select the components

- If the user names components, inspect only those components.
- Otherwise, enumerate the component source files under `src/components/ui/`.
- Use each component's actual shadcn registry name. The filename without its extension is the default candidate; verify the mapping when the names differ.
- If a local component does not exist in the registry or cannot be resolved, report it instead of substituting a different component.

### 2. Read the local implementation and design documentation

- Read each selected local component and its directly relevant imports or styles so that local behavior is understood before interpreting the diff.
- Read relevant MDX files under `src/stories/` when investigating design-related differences.
- Current design references include:
  - `src/stories/Colors.mdx` for color tokens and semantic colors.
  - `src/stories/Corners.mdx` for radii and radius exceptions.
  - `src/stories/Layer.mdx` for shadows and z-index layers.
- Check `src/index.css` when a design document or component refers to a CSS token defined there.
- Do not infer design rules from the implementation alone.

### 3. Compare with the latest registry

Run the following diff command from the repository root for each selected component, replacing both placeholders with that component's registry name:

```sh
npx shadcn@latest add <component-name> --diff <component-name>
```

- Inspect the command output as a comparison; do not accept, copy, or apply upstream changes.
- If the command fails, the component cannot be found, or the output is not a diff, report the exact issue.
- Do not silently switch to another command or claim that the comparison succeeded.
- Check the worktree before and after the command.
- If the command changes project files, stop and report those changes rather than discarding them.

### 4. Classify and annotate intentional differences

Use exactly one label for comments added or updated by this workflow:

- `KEEP`: A local implementation that must remain for accessibility or interaction correctness, such as semantic behavior, keyboard/focus support, ARIA state, or accessibility-critical contrast treatment.

Add a short, concrete reason beside the relevant local code. Prefer Japanese comment text to match existing `src/components/ui` comments.

Examples:

```tsx
// KEEP: フォーカス可視化に必要
// KEEP: キーボード操作の互換性を維持
// KEEP: 読み上げ用の状態を維持
```

For JSX comments:

```tsx
{
	/* KEEP: 読み上げ用の状態を維持 */
}
```

Rules:

- Comment only meaningful local deviations that must be preserved.
- Do not add comments to differences that are merely visual or design-related.
- Do not invent accessibility justifications.
- Do not label unexplained differences as `KEEP`; report them as unresolved instead.
- Keep code behavior unchanged. Do not rebase, refactor, or otherwise modify component logic.
- Do not introduce any other comment labels.
- If accessibility and design requirements appear to conflict, preserve accessibility behavior and report the conflict.

### 5. Verify and report

- Review the final diff to ensure only comments changed.
- Ensure every new or updated comment label is exactly `KEEP`.
- Report:
  - Component names inspected.
  - Registry diff-command results.
  - MDX documents consulted.
  - Added or updated `KEEP` comments and their reasons.
  - Registry failures and unresolved differences.
- Do not claim a component was compared if its diff command did not succeed.
- Do not run broad tests for comment-only changes unless requested or executable code was unexpectedly changed.

## Scope

- Inspect and annotate files under `src/components/ui/` only, unless the user explicitly requests a different scope.
- Treat project MDX design documentation as authoritative when investigating design differences.
- Do not edit MDX documents.
- Preserve unrelated worktree changes.
- Never apply upstream registry changes.
