
#!/usr/bin/env bash

# Compare local shadcn/ui primitives with the current registry without applying
# registry changes. Pass component names to limit the check, for example:
#   ./scripts/check-shadcn-ui.sh button dialog
set -euo pipefail

component_directory="src/components/ui"
declare -a component_files=()

if (( $# > 0 )); then
  for component in "$@"; do
    component_file="$component_directory/$component.tsx"

    if [[ ! -f "$component_file" ]]; then
      echo "::error::Local shadcn component not found: $component_file"
      exit 1
    fi

    component_files+=("$component_file")
  done
else
  shopt -s nullglob
  component_files=("$component_directory"/*.tsx)
  shopt -u nullglob
fi

if (( ${#component_files[@]} == 0 )); then
  echo "::error::No component files found in $component_directory."
  exit 1
fi

has_failure=0

for component_file in "${component_files[@]}"; do
  component="${component_file##*/}"
  component="${component%.tsx}"

  echo "Checking $component..."

  # --diff only displays a comparison; it must not apply registry changes.
  set +e
  output="$(npx --yes shadcn@latest add "$component" --diff "$component" 2>&1)"
  status=$?
  set -e

  printf '%s\n' "$output"

  if (( status != 0 )); then
    echo "::error::Registry diff failed for $component (exit code: $status)"
    has_failure=1
    continue
  fi

  # A unified diff means the local component differs from the latest registry.
  if grep -Eq '^(diff --git |--- |\+\+\+ |@@ )' <<< "$output"; then
    if rg -n --fixed-strings 'KEEP:' "$component_file"; then
      echo "::notice::$component differs from the registry and contains KEEP documentation. Review that each intentional accessibility or interaction difference is covered."
    else
      echo "::error::$component differs from the registry but has no KEEP comment. Document intentional accessibility or interaction differences, or resolve the difference."
      has_failure=1
    fi
    continue
  fi

  # The CLI emits no diff for matching files. Known no-change text is accepted
  # as well so that the check stays readable across CLI versions.
  if [[ -z "$output" || "$output" == "No changes." || "$output" == "No changes detected." ]]; then
    echo "Registry comparison passed: $component"
    continue
  fi

  echo "::error::Could not determine registry diff result for $component."
  has_failure=1
done

exit "$has_failure"
