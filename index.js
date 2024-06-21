const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const bodyParser=require('body-parser')
const vendorRoutes=require('./routes/vendorRoutes.js')
const firmRouter=require('./routes/firmRouter.js')
const productRouter=require('./routes/productRouter.js')
const path=require('path')

PORT=5000


const app=express()
dotenv.config()
app.use(bodyParser.json())


mongoose.connect(process.env.mongo_uri)
.then(()=>{console.log("MongoDB Connected Successfully");})
.catch((error)=>{console.log(error);})


app.use('/vendor',vendorRoutes)
app.use('/firms',firmRouter)
app.use('/products',productRouter)
app.use('/uploads',express.static('uploads'))

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})