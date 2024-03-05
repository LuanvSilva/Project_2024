import UserRepository from  '../respository/user.js'
import HelperUser from '../controller/helper/helperUser.js'
import TransactionsRepository from '../respository/transaction.js'

class TransactionsController{

    constructor(){

        this.transactions = new TransactionsRepository()
        this.user_repository = new UserRepository()
        this.helper_User =  new HelperUser()

    }

    async CreateTransaction(req) {

        try {
            
            let retorno
            const params = req.body
            retorno = await this.user_repository.GetUserById(params.user_id)
            if(!retorno) throw "User já existe"
            
            let result = await this.transactions.CreateTransaction(params)
    
            return result
    
        } catch (error) {
    
            console.error(`Erro na função CreateTransaction() do controller: ${error}`)
            throw error
    
        }
    }
}

export default TransactionsController