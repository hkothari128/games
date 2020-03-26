import React from 'react';
import { render } from '@testing-library/react';

import App from '../src/app';

describe('App', () => {
  it('creates a container', () => {
    const { container } = render(<App />);
  
    expect(container.firstChild.classList.contains('app')).toBe(true);
  });

  it('creates a game board', () => {
    const { container } = render(<App />);

    expect(container.getElementsByClassName('board').length).toBe(1);
  });
});