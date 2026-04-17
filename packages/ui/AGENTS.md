## Purpose

This package provides the shared UI foundation for the monorepo.

It contains reusable React components, styles, and UI-related utilities used across applications. The package is built to support consistent design, predictable behavior, and safe reuse.

Current stack:

- React
- React DOM
- Vanilla Extract
- Storybook
- Vitest

---

## General Principles

- Prefer reusable, composable UI components over app-specific implementations.
- Keep components presentational unless stateful behavior is part of the component's core responsibility.
- Avoid coupling this package to a specific app, route, business domain, or API contract.
- Prioritize clear public APIs, predictable props, and maintainable styling.
- Favor readability and consistency over clever abstractions.

---

## Component Design Rules

- Build components to be shared across multiple apps.
- Keep the public API small and intuitive.
- Prefer composition over deeply configurable single components.
- Do not introduce app-specific logic into shared components.
- Avoid unnecessary internal state. Use controlled patterns when appropriate.
- Prefer explicit props over hidden behavior.
- Keep accessibility in mind from the start.

When adding or modifying a component:

- Check whether an existing component can be extended instead of creating a duplicate.
- Keep naming consistent with existing components.
- Make sure the component can be documented and tested in isolation.
- Export components through the package's public entrypoints only.

---

## Styling Rules

This package uses **Vanilla Extract** for styling.

- Use Vanilla Extract for component styles.
- Keep styles colocated with the component when practical.
- Prefer theme-aware tokens and shared style primitives over hardcoded values.
- Avoid inline styles unless there is a strong runtime-driven reason.
- Do not introduce CSS-in-JS libraries or alternate styling systems.
- Keep style names clear and scoped to the component's intent.

When writing styles:

- Prefer reusable tokens for spacing, color, typography, radius, and layering.
- Avoid magic numbers when a shared token or semantic value can be used.
- Keep variant structure simple and understandable.
- Do not leak app-level layout decisions into shared component styles unless the component is explicitly layout-oriented.

---

## React Guidelines

- Use function components.
- Keep components focused and small when possible.
- Prefer props interfaces/types that are easy to read and extend.
- Avoid premature memoization.
- Use `forwardRef` only when it provides clear value.
- Preserve native HTML behavior where appropriate.
- Prefer controlled and accessible form patterns.

---

## Storybook Rules

Storybook is the source of truth for interactive UI documentation.

- Add or update stories for every public component change.
- Stories should demonstrate real usage, important variants, and edge cases.
- Prefer clear and minimal story setups.
- Include stories for states such as disabled, loading, error, empty, or selected when relevant.
- Use Storybook to validate component ergonomics and visual consistency.

Stories should:

- Be easy to scan and understand.
- Reflect intended public usage.
- Avoid app-specific mocking unless absolutely necessary.
- Not hide complexity that consumers of the component must handle themselves.

---

## Testing Rules

This package uses **Vitest** for testing.

- Add or update tests when component behavior changes.
- Test behavior, rendering expectations, and important interaction flows.
- Prefer user-facing assertions over implementation-detail assertions.
- Keep tests resilient and readable.
- Do not over-test trivial implementation details.

Focus tests on:

- rendering
- prop-driven behavior
- interaction
- accessibility-relevant behavior where practical
- regressions for previously fixed bugs

If a change is mostly visual, ensure Storybook coverage is updated even if test changes are minimal.

---

## Accessibility

Accessibility is required, not optional.

- Use semantic HTML whenever possible.
- Ensure interactive elements are keyboard accessible.
- Provide proper labels, roles, and ARIA usage only when needed.
- Do not replace native behavior with custom behavior without a strong reason.
- Check focus behavior, disabled states, and screen-reader implications for interactive components.

---

## Public API and Exports

- Treat exported components as stable public API.
- Avoid breaking changes unless explicitly intended and documented.
- Export only what should be consumed by apps.
- Do not expose internal helpers, experimental APIs, or unstable implementation details accidentally.
- Keep entrypoints organized and intentional.

Before exporting something new, ask:

- Is this truly reusable?
- Is this the right abstraction level for a shared package?
- Can this be supported long-term?

---

## Dependency Rules

- Keep dependencies minimal.
- Prefer platform features and existing package utilities before introducing new libraries.
- Do not add dependencies that are app-specific or incompatible with a shared UI package.
- Any new dependency should be justified by clear long-term value.

---

## Change Guidelines

When making changes in this package:

1. Preserve backward compatibility when possible.
2. Update stories for any public component changes.
3. Update tests when behavior changes.
4. Verify styles remain consistent and reusable.
5. Avoid leaking business logic into shared UI code.

When refactoring:

- Keep external behavior stable unless the change is intentional.
- Prefer small, focused refactors over wide rewrites.
- Maintain compatibility with existing consumers in the monorepo.

---

## What to Avoid

- App-specific business logic
- API-fetching logic inside shared UI components
- Hardcoded product/domain terminology unless the component is explicitly domain-owned
- Multiple competing styling patterns
- Over-engineered abstractions for limited use cases
- Breaking public component contracts without clear reason

---

## Preferred Workflow

When working on this package:

1. Understand whether the change belongs in the shared UI layer.
2. Reuse or extend existing primitives when possible.
3. Implement the component or change with Vanilla Extract styling.
4. Add or update Storybook stories.
5. Add or update Vitest tests if behavior changed.
6. Keep exports intentional and minimal.

---

## Decision Heuristics

Use the following rules of thumb:

- If it is specific to one app, it probably does not belong here.
- If it improves consistency across apps, it likely belongs here.
- If a component API feels too flexible, simplify it.
- If styling duplicates existing patterns, extract or reuse shared styles.
- If documentation is hard to write, the component API may be too complex.

---

## Output Expectations for Agents

When creating or modifying code in this package:

- Follow existing naming and file structure conventions.
- Keep changes scoped to the requested task.
- Do not introduce unrelated refactors.
- Update stories and tests when relevant.
- Prefer maintainable code over clever shortcuts.
- Leave the package in a state that is easy for app teams to consume.
