import  express  from "express"
import UserController from "../controller/userController.js"
class Router{

    constructor() {

        this.router = express.Router()
        this.user_controller = new UserController()
        
    }

 async LoadRouter(){
    
        this.router.get("/api/users/:userId", async (req, res)=>{
            
            let result = await this.user_controller.GetUserById(req)
            
            return  res.status(200).json(result)
  
        })

        this.router.post( "/api/users", async (req, res) =>{

            let result = await this.user_controller.CreateUser(req)
            
            return res.status(201).json(result)
                
        })

        this.router.patch("/api/users/:userId", async (req, res)=>{

            let result = await this.user_controller.UpdateUserById(req, req.params.userId)

            return res.status(201).json(result)

        })

            
        return this.router
    }

  

}

export default  Router 
