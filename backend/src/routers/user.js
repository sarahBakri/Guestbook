const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const {user}= require('./../middleware/auth')

router.post('/user',async(req,res)=>{
    const user =new User({...req.body})
    try{
        await user.save()
        const token = await user.generateAuthToken()
        console.log(token)   
        res.status(200).send({"user":user,"token":token})
        }catch(e){
        res.status(400).send(e)
    }
})


router.post('/user/login',async(req,res)=>{
    try{
        const user=await User.findMyData(req.body.userName,req.body.password)        
        const token=await user.generateAuthToken()
        res.send({user,token}) 
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/logout',user,async(req,res)=>{
    try{
        console.log('one')
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()
        res.send("logged out")
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router