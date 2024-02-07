
 class Config{

    constructor(){
  
    }

    async Load(){

        let config = {}
        config.db = {}
        config.db.host = process.env.HOST || '0.0.0.0'
        config.db.port = process.env.PORT || 3000
        config.db.database = process.env || null
        config.db.password = process.env || null
        config.db.user = process.env || 'postgres'
        

        return config

    }

}



 export default   Config   