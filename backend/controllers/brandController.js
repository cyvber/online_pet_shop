const Brand = require("../models/brand");

exports.getAllBrands = async (req, res) => {
    let brand = await Brand.find({})

    console.log("All Brands fetched!")

    res.send(brand)
}

exports.addBrand = async (req, res) => {
    try {
        // Retrieve all brands and determine the next ID
        const brands = await Brand.find({});
        let id;

        if (brands.length > 0) {
            const lastBrand = brands[brands.length - 1]; // Get the last brand in the list
            id = lastBrand.id + 1; // Increment the ID
        } else {
            id = 1; // If no brands exist, start with ID 1
        }

        // Create a new brand with the generated ID
        const brand = new Brand({
            id: id,
            name: req.body.name,
            hebrew_name: req.body.hebrew_name,
            logo: req.body.logo,
            website: req.body.website,
            description: req.body.description,
        });

        // Save the brand to the database
        await brand.save();
        console.log('Brand Saved');

        // Send a success response
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

exports.removeBrand = async (req, res) => {
    const brand = await Brand.findOneAndDelete({ id: req.body.id });
    if (!brand) {
        return res.status(404).json({ success: false, message: "Brand not found" });
    }

    console.log("Brand Removed");
    res.json({
        success: true,
        name: req.body.name
    })
}