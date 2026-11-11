
#!/usr/bin/env bash

set -Eeuo pipefail

UI_DIR="src/components/ui"
BASE_SHA="${BASE_SHA:?BASE_SHA is required}"
HEAD_SHA="${HEAD_SHA:?HEAD_SHA is required}"

echo "Checking shadcn/ui changes..."

# Check the initial worktree state.
if [[ -n "$(git status --porcelain)" ]]; then
  echo "::error::Working tree is not clean before comparison."
  exit 1
fi

# Get changed UI component files.
mapfile -t changed_files < <(
  git diff --name-only --diff-filter=ACMR \
    "$BASE_SHA...$HEAD_SHA" -- "$UI_DIR"
)

if [[ ${#changed_files[@]} -eq 0 ]]; then
  echo "No shadcn/ui changes."
  exit 0
fi

echo "Changed components:"
printf ' - %s\n' "${changed_files[@]}"

for file in "${changed_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "::error::Changed component does not exist: $file"
    exit 1
  fi

  # Only TSX component files are compared with the registry.
  if [[ "$file" != *.tsx ]]; then
    echo "Skipping non-TSX file: $file"
    continue
  fi

  component="$(basename "$file" .tsx)"

  echo ""
  echo "Checking component: $component"

  # KEEP means intentional local differences are documented.
  if grep -q 'KEEP:' "$file"; then
    echo "KEEP comment found. Registry comparison skipped."
    continue
  fi

  echo "No KEEP comment. Comparing with latest registry..."

  # Run the exact registry diff command.
  set +e
  output=$(npx --yes shadcn@latest add "$component" --diff "$component" 2>&1)
  status=$?
  set -e

  echo "$output"

  if [[ $status -ne 0 ]]; then
    echo "::error::Registry diff failed for $component (exit code: $status)"
    exit 1
  fi

  # Check whether the output contains actual diff hunks.
  if grep -Eq '^(diff --git |--- |\+\+\+ |@@ )' <<< "$output"; then
    echo "::error::Local component differs from latest registry: $component"
    exit 1
  fi

  # Empty output is treated as no diff.
  if [[ -n "$output" ]]; then
    echo "::error::Could not determine registry diff result for $component."
    exit 1
  fi

  echo "Registry comparison passed: $component"
done

# Ensure the comparison did not modify project files.
if [[ -n "$(git status --porcelain)" ]]; then
  echo "::error::Registry comparison modified the working tree."
  git status --short
  exit 1
fi

echo ""
echo "shadcn/ui checks passed."
