// const port = 4000;

// const express = require("express")
// const mongoose = require("mongoose")
// const cors = require("cors")
// const jwt = require("jsonwebtoken")
// const multer = require("multer")
// const path = require("path")
// const paypal = require('@paypal/checkout-server-sdk')
// const bcrypt = require("bcrypt"); // For hashing and comparing passwords
// const bodyParser = require("body-parser");

// const app = express()

// app.use(express.json())
// app.use(cors())


// // Database connection
// mongoose.connect("mongodb+srv://tahanureddin:n0543395113r@cluster0.8lxhr.mongodb.net/pet-shop")


// // API creation
// app.get("/", (req, res)=> {
//     res.send("Express app is running");
// });

// // Image storage engine
// const storage = multer.diskStorage({
//     destination: path.join(__dirname, 'upload/images'), // Absolute path
//     filename: (req, file, cb) => {
//         cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     },
// });
// const upload = multer({ storage: storage });

// // Serve static files
// app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// // Upload endpoint for images
// app.post('/upload', upload.single('product'), (req, res) => {
//     res.json({
//         success: 1,
//         image_url: `http://localhost:${port}/images/${req.file.filename}`, // Fixed URL formatting
//     });
// });

// // Logo storage engine
// const logoStorage = multer.diskStorage({
//     destination: path.join(__dirname, 'upload/logos'), // Absolute path
//     filename: (req, file, cb) => {
//         cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     },
// });
// const uploadLogo = multer({ storage: logoStorage });

// // Serve static files for logos
// app.use('/logos', express.static(path.join(__dirname, 'upload/logos')));

// // Upload endpoint for brand logos
// app.post('/upload-logo', uploadLogo.single('logo'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ success: 0, message: 'Logo upload failed.' });
//     }
//     res.json({
//         success: 1,
//         logo_url: `http://localhost:${port}/logos/${req.file.filename}`,
//     });
// });

// const SECRET_KEY = "mysecret123";
// const User = mongoose.model("User", {
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//     },
//     date_created: {
//         type: Date,
//         default: Date.now(),
//     },
//     last_login: {
//         type: Date,
//     },
//     tokenExpiration: {
//         type: Date, // Store the expiration time of the token
//     },
// });
// app.post("/add-user", async (req, res) => {
//     const { username, password } = req.body;
  
//     try {
//       // Hash the password before saving
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       const newUser = new User({ username, password: hashedPassword });
//       await newUser.save();
  
//       res.status(201).json({ message: "User added successfully" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   });

// app.post("/login", async (req, res) => {
//     const { username, password } = req.body;
  
//     try {
//       // Find user by name
//       const user = await User.findOne({ username });
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       // Compare password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (isMatch) {
        
//         const data = {
//             user: {
//                 id: user.id
//             }
//         }
//         const token = jwt.sign(data, SECRET_KEY, {
//             expiresIn: "1h", // Token expires in 1 hour
//           });
//           const expiration = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

//           // Save the expiration time in the database
//           user.tokenExpiration = expiration;
//           user.last_login = new Date();
//           await user.save();
//         res.json({success:true, token}) 
//       } else {
//             return res.status(401).json({ message: "Invalid password" });
//       }
       
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   });

  

//   const authenticateToken = async (req, res, next) => {
//       const token = req.headers['authorization']?.split(' ')[1];
  
//       if (!token) {
//           return res.status(401).json({ message: 'Unauthorized' });
//       }
  
//       try {
//           // Verify the token
//           const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
//           // Find the user in the database
//           const user = await User.findById(decoded.id);
  
//           if (!user || new Date() > user.tokenExpiration) {
//               return res.status(401).json({ message: 'Token expired or invalid' });
//           }
  
//           req.user = user; // Attach the user object to the request
//           next();
//       } catch (err) {
//           console.error(err);
//           res.status(403).json({ message: 'Forbidden' });
//       }
//   };
  
  
//   app.get('/protected', authenticateToken, (req, res) => {
//     res.json({ message: 'You have access to this endpoint!' });
//   });

// //
// const Product = mongoose.model("Product", {
//     id: {
//         type: Number,
//         required: true,
//         unique: true,
//     },
//     name: {
//         type: String,
//         required: true,
//     },
//     image: {
//         type: String,
//         required: true,
//     },
//     category: {
//         type: String,
//         required: true,
//     },
//     product_type: {
//         type: String,
//         required: true,      
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     brand: {
//         type: String,
//         required: true,
//     },
//     quantity: {
//         type: Number,
//     },
//     description: {
//         type: String,
//     },
//     discount_type: {
//         type: String,
//     },
//     date: {
//         type: Date,
//         default: Date.now(),
//     },
//     on_discount: {
//         type: Boolean,
//         default: false,
//     },
//     available: {
//         type: Boolean,
//         default: true,
//     },
//     best_seller: {
//         type: Boolean,
//         default: false, // Products start as not being best sellers
//     },
//     ordered: {
//         type: Number,
//         default: 0, // Tracks how many times the product has been ordered
//     },
// });
// //
// app.post('/addproduct', async (req, res) => {
//     try {
//         const existingProduct = await Product.findOne({ id: req.body.id });
//         if (existingProduct) {
//             return res.status(400).json({ success: false, message: "Code already exists" });
//         }

//         const product = new Product({
//             id: req.body.id,
//             name: req.body.name,
//             image: req.body.image,
//             category: req.body.category,
//             product_type: req.body.product_type,
//             price: req.body.price,
//             brand: req.body.brand,
//             quantity: req.body.quantity,
//             description: req.body.description,
//         });

//         await product.save();
//         console.log('Product Saved');

//         res.json({ success: true, name: req.body.name });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// });
// //
// app.post('/removeproduct', async(req, res)=> {
//     const product = await Product.findOneAndDelete({ id: req.body.id });
//     if (!product) {
//         return res.status(404).json({ success: false, message: "Product not found" });
//     }


//     console.log("product Removed");

//     res.json({
//         success: true,
//         name: req.body.name
//     })
// })
// //
// app.get('/allproducts', async(req, res)=> {

//     let products = await Product.find({})
//     console.log("Products fetched");
    
//     res.send(products)
 
// })
// //
// app.post('/adddiscount', async (req, res) => {
//     const { id, discountType } = req.body;

//     const product = await Product.findOneAndUpdate(
//         { id },
//         { discount_type: discountType, on_discount: true },
//         { new: true }
//     );

//     if (!product) {
//         return res.status(404).json({ success: false, message: 'Product not found' });
//     }

//     console.log('Discount added:', discountType);

//     res.json({
//         success: true,
//         product
//     });
// });
// //
// app.post('/removediscount', async (req, res) => {
//     const { id, discountType } = req.body;

//     const product = await Product.findOneAndUpdate(
//         { id },
//         { discount_type: '', on_discount: false },
//         { new: true }
//     );

//     if (!product) {
//         return res.status(404).json({ success: false, message: 'Product not found' });
//     }

//     console.log('Discount removed:', id);

//     res.json({
//         success: true,
//         product
//     });
// });
// //
// app.post('/removeproducts', async (req, res) => {
//     const { productIds } = req.body; // Array of product IDs to delete
//     try {
//         await Product.deleteMany({ id: { $in: productIds } });
//         res.status(200).json({ success: true, message: 'Products deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Failed to delete products' });
//     }
// });
// //
// app.post('/updateproduct', async (req, res) => {
//     try {
//         const { id, name, image, category, product_type, price, brand, quantity, description } = req.body;
        
//         const updatedProduct = await Product.findOneAndUpdate(
//             { id: id }, 
//             { name, image, category, product_type, price, brand, quantity, description }, 
//             { new: true }
//         );

//         if (!updatedProduct) {
//             console.log("Product not found with id:", id);
//             return res.status(404).json({ success: false, message: "Product not found" });
//         }

//         res.json({ success: true, updatedProduct });
//     } catch (error) {
//         console.error("Error updating product:", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// });


// app.get("/getproduct/:id", async (req, res) => {
//     try {
//       const product = await Product.findOne({ id: req.params.id });
//       if (!product) {
//         return res.status(404).json({ success: false, message: "Product not found" });
//       }
//       res.json({ success: true, product });
//     } catch (error) {
//       console.error("Error fetching product:", error);
//       res.status(500).json({ success: false, message: "Internal server error" });
//     }
//   });
  

// //
// const Brand = mongoose.model("Brand", {
//     id: {
//         type: Number,
//         required: true,
//         unique: true,
//     },
//     name: {
//         type: String,
//         required: true,
//     },
//     hebrew_name: {
//         type: String,
        
//     },
//     logo: {
//         type: String,
//         required: true
//     },
//     website: {
//         type: String,
//     },
    
//     description: {
//         type: String,
//     },
//     date: {
//         type: Date,
//         default: Date.now()
//     },
// })
// //
// app.post('/addbrand', async (req, res) => {
//     try {
//         // Retrieve all brands and determine the next ID
//         const brands = await Brand.find({});
//         let id;

//         if (brands.length > 0) {
//             const lastBrand = brands[brands.length - 1]; // Get the last brand in the list
//             id = lastBrand.id + 1; // Increment the ID
//         } else {
//             id = 1; // If no brands exist, start with ID 1
//         }

//         // Create a new brand with the generated ID
//         const brand = new Brand({
//             id: id,
//             name: req.body.name,
//             hebrew_name: req.body.hebrew_name,
//             logo: req.body.logo,
//             website: req.body.website,
//             description: req.body.description,
//         });

//         // Save the brand to the database
//         await brand.save();
//         console.log('Brand Saved');

//         // Send a success response
//         res.json({ success: true, name: req.body.name });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// });
// //
// app.post('/removebrand', async(req, res)=> {
//     const brand = await Brand.findOneAndDelete({ id: req.body.id });
//         if (!brand) {
//             return res.status(404).json({ success: false, message: "Brand not found" });
//         }


//     console.log("Brand Removed");

//     res.json({
//         success: true,
//         name: req.body.name
//     })
// })
// //
// app.get('/allbrands', async(req, res)=> {
//     let brand = await Brand.find({})

//     console.log("All Brands fetched!")

//     res.send(brand)
// })

// //
// app.post('/toggleavailable', async (req, res) => {
//     const { id, available } = req.body;

//     try {
//         const product = await Product.findOneAndUpdate(
//             { id: id },       
//             { available: available }, 
//             { new: true }     
//         );

//         if (!product) {
//             return res.status(404).json({ success: false, message: 'Product not found' });
//         }

//         res.json({ success: true, message: 'Product availability updated', product });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'An error occurred while updating availability' });
//     }
// });




// const environment = new paypal.core.SandboxEnvironment(
//     'Aaj4iB9K3iSqhCt5suzrRxfiXOMjnZkEitBR-GOBJVIEFuIrLKxZETZILv6MClHS_efn2sI-phA6nQSe', 
//     'EDTDatv86_rERLRr2LhGWQeOYwWGlMk0tgxAsMZhAJgqgYdmyZVT9x0WbGX5WO7NeaS_-Fi1FQf0LBEt'
// );
// const client = new paypal.core.PayPalHttpClient(environment);

// app.post('/create-paypal-order', async (req, res) => {
//     const { amount } = req.body;

//     try {
//         const request = new paypal.orders.OrdersCreateRequest();
//         request.prefer('return=representation');
//         request.requestBody({
//             intent: 'CAPTURE',
//             purchase_units: [
//                 {
//                     amount: {
//                         currency_code: 'ILS',
//                         value: amount, // Amount passed from the frontend
//                     },
//                 },
//             ],
//             application_context: {
//                 return_url: 'http://localhost:3000', // Replace with your success URL
//                 cancel_url: 'http://localhost:3000/cart', // Replace with your cancel URL
//                 locale: 'he-IL' // Set the language to Hebrew
//             },
//         });

//         const order = await client.execute(request);
//         res.status(200).json({ url: order.result.links.find((link) => link.rel === 'approve').href });
//     } catch (err) {
//         console.error('Error creating PayPal order:', err);
//         res.status(500).json({ error: 'Could not create PayPal order' });
//     }
// });


// app.listen(port, (error)=> {
//     if(!error) {
//         console.log(`server is running on port: ${port}`);
//     } else {
//         console.log("error connecting to server: "+ error);
//     }
// });