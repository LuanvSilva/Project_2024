import pg from 'pg'
import Config from '../../config/config.js'
const { Pool } = pg

class PostgresPool{

    constructor(){

        this.config = new Config()
    }

    async Connection(){

        const dados = await this.config.Load()
        this.connection = new Pool({
            port: dados.bd.port,
            user: dados.bd.user,
            password: dados.bd.password,
            database: dados.bd.database,
            host: dados.bd.host
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