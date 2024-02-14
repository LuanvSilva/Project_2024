import 'dotenv/config.js'
import fs from 'fs'
import path from 'path'
import  PostgresPool from '../PostgresPool.js'
import { fileURLToPath } from 'url'


class ExecMigrations{

    constructor(){

        this.postgres = new PostgresPool()
        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)
        this.dirname = __dirname

    }

    async Load(){
        
        try {

            await this.postgres.Connection()

            const filePath = path.join(this.dirname, '01-init.sql')

            let script = fs.readFileSync(filePath, 'utf-8')

            let result = await this.postgres.Query(script)
            
            console.log( `${script} executed succesfully!` )

        } catch (error) {
            
            console.log('Error on load migrations: ', error)
            throw error

        }
    }

}

new ExecMigrations().Load()