const Product = require("../models/product");


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        console.log("Products fetched");
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
exports.removeAllProducts = async (req, res) => {
    const { productIds } = req.body; // Array of product IDs to delete
    try {
        await Product.deleteMany({ id: { $in: productIds } });
        res.status(200).json({ success: true, message: 'Products deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete products' });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const existingProduct = await Product.findOne({ id: req.body.id });
        if (existingProduct) {
            return res.status(400).json({ success: false, message: "Code already exists" });
        }

        const product = new Product(req.body);
        await product.save();
        console.log("Product Saved");
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
exports.removeProduct = async (req, res) => {
    const product = await Product.findOneAndDelete({ id: req.body.id });
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    console.log("product Removed");
    res.json({
        success: true,
        name: req.body.name
    })
};
exports.updateProduct = async (req, res) => {
    try {
        const { id, name, image, category, product_type, price, brand, quantity, description } = req.body;
        
        const updatedProduct = await Product.findOneAndUpdate(
            { id: id }, 
            { name, image, category, product_type, price, brand, quantity, description }, 
            { new: true }
        );

        if (!updatedProduct) {
            console.log("Product not found with id:", id);
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.addDiscount = async (req, res) => {
    const { id, discountType } = req.body;

    const product = await Product.findOneAndUpdate(
        { id },
        { discount_type: discountType, on_discount: true },
        { new: true }
    );

    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }

    console.log('Discount added:', discountType);

    res.json({
        success: true,
        product
    });
};
exports.removeDiscount = async (req, res) => {
    const { id, discountType } = req.body;

    const product = await Product.findOneAndUpdate(
        { id },
        { discount_type: '', on_discount: false },
        { new: true }
    );

    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }

    console.log('Discount removed:', id);

    res.json({
        success: true,
        product
    });
};
exports.toggleProductAvailability = async (req, res) => {
    const { id, available } = req.body;

    try {
        const product = await Product.findOneAndUpdate(
            { id: id },       
            { available: available }, 
            { new: true }     
        );

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, message: 'Product availability updated', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while updating availability' });
    }
}
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) {
          return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, product });
      } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
      }
}
