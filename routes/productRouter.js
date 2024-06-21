const express=require('express')
const productController=require('../controllers/productController.js')
const router=express.Router()
const path=require('path')

router.post('/addProduct/:id',productController.addProduct)
router.get('/:id/products',productController.getProductsByFirm)
router.delete('/:id',productController.deleteProductById)

router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName
    res.headersSent('Content-Type','image/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
})

module.exports=router