const mongoose= require('mongoose');

mongoose.connect("mongodb+srv://devps1125:uUjYomZWqzOOSY8V@cluster0.pswfv4u.mongodb.net/?retryWrites=true", {dbName: "Qtask"})
.then(()=>{console.log(`database connected on the server`)})
.catch((err)=>{console.log(err)});