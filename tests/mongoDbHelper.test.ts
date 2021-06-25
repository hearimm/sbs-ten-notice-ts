import { clearCollection, deleteManyById, getCollectionCount, insertMany, insertOne } from '../src/services/db/mongoDbHelper';

describe('mongoDb helper Test', () => {
    process.env.TEST_SUITE = 'mongodb-helper'
  
    test('should clear collection before test', async () => {
      const result = await clearCollection('users');
      expect(result.result.ok).toBe(1)
    });
  
    test('should insertOne', async () => {
      const mockUser = {_id: 'some-user-id', name: 'John'};
      const result = await insertOne('users',mockUser)
      expect(result.result.ok).toBe(1)
    });
  
    test('should insertMany and DeleteMany', async () => {
      const mockUser = [{_id: '1', name: 'John'}, {_id: '2', name: 'John2'}];
      const result = await insertMany('insertMany',mockUser)
      expect(result.result.ok).toBe(1)
      expect(result.insertedCount).toBe(2)

      const insertCount = await getCollectionCount('insertMany')
      expect(insertCount).toBe(2)

      const delResult = await deleteManyById('insertMany', ['1','2'])
      expect(delResult.result.ok).toBe(1)
      expect(delResult.deletedCount).toBe(2)
      const delCount = await getCollectionCount('insertMany')
      expect(delCount).toBe(0)
    });
  
    test('should clear collection after test', async () => {
      const result = await clearCollection('users');
      expect(result.result.ok).toBe(1)
      const count = await getCollectionCount('users')
      expect(count).toBe(0)
    });
  
  })
  