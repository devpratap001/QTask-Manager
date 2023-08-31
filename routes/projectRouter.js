const express = require("express");
const { template, project, projectList } = require("../db/model");
const projectRouter = new express.Router();

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

module.exports = projectRouter