import './App.css'
import {useState, useEffect } from "react";
import Form from './components/Form'
import Map from './components/Map';
import { Marker, Popup} from "react-leaflet";
import { useMapEvents} from 'react-leaflet'
import NavBar from './components/NavBar';
import Header from './components/Header';
import Home from './screens/Home';

function App() {


  return(
    <div className='main'>
      <Header/>
      <div className='screen-body'>
        <Home />
      </div>
      <NavBar />
    </div>



  )
}

export default App
