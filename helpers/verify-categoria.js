const {Categoria} = require("../models");
const mongoose = require("mongoose")

const isExists = async( id ) => {

  if(mongoose.Types.ObjectId.isValid(id)){

    const isCat = await Categoria.findById(id);
    
    if(!isCat){
      throw new Error("No existe esa categoria");
    }
  }
}

module.exports = {
  isExists,
}