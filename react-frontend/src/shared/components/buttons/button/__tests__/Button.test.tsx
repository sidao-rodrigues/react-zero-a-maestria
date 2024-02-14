//libs and commmands
/**
 * npm i jest @types/jest -D
 * npm i @testing-library/jest-dom @testing-library/react @testing-library/user-event -D
 * npm i @babel/core @babel/preset-env @babel/preset-react babel-jest identity-obj-proxy jest-environment-jsdom -D
 * npm install --save-dev @babel/preset-typescript
 */

import { render, screen } from '@testing-library/react';

import Button from '../button';

const TEXT_MOCK = 'TEXT_MOCK';
const TEST_ID = 'TEST_ID';
const MARGIN = '23px';

describe('Test Button', () => {
  beforeEach(() => {
    render(
      <Button data-testid={TEST_ID} margin={MARGIN}>
        {TEXT_MOCK}
      </Button>,
    );
  });

  it('should render', () => {
    expect(screen.getByText(TEXT_MOCK)).toBeDefined();
  });

  it('should render with margin', () => {
    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('style', `margin: ${MARGIN};`);
  });
});
