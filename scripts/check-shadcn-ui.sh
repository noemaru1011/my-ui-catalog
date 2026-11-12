
  # Run the dedicated registry diff command.
  set +e
  output=$(npx --yes shadcn@latest diff "$component" 2>&1)
  status=$?
  set -e

  echo "$output"

  if [[ $status -ne 0 ]]; then
    echo "::error::Registry diff failed for $component (exit code: $status)"
    exit 1
  fi

  # A unified diff indicates that the local component differs.
  if grep -Eq '^(diff --git |--- |\+\+\+ |@@ )' <<< "$output"; then
    echo "::error::Local component differs from latest registry: $component"
    exit 1
  fi

  # Empty output or explicit "No changes." means identical.
  if [[ -z "$output" || "$output" == "No changes." ]]; then
    echo "Registry comparison passed: $component"
    continue
  fi

  echo "::error::Could not determine registry diff result for $component."
  exit 1
