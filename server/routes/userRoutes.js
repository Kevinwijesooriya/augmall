const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ user });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
        }

        const isPasswordMatch = await user.checkPassword(password);
        if (!isPasswordMatch) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
        }

        const token = jwt.sign({ _id: user._id }, 'secret_key');
        res.send({ user, token });

    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('username country email orders role _id');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

router.post('/create', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
});

router.post('/update', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.body._id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

router.get('/delete',async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndRemove(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

module.exports = router;
