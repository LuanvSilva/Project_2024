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

        this.router.post( "/clientes/[id]/transacoes", (req, res) =>{

            const data = req.body
            console.log(data)
            res.json()

        })

            

        return this.router
    }

  

}

export default  Router 
