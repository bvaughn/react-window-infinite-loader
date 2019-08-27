import isInteger from '../isInteger';

describe('isInteger', () => {
  it('string value is not an integer', () => {
    expect(isInteger('test')).toBe(false);
  });
  it('float value is not an integer', () => {
    expect(isInteger(1.2)).toBe(false);
  });
  it('undefined value is not an integer', () => {
    expect(isInteger(undefined)).toBe(false);
  });
  it('integer value is an integer', () => {
    expect(isInteger(1)).toBe(true);
  });
});
