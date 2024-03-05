import mongoose from "mongoose"

class MongoPool {
  constructor() {

    this.connection = null
  }

  async getConnection(collection) {
    try {

        let mongoPool = await mongoose.createConnection(process.env.MONGO_STRING, {
            maxPoolSize: 50,
            wtimeoutMS: 2500,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        
        this.connection = mongoPool
        let mongoConnection = await mongoPool.collection(collection)

      return mongoConnection
    } catch (error) {
      console.error(`Error conect ing to MongoDB: ${error}`)
    }
     
  }

  async closeConnection(conn) {

    try {

      await this.connection.close()
      console.log('Conexão com o MongoDB encerrada com sucesso!')

    } catch (error) {
        console.error('Erro ao encerrar a conexão com o MongoDB:', error)
        throw error
    }
  }

}

export default MongoPool

