const Product = require("../models/product")


const getProducts = async (req,res) => {
    try {
        const products = await Product.findAll({limit:100})
        if(products.length == 0){return res.status(404).json({message:'No se encontraron productos'})}
        res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({message:`Error al mostrar productos: ${error.message}`})
    }
}


const createProduct = async(req,res)=>{
    const product = req.body
    try { 
        const newProduct = await Product.create(product)
        return res.status(200).json({message:`Producto '${product.nombre}' creado con éxito.`, product:newProduct.toJSON()})
    } catch (error) {
        return res.status(500).json({message:`Error al crear producto.${error.message}`})
    }
}

const editPrice = async(req,res) =>{
    const id = req.params.id
    const {precio} = req.body
    try {
        const product = await Product.findByPk(id)
        if(!product){return res.status(404).json({message:'Product no encontrado'})}
        const updatedProduct = await Product.update(
            { precio: precio },
            {where: {id:id}}
        )
        return res.status(200).json(`Nuevo precio de '${product.nombre}': ${product.precio}`)
    } catch (error) {
        return res.status(500).json({error:'Error al actualizar el precio', details:error.message})
    }
}

const deleteProduct = async(req,res) =>{
    const id = req.params.id
    try {
        const product = await Product.findByPk(id)
        if(!product){return res.status(404).json({message:'Producto no encontrado'})}
        await Product.destroy({where:{id:id}}
        )
        return res.status(200).json({message:`Producto '${product.nombre}' eliminado con exito`})
    } catch (error) {
        return res.status(500).json({message:`Error al eliminar producto. ${error.message}`})       
    }
}

const getProductById = async(req,res) =>{
    try {
        const product = await Product.findByPk(req.params.id)
        if(!product){return res.status(404).json({message:`Producto no encontrado`})}
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({message:`Error al consultar producto: ${error.message}`})
    }
}


const updateProduct = async(req,res) =>{
  const { id } = req.params;
  const { nombre, unidad, precio } = req.body;

  try {
    const [updated] = await Product.update(
      { nombre, unidad, precio }, 
      { where: { id } }
    );

    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error al actualizar producto: ${error}` });
  }
};

module.exports = {
    getProducts,
    createProduct,
    editPrice,
    deleteProduct,
    getProductById,
    updateProduct
}