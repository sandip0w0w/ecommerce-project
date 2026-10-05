const {v2: cloudinary} = require('cloudinary');
const Product = require('../models/Product');
// adding a product
const addProduct = async (req, res) => { // 6:58
    try{
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async(item) =>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        const product = new Product(productData);
        await product.save();

        res.status(201).json({message: "Product added!"})

    }catch(error){
        console.error("Error uploading product:", error);
    return res.status(500).json({ success: false, message: error.message });
    }

}

// list products
const listProduct = async (req, res) => {

    try{

        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);

        if(isNaN(page) || page < 1) page = 1;
        if(isNaN(limit) || limit < 1) limit = 6;
        if(limit > 100) limit = 100;

        const skip = (page - 1) * limit;

        const [products, totalProducts] = await Promise.all([
            Product.find({})
                    .skip(skip)
                    .limit(limit)
                    .lean(),
                    Product.countDocuments({})
        ]);

        const totalPages = Math.ceil(totalProducts / limit);

        return res.status(200).json({
            success: true,
            products,
            pagination: {
                totalProducts,
                totalPages,
                currentPage: page,
                limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
                nextPage: page < totalPages ? page + 1: null,
                prevPage: page > 1 ? page - 1: null
            }
        });
    }catch(error){
        return res.status(500).json({message: error.message})
    }
    
}

// remove products
const removeProduct = async (req, res) => { 
    try{
        const product = await Product.findByIdAndDelete(req.body.id);
        return res.status(200).json({message: `${product.name} removed.`})
    }catch(error){
        return res.status(400).json({message: error.message})
    }
}

const singleProduct = async (req, res) => {
    try{
        const { id } = req.params;
        console.log(id);
        const product = await Product.findById(id);
        return res.status(200).json(product);
    }catch(error){
        return res.status(404).json({message: error.message})
    }
}

module.exports = {
    addProduct,
    listProduct,
    removeProduct,
    singleProduct
}