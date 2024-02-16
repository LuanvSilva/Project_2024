// No seu arquivo routes.mjs
import  express  from "express"
import UserController from "../controller/userController.js"
import validator from "validator"

class Router {

    constructor() {

        this.router = express.Router()
        this.app = express()   
        
    }

 async LoadRouter(){

    let self = this
    
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

        this.router.post( "/api/users", async (req, res) =>{

            let params = req.body

            try {

                const emailIsValid = validator.isEmail(params.email)
                const passwordIsValid = params.password.length

                if (!emailIsValid){
                    
                    return res.status(400).json({err:"Invalid e-mail. Please provid a valid one."})
                }

                if(passwordIsValid < 6){

                    return res.status(400).json({err: "Password too short! It must contain at least 6 characters."})
                 
                }

                let user_controller = new UserController()

                let result = await user_controller.CreateUser(req)
                
                return res.status(201).json(result)

            } catch (error) {

                console.log("Erro na rota post /api/users", error)
                throw error
            }
        })

            
        return this.router
    }

  

}

export default  Router 
