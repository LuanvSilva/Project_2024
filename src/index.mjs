import express from 'express'
import http from 'http'
import Config from './config/config.mjs'
import Router from './routes/routes.mjs'

class App {

  constructor() {

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
    await this.ExecutarServidor(this.express, dados.db.port)
    

  }


  async ExecutarServidor(app, port) {

      this.server = this.http.createServer(app)
      this.server.listen(port)
      console.log( `Servidor rodando na porta ${port}`)

  }

}

new App().Load()
