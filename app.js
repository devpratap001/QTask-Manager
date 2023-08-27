// import the necessary packages 
const express = require("express");
const mongoose = require("mongoose");
const {engine} = require("express-handlebars");
require("./db/conn.js");
const user = require("./db/model");
const app = express();

// initiation of packages 

const port = process.env.PORT || 8000
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname+ "/public"));

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
        res.render("register", {layout: "register.handlebars"});
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/login", async (req, res, next) => {
    try {
        res.render("login", {layout: "register.handlebars"});
    } catch (error) {
        res.status(400).send(error)
    }
})
app.post("/login", async (req, res, next) => {
    try {
        res.render("login", {layout: "register.handlebars"});
    } catch (error) {
        res.status(400).send(error)
    }
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server started on the port: ${port}`);
    }
})