const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confPassword: {
        type: String,
        required: true,
        minLength: 8
    }
});

const user= mongoose.model("user", userSchema);
module.exports= user