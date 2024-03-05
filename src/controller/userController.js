import { v4 as uuidv4, validate } from 'uuid'
import UserRepository from '../respository/user.js'
import HelperUser from '../controller/helper/helperUser.js'

class UserController {

    constructor(){
        
        this.user_repository = new UserRepository()
        this.helper_User =  new HelperUser()
    }

     async GetUserById(req){
        
        let retorno

        try {

            const response = await this.helper_User.IsIdValid(req.params.userId) 
            if (response && response.sucess == false) return response

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
    let data = {}
    let params = req.body

        try {

          let userResult = await this.user_repository.GetUserById(dados)
          if(userResult != null ) throw "Usuário já existe"

            if(params.email || params.password) {

               let response = await this.helper_User.ValidEmailAndPassword(params.email, params.password)
               if (response && response.sucess == false) return response

            }

            let response = await this.helper_User.CheckEmailExists(params.email, retorno)
            if (response && response.sucess == false) return response

            const userId = uuidv4()

            const hashedPasssword = await this.helper_User.PasswordCreation(params.password)

            let user = {

                id: userId,
                ...params,
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
      
        if(someFieldsNotAllowed ){

            data.sucess = false
            data.message = "Not parameter allowd"
            return data 
        } 

        if(params.email || params.password) {

            let response = await this.helper_User.ValidEmailAndPassword(params.email, params.password)
            if (response && response.sucess == false) return response      
        }

        let response = await this.helper_User.CheckEmailExists(params.email, retorno)
        if (response && response.sucess == false) return response

        let user = { ...params }

        if(params.password){

            user.password = await this.helper_User.PasswordCreation(params.password)
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

   async DeleteUserById(req){

    let retorno

    try {

        let dados = req.params.userId
        
        let response = await this.helper_User.IsIdValid(dados) 
        if (response && response.sucess == false) return response

        retorno = await this.user_repository.DeleteUserById(dados)

    } catch (error) {

        console.log(`Erro no retorno da função DeleteUserById() controller  ${error}`)
        throw error
    }
    
    return retorno
   }

   
}


export default UserController
