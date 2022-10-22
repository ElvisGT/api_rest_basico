const { Product, Categoria } = require("../models");

const getProducts = async (req, res) => {
  const { start = 0, limit = 10 } = req.query;

  const [total,products] = await Promise.all([
    Product.countDocuments({state:true}),
    Product.find({state:true})
      .skip(start)
      .limit(limit)
      .populate("category", "name")
      .populate("usuario", "name")
  ]);


  res.json({
    total,
    products,
  });
};

const getProduct = async(req, res) => {
  const {id} = req.params;

  //Buscar en la BD
  const product = await Product.findById(id)
                                .populate("usuario","name")
                                .populate("category","name");

  res.json({product});
};

const createProduct = async (req, res) => {
  const { usuario,...body} = req.body;

  //Generar data
  const data = {
    ...body,
    name:body.name.toUpperCase(),
    usuario: req.userAuth._id,
  };

  //Verificar si existe ese producto
  const findedProduct = await Product.findOne({ name: body.name });

  if (findedProduct) {
    return res.status(400).json({
      msg: "El producto ya existe",
    });
  }

  //Guardar en BD
  const product = new Product(data);
  await product.save();

  res.status(201).json({
    msg: product,
  });
};

const updateProduct = async (req, res) => {
  const { usuario,...body } = req.body;
  const {id} = req.params;
  
  //Verificar si el nombre no existe
  const isProduct = await Product.findOne({ name: body.name });

  if (isProduct) {
    return res.status(400).json({
      msg: "El nombre de producto ya existe",
    });
  }

  //Generar data
  const data = {
    ...body,
    name:body.name.toUpperCase(),
    usuario: req.userAuth._id,
  };

  //Guardar en BD
  const updatedProduct = await Product.findByIdAndUpdate(id,data,{ new: true });

  res.json({
    updatedProduct,
  });
};

const deleteProduct = async(req, res) => {
 const {id} = req.params;

 //Borrar de la BD
 const deletedProduct = await Product.findByIdAndUpdate(id,{state:false});

 res.json(deletedProduct);
};

module.exports = {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
};
