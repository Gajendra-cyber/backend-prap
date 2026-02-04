const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static("./public"))


app.post("/api/notes", async(req,res) =>{

    const {title, description} = req.body
    const note = await noteModel.create({
        title,
        description
    })
    res.status(201).json({
        message: "note created successfully",
        note
    })
})

app.get("/api/notes", (req,res) => {
    noteModel.find().then((notes) => {
        res.status(200).json(notes)
    })
})

app.patch("/api/notes/:id", (req, res) =>{
    const {id} = req.params;
    const {title, description} = req.body;
    noteModel.findByIdAndUpdate(id, {
        description,
        title
    }).then(
        res.status(200).json({
            message: "note updated successfully"
        })
    )
})

app.delete("/api/notes/:id", (req,res) =>{
    const {id} = req.params;
    console.log(id)
    noteModel.findByIdAndDelete(id).then(
        res.status(200).json({
            message: "note deleted successfully"
        })
    )
})

app.put("/api/notes/:id", (req,res) =>{
    const {id} = req.params;
    const {title, description} = req.body;
    noteModel.findByIdAndUpdate(id, {
        title,
        description
    }).then(
        res.status(200).json({
            message: "note updated successfully by put request"
        })
    )
})

app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
})

    module.exports = app;