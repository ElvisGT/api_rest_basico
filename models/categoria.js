const { Schema, model } = require("mongoose");

const CategoriaSchema = new Schema({
  name:{
    type:String,
    required:[true,"El nombre es requerido"],
    unique:true
  },
  state:{
    type:Boolean,
    default:true,
    required:true
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:"Usuario",
    required:true
  }
});

CategoriaSchema.methods.toJSON = function(){
  const {__v,_id,state,...rest} = this.toObject();
  return rest;
}

const Categoria = model("Categoria",CategoriaSchema);

module.exports = Categoria;