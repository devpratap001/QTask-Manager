const mongoose= require('mongoose');

mongoose.connect("mongodb+srv://" + process.env.USER + ":" + process.env.PASS + "@cluster0.pswfv4u.mongodb.net/?retryWrites=true", {dbName: "Qtask"})
.then(()=>{console.log(`database connected on the server`)})
.catch((err)=>{console.log(err)});