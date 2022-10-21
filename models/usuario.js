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

userSchema.methods.toJSON = function(){
  const {__v,password,_id,...user} = this.toObject();
  user.uid = _id;
  return user;
};

const Usuario = model( 'Usuario', userSchema);

module.exports = Usuario;