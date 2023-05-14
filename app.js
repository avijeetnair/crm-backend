const dbConfig = require('./configs/db.config');
const mongoose = require('mongoose');
const authController = require('./controllers/auth.controller');
const express = require('express');
const app = express();
const User = require("./models/user.model")
const bcrypt = require('bcryptjs');
const { userStatus } = require('./utils/constants');
const constants = require('./utils/constants');

const cors = require('cors');
app.use(cors())
//to create first admin user, hardcoding userId as admin
async function init(){
    let user = await User.findOne({userId:"admin"});

    if(user){
        console.log("Admin user already present");
        return;
    }

    try{
       user = await User.create({
           name:"Avijeet",
           userId:"admin",
           email:"admin@gmail.com",
           userType:"ADMIN",
           password: bcrypt.hashSync("Welcome", 8),
           userStatus : constants.userStatus.approved
       })
       console.log(user);
    }
    catch(err){
        console.log(err.message);
    }
}

app.use(express.json())
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection
db.on("error", () => console.log(" Cant connect to DB "));
db.once("open", () => {
    console.log(" Connected to MongoDB! ")
    init()
})
authRouter = require("./routes/auth.routes")
authRouter(app);

let userRouter = require("./routes/user.routes")
userRouter(app);

let ticketRouter = require("./routes/ticket.routes");
ticketRouter(app);
//app.get('/', (req, res) => res.send("Hello World"));

//app.listen(3000, () => console.log('Listening at http://localhost:3000'));

module.exports = app.listen(7500, () => console.log("Listening at localhost:7500"))