import User from  '../respository/user.js'
import { v4 as uuidv4 } from 'uuid'
import HelperUser from './helper/helperUser.js'

class UserController {

    constructor(){
        this.user_repository = new User()
        this.helper_User = new HelperUser()
    }

     async GetUserById(req){
        
        let retorno

        try {

            this.helper_User.IsIdValid(req.params.userId) 

            let dados = req.params.userId
            retorno = await this.user_repository.GetUserById(dados)

        } catch (error) {

            console.log(`Erro no retorno da função GetUserById() controller  ${error}`)
            throw error
        }
        
        return retorno
    }

   async CreateUser(req){

    let params = req.body
    let retorno

        try {

            if(params.email || params.password) {

                await this.helper_User.ValidEmailAndPassword(params.email, params.password)

            }

            let createUserParams = req.body

            await this.helper_User.CheckEmailExists(createUserParams.email, retorno)

            const userId = uuidv4()

            const hashedPasssword = await this.helper_User.PasswordCreation(createUserParams.password)

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
    let data = {}
    let params = req.body

    try {

        this.helper_User.IsIdValid(req.params.userId)  

        const allowedFields = ['first_name', 'last_name','email', 'password']

        const someFieldsNotAllowed = Object.keys(params).some((fieldName) => !allowedFields.includes(fieldName))
      
        if(someFieldsNotAllowed == false){

            data.sucess = false
            data.message = "Not parameter allowd"
            return data 
        } 

        if(params.email || params.password) {

            await this.helper_User.ValidEmailAndPassword(params.email, params.password)
        }

        let updateUserParams = req.body

        await this.helper_User.CheckEmailExists(updateUserParams.email, retorno)

        let user = { ...updateUserParams }

        if(updateUserParams.password){

            user.password = await this.helper_User.PasswordCreation(updateUserParams.password)
        }
        
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


export default UserController
