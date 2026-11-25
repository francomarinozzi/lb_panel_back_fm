const { Router } = require('express') 
const productControllers = require('../controllers/productControllers')
const router = Router()

router.get('/', productControllers.getProducts)

router.post('/', productControllers.createProduct)

router.patch('/price/:id', productControllers.editPrice) 

router.delete('/:id', productControllers.deleteProduct)

// Va antes de '/:id' para que "order" no se tome como un id.
router.put('/order', productControllers.reorderProducts)

router.put('/:id', productControllers.updateProduct)
module.exports = router