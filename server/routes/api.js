const express = require('express'); 
const router = express.Router(); 
const mongoose = require('mongoose'); 
const NoteModel = require('../model/Note');
const config = require('../config/db.js');

mongoose.Promise = global.Promise;
    mongoose.connect(config.db,{ useNewUrlParser: true }).then(
        () => {console.log('Database is connected')},
        err => {console.log('Can not connect to the database' + err)}
    )

// Get all notes
router.get('/notes', function(req, res) { 
    console.log("Get request for notes"); 

    NoteModel.find({}).exec(function(err, notecollection){ 
        if(err) { 
            console.log("Error retrieving Cartcollection."); 
        } 
        else { 
            res.json(notecollection); 
        } 
    })
}); 

// Get note by id
router.get('/notes/:note_id', function(req, res) { 
    console.log("Get request for note with id: " + req.params.note_id);

    NoteModel.findById(req.params.note_id).exec(function(err, notecollection){ 
        if(err) { 
            console.log("Error retrieving Cartcollection."); 
        } 
        else { 
            res.json(notecollection); 
        } 
    })
}); 

// post new note to database 
router.post('/notes', function(req, res) { 
    console.log("Post request for note"); 
    let noteData = req.body;
    let note = new NoteModel(noteData);

    note.save(function(err, notecollection){ 
        if(err) { 
            console.log("Error retrieving Cartcollection."); 
        } 
        else { 
            res.status(200).send(note); 
        } 
    })
}); 

// delete note by id
router.delete('/notes/:note_id', function(req, res) { 
    console.log("Get request for notes"); 

    var id = req.param("note_id");

    NoteModel.remove({_id: id},function(err, result){ 
        if(err) { 
            res.status(401).send({err: 'Error: Could not delete note'});
        } 
        if(!result){
            res.status(400).send({err: 'note deleted from the note collection'}); 
        }
        else { 
            res.send(result);
        } 
    })
}); 

module.exports = router;
