import express from 'express'
import  http  from 'http'
import  Config  from './src/config/config.js'
import  Router  from './src/routers/routers.js'
import dotenv from 'dotenv'

class App {

  constructor() {
    dotenv.config()
    this.express = express()
    this.http = http
    this.config = new Config()
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

  async Load() {

    let dados = await this.config.Load()
    await this.StartServer(this.express, dados.port)

  }

  async StartServer(app, port) {

      this.server = this.http.createServer(app)
      this.server.listen(port)
      console.log( `Servidor rodando na porta ${port}`)

  }

}
new App().Load()
