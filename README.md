# NGRXUsersOrders

Angular + NgRx home exercise demonstrating clean state management, derived selectors, and effect-driven I/O with cancellation.

## Architecture
- **NgRx Entity** for normalized Users and Orders.
- **Effects** handle all I/O (no services in components).
- **Selectors** provide view models (no ad-hoc derivations in UI).
- **Container/presentational split:** `user-orders` container + `user-name`, `user-total` dumb components.
- **OnPush** everywhere; lists use `trackBy`.

## Features
- Load Users & Orders on startup.
- Select a user, edit name; **Save** updates same `id`. **Clear** → next Save creates a new user.
- Derived selectors: selected user’s orders and aggregated total.
- **Cancellation:** selecting a new user cancels the previous details request using `switchMap`.

## Cancellation Explained
1. `setSelectedUser({ userId })` dispatches.
2. Effect dispatches `loadUserDetails({ userId })`.
3. Effect listens to `loadUserDetails` and calls `userService.getUserDetails(userId)` inside **`switchMap`**.
4. If selection changes mid-flight, `switchMap` **unsubscribes** the prior HTTP call → no stale updates.

## Security & Perf
- No secrets/tokens in store or code.
- Runtime immutability/serializability checks ON.
- Pure reducers; deterministic updates; idempotent by `id`.
- DevTools enabled only in dev; tracing limited.


## Run
```bash
npm install
ng serve
