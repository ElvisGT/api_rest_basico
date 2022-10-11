const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name:{
    type:String,
    required:[true,'Este campo es obligatorio']
  },
  password:{
    type:String,
    required:[true,'Este campo es obligatorio']
  },
  email:{
    type:String,
    required:[true,'Este campo es obligatorio'],
    unique:true
  },
  img:{
    type:String,
  },
  rol:{
    type:String,
    emun:["ADMIN_ROLE","USER_ROLE"]
  },
  state:{
    type:Boolean,
    default:true
  },
  google:{
    type:Boolean,
    default:false
  },
})

const userModel = model( 'Usuario', userSchema);

module.exports = userModel;