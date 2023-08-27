import React, { useEffect, useState } from "react";
import notes from "../assets/data";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import ListItem from "../components/ListItem";
import { useNavigate } from "react-router-dom";

const NotePage = () => {
  let { noteId } = useParams();
  const navigate = useNavigate(); // Get the navigate function
  //let note = notes.find(note => note.id === Number(noteId))

  let [note, setNote] =  useState({ body: '' });

  const getNote = async () => {
    try {
      if (noteId === 'new') return;
      let response = await fetch(`http://localhost:7000/notes/${noteId}`);
      
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      
      let data = await response.json();
      setNote(data);
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };
  
  

  useEffect(() => {
    getNote();
  }, [noteId]);

  //This is a create note function.
  let createNote = async () => {
    console.log("Task created");
    await fetch(`http://localhost:7000/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  //This is an update note function.
  let updateNote = async () => {
    await fetch(`http://localhost:7000/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  //This functipn will fire when the update button is clicked.
  let handleSubmit = async () => {
    try {
      console.log("noteId:", noteId);
      console.log("note:", note);
      if (noteId !== "new" && !note.body) {
        deleteNote();
      } else if (noteId !== "new") {
        updateNote();
      } else if (noteId === "new" && note !== null) {
        await createNote(); // Use await if createNote is asynchronous
      }
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //This is a delete note function.
  let deleteNote = async () => {
    await fetch(`http://localhost:7000/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    navigate("/");
  };

  return (
    <div>
      <div className="note">
        <div className="note-header">
          <h3>
            <Link to="/">
              <ArrowLeft onClick={handleSubmit} />
            </Link>
          </h3>
          {noteId !== "new" ? (
            <button onClick={deleteNote}>Delete</button>
          ) : (
            <button onClick={handleSubmit}>Done</button>
          )}
        </div>
        <textarea
          //This function will enable edit/update of the text area.
          onChange={(e) => {
            if (note) {
              setNote({ ...note, body: e.target.value });
            }
          }}
          value={note?.body || ""}
        ></textarea>
      </div>
    </div>
  );
};

export default NotePage;
