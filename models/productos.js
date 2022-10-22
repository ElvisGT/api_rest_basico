const { Schema, model} = require("mongoose");

const ProductSchema = new Schema({
  name:{
    type:String,
    required:[true,"El nombre es obligatorio"],
    unique:true
  },
  state:{
    type:Boolean,
    default:true,
    required:true
  },
  usuario:{
    type:Schema.Types.ObjectId,
    ref:"Usuario",
    required:true
  },
  price:{
    type:Number,
    default:0
  },
  category:{
    type:Schema.Types.ObjectId,
    ref:"Categoria",
    required:true
  },
  description:{type:String},
  disponibilidad:{
    type:Boolean,
    default:true
  }

});

ProductSchema.methods.toJSON = function (){
  const {__v,_id,state,...rest} = this.toObject();
  
  return rest;
}

const Product = model("Producto",ProductSchema);

module.exports = Product;