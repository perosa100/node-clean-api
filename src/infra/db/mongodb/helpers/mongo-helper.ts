import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },
  map: (collection: any): any => {
    //  console.log('account', account)
    const { _id, ...collectionWithoutId } = collection
    //  console.log('accountWithoutId', Object.assign({}, accountWithoutId, { id: _id }))

    return Object.assign({}, collectionWithoutId, { id: _id })
  }

}
