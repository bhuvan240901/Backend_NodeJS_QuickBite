const jwt = require('jsonwebtoken')
const Vendor=require('../models/Vendor.js')
const dotenv=require('dotenv')

dotenv.config()

const secretKey=process.env.secretKey


const verifyToken=async (req,res,next)=>{
    const token=req.headers.token
    if(!token){
        return res.status(401).json({error:"Token not found"})
    }
    try {
        const decoded= jwt.verify(token,secretKey)
        const vendor=await Vendor.findById(decoded.tokenId)
        if(!vendor){
            return res.status(404).json("Vendor not found")
        }

        req.tokenId=vendor._id
        next()

        
    } catch (error) {
        console.log(error)
        return res.status(500).json("Invalid Token")
    }
}

module.exports=verifyToken