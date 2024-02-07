// No seu arquivo routes.mjs
import  express  from "express"


class Router {

    constructor() {
        this.router = express.Router()
        this.app = express()   
        
    }

 async LoadRouter(){
    
        this.router.get("/", (req, res)=>{

            res.end('Hello word')

        })

        this.router.post( "/teste", (req, res) =>{

            const data = req.body
            console.log(data)
            res.status(200).write("Ok")

        })

            

        return this.router
    }

  

}

export default Router
