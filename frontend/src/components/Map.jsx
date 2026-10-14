import '../css/map.css'
import {useState, useEffect } from "react";
import { LayerGroup, LayersControl, MapContainer, TileLayer} from "react-leaflet";
import {Circle, Tooltip } from 'react-leaflet'

 function Map({affectedAreasList, LocationMarker, showMarker}) {
  let severityObj={
    "low":"blue",
    "medium":"yellow",
    "high":"orange",
    "critical":"red",
  }


  const [userLocation, setUserLocation]=useState(null);
  const [severity, setSeverity]=useState(severityObj);


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
    <MapContainer center={[userLocation?.lat, userLocation?.lng]} zoom={13} scrollWheelZoom={false} className='map'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {showMarker && <LocationMarker />}
      <LayersControl>
        <LayersControl.Overlay checked name="Circles Layer Group">
            <LayerGroup>
              {affectedAreasList.map(item=>{
                return (
                  
                item?<Circle 
                  key={item.id}
                  center={[item.latitude, item.longitude]}
                  pathOptions={{color: severity[item.severity],fillColor: severity[item.severity]}}
                  radius={200}>
                  <Tooltip>
                    <div>{item.name}</div>
                    <div>Latitude: {item.latitude}</div>
                    <div>Longitude: {item.longitude}</div>
                    <div>Severity: {item.severity}</div>
                  </Tooltip>

                </Circle>:<></>
                
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

export default Map;