# UI Schema Examples

[![Github actions Build](https://github.com/ui-schema/demo-cra-ts/actions/workflows/blank.yml/badge.svg)](https://github.com/ui-schema/demo-cra-ts/actions)

Advanced usages and examples for [@ui-schema/react](https://github.com/ui-schema/ui-schema) in TypeScript, with [@mui](https://mui.com), see [demo-cra](https://github.com/ui-schema/demo-cra) for simpler non-TS examples.

Files in `src`:

- [main.tsx](./src/main.tsx) provider setup, e.g. `UIMetaProvider`
- [routes.ts](./src/routes.ts)
- [App.tsx](./src/App.tsx) layout and router setup
- [components/UISchema.tsx](./src/components/UISchema.tsx) UI-Schema binding setup
- example pages:
    - [pages/PageSimpleForm.tsx](./src/pages/PageSimpleForm.tsx), automatic rendered, usage of `WidgetCountrySelect`
    - [pages/PageCustomForm.tsx](./src/pages/PageCustomForm.tsx), custom rendered, usage of `WidgetCountrySelect`
    - [pages/PageCustomUpload.tsx](./src/pages/PageCustomUpload.tsx), custom rendered, native file upload widget
    - [pages/PageRefForm.tsx](./src/pages/PageRefForm.tsx), example of `$ref` with embedded `$defs`
    - [pages/PageRefRemoteForm.tsx](./src/pages/PageRefRemoteForm.tsx), example of `$ref` with loading remote schema resources
- widget in: [Widgets/](./src/components/Widgets)
    - [WidgetCountrySelect.tsx](./src/components/Widgets/WidgetCountrySelect.tsx), uses an API to populate the `Select` options

Run on [CodeSandbox](https://codesandbox.io/s/github/ui-schema/demo-cra-ts/tree/master/?autoresize=1&fontsize=12&hidenavigation=1&module=%2Fsrc%2Fpages%2FPageSimpleForm.tsx) or [StackBlitz](https://stackblitz.com/github/ui-schema/demo-cra-ts).

Explore more:

- [Quick Start](https://ui-schema.bemit.codes/quick-start?ds=mui)
- [Core Project](https://github.com/ui-schema/ui-schema)

## Setup

Install dependencies:

```shell
npm i
```

Start dev server:

```shell
npm start
```

Create bundle:

```shell
npm run build
```

For tests first install a playwright browser:

```shell
npx playwright install chromium --with-deps
```

Then run tests:

```shell
npm test
```

Or run tests in watch mode:

```shell
npm run tdd
```

