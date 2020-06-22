let notes = require("../Develop/db/db.json");
const fs = require("fs");

module.exports = function (app) {
    app.get("/api/notes",(req,res) => {
        res.json(notes);
        //console.log(notes);
    });
    
    app.post("/api/notes",(req,res)=>{
        let newNote = req.body;

        newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase();
        
        console.log(newNote);

        notes.push(newNote);

        res.json(newNote);
    })

    app.delete("/api/notes/:id", (req,res) => {
        let chosen = req.params.id;

        console.log(notes);
        //console.log(chosen);
        //console.log(notes[1].id);

        let deleteID = notes.filter((notes)=>{
            return notes.id !== chosen;
        })

        console.log("NoteToDelete", deleteID);
        //let index = notes.indexOf(deleteID);
        
        //notes.splice(index,1);
        notes = deleteID;
        res.json(notes);
    });
}