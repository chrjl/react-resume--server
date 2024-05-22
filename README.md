# `@reactresume/server`

## Dev branch

Major restructuring of reactresume project.

- [x] Hoist server to top level of workspace.

  Dependencies include subprojects:

  - [ ] @reactresume/template
  - [x] @reactresume/jsonresume-parser

  and shared libraries:

  - [x] @reactresume/components
  - [x] @reactresume/types

- [x] Implement React Router 6
- [x] Implement Bootstrap CSS for UI components
- [ ] Implement YAML Resume document

### Instructions

#### Install dependencies (pnpm workspace)

- Clone this repo, fetch workspace packages (submodules), and check for updates to submodules.

  ```console
  git clone --recurse-submodules git@github.com:chrjl/reactresume--workspace.git
  ```

  or

  ```console
  git clone git@github.com:chrjl/reactresume--workspace.git

  cd reactresume--workspace/
  git submodule update --init
  ```

- Pull updates to submodules

  ```console
  git submodule update --remote
  ```

- To work on individual projects, checkout the main branch and (optionally) branch off of it.

  ```console
  git submodule foreach git checkout main
  ```

#### Run dev server (Vite)

Install dependencies, including workspace internal-scoped packages

```console
pnpm install
```

Run the dev server

```console
npx vite --host --clearScreen=false
```

- or, using the included Docker Compose file (default port 5173)

  ```console
  REACTRESUME_PORT=5173 docker compose up -d
  ```

#### Live update changes in dependency (workspace) packages

Using TypeScript watch server

#### Build static export (Vite)

TBD

### Notes

#### Curry the action function so it can access data stored in context

See <https://stackoverflow.com/a/75808577>

- **Desired action**: Dispatch to a reducer on form submittal. The dispatch function is stored in context and available via context provider.
- **Issue**: The dispatch function stored in context is not available to the action function. Hooks are only available in function components.
- **Solution**: Have the component rendering the `RouterProvider` access the context and pass it to the form action function in the router action definition. Curry the form action function, so that it (1) accepts the dispatch function, and (2) returns an async function that performs the form submit tasks, i.e. dispatch.
