import  express  from "express"
import UserController from "../controller/userController.js"
import validator from "validator"
import Exception from "../util/Error.js"
import HelperUser from "../controller/helper/helperUser.js"

class Router{

    constructor() {

        this.router = express.Router()
        this.user_controller = new UserController()
        this.helper_User = new HelperUser()
        
    }

 async LoadRouter(){

    let self = this
    
        this.router.get("/api/users/:userId", async (req, res)=>{

            try {

                this.helper_User.IsIdValid(req.params.userId)  

                let result = await this.user_controller.GetUserById(req)
                
                return result ? res.status(200).json(result) : res.status(404).json({ error: "User not found!" })


            } catch (error) {

                console.log("Error router /api/users/", error)
                throw error
 
            }
    
        })

        this.router.post( "/api/users", async (req, res) =>{

            let params = req.body

            try {

                if(params.email || params.password) {

                    await this.helper_User.ValidEmailAndPassword(params.email, params.password)

                }

                let result = await this.user_controller.CreateUser(req)
                
                return res.status(201).json(result)

            } catch (error) {

               if(error instanceof Exception) return res.status(401).json({ message: error.message })
            }   
                
        })

        this.router.patch("/api/users/:userId", async (req, res)=>{

            let params = req.body

            try {

                this.helper_User.IsIdValid(req.params.userId)  

                const allowedFields = ['first_name', 'last_name','email', 'password']

                const someFieldsNotAllowed = Object.keys(params).some((fieldName) => !allowedFields.includes(fieldName))
              
                if(someFieldsNotAllowed) res.status(400).json({ error : "Invalid field"})

        
                if(params.email || params.password) {

                    await this.helper_User.ValidEmailAndPassword(params.email, params.password)
                }

                let result = await this.user_controller.UpdateUserById(req, req.params.userId)
                
                return res.status(201).json(result)

            } catch (error) {

               if(error instanceof Exception) return res.status(401).json({ message: error.message })
            }   
        })

            
        return this.router
    }

  

}

export default  Router 
