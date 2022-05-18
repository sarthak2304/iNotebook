// import react from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

      //Get All Notes
      const getNote = async ()=>{
        // API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', 
      
          headers: {
            'Content-Type': 'application/json',
            "auth-token" : localStorage.getItem('token')
          }
        });
        
        const json = await response.json();
        setNotes(json)
      }

      //Add a Note
      const addNote = async (title, description, tag)=>{
        // API call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST', 
      
          headers: {
            'Content-Type': 'application/json',
            "auth-token" : localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const json =  await response.json(); 
        console.log(json);

        const note = json;

        // const note = await response.json();
        setNotes(notes.concat(note))

      }

      

      //Delete a note
      const deleteNote = async (id)=>{
             // API call
             const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
              method: 'DELETE', 
          
              headers: {
                'Content-Type': 'application/json',
                "auth-token" : localStorage.getItem('token')
              }
            });
            const json =  response.json(); 
            console.log(json);

        // console.log("deleting note " + id);
        const newNotes = notes.filter((note)=>{return note._id !== id});
        setNotes(newNotes);
      }

      //Edit a Note
      const editNote = async (id, title, description, tag)=>{
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT', 
      
          headers: {
            'Content-Type': 'application/json',
            "auth-token" : localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = await response.json(); 
        console.log(json);
      
        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic
        for (let index = 0; index < notes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }

          
        }
        setNotes(newNotes);

      }

      


    
    return(
        <noteContext.Provider value = {{notes, setNotes, addNote, deleteNote, editNote, getNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;