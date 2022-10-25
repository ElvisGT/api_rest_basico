const {isValidObjectId} = require("mongoose");
const {Usuario,Product,Categoria} = require("../models");

const searchID = async(termino,model) => {
  const isMongo = isValidObjectId(termino);

  if(isMongo){
    let value = [];

    switch(model){
      case 'Categoria':
        value = await Categoria.findById(termino);
      break;

      case 'Product':
        value = await Product.findById(termino);

        if(!value) {
          value = await Product.find({category:termino}).populate("category","name");
        }
      break;

      case 'Usuario':
        value = await Usuario.findById(termino);
      break;
    }
    
    return value;
  }

  return false;

}

module.exports = {
  searchID
}