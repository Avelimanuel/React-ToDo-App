import React from 'react';
import {Link} from 'react-router-dom';

let whenUpdated = (note) =>{
    return new Date(note.updated).toLocaleDateString()
}
let getTitle = (note)=>{
  const title = note.body.split('\n')[0]
  return title;
}

const ListItem = ({note}) => {
  return (
    <Link to={`/note/${note.id}`}>
     <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <span>created:{whenUpdated(note)}</span>
     </div>
    </Link>
  )
}

export default ListItem;
