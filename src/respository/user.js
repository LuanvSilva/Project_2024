import Dao from "../util/Dao.js";

class User extends Dao{

    constructor(){
        super()
    }

    async GetUser(dados){

        let params = []
        let retorno = new Array()
        
        let query = 'SELECT * FROM USERS'

        try {

            retorno = await this.Query(query, params)
            console.log(retorno.rows)


        } catch (error) {
            
            retorno = false
            console.error(error)
            throw error
        }

       return retorno 
    }

    async CreateUser(createUserParams){

        let params = []
        let retorno = new Array()

        try {

            retorno = await this.Query('INSERT INTO users (ID, first_name, last_name, email, password) VALUES (1$, 2$, 3$ ,4$, 5$) ',
            [[ID, first_name, last_name, email, password] = createUserParams])

            console.log(retorno.rows)


        } catch (error) {
            
            retorno = false
            console.error(error)
            throw error
        }

       return retorno 
    }
}

export default User