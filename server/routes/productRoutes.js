function escapeRegex(text) {
    if (!text) return;
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}


const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const Paths = require('../models/Paths');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
    },
    fileFilter: fileFilter
});

const conditionalUpload = (req, res, next) => {
    if (req.headers['content-type'].startsWith('multipart/form-data')) {
        upload.single('image')(req, res, next);
    } else {
        next();
    }
};

// Create a new product
router.post('/create', conditionalUpload, async (req, res) => {
    try {
        const productData = { ...req.body };
        if (req.file) {
            productData.image = req.file.path;
        }
        const product = new Product(productData);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update an existing product
router.put('/update/:id', conditionalUpload, async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }

        updates.forEach((update) => product[update] = req.body[update]);

        if (req.file) {
            product.image = req.file.path;
        }

        await product.save();
        res.send(product);

    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndRemove(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

router.get('/top-products', async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ purchases: -1 })
            .limit(10);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products.' });
    }
});

router.get('/search', async (req, res) => {
    const searchQuery = req.query.q;
    try {
        const regex = new RegExp(escapeRegex(searchQuery), 'i'); // i flag for case-insensitive search
        const products = await Product.find({ name: regex });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

router.get('/getClosestPath', async (req, res) => {
    const startX = parseFloat(req.query.x);
    const startY = parseFloat(req.query.y);
    const productX = parseFloat(req.query.productX);
    const productY = parseFloat(req.query.productY);

    try {
        const paths = await Paths.find({});
        let pathIds = [];
        // For each path, calculate the combined distance to the starting position and product's position
        paths.forEach(path => {
            path.distanceToStart = Math.min(
                calculateDistance(startX, startY, path.sx, path.sy),
                calculateDistance(startX, startY, path.ex, path.ey)
            );

            path.distanceToProduct = Math.min(
                calculateDistance(productX, productY, path.sx, path.sy),
                calculateDistance(productX, productY, path.ex, path.ey)
            );

            path.totalDistance = path.distanceToStart + path.distanceToProduct;
            pathIds.push(path._id);
            
        });
        await Path.updateMany({ _id: { $in: pathIds } }, { $inc: { used_time: 1 } });
        
        // Sort the paths based on the combined distance
        paths.sort((a, b) => a.totalDistance - b.totalDistance);

        // Send the closest path
        res.json(paths[0]);

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch paths' });
    }
});



module.exports = router;
