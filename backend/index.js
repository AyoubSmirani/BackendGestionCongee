const express = require("express");
const bodyParser = require("body-parser");
const auth = require("./routes/authentification.js")
const chatApi =require("./routes/chatApi.js")
const employe = require("./routes/employe.js")
const congee = require("./routes/congee.js")
const formation = require("./routes/formation.js")
const notifications = require("./routes/notifications.js")
const email = require("./routes/email.js")
const cors = require('cors')
const app = express();
const port = process.env.port || 5000

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET , POST , PUT , DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type','Authorization')
    next()
})
app.use(cors())



app.use(bodyParser.json());
app.use('/api',auth)
app.use('/api',chatApi)
app.use('/api',employe)
app.use('/api',congee)
app.use('/api',formation)
app.use('/api',notifications)
app.use('/api',email)
app.use('/getImage',express.static('./images'))

app.listen(port ,()=>{
    console.log('listening on port' + port)
})

