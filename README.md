# `@reactresume/server`

## Dev branch

Major restructuring of reactresume project.

- [ ] Hoist server to top level of workspace
- [x] Implement React Router 6
- [x] Implement Bootstrap CSS for UI components
- [ ] Implement YAML Resume document

### Instructions

#### Run dev server (Vite)

```console
npx vite --host --clearScreen=false
```

Use the included Docker Compose file:

```console
docker compose up
```

#### Build static export (Vite)

TBD

### Notes

#### Curry the action function so it can access data stored in context

See <https://stackoverflow.com/a/75808577>

- **Desired action**: Dispatch to a reducer on form submittal. The dispatch function is stored in context and available via context provider.
- **Issue**: The dispatch function stored in context is not available to the action function. Hooks are only available in function components.
- **Solution**: Have the component rendering the `RouterProvider` access the context and pass it to the form action function in the router action definition. Curry the form action function, so that it (1) accepts the dispatch function, and (2) returns an async function that performs the form submit tasks, i.e. dispatch.
