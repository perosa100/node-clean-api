import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('Post/  signup', () => {
    test('Should return an account on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'pp',
          email: 'pp@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })
  describe('Post/  login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'pp',
        email: 'pp_pp@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'pp_pp@gmail.com',
          password: '123'
        })
        .expect(200)
    })
  })
})
