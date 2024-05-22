const mongoose=require('mongoose')
const Schema=mongoose.Schema

const testimonalSchema = new Schema ({
    name:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:array
    },
    status:{
        type:Boolean,
        default:true
    },
})

const testimonalModel = new mongoose.model('testimonal',testimonalSchema)
module.exports = testimonalModel;