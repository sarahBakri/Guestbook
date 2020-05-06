const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const messageRouter = require('./routers/message')
const port=process.env.PORT || 3000
const app= express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(messageRouter)
app.listen(port,()=>{
    console.log('server is on port '+port)
})
