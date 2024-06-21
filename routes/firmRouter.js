const firmController=require('../controllers/firmController.js')
const verifyToken=require('../middleware/verifyToken.js')
const express=require('express')
const router=express.Router()

router.post('/add-firm',verifyToken,firmController.addFirm)
router.delete('/:id',firmController.deletFirmById)

router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName
    res.headersSent('Content-Type','image/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
})

module.exports=router