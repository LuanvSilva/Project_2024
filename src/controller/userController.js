import User from  '../respository/user.js'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import Exception from '../util/Error.js'

class UserController {

    constructor(){
        this.user_repository = new User()
    }

     async GetUser(req){
        
        let retorno

        try {

            let dados = req.params.userId
            retorno = await this.user_repository.GetUserById(dados)

        } catch (error) {

            console.log(`Erro no retorno da função GetUserById() controller  ${error}`)
            throw error
        }
        
        return retorno
    }

   async CreateUser(req){

    let retorno

        try {

            const params = req.body


            retorno = await this.user_repository.GetUserByEmail(params.email)

            if (retorno) throw new Exception(`The ${params.email} e-mail is already in use`, "email already registered")

            const userId = uuidv4()

            const hashedPasssword = await bcrypt.hash(createUserParams.password, 10)

            let user = {
                id: userId,
                ...createUserParams,
                password: hashedPasssword
            }

            retorno = await this.user_repository.CreateUser(user)
         

        } catch (error) {

            console.log(`Erro return function CreateUser() controller  ${error}`)
            throw error
        }
        
        return retorno
   }
}

export default UserController
