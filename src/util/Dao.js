import PostgresPool from "../db/postgres/PostgresPool.js"


class Dao {

    constructor(){
    
        let postgres = new PostgresPool()
        this.conn = postgres.Connection()
    }


    async Query(sql, params) {
        return (await this.conn).query(sql, params)
    }

    async BeginTransaction() {
        (await this.conn).beginTransaction()
    }

    async Commit() {
        (await this.conn).commit()
    }

    async Rollback() {
        (await this.conn).rollback()
    }
}

export default Dao