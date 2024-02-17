import User from  '../respository/user.js'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt';

class UserController {

     async GetUser(req){
        
        let retorno

        try {

            let user_repository = new User()
            let dados = req.params.userId
            retorno = await user_repository.GetUserById(dados)

        } catch (error) {

            console.log(`Erro no retorno da função GetUserById() controller  ${error}`)
            throw error
        }
        
        return retorno
    }

   async CreateUser(req){

    let retorno

        try {

            const createUserParams = req.body

            let user_repository = new User()

            retorno = await user_repository.GetUserByEmail(createUserParams.email)

            if (retorno) throw Error('The provided e-mail is already in use')
            
            const userId = uuidv4()

            const hashedPasssword = await bcrypt.hash(createUserParams.password, 10)

            let user = {
                id: userId,
                ...createUserParams,
                password: hashedPasssword
            }

            retorno = await user_repository.CreateUser(user)
         

        } catch (error) {

            console.log(`Erro no retorno da função CreateUser() controller  ${error}`)
            throw error
        }
        
        return retorno
   }
}

export default UserController
