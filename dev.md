# Trailfinder Developer Documentation

## Introduction
In this document, we will discuss the development of Trailfinder. Trailfinder is a web application that allows users to search for backpacking trips all around the world. The application is built using the [Next.js](https://nextjs.org/) framework, which is built on [React](https://reactjs.org/) and supports server-side rendering. We use [firebase](https://console.firebase.google.com/project/gruppe64-hiking-app/overview) to store our data and authenticate users. We also use [TailwindCSS](https://tailwindcss.com/) with [DaisyUI](https://daisyui.com/) to style our application, and [Typescript](https://www.typescriptlang.org/) to write our code.

## Useful links
- [Gitlab issues](https://gitlab.stud.idi.ntnu.no/tdt4140-2023/landsby-4/gruppe-64/hiking-app/-/issues)
- [Gitlab repository](https://gitlab.stud.idi.ntnu.no/tdt4140-2023/landsby-4/gruppe-64/hiking-app)
- [DaisyUI](https://daisyui.com/docs/customize/)
- [TailwindCSS](https://tailwindcss.com/docs/installation)
- [React](https://reactjs.org/docs/getting-started.html)
- [Next.js](https://nextjs.org/docs/getting-started)
- [Firebase](https://console.firebase.google.com/project/gruppe64-hiking-app/overview)
- [Typescript](https://www.typescriptlang.org/docs/)

## Extensions for vscode
- [Tailwind CSS IntelliSense](vscode:extension/bradlc.vscode-tailwindcss)
- [Prettier - Code formatter](vscode:extension/esbenp.prettier-vscode)
- [ESLint](vscode:extension/dbaeumer.vscode-eslint)
- [Javascript and Typescript Nightly](vscode:extension/ms-vscode.vscode-typescript-next)
- [Color Highlight](vscode:extension/naumovs.color-highlight)
- [Console Ninja](vscode:extension/WallabyJs.console-ninja)
- [GitLens](vscode:extension/eamodio.gitlens)
- [Color Picker](vscode:extension/anseki.vscode-color)
- [Live share](vscode:extension/ms-vsliveshare.vsliveshare)

## How to run the application

If you are running the application for the first time, you need to install the dependencies. This can be done by running the following command in the root folder of the project:

``` bash
npm install
```
After the dependencies are installed, you can run the application by running the following command:
``` bash
npm run dev
```

## Common issues with EsLint

If you are facing issues with EsLint, you can try to fix them by running the following command:
``` bash
npx eslint . --fix
```
If that still does not fix it, the following states some common issues and how to fix them.
### __React must be in scope when using JSX__
This error occurs when you use JSX without importing React. To fix this error, you can add the following line at the top of the file:
``` jsx
import React from 'react';
```

### __Button is missing an explicit type attribute__
This error occurs when you use a button without specifying the type attribute. This is a common error when using Next.js, since the default type of a button is "submit". To fix this error, you can add the type attribute to the button, like this:
``` jsx
<button type="button">Click me</button>
```

### __Button has an onClick handler but does not have an accessible name__
This error occurs when you use a button without specifying the text inside the button. To fix this error, you can add the text inside the button, like this:
``` jsx
<button>Click me</button>
```
If you want to use an icon inside the button, you can add the aria-label attribute to the button, like this:
``` jsx
<button aria-label="Click me"><Icon /></button>
```
Or you can simply add a title attribute to the icon, like this:
``` jsx
<button title="Click me" /><Icon /></button>
```
(Note! This will give the icon a tooltip when you hover over it, which is not always desirable.)

### __A form label must be associated with a control__
This error occurs when you use a label without specifying the htmlFor attribute. To fix this error, you can add the htmlFor attribute to the label, like this:
``` jsx
<label htmlFor="input">Input</label>
<input id="input" />
```
Note that this will still cause an error, since the input is not within the label. To fix this, you can wrap the input inside the label, like this:
``` jsx
<label htmlFor="input">Input
  <input id="input" />
</label>
```
Also note that both name and id can be used on the input element, but you should use id, since name is deprecated.

### __An input element must be accompanied by a label element__
This error occurs when you use an input without specifying the label. To fix this error, you can add the label, like this:
``` jsx
<label htmlFor="input">Input</label>
<input id="input" />
```
Note that this will still cause an error, since the input is not within the label. To fix this, you can wrap the input inside the label, like this:
``` jsx
<label htmlFor="input">Input
  <input id="input" />
</label>
```
Also note that both name and id can be used on the input element, but you should use id, since name is deprecated.

[//]: <> (Todo: Add link to where the webpage is hosted)
[//]: <> (Todo: Add documentation for how to test the application)