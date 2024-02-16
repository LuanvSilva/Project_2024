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

            await this.Query("INSERT INTO users (ID, first_name, last_name, email, password) VALUES ($1, $2, $3 ,$4, $5)",
                [   
                    createUserParams.id, 
                    createUserParams.first_name,
                    createUserParams.last_name,
                    createUserParams.email,
                    createUserParams.password    
                ]
            )

            retorno = await this.Query("SELECT * FROM users WHERE  id= $1",[ createUserParams.id ])

            console.log(retorno[0])


        } catch (error) {
            
            retorno = false
            console.error(error)
            throw error
        }

       return retorno.rows[0] 
    }
}

export default User