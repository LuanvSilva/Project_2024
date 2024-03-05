import MongoPool from "../db/postgres/MongoPool.js"

class TransactionsRepository extends MongoPool{

    constructor(){
        super()
        this.conn = new MongoPool()
    }


async CreateTransaction(params) {

    try {

        const conn = await this.getConnection("transactions")
        const result = await conn.insertOne({...params, created_at: new Date()}) 

        if (result != null && result.insertedId) {

            const insertedItem = await conn.findOne({_id: result.insertedId})
            
            return insertedItem
        }

        return null

    } catch (error) {
        
        console.error("Erro ao executar a função CreateTransaction() - " + error)
        throw error

    } finally{
    
        this.closeConnection()
    }
}

}
export default TransactionsRepository