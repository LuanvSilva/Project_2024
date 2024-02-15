import User from  '../respository/user.js'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt';

class UserController {

     async GetUser(req){
        
        let retorno

        try {

            let user_repository = new User()
            let dados = req.body
            retorno = await user_repository.GetUser(dados)

        } catch (error) {

            retorno = false
            console.log(`Erro no retorno da função GetUser() controller  ${error}`)
        }
        
        return retorno
    }

   async CreateUser(req){

    let retorno

        try {

            const createUserParams = req.body

            const userId = uuidv4()

            const hashedPasssword = await bcrypt.hash(createUserParams.password, 10)

            let user = {
               id: createUserParams.ID,
               first_name : createUserParams.first_name,
               lastName: createUserParams.last_name,
               email: createUserParams.email,
               password: hashedPasssword
            }

            let user_repository = new User()

            retorno = await user_repository.CreateUser(user)

        } catch (error) {

            retorno = false
            console.log(`Erro no retorno da função CreateUser() controller  ${error}`)
        }
        
        return retorno
   }
}

export default UserController
