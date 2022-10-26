const { response } = require("express");
const fs = require("fs");
const path = require("path");
const { uploadFile,findModel } = require("../helpers");

const loadFile = async(req,res) => {

  try{

    const name = await uploadFile(req.files,'png');
    res.json({ name })
  
  }catch(msg){
    res.status(400).json({msg});
  }

}

const updateFile = async(req, res = response) => {
  const {id, coleccion} = req.params;
  
  const model = await findModel(id,coleccion,res);

  //Limpiar archivos basura
  if(model.img){
    const pathFile = path.join(__dirname,'../uploads/',coleccion,model.img);

    if(fs.existsSync(pathFile)){
      fs.unlinkSync(pathFile);
    }
  }

  const name = await uploadFile(req.files,coleccion,undefined);
  model.img = name;

  await model.save();


  res.json({model});

}


const getFiles = async(req, res = response) => {
  const {id,coleccion} = req.params;

  const model = await findModel(id,coleccion,res);

  //Limpiar archivos basura
  if(model.img){
    const pathFile = path.join(__dirname,'../uploads/',coleccion,model.img);

    if(fs.existsSync(pathFile)){
      res.sendFile( pathFile );
    }
  }

  const pathPlaceHolder = path.join(__dirname,'../assets/13.1 no-image.jpg.jpg');

  res.sendFile(pathPlaceHolder);

  
}


module.exports = {
  getFiles,
  loadFile,
  updateFile,
}