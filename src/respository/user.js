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
}

export default User