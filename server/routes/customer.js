const express = require('express')
const router = express.Router()
const customerController = require('../controller/customerController')


router.get('/', customerController.homepage)
router.get('/about', customerController.aboutpage)

router.get('/add', customerController.addCustomer)
router.post('/add', customerController.postCustomer)

router.get('/view/:id', customerController.viewCustomer)
router.get('/edit/:id', customerController.updateCustomer)
router.put('/edit/:id', customerController.editPost)
router.delete('/edit/:id', customerController.deleteCustomer)

router.post('/search', customerController.searchCustomer)


module.exports =router