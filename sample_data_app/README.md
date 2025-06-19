# MS2 Sample Data App

This is a sample data app used to demonstrate how an analysis from a package published to the MS2 platform can be easily embedded into a dashboard. Follow instructions in the root [Embedded Data Apps README](../READMEs/embedded_data_apps.md) to achieve this.

NOTE: before running this, make sure you copy `.env.example` to `.env` and fill in the values so that the Malloy Samples dashboard will render correctly. You will set the `DEFAULT_ORGANIZATION` to the organization that was given to you for the demo.

This app is based on the [Material UI - Vite.js in TypeScript example](https://github.com/mui/material-ui/tree/master/examples/material-ui-vite-ts).

*What follows is standard docs for the Material UI example.*

## How to use

Download the example [or clone the repo](https://github.com/mui/material-ui):

<!-- #default-branch-switch -->

```bash
curl https://codeload.github.com/mui/material-ui/tar.gz/master | tar -xz --strip=2 material-ui-master/examples/material-ui-vite-ts
cd material-ui-vite-ts
```

Install it and run:

```bash
npm install
npm run dev
```

or:

<!-- #default-branch-switch -->

[![Edit on StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mui/material-ui/tree/master/examples/material-ui-vite-ts)

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/mui/material-ui/tree/master/examples/material-ui-vite-ts)

## The idea behind the example

This example uses [Vite.js](https://github.com/vitejs/vite).
It includes `@mui/material` and its peer dependencies, including [Emotion](https://emotion.sh/docs/introduction), the default style engine in Material UI v6.

