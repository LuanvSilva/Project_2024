// No seu arquivo routes.mjs
import  express  from "express"
import UserController from "../controller/userController.js"

class Router {

    constructor() {
        this.router = express.Router()
        this.app = express()   
        
    }

 async LoadRouter(){
    
        this.router.get("/", async (req, res)=>{

            try {

                let user_controller = new UserController()

                let result = await user_controller.GetUser(req)
        
                if (result != false) {
        
                    res.end(JSON.stringify(result.rows))
                }

            } catch (error) {

                console.log("Erro no get da rota /", error)
                throw error
 
            }
    
        })

        this.router.post( "/users", async (req, res) =>{

            try {

                let user_controller = new UserController()

                let result = await user_controller.CreateUser(req)
        
                if (result != false) {
        
                    res.end(JSON.stringify(result.rows))
                }

            } catch (error) {

                console.log("Erro no get da rota /", error)
                throw error
 
            }
            res.json()

        })

            

        return this.router
    }

  

}

export default  Router 
