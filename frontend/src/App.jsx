import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import DisastersComponent from './DisastersComponent'
import AffectedAreasComponent from './AffectedAreasComponent'
import React, { useEffect } from "react";
import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useState} from 'react'
import { useMapEvents,Circle, Tooltip } from 'react-leaflet'





 function Map({affectedAreasList}) {
  let severityObj={
    "low":"blue",
    "medium":"yellow",
    "high":"orange",
    "critical":"red",
  }


  const [userLocation, setUserLocation]=useState(null);
  const [severity, setSeverity]=useState(severityObj);

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    
     const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You clicked here {JSON.stringify(position)}</Popup>
      </Marker>
    );
  }

  useEffect(()=>{
    async function fetchLocation(){
      if ("geolocation" in navigator) {
        await navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude)
        return setUserLocation({
          lat:position.coords.latitude,
          lng: position.coords.longitude
        })
      });
      } else {
        return; 
      }
    }
    fetchLocation();

  },[])

  return (
    <>
    {userLocation?
    <MapContainer center={[userLocation?.lat, userLocation?.lng]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      <LayersControl>
        <LayersControl.Overlay checked name="Circles Layer Group">
            <LayerGroup>
              {affectedAreasList.map(item=>{
                return (
                <Circle 
                  key={item.id}
                  center={[item.latitude, item.longitude]}
                  pathOptions={{color: severity[item.severity],fillColor: severity[item.severity]}}
                  radius={200}>
                  <Tooltip>{JSON.stringify(item)}</Tooltip>

                </Circle>
                
                );
              })}
            </LayerGroup>
        </LayersControl.Overlay>

      </LayersControl>
    </MapContainer>
    :<></>}
    </>
  );
}
function App() {

  const [affectedAreasList, setAffectedAreasList]=useState([]);
  

  useEffect(()=>{
        async function fetchData(){
            const response=await fetch(`http://localhost:8080/api/v1/affected-areas/page=1/limit=20`);
            const data=await response.json();
            setAffectedAreasList(data.data);

        }
        fetchData();
    },[]);

  return(
    <>
    <Map affectedAreasList={affectedAreasList}/>
    <AffectedAreasComponent affectedAreasList={affectedAreasList}/>
      {/* <DisastersComponent />     */}
    </>

  )
}

export default App
