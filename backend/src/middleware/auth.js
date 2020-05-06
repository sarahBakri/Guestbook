const jwt = require('jsonwebtoken')
User = require('../models/user')

const userAuth = async(req,res,next)=>{
    try{
            token = req.header('Authorization').replace('Bearer ','')
            const decoded = jwt.verify(token,'GUESTBOOKAPP')
            const user = await User.findOne({_id:decoded._id,'tokens.token':token})
            if(!user){
                throw new Error()
            }
            req.token=token
            req.user=user
            next()
        }
    catch(e)
        {
            res.status(400).send({error:"please Authenticate"})
        }
}

module.exports={user:userAuth}