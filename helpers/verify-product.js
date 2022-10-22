const mongoose = require("mongoose");
const {Product} = require("../models");

const isProductExists = async( id = '') => {
  
  if(mongoose.isValidObjectId(id)){

    const product = await Product.findById(id);

    if(!product){
      throw new Error("El id del producto no existe")
    }
  }
}


module.exports = {
  isProductExists
}