import React from 'react';
import { render } from '@testing-library/react';

import Coin from '../../src/components/coin';

describe('Coin', () => {
  it('creates a coin div ', () => {
    const { container } = render(<Coin playerId={ 1 } />);
  
    expect(container.firstChild.classList.contains('coin')).toBe(true);
  });

  it('creates a coin div with proper player modifier ', () => {
    const { container } = render(<Coin playerId={ 4 } />);
  
    expect(container.firstChild.classList.contains('coin')).toBe(true);
    expect(container.firstChild.classList.contains('coin--4')).toBe(true);
  });
})
