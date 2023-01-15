const dbConfig = require('./configs/db.config');
const mongoose = require('mongoose');
const authController = require('./controllers/auth.controller');

const express = require('express');
const app = express();
app.use(express.json())
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection
db.on("error", () => console.log(" Cant connect to DB "));
db.once("open", () => console.log(" Connected to MongoDB! "))

//app.get('/', (req, res) => res.send("Hello World"));
app.post('/crm/api/auth/signup', authController.signup)

app.listen(3000, () => console.log('Listening at http://localhost:3000'));