const mongoose= require("mongoose");
const encrypt= require("mongoose-encryption");

// schema definition 

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

const otherSchema= new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    data:  [childTodoSchema]
})

const listSchema= new mongoose.Schema({
    id: Number,
    name: String
})

const projecListSchema= new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    projects: [listSchema] 
})

// encryption plugin addition 

userSchema.plugin(encrypt, {
    secret: process.env.SECRET,
    encryptedFields: ["password", "confPassword"],
    additionalAuthenticatedFields: ["email"]
})

// model definition 

const template= mongoose.model("template", templateSchema);
const toDo= mongoose.model("toDo", toDoSchema);
const user= mongoose.model("user", userSchema);
const project= mongoose.model("project", otherSchema);
const projectList= mongoose.model("projectList", projecListSchema);

module.exports= {user, toDo, template, project, projectList}