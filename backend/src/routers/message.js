const express = require('express')
const Message = require('../models/messages')
const router = new express.Router()
const {user}= require('./../middleware/auth')

router.post('/message',user,async(req,res)=>{
    const message = new Message(req.body)
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
        const messages = await Message.find({})
        res.status(200).send(messages)
    }
    catch(e){
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