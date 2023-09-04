// import the necessary packages 
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { engine } = require("express-handlebars");
const cookieParser = require("cookie-parser")
require("./db/conn.js");
const { user, toDo, template } = require("./db/model");
const projectRouter= require("./routes/projectRouter.js")
const app = express();

// initiation of packages 

const port = process.env.PORT || 8000
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// connect with handlebars 

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views")

// routing paths 

app.get("/", async (req, res, next) => {
    try {
        res.render("home");
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/register", async (req, res, next) => {
    try {
        res.render("register", { layout: "register.handlebars" });
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/login", async (req, res, next) => {
    try {
        res.render("login", { layout: "register.handlebars" });
    } catch (error) {
        res.status(400).send(error)
    }
})
app.post("/login", async (req, res, next) => {
    try {
        const data= await user.find({email: req.body.email})
        if ((await user.find({email: req.body.email})).length < 1) {
            const newUser = new user(req.body);
            await newUser.save();
            res.redirect("/login")
        } else {
            res.redirect("/register")
        }
    } catch (error) {
        res.status(400).send(error)
    }
})
app.post("/home", async (req, res, next) => {
    var _email = req.body.email;
    const _pass = req.body.password;
    const value = await user.find({ email: _email, password: _pass });
    const url = `${req.protocol}://${req.hostname}:${port}${req.originalUrl}`;
    res.cookie("url", url, {sameSite: "strict"});
    res.cookie("email", _email, {sameSite: "strict"});
    if (value.length >= 1) {
        res.render("homePage.handlebars", {
            fName: `${value[0].firstName}`,
            lName: `${value[0].lastName}`,
            layout: "homeLayout.handlebars"
        })
    } else {
        res.redirect("/login")
    }
})

// todo list part of  app starts here 

app.get("/home/todoTemp", async (req, res, next) => {
    try {
        const temp = await template.findOne({ name: "todo" }, { data: 1, _id: 0 });
        res.send(temp.data);
    } catch (error) {
        console.log(error)
    }
})

app.post("/home/todoPosted/:userEmail", async (req, res) => {
    try {
        const value = await toDo.find({ Email: req.params.userEmail });
        if (value.length >= 1) {
            var submitted = await toDo.updateOne({ Email: req.params.userEmail }, { $push: { todos: req.body } });
        } else {
            var submitted = new toDo({ Email: req.params.userEmail, todos: [req.body] });
            const output = await submitted.save();
        }
    } catch (error) {
        console.log(error)
    }
})

// fetch todos list 

app.get("/home/todoFetch/:userEmail", async (req, res) => {
    try {
        const userDoc = await toDo.findOne({ Email: req.params.userEmail }, { _id: 0, todos: 1 });
        res.send(userDoc.todos)
    } catch (err) {
        console.log("an error occurred")
    }
})

// delete todos 

app.delete("/home/todoFetch/:email/:id", async (req, res)=>{
    try {
        const deleteData= await toDo.updateOne({Email: req.params.email}, {$pull: {todos: {_id: req.params.id}}}, {multi:true});
    } catch (error) {
        console.log("error")
    }
})

// todo list part ends here 
// project part starts 
app.use("/home/projects", projectRouter);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server started on the port: ${port}`);
    }
})