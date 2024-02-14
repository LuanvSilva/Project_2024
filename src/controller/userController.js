import User from  '../respository/user.js'

class UserController {

     async GetUser(req){
        
        let retorno

        try {

            let user = new User()
            let dados = req.body
            retorno = user.GetUser(dados)


        } catch (error) {

            retorno = false
            console.log(`Erro no retorno da função GetUser() controller  ${error}`)
        }
        
        return retorno
    }
}

export default UserController
