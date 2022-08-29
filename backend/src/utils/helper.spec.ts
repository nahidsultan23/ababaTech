import { encryptPassword } from './helper';

describe('test encryptPassword', () => {
  it('should return encrypted password', async () => {
    const encryptedPassword = await encryptPassword('123456');
    const splittedEncryptedPassword = encryptedPassword.split('$');

    expect(typeof encryptedPassword).toBe('string');
    expect(splittedEncryptedPassword[1]).toBe('2a');
    expect(splittedEncryptedPassword[2]).toBe('10');
    expect(typeof splittedEncryptedPassword[3]).toBe('string');
  });
});
