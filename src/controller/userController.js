import User from  '../respository/user.js'
import { v4 as uuidv4 } from 'uuid'
import HelperUser from './helper/helperUser.js'

class UserController extends HelperUser{

    constructor(){
        super()
        this.user_repository = new User()
    }

     async GetUserById(req){
        
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

            let createUserParams = req.body

            await this.CheckEmailExists(createUserParams.email, retorno)

            const userId = uuidv4()

            const hashedPasssword = await this.PasswordCreation(createUserParams.password)

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

   async UpdateUserById(req, userId){

    let retorno

    try {

        let updateUserParams = req.body

        await this.CheckEmailExists(updateUserParams.email, retorno)

        let user = { ...updateUserParams }

        if(updateUserParams.password){

            user.password = await this.PasswordCreation(updateUserParams.password)
        }
        
        retorno = await this.user_repository.UpdateUserById(user, userId)
        

    } catch (error) {

        console.log(`Erro return function UpdateUserById() controller  ${error}`)
        throw error
    }
    
    return retorno
   }
}


export default UserController
