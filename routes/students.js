const express = require('express');
const router = express.Router();
const Student = require('../models/Student.js');
const Mark = require('../models/Marks.js');
const validator = require('validator');
// Create a new student
router.post('/students', async (req, res) => {
    const { first_name, last_name, email, date_of_birth } = req.body;
    if (!first_name || !last_name || !email || !date_of_birth) {
        res.status(400).json({ message: "Give Proper Data to create" })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    try {
        const existStudent = await Student.findOne({
            where: {
                email: email,
            },
        });
        if (existStudent) {
            return res.status(400).json({ message: "student already exist with email" })
        }
        const student = await Student.create({ first_name, last_name, email, date_of_birth });
        res.status(201).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all students
router.get('/students', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const { rows, count } = await Student.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        res.json({
            students: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a student by ID with marks
router.get('/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByPk(id, {
            include: Mark,
        });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a student
router.put('/students/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, date_of_birth } = req.body;
    try {
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        await student.update({ first_name, last_name, email, date_of_birth });
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a student
router.delete('/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        await student.destroy();
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
