const express = require('express')
require('./db/mongoose')
const port=process.env.PORT || 3000
app.use(express.json())
app.use(cors())
app.listen(port,()=>{
    console.log('server is on port '+port)
})
