import mongoose from "mongoose"

class MongoPool {
  constructor() {

    this.connection = null
  }

  async getConnection(collection) {

    let mongoPool = await mongoose.createConnection(process.env.MONGO_STRING, {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    this.connection = mongoPool
    let mongoConnection = await mongoPool.collection(collection);

    return mongoConnection
  }

  async closeConnection(conn) {

    this.connection.close(() => {
     
    })
  }

}

export default MongoPool

