const vendorController=require('../controllers/vendorController.js')
const express=require('express')
const routes=express.Router()

routes.post('/register',vendorController.vendorRegister)
routes.post('/login',vendorController.vendorLogin)

routes.get('/allVendorFirms',vendorController.getAllVendorFirms)
routes.get('/single-vendor/:id',vendorController.getVendorById)

module.exports=routes
