import React,{useState,useEffect} from 'react';
import ListItem from '../components/ListItem';
import TestComp from '../components/TestComp'
import NotePage from './NotePage';
import {Link} from 'react-router-dom'
import AddButton from '../components/AddButton';



const NotesList = () => {
  let [Notes,setNotes] = useState([])

 
  useEffect(()=>{
      getNotes()

  },[]);

  let getNotes = async() =>{
    try{
        let response = await fetch('http://localhost:7000/notes/')
        let data = await response.json();
        setNotes(data)
    }catch(error){
        console.log(error)
    }

  }

  let date = new Date().toLocaleDateString("de-DE");


  


  return (
    <div className='notes'>
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Tasks</h2> <br />
        <span className='notes-title'>{date}</span>
        <h4 className="notes-count">{Notes.length} tasks</h4>
        {<AddButton/>}
      </div>
        <div className="notes-list">
            {Notes.map((note,index) => (
                <ListItem key={index} note={note}/>
            ))}
           <TestComp/>
        </div>

       

        
    </div>
  )
}

export default NotesList
