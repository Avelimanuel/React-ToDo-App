import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import NotesList from "./pages/NotesList";
import NotePage from "./pages/NotePage";


function App() {
  return (
    <div className="container dark">
      <div className="app">
       <Header/>
       
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<NotesList/>} />
          <Route path="/note/:noteId" element={<NotePage/>}/>
        </Routes>
        
      </BrowserRouter>

      
      </div>
      
    </div>
  );
}

export default App;
