let notes = require("../Develop/db/db.json");
const fs = require("fs");

module.exports = function (app) {
    app.get("/api/notes",(req,res) => {
        res.json(notes);
        //console.log(notes);
    });
    
    app.post("/api/notes",(req,res)=>{
        let allNotes = JSON.parse(fs.readFileSync("./Develop/db/db.json")); //Notes from the json db file.

        console.log(typeof allNotes);
        console.log("allNotes in JSON format",allNotes);

        let newNote = req.body;

        newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase();

        allNotes.push(newNote);

        fs.writeFileSync("./Develop/db/db.json",JSON.stringify(allNotes));
        console.log("allNotes with the new note",allNotes);
        console.log(typeof allNotes);
        res.json(allNotes);
    });


    app.delete("/api/notes/:id", (req,res) => {  //:id parameter??  id is parameter available in this route because you are specifying it
        let uniqueID = req.params.id;

        let notes = JSON.parse(fs.readFileSync("./Develop/db/db.json"));
        console.log(notes);

        let remainingNotes = notes.filter(n => n.id !== uniqueID);
        console.log("NoteDeleted",remainingNotes);

        fs.writeFileSync("./Develop/db/db.json",JSON.stringify(remainingNotes));
        console.log("new Notes",remainingNotes);
        res.json(remainingNotes);
    });
}

//req.body --> all parameters in the content are sent in the body of the request