import pg from 'pg'
const { Pool } = pg
import util  from 'util'

class PostgresPool{

    constructor(){

    }

    async Connection(){

        const connection = new Pool({
            port: process.env.POSTGRES_PORT,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            host: process.env.POSTGRES_HOST
        })

        process.on('SIGINT', () => {
            connection.end()
            process.exit(0)
          })

        return {
            query( sql, args ) {
              return util.promisify( connection.query ).call( connection, sql, args )
            },
            beginTransaction() {
              return util.promisify( connection.beginTransaction ).call( connection )
            },
            commit() {
              return util.promisify( connection.commit ).call( connection )
            },
            rollback() {
              return util.promisify( connection.rollback ).call( connection )
            }
          }
        }

}



export default PostgresPool