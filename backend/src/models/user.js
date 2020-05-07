const mongoose= require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const JWT=require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
        
    tokens: [{
        token:{
          type:String,
          required:true
      }
  }]
},
{
    timestamps:true
})
userSchema.methods.generateAuthToken=async function()
{
    const user=this
    const token=JWT.sign({_id:user._id.toString()},"GUESTBOOKAPP")
    // console.log(token)
    // console.log('-------------------')
    user.tokens=user.tokens.concat({token})
    await user.save()
    // console.log(user)
    return token
}
userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,9)
    }
    next()
})
userSchema.statics.findMyData=async function(userName,password)
{
    const user=await User.findOne({userName:userName})
    if(!user) throw new Error('User Not Found')
    const Matched= await bcrypt.compare(password,user.password)
    if(!Matched) throw new Error('Unmatched Password')
    return user
}
userSchema.methods.toJSON=function(){
    const user=this
    const userData=user.toObject()
    delete userData.password
    return userData
}
const User = mongoose.model('users',userSchema)
module.exports = User