
 class Config{

    constructor(){
  
    }

    async Load(){

        let config = {}

        config.port = 3000

        config.bd = {}
        config.bd.host = process.env.POSTGRES_HOST || 'localhost'
        config.bd.port = process.env.POSTGRES_PORT || 5432
        config.bd.database = process.env.POSTGRES_DATABASE || 'financeapp'
        config.bd.password = process.env.POSTGRES_PASSWORD || 'password'
        config.bd.user = process.env.POSTGRES_USER || 'root'
        

        return config

    }

}



 export default   Config   