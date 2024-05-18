const express = require('express');
const bodyParser = require('body-parser');
const studentsRouter = require('./routes/students');
const { authenticateDB } = require('./db');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', studentsRouter);

const PORT = process.env.PORT || 3000;

authenticateDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
