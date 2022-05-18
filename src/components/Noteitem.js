import React, { useContext } from 'react';
import noteContext from "../context/noteContext";

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-3' >
            <div className="card my-2 mx-2" style={{ textAlign: "left" }} >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                    <div className="buttons">
                        <div className="delete"><i className="fas fa-trash mx-2" onClick={() => { deleteNote(note._id);props.showAlert("note deleted ❌❌❌", "success" ) }}></i> </div>

                        <div className="edit">
                        <i className="fas fa-edit mx-2" onClick={()=>{updateNote(note)}}></i></div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Noteitem;