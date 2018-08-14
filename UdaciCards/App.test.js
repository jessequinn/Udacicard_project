import React from '../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import App from './App';

import renderer from '../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
