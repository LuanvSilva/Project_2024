import UserRepository from  '../respository/user.js'
import HelperUser from '../controller/helper/helperUser.js'
import TransactionsRepository from '../respository/transaction.js'

class TransactionsController{

    constructor(){

        this.transactions = new TransactionsRepository()
        this.user_repository = new UserRepository()
        this.helper =  new HelperUser()

    }

    async CreateTransaction(req) {

        try {
            
            let retorno
            const params = req.body
            retorno = await this.user_repository.GetUserById(params.user_id)
            if(!retorno) throw "User não existe"
            
            let result = await this.transactions.CreateTransaction(params)
    
            return result
    
        } catch (error) {
    
            console.error(`Erro na função CreateTransaction() do controller: ${error}`)
            throw error
    
        }
    }

    
   async UpdateUserById(req, userId){

    let retorno
    let data = {}
    let params = req.body

    try {

        this.helper.IsIdValid(req.params.userId)  

        
        retorno = await this.user_repository.UpdateUserById(user, userId)

        if(retorno == false){
            
            data.sucess = false
            data.message = "Error excuted query in database"
            return data 
        }
        

    } catch (error) {

        console.log(`Erro return function UpdateUserById() controller  ${error}`)
        throw error
    }
    
    return retorno
   }

}

export default TransactionsController