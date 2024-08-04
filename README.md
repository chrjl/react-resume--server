# `@reactresume/server`

Resume generator built on [React Router 6](https://reactrouter.com), [Bootstrap 5](https://getbootstrap.com), and a bespoke React component library that utilizes [styled-components](https://styled-components.com). Accepts files of [JSON Resume](https://jsonresume.org) format from remote URLs or local file uploads.

💻 [Try out the app](https://chrjl.github.io/reactresume)

---

This project depends on the following subprojects:

- [`@reactresume/template`](https://github.com/chrjl/reactresume--template)
- [`@reactresume/jsonresume-parser`](https://github.com/chrjl/reactresume--jsonresume-parser)

and shared libraries:

- [`@reactresume/components`](https://github.com/chrjl/reactresume--components)
- [`@reactresume/types`](https://github.com/chrjl/reactresume--types)

and is scaffolded as a [pnpm workspace](https://pnpm.io/workspaces).

## Development

> [!NOTE]
> The `BrowserRouter` is run at a subdirectory (default `reactresume`) for compatibility with Github pages. See notes on how to [run](#run-dev-server) and [visit](#visit-the-dev-server) the dev server.

> [!WARNING]
> The Vite `base` and `BrowserRouter` `basename` need to be kept consistent and explicitly set in case deployments are made to subdirectories (i.e. Github pages).
>
> - Vite `base` sets the basename of public assets. Relative links are preferred (in case of deployment to subdirectories), but this requires explicitly setting the base during build.
> - React Router `BrowserRouter` basename needs to be explicitly set in order to deploy to subdirectory.

Additional tasks:

- [ ] Generate PDF
  - Generate HTML from `<Document />` using [`react-print`](https://www.npmjs.com/package/@onedoc/react-print)
  - Generate PDF from HTML using [`react-print`](https://react-pdf.org/) and [`react-pdf-html`](https://www.npmjs.com/package/react-pdf-html)

### Instructions

#### Install dependencies (set up pnpm workspace)

- Clone this repo, fetch workspace packages (submodules), and check for updates to submodules.

  ```console
  git clone --recurse-submodules git@github.com:chrjl/reactresume.git
  ```

  or

  ```console
  git clone git@github.com:chrjl/reactresume.git

  cd reactresume/
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

#### Run dev server

Install dependencies, including local workspace packages

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

#### Visit the dev server

For compatibility with `gh-pages`, the `BrowserRouter` base path needs to be set to run the router at a subdirectory that matches the repo name.

If the dev port is `5173` and the `basepath` is set to `reactresume`, the dev server will be accessible at: <http://localhost:5173/reactresume>

#### Live update changes in dependency (workspace) packages

Using TypeScript watch server

#### Build static export (Vite)

- Build all dependency projects (`tsc`): run `npm run build` in each package directory (`packages/`)
- Build this project (`vite build`): `npm run build`

#### Deploy to Github Pages

```
npm deploy
```

### Styling/spacing

Use CSS variables to set grid and flexbox spacing for components from the `@reactresume/components` library. Scope as necessary, according to section `#id` or component `.className`.

- `StackedCards` - flexbox spacing via `--stacked-card-gap`
- `GridCards` - grid spacing via `--grid-card-gap`
- `DefinitionTable` - column width via `--definition-title-width`, row spacing via `--definition-item-gap`

### Notes

#### Curry the action function so it can access data stored in context

See <https://stackoverflow.com/a/75808577>

- **Desired action**: Dispatch to a reducer on form submittal. The dispatch function is stored in context and available via context provider.
- **Issue**: The dispatch function stored in context is not available to the action function. Hooks are only available in function components.
- **Solution**: Have the component rendering the `RouterProvider` access the context and pass it to the form action function in the router action definition. Curry the form action function, so that it (1) accepts the dispatch function, and (2) returns an async function that performs the form submit tasks, i.e. dispatch.
