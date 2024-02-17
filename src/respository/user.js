import Dao from "../util/Dao.js";

class User extends Dao{

    constructor(){
        super()
    }

    async GetUser(userId){

        let retorno = new Array()
        
        try {

            retorno = await this.Query("SELECT * FROM users WHERE  id= $1", [ userId ])

           return retorno = retorno ? retorno.rows[0] : false
    
        } catch (error) {
            
            retorno = false
            console.error(error)
            throw error
        }

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

            retorno = await this.Query("SELECT * FROM users WHERE  id= $1", [ createUserParams.id ])

            return retorno = retorno ? retorno.rows[0] : false


        } catch (error) {
        
            console.error(error)
            throw error
        }
 
    }
}

export default User