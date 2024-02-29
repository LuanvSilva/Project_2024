import Dao from "../util/Dao.js";

class User extends Dao{

    constructor(){
        super()
    }

    async GetUserById(userId){

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

    async GetUserByEmail(email){

        let retorno = new Array()
        
        try {

            const result = await this.Query("SELECT * FROM users WHERE  email = $1", [ email ])

            return result ? result.rows[0] : false
           
        } catch (error) {
            
            retorno = false
            console.error(error)
            throw error
        }

    }

    async CreateUser(createUserParams){

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

            const result = await this.Query("SELECT * FROM users WHERE  id= $1", [ createUserParams.id ])
            return result ? result.rows[0] : false


        } catch (error) {
        
            console.error(error)
            throw error
        }
 
    }

    async UpdateUserById(params, userId){

        let retorno = new Array()
        
        try {
            const updateFilds = new Array()
            const updateValues = new Array()
            
            Object.keys(params).forEach((key)=>{
                updateFilds.push(`${key} = $${updateValues.length  + 1}`)
                updateValues.push( params[key] )   
            })

            updateValues.push(userId)
            
            let query = `
            UPDATE users SET ${updateFilds.join(", ")} WHERE ID = $${updateValues.length} RETURNING *`  

            const result = await this.Query(query, updateValues)
            return result ? result.rows[0] : false
    
        } catch (error) {
            
            retorno = false
            console.error(error)
            throw error
        }

    }

    async DeleteUserById(id){

        let data = new Object()
        
        try {
            
            const result = await this.Query("DELETE FROM users WHERE id = $1 RETURNING *", [id])

            if(result && result.rows.length){

                data.dados = result.rows[0]
                data.success = true
            }else{

                data.message = "User Not Found"
                data.success = false
            }

            return data
    
        } catch (error) {
            
            retorno = false
            console.error(error)
            throw error
        }


    }
}

export default User