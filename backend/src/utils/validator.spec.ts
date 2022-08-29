import { isValidEmail } from './validator';

describe('test isValidEmail', () => {
  it('should return error for no @ and .', async () => {
    const testEmail = isValidEmail('ababatech');
    expect(testEmail).toBe(null);
  });

  it('should return error for no @', async () => {
    const testEmail = isValidEmail('ababatech.com');
    expect(testEmail).toBe(null);
  });

  it('should return error for no .', async () => {
    const testEmail = isValidEmail('ababatech@ababa');
    expect(testEmail).toBe(null);
  });

  it('should not return error for proper email address', async () => {
    const testEmail = isValidEmail('nahid@ababatech.com');
    expect(testEmail).not.toBe(null);
  });
});
