#!/usr/bin/env bash
# Wires the MUI skills submodule into this machine's Claude Code project
# scope. Idempotent — safe to re-run after `git submodule update`.
#
# Why this lives here instead of being committed under .claude/:
# `.gitignore` excludes `/.claude/` (per-developer state), so each dev
# needs to (re-)create these symlinks locally. Run after
# `git submodule update --init --recursive`.

set -euo pipefail

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

if [ ! -L skills ] || [ ! -d skills ]; then
	echo "skills/ symlink missing — did you run \`git submodule update --init\`?" >&2
	exit 1
fi

mkdir -p .claude/skills

count=0
for d in skills/material-ui-*/; do
	name="$(basename "$d")"
	link=".claude/skills/$name"
	target="../../skills/$name"

	# Remove anything that's there (stale symlink, copied dir) and re-link.
	rm -rf "$link"
	ln -s "$target" "$link"
	count=$((count + 1))
done

echo "wired $count MUI skills into .claude/skills/"
ls -la .claude/skills/ | sed -n '/material-ui/p'
