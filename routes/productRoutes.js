const { Router } = require('express') 
const productControllers = require('../controllers/productControllers')
const router = Router()

router.get('/', productControllers.getProducts)

router.post('/', productControllers.createProduct)

router.patch('/price/:id', productControllers.editPrice) 

router.delete('/:id', productControllers.deleteProduct)

router.put('/:id', productControllers.updateProduct)
module.exports = router