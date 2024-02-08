import { DateDifferencePipe } from './date-difference.pipe';

describe('DateDifferencePipe', () => {
  let pipe: DateDifferencePipe;

  beforeEach(() => {
    pipe = new DateDifferencePipe();
  });

  it('transforms the difference time between published date and current date', () => {
    const UnmockedDate = Date;

    spyOn(<any>window, 'Date').and.returnValues(
      // seconds case
      new UnmockedDate('2024-01-20T12:00:00Z'),
      new UnmockedDate('2024-01-20T12:00:05Z'),

      // minutes case
      new UnmockedDate('2024-01-20T12:00:00Z'),
      new UnmockedDate('2024-01-20T12:05:05Z'),

      // hours case
      new UnmockedDate('2024-01-20T11:00:00Z'),
      new UnmockedDate('2024-01-20T12:05:05Z'),

      // days case
      new UnmockedDate('2024-01-20T12:00:00Z'),
      new UnmockedDate('2024-01-21T12:05:05Z'),

      // months case
      new UnmockedDate('2024-01-20T12:00:00Z'),
      new UnmockedDate('2024-02-20T12:00:00Z'),

      // years case
      new UnmockedDate('2023-01-20T12:00:00Z'),
      new UnmockedDate('2024-01-20T12:00:00Z')
    );

    expect(pipe.transform('2024-01-20T12:00:00Z')).toBe('5 seconds ago');
    expect(pipe.transform('2024-01-20T12:00:00Z')).toBe('5 minutes ago');
    expect(pipe.transform('2024-01-20T12:00:00Z')).toBe('1 hours ago');
    expect(pipe.transform('2024-01-20T12:00:00Z')).toBe('1 days ago');
    expect(pipe.transform('2024-01-20T12:00:00Z')).toBe('1 months ago');
    expect(pipe.transform('2024-01-20T12:00:00Z')).toBe('1 years ago');
  });
});
