const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,    //convert email to lowercase , before adding to db
        unique: true,
        isEmail: true,
    },
    createdAt: {
        type: Date,
        immutable: true,    //cannot be modified
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    userType: {
        type: String,
        required: true,
        default: "CUSTOMER"
    },
    userStatus: {
        type: String,
        required: true,
        default: "APPROVED"
    }
})

module.exports = mongoose.model("User", userSchema)