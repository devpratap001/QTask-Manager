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

const templateSchema= new mongoose.Schema({
    data:String,
    name: String
});

const childTodoSchema= new mongoose.Schema({
    title: String,
    description: String,
    from: String,
    to: String,
    done: {
        type:Boolean,
        default: false
    }
})

const toDoSchema= new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    todos: [childTodoSchema]
})

const template= mongoose.model("template", templateSchema);
const toDo= mongoose.model("toDo", toDoSchema);
const user= mongoose.model("user", userSchema);

module.exports= {user, toDo, template}