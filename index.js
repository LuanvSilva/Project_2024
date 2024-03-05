import express from 'express'
import  http  from 'http'
import  Router  from './src/routers/routers.js'
import dotenv from 'dotenv'

class App {

  constructor() {
    dotenv.config()
    this.express = express()
    this.http = http
    this.Middlawares()
    this.Routes()

  }

  async Middlawares(){

    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))

  }

  async Routes(){

    this.routers = new Router()
    this.express.use('/', await this.routers.LoadRouter())
  }


  async StartServer() {

      this.server = this.http.createServer(this.express)
      this.server.listen(process.env.PORT)
      console.log( `Servidor rodando na porta ${process.env.PORT}`)

  }

}
new App().StartServer()
