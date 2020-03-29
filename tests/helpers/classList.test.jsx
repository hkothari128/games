import { classList } from '../../src/helpers';
import { string } from 'prop-types';

describe('classList', () => {
  it('returns a string', () => {
    expect(typeof classList('test', {})).toBe('string');
  });

  it('returns the original classname', () => {
    expect(classList('test', {})).toBe('test');
  });

  it('returns a modifier key appended to className if modifier value is truthy', () => {
    expect(classList('test', { passed: true })).toBe('test test--passed');
  });

  it('returns a modifier value appended to className if modifier value is truthy', () => {
    const passed = 3;
    expect(classList('test', { [passed]: passed })).toBe('test test--3');
  });

  it('Does not return a modifier appended to className if modifier value is falsy', () => {
    let nullVal;
    expect(classList('test', { passed: true, failed: false, nullVal })).toBe('test test--passed');
  });
});