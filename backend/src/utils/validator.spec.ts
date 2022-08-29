import { comparePasswords, isMongoDbObjectId, isValidEmail } from './validator';

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

describe('test comparePasswords', () => {
  it('should return false for non-matching passwords', async () => {
    const testPasswordComparison = await comparePasswords(
      '123987',
      '$2a$10$WFuS5uT4O9lzGPlF4NhOzOBnyCnyYwXMmY3TnNv/xdgKCHm0JkXR6',
    );
    expect(testPasswordComparison).toBe(false);
  });

  it('should return true for matching passwords', async () => {
    const testPasswordComparison = await comparePasswords(
      '123456',
      '$2a$10$WFuS5uT4O9lzGPlF4NhOzOBnyCnyYwXMmY3TnNv/xdgKCHm0JkXR6',
    );
    expect(testPasswordComparison).toBe(true);
  });
});

describe('test isMongoDbObjectId', () => {
  it('should return false for non-mongodb objectId string', async () => {
    const testMongoDbObjectId = isMongoDbObjectId('630x6693721f7fd721f9a8b0');
    expect(testMongoDbObjectId).toBe(false);
  });

  it('should return true for mongodb objectId string', async () => {
    const testMongoDbObjectId = isMongoDbObjectId('63006693721f7fd721f9a8b0');
    expect(testMongoDbObjectId).toBe(true);
  });
});
