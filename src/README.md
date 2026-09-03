# `src` — library source

`@mantlebee/ts-core` is a collection of small, framework-agnostic building
blocks: common types, reusable patterns and utilities for TypeScript projects.
Everything is re-exported from [`index.ts`](./index.ts).

Each top-level folder is a self-contained **concept area**. Folders whose job is
to group a family of things (an interface plus its implementations, or a set of
related modules) carry their own `README.md`; the leaf folders under them are the
concrete implementations.

## Concept areas

| Folder | Concept |
| --- | --- |
| [`builders/`](./builders) | Builder + abstract-factory pattern, wired to debug/release mode |
| [`calendar/`](./calendar) | Calendar vocabulary (months, week days, day-of-month enums) |
| [`colors/`](./colors) | Color value type with conversions between HEX / RGB(A) / HSL(A) / web names |
| [`common/`](./common) | Shared foundation: types, pure utilities and base classes used everywhere |
| [`debug/`](./debug) | Global debug-mode switch |
| [`delays/`](./delays) | Mechanisms that run code after a delay |
| [`delegates/`](./delegates) | Wrappers that control how/when a function runs |
| [`exceptions/`](./exceptions) | Error base type that carries a machine-readable code |
| [`identities/`](./identities) | Generating ids and building type-safe keys |
| [`loggers/`](./loggers) | Logging abstraction with pluggable sinks |
| [`parsers/`](./parsers) | Turning text into structured data |
| [`scheduling/`](./scheduling) | Describing recurring executions (daily, weekly, monthly…) |
| [`subscriptions/`](./subscriptions) | Publish/subscribe primitives |
| [`wizards/`](./wizards) | Driving a multi-step flow through its lifecycle |

## Conventions

- `interfaces.ts` / `interface.ts` — the contract(s) for the folder.
- `models.ts` — concrete class implementation(s).
- `types.ts` — supporting type aliases and option bags.
- `utils.ts` — pure helper functions.
- `constants.ts` — enums and constant maps.
- `index.ts` — barrel that re-exports the folder.
- `__tests__/` — Jest specs, mirroring the file they cover.
