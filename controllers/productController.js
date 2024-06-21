const Product=require('../models/Product.js')
const Firm=require('../models/Firm.js')
const multer=require('multer')
const path=require('path')

// Storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });



const addProduct=async(req,res)=>{
    try{

        const {productName,price,category,bestSeller,description}=req.body
        const image=req.file?req.file.filename:undefined

        const firmId=req.params.id
        const firm=await Firm.findById(firmId)
        if(!firm){
            return res.status(404).json({error:"Firm not found"})
        }

        const product=new Product({
            productName,price,category,image,bestSeller,description,firm:firm._id
        })

        const savedProduct=await product.save()
        firm.product.push(savedProduct)
        await firm.save()
        res.status(200).json("Product Added Successfully")

    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
}

const getProductsByFirm=async(req,res)=>{
    try{

        const firmId=req.params.id
        const firm = await Firm.findById(firmId)
        if(!firm){
            return res.status(404).json("Firm not found")
        }
        const restaurantName=firm.firmName
        const products=await Product.find({firm:firmId})
        res.status(201).json({restaurantName,products})
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

const deleteProductById=async(req,res)=>{
    try{
        const productId=req.params.id
        const deleteProduct=await Product.findByIdAndDelete(productId)
        if(!deleteProduct){
            return res.status(404).json("Product not found")
        }
        res.status(200).json("Product Deleted Successfully")

    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports={addProduct:[upload.single('image'),addProduct],getProductsByFirm,deleteProductById}