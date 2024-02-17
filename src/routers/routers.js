// No seu arquivo routes.mjs
import  express  from "express"
import UserController from "../controller/userController.js"
import validator from "validator"

class Router {

    constructor() {

        this.router = express.Router()
        
    }

 async LoadRouter(){

    let self = this
    
        this.router.get("/api/users/:userId", async (req, res)=>{

            try {

                const isIdValid  = await validator.isUUID(req.params.userId)

                if(!isIdValid) return res.status(400).json({ error: 'Invalid user ID' })
                    
                let user_controller = new UserController()

                let result = await user_controller.GetUserById(req)
                
                return result ? res.status(200).json(result) : res.status(404).json({ error: "User not found!" })


            } catch (error) {

                console.log("Error router /api/users/", error)
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

                console.log("Erro router post /api/users", error)
                throw error
            }
        })

            
        return this.router
    }

  

}

export default  Router 
