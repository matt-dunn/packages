# @matt-dunn/react-wireframes [![Actions Status](https://github.com/matt-dunn/packages/workflows/CI/badge.svg)](https://github.com/matt-dunn/packages/actions) [![NPM Package](https://badge.fury.io/js/%40matt-dunn%2Freact-wireframes.svg)](https://www.npmjs.com/package/@matt-dunn/react-wireframes)

React component to annotate your components — useful for prototypes and proof of concepts.

---

[e2e test results](https://matt-dunn.github.io/packages/packages/react-wireframes/e2e/)

[Storybook](https://matt-dunn.github.io/packages/storybook/?path=/docs/matt-dunn-react-wireframes/)

[Demo](https://matt-dunn.github.io/packages/packages/react-wireframes/examples/)

[Docs](https://matt-dunn.github.io/packages/packages/react-wireframes/docs/)

[CodePen](https://codepen.io/matt-j-dunn/pen/NWqZmQY?editors=0010)

---

## Getting Started

```sh
npm install --save @matt-dunn/react-wireframes
```

or

```sh
yarn add @matt-dunn/react-wireframes
```

### Annotate a component

```jsx
const AnnotatedMyComponent = withWireframeAnnotation({
    title: "MyComponent title",
    description: "MyComponent description.",
})(MyComponent);
```

### Wrap your application with the container

```jsx
  <WireframeContainer>
    <AnnotatedMyComponent />
    {/*...application*/}
  </WireframeContainer>
```

## API

See [Storybook](https://matt-dunn.github.io/packages/storybook/?path=/docs/matt-dunn-react-wireframes/).

## Example Implementation

This example shows a set of components annotated using ```react-wireframes```. 

![](https://raw.githubusercontent.com/matt-dunn/packages/HEAD/packages/react-wireframes/docs/assets/react-wireframes.gif)


## Simple bare-bones example

```jsx
import ReactDOM from "react-dom";
import React from "react";

import {
    WireframeContainer, withWireframeAnnotation,
} from "@matt-dunn/react-wireframes";

const MyComponent = () => <article>Hello world</article>;

const AnnotatedMyComponent = withWireframeAnnotation({
    title: "MyComponent title",
    description: "MyComponent description.",
})(MyComponent);

const app = (
  <WireframeContainer>
      <AnnotatedMyComponent />
  </WireframeContainer>
);

ReactDOM.render(
  app,
  document.getElementById("app"),
);
```

## License

The MIT License (MIT) Copyright (c) 2020 [Matt Dunn](https://matt-dunn.github.io/)


