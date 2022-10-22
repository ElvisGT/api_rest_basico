require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { auth, categories, users,products,search} = require("../routes");
const { dbConnection } = require("../database/config");


class Server {
  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      users:'/api/usuarios',
      auth:'/api/auth',
      categories:'/api/categorias',
      products:'/api/productos',
      search:"/api/buscar"
    }
   

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
    this.app.use( this.paths.auth,auth );
    this.app.use( this.paths.search,search);
    this.app.use( this.paths.categories,categories);
    this.app.use( this.paths.products,products);
    this.app.use( this.paths.users,users );


    
  }

  listen(){
    this.app.listen( this.port,() => {
      console.log(`App corriendo en el puerto ${this.port}`)
    })
  }

}


module.exports = Server;