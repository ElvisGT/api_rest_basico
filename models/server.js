require("dotenv").config();
const express = require("express");
const cors = require("cors");

const users = require("../routes/users");
const { dbConnection } = require("../database/config");


class Server {
  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/usuarios';

    //Conexion con base de datos
    this.connectDB();

    //Uso de middlewares
    this.middlewares();
    
    //Rutas de la app
    this.routes();
  }

  async connectDB(){
    await dbConnection();
  }

  middlewares(){
    this.app.use( express.static('public') );

    //Lectura y parseo del body
    this.app.use( express.json() );

    //Uso de cors
    this.app.use( cors() );
  }

  routes(){
   this.app.use( this.usersPath,users )
  }

  listen(){
    this.app.listen( this.port,() => {
      console.log(`App corriendo en el puerto ${this.port}`)
    })
  }

}


module.exports = Server;