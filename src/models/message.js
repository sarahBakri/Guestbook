const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
        trim:true
    },
    Seen:{
        type:Boolean,
        default:false
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    replay:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Messages'
    },
},{
    timestamps:true
})

module.exports=Message=mongoose.model('Messages',messageSchema)