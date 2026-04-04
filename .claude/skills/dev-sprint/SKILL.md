---
name: dev-sprint
description: How to run a development sprint in GlassUI. Use when starting a new feature, multi-step task, or any work that spans multiple changes. Covers sprint planning, progress tracking, changelog discipline, commit strategy, testing gates, and release. Enforces the workflow -- plan first, track progress, commit at functional milestones, always finish with testing.
---

# Development Sprint

Every non-trivial task follows this workflow. No shortcuts.

## 1. Plan

Create a sprint directory and write the plan before touching code:

```bash
mkdir -p sprints/<sprint-name>
```

Write `sprints/<sprint-name>/plan.md`:
- What we're building and why
- Key decisions and trade-offs
- Files to create/modify
- Dependencies and ordering
- What "done" looks like

The plan is a living document. Update it as the sprint evolves -- crossed-out items, new discoveries, changed approach. The plan is evidence of thinking, not a contract.

## 2. Track

Create `sprints/<sprint-name>/tracker.md` as a checklist:

```markdown
# Sprint: <name>

## Tasks
- [x] Task 1 -- description
- [x] Task 2 -- description
- [ ] Task 3 -- description
- [ ] Testing gate
- [ ] Changelog
- [ ] Commit

## Notes
- Discovery: found that X needs Y
- Changed approach: Z instead of W because...
```

Update the tracker as you go. Check items off. Add notes about surprises, blockers, and changed approaches. This is your scratchpad -- future you (or the next conversation) reads this to understand what happened.

## 3. Build

Write code. Follow the project skills:
- `glassui-architecture` for component conventions, file structure, shared enums
- `preline-reference` for Preline component inventory when porting new components

## 4. Commit at functional milestones

Do NOT commit after every file edit. Do NOT batch everything into one giant commit at the end. Commit when:

- A logical unit of work is complete and functional
- Tests pass for that unit
- The codebase is in a good state (not half-refactored)

Each commit should:
- Be self-contained (revertable without breaking things)
- Include its changelog entry
- Stage files explicitly (no `git add -A`)
- Use conventional messages: `feat:`, `fix:`, `chore:`, `docs:`

Bad: 20 tiny commits for each file touched. Also bad: 1 commit with 40 files after hours of work.
Good: 3-5 commits per sprint, each representing a meaningful milestone.

## 5. Changelog

Update `docs/changelog.md` as part of each commit. Write from the user's perspective:
- Added: new capability
- Changed: modified behavior
- Fixed: bug fix

Do not batch changelog entries at the end. Each commit carries its own entry.

## 6. Testing gate

Every sprint ends with testing. No exceptions.

```bash
npm test          # All tests: props, demos, styles
npm run build     # Production build must pass
npm run dev       # Visual inspection
```

Visual checks must cover:
- Light mode AND dark mode
- At least 2 theme presets (default + one other)
- Glass and solid variants of affected components
- Stacking scenarios (components inside glass containers)

If tests fail, fix them before considering the sprint done.

## 7. Clean up

- Verify no debug prints, TODO comments, or temporary hacks remain
- Run `/simplify` if significant code was written
- Run `npx tsx scripts/generate.ts` if any schema.ts files changed (regenerates skills)

## Sprint artifacts

```
sprints/<sprint-name>/
  plan.md           What we're building, key decisions
  tracker.md        Checklist + notes
```

The `sprints/` directory is git-tracked. Sprint plans and trackers are committed alongside the code they describe.

## Meta sprints (sub-sprints)

Large efforts use a single plan file with numbered sub-sprints. The plan has a status table tracking overall progress:

```
sprints/<meta-name>/
  plan.md               Full plan with all sub-sprints, status table, key decisions
  tracker.md            Active execution tracker (current sub-sprint progress)
```

The plan is the entry point. It contains:
- A status table with every sub-sprint, its status (Done / In Progress / Not Started), and dependencies
- Phase groupings
- File lists per sub-sprint

When executing, create or update `tracker.md` for the active work. Update the plan status table as sub-sprints complete.

## Anti-patterns

- **No plan**: jumping straight to code leads to rework and wrong abstractions
- **Commit per file**: noise in git history, impossible to revert cleanly
- **One mega commit**: can't bisect, can't review, can't cherry-pick
- **Skip testing**: "I'll test later" means "I'll ship bugs now"
- **Stale tracker**: if the tracker doesn't match reality, it's useless
- **Plan in hidden tool dirs**: plans go in `sprints/`, not `.claude/plans/` -- portable across tools
