const mongoose = require("mongoose");

const dbConnection = async () => {

  try {
    
    //Esta es la conexion online
    // await mongoose.connect(process.env.MONGODB_CNN);

    //Esta es la conexion en local
    await mongoose.connect(process.env.MONGO_LOCAL)

    console.log("Conexion a la base de datos exitosa");

  } catch (error) {
      console.error(error);
      throw new Error("Error al conectar con la base de datos");
  }

};


module.exports = {
  dbConnection
};