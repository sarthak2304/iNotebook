const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator')

//ROUTE 1: Get all Notes using: Get "/api/auth/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.messsage);
        res.status(500).send("Some error occurred");
    }
})

//ROUTE 2: Add a new note using: Get "/api/auth/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'enter the title').isLength({ min: 3 }),
    body('description', 'enter the description').isLength({ min: 10 }),
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;

        // if there are errors return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote);

    } catch (error) {
        console.error(error.messsage);
        res.status(500).send("Some error occurred");
    }
})

//ROUTE 3: Update an existing note using: PuT "api/auth/updatenote"
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
    const { title, description, tag } = req.body;
    //Create a new note object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // find the note which has to be updated
    let note = await Note.findById(req.params.id);
    if(!note){return req.status(404).send("not found")};

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.join({note});
    
} 
    catch (error) {
        console.error(error.messsage);
        res.status(500).send("Some error occurred");
    }
})

//ROUTE 4: Delete an existing note using: DELETE "api/auth/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
    const { title, description, tag } = req.body;   

    // find the note which has to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if(!note){return req.status(404).send("not found")};

    //Allow deletion only if user owns it
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.join("Success: note has been deleted");
    
} 
    catch (error) {
        console.error(error.messsage);
        res.status(500).send("Some error occurred");
    }
})

module.exports = router;