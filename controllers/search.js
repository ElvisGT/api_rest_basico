const { isValidObjectId } = require("mongoose");
const {Usuario, Product, Categoria} = require("../models");
const {searchID} = require("../helpers/search-ID");

const collectionsAllowed = [
  'usuarios',
  'productos',
  'categorias',
  'roles'
]

const searchUser = async(termino, res) => {
  const usuarios = await searchID(termino,"Usuario");

  if(usuarios){
    return res.json({
      results:[usuarios]
    })
  }


  const regex = new RegExp(termino,'i');
  
  const allUsuarios = await Usuario.find({
    $or:[{name:regex},{email:regex}],
    $and:[{state:true}]
  });

  res.json({
    results:allUsuarios
  })

}

const searchProducts = async(termino,res) => {
  const productos = await searchID(termino,"Product");

  if(productos){
    return res.json({
      results:[productos]
    })
  }

  const regex = new RegExp(termino,'i');

  const allProducts = await Product.find({
    $and:[{name:regex},{state:true}]
  })

  res.json({
    results:allProducts
  })
}

const searchCategory = async(termino,res) => {
  const categorias = await searchID(termino,"Categoria");

  if(categorias){
    return res.json({
      results:[categorias]
    })
  }

  const regex = new RegExp(termino,'i');
  const allCategorias = await Categoria.find({
    $and:[{state:true},{name:regex}]
  })

  res.json({
    results:allCategorias
  })
}

const search = ( req, res) => {
  const {coleccion,termino} = req.params;

  //Verificar si existe la coleccion
  if(!collectionsAllowed.includes(coleccion)){
    return res.status(400).json({
      msg:`Las colecciones permitidas son: ${collectionsAllowed}`
    })
  }

  switch(coleccion){
    case 'productos':
      searchProducts(termino,res);
    break;
    case 'usuarios':
      searchUser(termino,res)
    break;
    case 'categorias':
      searchCategory(termino,res);
    break;

    default:
      res.status(500).json({
        msg:"Busqueda por implementar"
      })
  }

 
}


module.exports = {
  search
}