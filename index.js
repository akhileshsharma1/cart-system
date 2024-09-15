import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
await mongoose.connect('mongodb://localhost:27017/products')
  .then(() => console.log('Database connected'))
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1); // Exit process with failure
  });

// Define Product Schema and Model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  stock: { type: Number, default: 0 }
});

const Product = mongoose.model('Product', productSchema);

// CRUD Operations

// Create a product
const createProduct = async (productData) => {
  try {
    const product = new Product(productData);
    return await product.save();
  } catch (error) {
    throw new Error('Error creating product: ' + error.message);
  }
};

// Read (Retrieve) all products
const getAllProducts = async () => {
  try {
    return await Product.find();
  } catch (error) {
    throw new Error('Error fetching products: ' + error.message);
  }
};

// Read (Retrieve) a single product by ID
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error('Error fetching product: ' + error.message);
  }
};

// Update a product by ID
const updateProductById = async (id, updateData) => {
  try {
    const product = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error('Error updating product: ' + error.message);
  }
};

// Delete a product by ID
const deleteProductById = async (id) => {
  try {
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Product not found');
    }
    return result;
  } catch (error) {
    throw new Error('Error deleting product: ' + error.message);
  }
};

// Define routes

// Create a new product
app.post('/products', async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve all products
app.get('/products', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a single product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update a product by ID
app.put('/products/:id', async (req, res) => {
  try {
    const product = await updateProductById(req.params.id, req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
  try {
    const result = await deleteProductById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
