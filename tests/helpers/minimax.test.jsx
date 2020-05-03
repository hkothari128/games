import { boardWin, isTerminal, minimax } from '../../src/helpers/minimax';

describe('boardWin', () => {
  it('returns true for horizontal win', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,1,1,1,1,0,0],
    ];

    expect(boardWin(board, 1)).toBe(true);
  });

  it('returns true for vertical win', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,1],
      [0,0,0,0,0,0,0,1],
      [0,0,0,0,0,0,0,1],
      [0,0,0,0,0,0,0,1],
    ];

    expect(boardWin(board, 1)).toBe(true);
  });


  it('returns true for diagonal up win', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,1,0,0,0,0],
      [0,0,1,2,0,0,0,0],
      [0,1,2,2,0,0,0,0],
      [1,2,2,2,0,0,0,0],
    ];

    expect(boardWin(board, 1)).toBe(true);
  });

  it('returns true for diagonal down win', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,1,0,0,0],
      [0,0,0,0,2,1,0,0],
      [0,0,0,0,2,2,1,0],
      [0,0,0,0,2,2,2,1],
    ];

    expect(boardWin(board, 1)).toBe(true);
  });
  

  it('returns false if not connected 4', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,1,1,1,0,0,0],
    ];

    expect(boardWin(board, 1)).toBe(false);
  });
})

describe('isTerminal', () => {
  it('should return 1 when playerId = 1 and win', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,2,2,2,2,0,0],
      [0,0,1,1,1,1,0,0],
    ];

    expect(isTerminal({board}, 1, [0,1,2,3,4,5,6,7])).toEqual(1);
  });

  it('should return 2 when playerId = 2 and win', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,2,2,2,2,0,0],
      [0,0,1,1,1,1,0,0],
    ];

    expect(isTerminal({board}, 2, [0,1,2,3,4,5,6,7])).toEqual(2);
  });

  it('should return -1 when no win', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,2,2,2,0,0],
      [0,0,1,1,1,0,0],
    ];

    expect(isTerminal({board}, 1, [0,1,2,3,4,5,6,7])).toEqual(-1);
  });

  it('should return 0 when no valid rows', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,2,2,2,0,0],
      [0,0,1,1,1,0,0],
    ];

    expect(isTerminal({board}, 1, [])).toEqual(0);
  });
});

describe.only('minimax', () => {
  it('returns correct score and choice for given configuration (depth 1)', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,2,0,0,1,1,0,0],
    ];
    const top = [7,6,7,7,6,6,7,7];

    expect(minimax({board, top}, 1, -Infinity, Infinity, 2, true, null, null, 2, 1)).toEqual([0,2])
  });

  it('returns correct score and choice for given configuration (depth 1) for minimizing player', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [2,2,0,0,1,1,0,0],
    ];
    const top = [6,6,7,7,6,6,7,7];

    expect(minimax({board, top}, 1, -Infinity, Infinity, 1, false, null, null, 2, 1)).toEqual([3,-8])
  });

  it('returns correct score and choice for given configuration (depth 2)(horizontal block)', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,2,0,0,1,1,0,0],
    ];
    const top = [7,6,7,7,6,6,7,7];

    expect(minimax({board, top}, 2, -Infinity, Infinity, 2, true, null, null, 2, 1)[0]).toEqual(3)
  })

  it('returns correct score and choice for given configuration (depth 2)(vertical block)', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,1,0,0],
      [0,2,0,0,0,1,0,0],
      [0,2,0,0,0,1,0,0],
    ];
    const top = [7,5,7,7,7,4,7,7];

    expect(minimax({board, top}, 2, -Infinity, Infinity, 2, true, null, null, 2, 1)[0]).toEqual(5);
  })
  it('returns correct score and choice for given configuration (depth 2)(diagonal block)', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,1,2],
      [0,2,0,0,0,1,2,1],
      [0,2,0,0,1,1,2,1],
    ];
    const top = [7,5,7,7,6,5,4,4];

    expect(minimax({board, top}, 2, -Infinity, Infinity, 2, true, null, null, 2, 1)[0]).toEqual(7);
  })
});
