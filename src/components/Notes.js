import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import noteContext from "../context/noteContext";
import { AddNote } from './AddNote';
import Noteitem from './Noteitem';

export const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNote, editNote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id:"", etitle: "", edescription: "", etag: "" })
    let history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('token')){
        getNote()
        }
        else{
            history.push("/login")
        }
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
        
    }
    
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e)=>{
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click(); 
        props.showAlert("note updated 👍👍👍", "success" )        

    }

    return <div>
        <AddNote showAlert={props.showAlert}/>
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <form>
                            <div className="mb-3 my-3">
                                <label htmlFor="Title" className="form-label">Title</label>
                                <input type="text" className="form-control  mx-auto" id="eTitle" value={note.etitle} name="etitle" ia-describedby="emailHelp" onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control " id="edescription" value={note.edescription} name="edescription" onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">tag</label>
                                <input type="text" className="form-control " value={note.etag} id="etag" name="etag" onChange={onChange} />
                            </div>
                        </form>

                    </div>
                    <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button disabled={note.etitle.length<5 || note.edescription.length<8} type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="YourNotes row my-3 ">
            <h1></h1>
            <h4>Your Notes</h4>
            <div className="noNotes">
            {notes.length === 0 && 'Create a new note to get started'}
            </div>
            {notes.map((note) => {
                return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
            })}

        </div>
    </div>;
};
