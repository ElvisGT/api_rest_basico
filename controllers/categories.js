const {Categoria} = require("../models")


const getCat = async(req,res) => {
  //Paginado
  const {limit = 10,desde=0} = req.query;

    
  const [total,categorias] = await Promise.all([
    await Categoria.countDocuments({state:true}),
    await Categoria.find({state:true})
                    .populate('user','name')
                    .skip(desde)
                    .limit(limit)
  ])
                                    

   res.json({
    total,
    categorias,
  });
}

const getCatID = async(req,res) => {
  const {id} = req.params;
  
  const categoriaID = await Categoria.findById(id)
                                      .populate('user','name');
  
  res.json({
    categoriaID
  })
}

const createCat = async(req,res) => {
  const name = req.body.name.toUpperCase();

  const categoriaDB = await Categoria.findOne({ name });

  if(categoriaDB){
    return res.status(400).json({
      msg:`La categoria ${ name } ya existe en la base de datos`
    })
  }

  //Generar data a guardar
  const data = {
    name,
    user:req.userAuth._id
  }

  //Guardar en DB
  const categoria = new Categoria(data);
  await categoria.save();

  res.status(201).json(categoria);
}

const updateCat = async(req,res) => {
  const {id} = req.params;
  const name = req.body.name.toUpperCase();

  //Generar data
  const data = {
    name,
    user:req.userAuth._id
  }

  //Verificar si es un nombre unico
  const isUnic = await Categoria.findOne({name});

  if(isUnic){
    return res.status(400).json({
      msg:"El nombre ya existe"
    })
  }
 
  const categoriaUpdated = await Categoria.findByIdAndUpdate(id,data,{new:true});

  res.status(201).json(categoriaUpdated);
}

const deleteCat = async(req,res) => {
  const {id} = req.params;

  //Buscar en la Db
  const categoriaDeleted = await Categoria.findByIdAndUpdate(id,{state:false});

  res.json({
    msg:categoriaDeleted
  })
}

module.exports = {
  createCat,
  getCat,
  getCatID,
  updateCat,
  deleteCat
}