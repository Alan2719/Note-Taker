let notes = require("../Develop/db/db.json");
const fs = require("fs");

module.exports = function (app) {
    app.get("/api/notes",(req,res) => {
        res.json(notes);
        //console.log(notes);
    });
    
    app.post("/api/notes",(req,res)=>{
        let allNotes = JSON.parse(fs.readFileSync("./Develop/db/db.json")); //Notes from the json db file.

        //console.log(allNotes);

        let newNote = req.body;

        newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase();

        //console.log(newNote);

        allNotes.push(newNote);

        fs.writeFileSync("./Develop/db/db.json",JSON.stringify(allNotes));
        console.log(allNotes);
        res.json(allNotes);
    });


    /*app.delete("/api/notes/:id", (req,res) => {
        let chosen = req.params.id;

        console.log(notes);
        //console.log(chosen);
        //console.log(notes[1].id);

        let deleteID = notes.filter((notes)=>{
            return notes.id === chosen;
        })

        console.log("NoteToDelete", deleteID);
        res.json(deleteID);
    });*/
}