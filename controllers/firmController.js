const Firm=require('../models/Firm.js')
const Vendor=require('../models/Vendor.js')
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

const addFirm=async (req,res)=>{
    try{
        const {firmName,area,category,region,offer}=req.body
        const image=req.file?req.file.filename:undefined
        const vendor=await Vendor.findById(req.tokenId)
        if(!vendor){
            return res.status(404).json("Vendor not found")
        }
        const firm=new Firm({
            firmName,area,category,region,offer,image,vendor:vendor._id
        })
        const savedFirm=await firm.save()
        vendor.firm.push(savedFirm)
        await vendor.save()
        res.status(200).json("Firm added Successfully")
    
    }
    catch(error){
        console.log(error)
        return res.status(500).json("Internal Server Error")
    }

}

const deletFirmById=async(req,res)=>{
    try{
    const firmId=req.params.id
    const deleteFirm=await Firm.findByIdAndDelete(firmId)
    if(!deleteFirm){
        return res.status(404).json("Firm Not Found")
    }
    res.status(200).json("Firm deleted Successfully")
}
catch(error)
{
    console.log(error)
    return res.status(500).json("Internal Server Error")
}
}

module.exports={addFirm:[upload.single('image'),addFirm],deletFirmById}