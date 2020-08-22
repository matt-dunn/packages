import React from 'react';
import {addDecorator, addParameters} from '@storybook/react';
import styled from "@emotion/styled";
import { withA11y } from '@storybook/addon-a11y';

import { ErrorBoundary } from "@matt-dunn/error";

import "bootstrap/dist/css/bootstrap.min.css";

const AppError = ({ error }: {error: Error}) => (
  <>
    <h1>An error occurred</h1>
    <p>
      DEBUG:
      {error.message}
    </p>
  </>
);

const Main = styled.div`
  padding: 20px;
`;

addDecorator(story => (
    <Main>
      {story()}
    </Main>
));

// addDecorator(withA11y);

addParameters({
  a11y: {},
});
