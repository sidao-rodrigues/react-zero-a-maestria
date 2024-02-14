//libs and commmands
/**
 * npm i jest @types/jest -D
 * npm i @testing-library/jest-dom @testing-library/react @testing-library/user-event -D
 * npm i @babel/core @babel/preset-env @babel/preset-react babel-jest identity-obj-proxy jest-environment-jsdom -D
 * npm install --save-dev @babel/preset-typescript
 */

import { render } from '@testing-library/react';

import Button from '../button';

describe('Test Button', () => {
  it('teste render', () => {
    render(<Button />);
    expect(1).toBe(1);
  });
});
