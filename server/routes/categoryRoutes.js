const express = require('express');
const multer = require('multer');
const Categories = require('../models/Categories');
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


// Create a new category
router.post('/create', conditionalUpload, async (req, res) => {
    try {
        const categoryData = { ...req.body };
        if (req.file) {
            categoryData.image = req.file.path;
        }
        const category = new Categories(categoryData);
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(400).send({ message: 'Error creating category', error: error.message });
    }
});
  
  // Update an existing category
  router.put('/update/:id', conditionalUpload, async (req, res) => {
    try {
      const updates = Object.keys(req.body);
      const category = await Categories.findById(req.params.id);
      
      if (!category) {
        return res.status(404).send({ error: 'Category not found' });
      }
      
      updates.forEach((update) => category[update] = req.body[update]);
      
      if (req.file) {
        category.image = req.file.path;
      }
      
      await category.save();
      res.send(category);
      
    } catch (error) {
      res.status(400).send(error);
    }
  });

// Get all categories
router.get('/', async (req, res) => {
  try {
    const Category = await Categories.find({});
    res.send(Category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error });
  }
});

router.delete('/delete/:id',async (req, res) => {
    try {
        const deletedCategory = await Categories.findByIdAndRemove(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
});


module.exports = router;
