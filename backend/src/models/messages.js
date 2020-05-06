const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
        trim:true
    },
    type:{
        type:String,
        default:'message'
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    reply:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Messages'
    },
},{
    timestamps:true
})

module.exports=Message=mongoose.model('Messages',messageSchema)