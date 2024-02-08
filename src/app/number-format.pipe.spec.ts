import { NumberFormatPipe } from './number-format.pipe';

describe('NumberFormatPipe', () => {
  let pipe: NumberFormatPipe;

  beforeEach(() => {
    pipe = new NumberFormatPipe();
  });

  it('transforms large numbers into abbreviated format correctly', () => {
    expect(pipe.transform(1000)).toBe('1K');
    expect(pipe.transform(1500)).toBe('1K');
    expect(pipe.transform(9999)).toBe('9K');
    expect(pipe.transform(10000)).toBe('10K');
    expect(pipe.transform(15000)).toBe('15K');
    expect(pipe.transform(999999)).toBe('999K');
    expect(pipe.transform(1000000)).toBe('1M');
    expect(pipe.transform(1500000)).toBe('1M');
    expect(pipe.transform(9999999)).toBe('9M');
    expect(pipe.transform(10000000)).toBe('10M');
  });

  it('transforms small numbers as is', () => {
    expect(pipe.transform(0)).toBe('0');
    expect(pipe.transform(999)).toBe('999');
  });
});
