const express = require('express')
const Message = require('../models/messages')
const router = new express.Router()
const {user}= require('./../middleware/auth')

router.post('/message',user,async(req,res)=>{
    userID = req.user._id
    const message = new Message({...req.body , from:userID})
    try{
        await message.save()
        res.status(200).send({message})
    }
    catch(e){
        res.status(400).send(e)
    }
})
router.get('/messages',user,async(req,res)=>{
    try{
        const messages = await Message.find({type:"message"}).populate('from').populate('reply')
        res.status(200).send(messages)
    }
    catch(e){
        res.status(400).send(e)
    }
})
router.patch('/message/:id',user,async(req,res)=>{
    try{
        const message = await Message.findOne({_id:req.params.id})
        if(!message) return res.send('Not Found')
        message.content = req.body.content
        await message.save()   
        res.status(200).send(message) 
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.post('/message/reply/:id',user,async(req,res)=>{
    try{
        const message = await Message.findOne({_id:req.params.id})
        if(!message) return res.send('Not Found')
        userID = req.user._id
        const reply = new Message({...req.body,from:userID,type:"reply"})
        await reply.save()
        message.reply = reply._id
        await message.save()   
        res.status(200).send({message:message,reply:reply}) 
    }
    catch(e){
        res.status(400).send(e)
    }
})
router.get('/message/:id',user,async(req,res)=>{
    try{
        id=req.params.id
        const message =await Message.findOne({_id:id}).populate('reply')
        if(!message) return res.send('Not Found')
        res.send(message)
    }catch(e){
        res.status(400).send(e)
    }
})
router.delete('/message/:id',user,async(req,res)=>{
    try{
        const message = await Message.findOne({_id:req.params.id}) 
        if(!message) return res.send('Message Not Found')
        await message.remove()       
        res.send('Message Deleted')
    }
    catch(e){
        res.status(400).send(e)
    }

})

module.exports = router