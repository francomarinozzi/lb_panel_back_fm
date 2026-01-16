const {Router} = require('express')
const productRoutes = require('./productRoutes')
const authRoutes = require('./authRoutes')
const router = Router()

router.use('/products', productRoutes)

router.use('/auth', authRoutes)

module.exports = router