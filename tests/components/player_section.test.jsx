import React from 'react';
import { render } from '@testing-library/react';

import PlayerSection from '../../src/components/player_section';

describe('Player Section', () => {
  it('creates a Player section', () => {
    const { container } = render(<PlayerSection playerId={ 1 } />);

    expect(container.firstChild.classList.contains('player-section')).toBe(true);
  });

  it('creates a Coin', () => {
    const { container } = render(<PlayerSection playerId={ 1 } />);

    expect(container.getElementsByClassName('coin').length).toBe(1); 
  });

  it('Does not display an image if player section is inactive', () => {
    const { container } = render(<PlayerSection playerId={ 1 } />);

    expect(container.getElementsByClassName('player-section__active').length).toBe(0);
  });

  it('displays an image if player section is active', () => {
    const { container } = render(<PlayerSection active playerId={ 1 } />);

    expect(container.getElementsByClassName('player-section__active').length).toBe(0);
  });
});