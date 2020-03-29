import React from 'react';
import { render } from '@testing-library/react';

import Board from '../../src/components/board';

describe('Board', () => {
  it('creates a Board div', () => {
    const { container } = render(<Board />);
  
    expect(container.firstChild.classList.contains('board')).toBe(true);
  });

  describe('When no props given', () => {
    it('creates a board with 8 rows and 8 slots in each row', () => {
      const { container } = render(<Board />);

      expect(container.getElementsByClassName('board__row').length).toBe(8);
      expect(container.getElementsByClassName('board__slot').length).toBe(8*8);
    });
  });

  it('creates a board with c rows and r slots for each row', () => {
    const r = 10;
    const c = 6;
    const { container } = render(<Board rows={ r } columns={ c } />);

    expect(container.getElementsByClassName('board__row').length).toBe(c);
    expect(container.getElementsByClassName('board__slot').length).toBe(r*c);
  });
  
});