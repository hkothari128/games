import { isWin } from '../../src/helpers';

describe('isWin', () => {

  it('should not detect win and return winning slots when 4 in a row not found', () => {
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

    expect(isWin(board,7,4,1)).toBe(false);
  });

  it('when 4 in a row found (horizontal), returns left-right win slots', () => {
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
    expect(isWin(board,7,4,1)).toEqual([[7,2],[7,3],[7,4],[7,5]]);
  });

  it('when 4 in a row found (vertical), returns top-bottom winslots', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,1,0,0,0,0],
      [0,0,0,1,0,0,0,0],
      [0,0,0,1,0,0,0,0],
      [0,0,0,1,0,0,0,0],
    ];
    expect(isWin(board,4,3,1)).toEqual([[4,3],[5,3],[6,3],[7,3]]);
  });

  it('when 4 in a row found (diagonal-up), returns topRight-bottomLeft winslots', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,1,0],
      [0,0,0,0,0,1,0,0],
      [0,0,0,0,1,0,0,0],
      [0,0,0,1,0,0,0,0],
    ];
    expect(isWin(board,4,6,1)).toEqual([[4,6],[5,5],[6,4],[7,3]]);
  });

  it('when 4 in a row found (diagonal-down), returns topLeft-bottomRight winslots', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [1,0,0,0,0,0,0,0],
      [0,1,0,0,0,0,0,0],
      [0,0,1,0,0,0,0,0],
      [0,0,0,1,0,0,0,0],
    ];
    expect(isWin(board,7,3,1)).toEqual([[4,0],[5,1],[6,2],[7,3]]);
  });

  it('when 4 in a row found returns false if target is opponent', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [1,0,0,0,0,0,0,0],
      [0,1,0,0,0,0,0,0],
      [0,0,1,0,0,0,0,0],
      [0,0,0,1,0,0,0,0],
    ];
    expect(isWin(board,7,3,2)).toEqual(false);
  });

  it.only('when 4 in a row found (diagonal-down), returns topLeft-bottomRight winslots(target 2)', () => {
    const board = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,2,0,0],
      [0,0,0,0,2,1,0,0],
      [0,0,0,2,1,1,0,0],
      [2,0,2,1,1,2,1,0],
    ];
    expect(isWin(board,5,4,2)).toEqual([[4,5],[5,4],[6,3],[7,2]]);
  });
});