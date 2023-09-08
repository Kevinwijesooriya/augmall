const express = require('express');
const multer = require('multer');
const Paths = require('../models/Paths');
const router = express.Router();

router.get('/', async (req, res) => {
    // await Paths.deleteMany({});
    try {
        const paths = await Paths.find({});
        res.send(paths);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching paths', error });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedPaths = await Paths.findByIdAndRemove(req.params.id);
        if (!deletedPaths) {
            return res.status(404).json({ message: 'Paths not found' });
        }
        res.status(200).json({ message: 'Path deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Path', error });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const path = await Paths.findById(req.params.id);

        if (!path) {
            return res.status(404).send({ error: 'Path not found' });
        }

        updates.forEach((update) => path[update] = req.body[update]);

        await path.save();
        res.send(path);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/save', async (req, res) => {
    try {
        await Paths.deleteMany({});
        const paths = req.body.paths;
        const result = await Paths.insertMany(paths);
    } catch (error) {
        res.status(400).send({ message: 'Error creating path', error: error.message });
    }
});

module.exports = router;

