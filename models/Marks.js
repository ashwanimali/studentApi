const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Student = require('./Student');

const Mark = sequelize.define('Mark', {
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mark: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 100,
        },
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Define the relationship
Mark.belongsTo(Student, { foreignKey: 'student_id', onDelete: 'CASCADE' });
Student.hasMany(Mark, { foreignKey: 'student_id' });

module.exports = Mark;
