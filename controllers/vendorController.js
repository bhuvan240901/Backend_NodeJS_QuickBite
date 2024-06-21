const Vendor=require('../models/Vendor.js')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')


dotenv.config()

secretKey=process.env.secretKey

const vendorRegister = async (req,res)=>{
    const {username,email,password}=req.body
    try{
        const emailCheck=await Vendor.findOne({email})
        if(emailCheck){
            res.status(500).json("Email already registered")
        }
        const hashPassword = await bcrypt.hash(password,10)
        const vendor=new Vendor({
            username,
            email,
            password:hashPassword
        })
        await vendor.save()
        res.status(201).json({message:"Vendor Registered Successfully"})

    }
    catch(error)
    {
        res.status(501).json({error:"Failed to register"})
    }
}


const vendorLogin=async (req,res)=>{
    const {email,password}=req.body
    try{
    const vendor=await Vendor.findOne({email})
    if(!vendor || !(await bcrypt.compare(password,vendor.password))){
       return res.status(401).json("Invalid email or Password")
    }
    const token=jwt.sign({tokenId:vendor._id},secretKey,{expiresIn:"1h"})
    res.status(200).json({Success:"Login Successfull",token})
    
    }
    catch(error)
    {
        res.status(500).json(error)
        console.log(error)
    }
}


const getAllVendorFirms=async (req,res)=>{
    try{
    const vendor=await Vendor.find().populate('firm')
    res.json({vendor})
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
}

const getVendorById=async (req,res)=>{
    const vendorId=req.params.id
    try{
    const vendor=await Vendor.findById(vendorId).populate('firm')
    if(!vendor){
        res.status(400).json({error:"Vendor Not Found"})
    }
    res.json({vendor})
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports={vendorRegister,vendorLogin,getAllVendorFirms,getVendorById}