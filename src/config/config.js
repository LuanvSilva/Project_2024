
 class Config{

    constructor(){
  
    }

    async Load(){

        let config = {}

        config.port = 3000

        config.bd = {}
        config.bd.host = process.env.POSTGRES_HOST 
        config.bd.port = process.env.POSTGRES_PORT 
        config.bd.database = process.env.POSTGRES_DATABASE 
        config.bd.password = process.env.POSTGRES_PASSWORD 
        config.bd.user = process.env.POSTGRES_USER 
        

        return config

    }

}



 export default   Config   