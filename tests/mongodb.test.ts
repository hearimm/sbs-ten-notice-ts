import { MongoClient } from 'mongodb';

describe('insert', () => {
  require('dotenv').config()

  let MONGO_URI = process.env.MONGO_URI
  let MONGO_DB_NAME = 'sbs-ten-notice'
  let connection;
  let db;

  beforeAll(async () => {

    connection = await MongoClient.connect(MONGO_URI, {
      useNewUrlParser: true,
    });
    db = await connection.db(MONGO_DB_NAME);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');
    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });

//   it('should delete collection', async () => {
//     const users = db.collection('users');

//     const mockUser = {_id: 'some-user-id', name: 'John'};
//     await users.deleteMany({});

//     const insertedUser = await users.find({});
//     expect(insertedUser.count()).toBe(0);
//   });
});