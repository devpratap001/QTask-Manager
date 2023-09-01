const express = require("express");
const { template, project, projectList } = require("../db/model");
const projectRouter = new express.Router();
projectRouter.use(express.urlencoded({extended: true}));
projectRouter.use(express.json());

projectRouter.get("/temp", async (req, res)=>{
    try {
        const data= await template.find({name: "project"});
        res.send(data[0].data);
    } catch (error) {
        console.log("error")
    }
})

projectRouter.post("/add/:i/:email", async (req, res) => {
    if ((await project.find({ name: req.body.title })).length === 0) {
        const projectData = new project({ name: req.body.title });
        await projectData.save();
        if ((await projectList.find({Email: req.params.email})).length ===0){
            const pl= new projectList({Email: req.params.email, projects:[{id : req.params.id, name: req.body.title}]})
            await pl.save();
        }
        else{
            await projectList.updateOne({Email: req.params.email}, {$push:{projects: {id: req.params.id, name: req.body.title}}})
        }
    }
    const projList= await projectList.findOne({Email: req.params.email});
    res.send(projList)
})

projectRouter.get("/list/:email", async (req, res)=>{
    const listNames= await projectList.find({Email: req.params.email});
    if (listNames.length >=1){
        res.send(listNames[0]);
    }
})

projectRouter.post("/addtask/:taskName", async (req, res)=>{
    try {
        if ((await project.find({name: req.params.taskName})).length >=1){
            const newTask= await project.updateOne({name: req.params.taskName},  {$push: {data: req.body}})
        }
    } catch (error) {
        console.log("error")
    }
})

projectRouter.get("/getTasks/:taskName", async (req, res)=>{
    try {
        const taskData= await project.findOne({name: req.params.taskName})
        res.send(taskData.data)
    } catch (error) {
        console.log("error")
    }
})

projectRouter.delete("/deletetask/:taskName/:taskId", async (req, res)=>{
    try {    
        const data= await project.updateOne({name: req.params.taskName}, {$pull: {data: {_id: req.params.taskId}}});
        res.send(data)
    } catch (error) {
        console.log("error")
    }
})

module.exports = projectRouter