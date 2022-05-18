import React, { useState, useContext } from 'react';
import noteContext from "../context/noteContext";

export const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        e.target.className = "fas fa-plus fa-3x mb-2";
        // e.target.style = {color: "#66ff66"};
        e.target.style.color = "#66ff66";
        setTimeout(() => {
            e.target.className = "fas fa-plus fa-2x mb-2";
            // e.target.style = {color: "#80ccff"};
            e.target.style.color = "#80ccff";
        }, 500);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("note created ✅✅✅", "success" )
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return <div>

        <div className="mx-3 mt-3" style={{ border: "2px solid black" }}>
         <h2> </h2>        
        <h2>Lets create a new note here</h2>
            <form>
                <div className='container'>
                <div className="mb-3 my-3">
                    <label htmlFor="Title" className="form-label">Title</label>
                    <input type="text" className="form-control  mx-auto" id="Title" name="title" ia-describedby="emailHelp" value={note.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control " id="description" name="description" value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" className="form-control " id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                </div>
                <i className="fas fa-plus fa-2x mb-2" disabled={note.title.length<5 || note.description.length<8} style={{ color: "#80ccff" }} onClick={handleClick}></i>
            </form>
        </div>
    </div>;
};
