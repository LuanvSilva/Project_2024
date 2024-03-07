import  express  from "express"
import UserController from "../controller/userController.js"
import TransactionsController from "../controller/transactionController.js"

class Router{

    constructor() {
        
        this.router = express.Router()  
    }

 async LoadRouterUser(){

    this.router.get("/api/users/:userId", async (req, res)=>{

        try {

            let user_controller = new UserController()
            let result = await user_controller.GetUserById(req)
            return  res.json(result)

        } catch (error) {

            console.error("Erro ao processar a requisição:", error)
            return res.status(500).json({ error: `Erro interno do ${error}` })
        }

    })

    this.router.post( "/api/users", async (req, res) =>{

        try {

            let user_controller = new UserController()
            let result = await user_controller.CreateUser(req)
            return res.json(result)

        } catch (error) {

            console.error("Erro ao processar a requisição:", error)
            return res.status(500).json({ error: `Erro interno do ${error}` })
        }
    })

    this.router.patch("/api/users/:userId", async (req, res)=>{

        try {
            let user_controller = new UserController()
            let result = await user_controller.UpdateUserById(req, req.params.userId)
            return res.json(result)

        } catch (error) {

            console.error("Erro ao processar a requisição:", error)
            return res.status(500).json({ error: `Erro interno do ${error}` })
        }
    })

    this.router.delete( "/api/users/:userId", async (req, res) =>{

        try {
            let user_controller = new UserController()
            let result = await user_controller.DeleteUserById(req)
            return res.json(result)

        } catch (error) {

            console.error("Erro ao processar a requisição:", error)
            return res.status(500).json({ error: `Erro interno do ${error}` })
        }  
    })

    return this.router
 }

 async LoadRouterTransaction(){

    this.router.post("/api/transactions", async (req, res) => {

        try {
            let user_controller = new TransactionsController()
            const result = await user_controller.CreateTransaction(req)
            return res.json(result)

        } catch (error) {

            console.error("Erro ao processar a requisição:", error)
            return res.status(500).json({ error: `Erro interno do ${error}` })
        }
    })

    return this.router

 }

  

}

export default  Router 
