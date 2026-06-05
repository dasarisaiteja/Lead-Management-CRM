import mongoose from 'mongoose';
export default mongoose.model('Lead',new mongoose.Schema({
name:String,email:String,phone:String,company:String,
status:{type:String,default:'New'},
notes:String
},{timestamps:true}));