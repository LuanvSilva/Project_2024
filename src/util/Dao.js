import PostgresPool from "../db/postgres/PostgresPool.js";


class Dao extends PostgresPool{

    constructor(){
        super()

        this.postgres = new PostgresPool()
    }

    async Query(sql, params) {

        this.conn = await this.postgres.Connection()
        return await this.postgres.Query(sql, params)
    }

    async BeginTransaction() {
        (await this.conn).beginTransaction()
    }

    async Close() {
        (await this.conn).close()
    }

    async Commit() {
        (await this.conn).commit()
    }

    async Rollback() {
        (await this.conn).rollback()
    }
}

export default Dao