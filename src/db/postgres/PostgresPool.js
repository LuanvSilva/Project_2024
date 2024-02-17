import pg from 'pg'
const { Pool } = pg

class PostgresPool{

    constructor(){

    }

    async Connection(){

        this.connection = new Pool({
            port: process.env.POSTGRES_PORT,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            host: process.env.POSTGRES_HOST
        })

        return this.connection

    }

    async Query(query, params){

        try {
            
            const client = await  this.connection.connect()
            const result = await  client.query(query, params)

            await client.release()

            return result

        } catch (error) {

            console.log(`Erro na query: ${error}`)
        }

        
    }


}

export default PostgresPool