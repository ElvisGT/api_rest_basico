const { response } = require("express");
const { Usuario, Product } = require("../models");

const findModel = async(id, coleccion,res = response) => {
  let model;

    switch (coleccion) {
      case "usuarios":
        model = await Usuario.findById(id);

        if (!model) {
          return res.status(400).json({
            msg:`No existe el usuario con el id ${id}`
          })
        }

        break;

      case "productos":
        model = await Product.findById(id);

        if (!model) {
          return res.status(400).json({
            msg:`No existe el producto con el id ${id}`
          })
        }

        break;
    }

    return model;
};

module.exports = {
  findModel,
};
