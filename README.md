# react-ode

Embeddable Online Development Environment (ODE) as a React component library

![demo screenshot](demo.png)

## install

if you are not already in a react app, you can create a new one with:

```bash
npx create-react-app my-react-app
```

inside your react project, install peer dependencies first:

```bash
npm i @monaco-editor/react xterm memfs @mui/material @emotion/react @emotion/styled
```

then finally:

```bash
npm i react-ode
```

## mission

goal of this project is offering a lightweight and embeddable "vscode as a react" component.

it does so by offering a rich api over the combination of the following major technologies:

- [Monaco Editor](https://www.npmjs.com/package/@monaco-editor/react): to handle the main editor user interface
- [Material UI](https://mui.com/material-ui/getting-started/installation): to handle non-editor user interfaces
- [memfs](https://github.com/streamich/memfs): to handle a virtualized filesystem for the editor
- [Cash](https://github.com/dthree/cash): to offer a virtualized busybox like shell process
- [isogit](https://github.com/isomorphic-git/isomorphic-git): for git commands in shell
- [XtermJS](https://xtermjs.org): to handle rendering a virtualized terminal process

this is a visual component, meant to be embedded in higher order components and projects to build rich experiences.
