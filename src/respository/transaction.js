import MongoPool from "../db/postgres/MongoPool.js"
import TransactionModel from "../db/postgres/models/Transaction.js"

class TransactionsRepository extends MongoPool{

    constructor(){
        super()
        this.conn = new MongoPool()
    }


async CreateTransaction(params) {

    try {

        let modelTrasanction = new TransactionModel('create')
        const conn = await this.getConnection("transactions", modelTrasanction.SetTransaction())

        const insertData = {
            ...params,
            created_at: new Date(),
        }
      
        const createdTransaction = await conn.create(insertData)
      
        if (createdTransaction) {

            return await conn.findOne({ _id: createdTransaction._id })
        }

        return null

    } catch (error) {
        
        console.error("Erro ao executar a função CreateTransaction() - " + error)
        throw error

    } finally{
    
        this.closeConnection()
    }
}

async UpdateTransaction(params, userId) {

    try {
        const updateFilds = new Array()
        const updateValues = new Array()

        for (const key of Object.keys(params)) {

            updateFilds.push(`${key} = $${updateValues.length + 1}`);
            updateValues.push(params[key]);
        }

        updateValues.push(userId)



        return null

    } catch (error) {
        
        console.error("Erro ao executar a função UpdateTransaction() - " + error)
        throw error

    } finally{
    
        this.closeConnection()
    }
}

}
export default TransactionsRepository