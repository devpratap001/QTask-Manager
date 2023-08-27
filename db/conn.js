const mongoose= require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Qtask")
.then(()=>{console.log(`database connected on the server`)})
.catch((err)=>{console.log(err)});