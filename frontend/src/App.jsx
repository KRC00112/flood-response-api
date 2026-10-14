import './App.css'
import {useState, useEffect } from "react";
import Form from './components/Form'
import Map from './components/Map';
import { Marker, Popup} from "react-leaflet";
import { useMapEvents} from 'react-leaflet'
import NavBar from './components/NavBar';

function App() {

  const [affectedAreasList, setAffectedAreasList]=useState([]);
  const severityList=['low', 'medium', 'high', 'critical'];

  const [disastersList, setDisastersList]=useState([]);

  const [disasterId, setDisasterId]=useState();
  const [disasterName, setDisasterName]=useState("");
  const [severity, setSeverity]=useState("");
  
  const [placeName, setPlaceName]=("temp place");
  const [reporterName, setReporterName]=useState("");
  const [reporterPhNo, setReporterPhNo]=useState("");
  const [description, setDescription]=useState("");

  const [areaLocation, setAreaLocation]=useState(null);
  const [showMarker, setShowMarker]=useState(false);
  const [showForm, setShowForm]=useState(false);

  function LocationMarker() {
    
    
    
     const map = useMapEvents({
      click(e) {
        setAreaLocation({
              source: 'gps',
              latitude: e.latlng.lat,
              longitude: e.latlng.lng
        })
        map.flyTo(e?.latlng, map.getZoom());
      },
    });

    
    if(areaLocation===null){
        return null;
    }

    const markerPosition={
        lat: areaLocation.latitude,
        lng: areaLocation.longitude
    }


    return(
      <Marker position={markerPosition}>
        <Popup>You clicked here {JSON.stringify(markerPosition)}</Popup>
      </Marker>
    );
  }


  useEffect(()=>{
    async function fetchData(){
       const response=await fetch("http://127.0.0.1:8080/api/v1/disasters");
       const data=await response.json();
          setDisastersList(data.data);
    }    
    fetchData();
  },[])

  
    

  function handleDisasterType(id){
      if(id){
          setDisasterId(Number(id));
          setDisasterName(disastersList.find(item=>item.id===Number(id)).name)
      }
  }

  function handleSeverityType(e){
      if(severity===e.target.value){
          setSeverity("");
          return;
      }
      setSeverity(e.target.value)
  }

  function getCurrentLocation(){
      if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
              setAreaLocation({
                  source: 'gps',
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
              })
          });

      }
  }

   function getMarkerLocation(){   
    setShowForm(false);
    setShowMarker(true);
  }

  function handleNameChange(e){
    setReporterName(e.target.value);
  }

  function handlePhNoChange(e){
    setReporterPhNo(e.target.value);
  }

  function handleDescriptionChange(e){
    setDescription(e.target.value);
  }



  async function postAffectedArea(){
     
      let postData=await fetch(`http://127.0.0.1:8080/api/v1/affected-areas/`,{
          method: 'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            disaster_id: disasterId,
            name: placeName,
            location: areaLocation,
            severity: severity,
            reporter: {
                name: reporterName,
                mobile: reporterPhNo
            }
      })
      });

      let response=await fetch(`http://127.0.0.1:8080/api/v1/affected-areas/`);

      let data = await response.json();
      console.log(data.data)
      setAffectedAreasList(data.data)
      
  }

  useEffect(()=>{
        async function fetchData(){
            const response=await fetch(`http://127.0.0.1:8080/api/v1/affected-areas/`);
            const data=await response.json();
            setAffectedAreasList(data.data);

        }
        fetchData();
    },[]);

  useEffect(()=>{
    console.log(areaLocation)
  },[getCurrentLocation])



  function handleShowForm(){
    setShowForm(!showForm)
  }

  return(
    <div className='main'>
        <NavBar handleShowForm={handleShowForm}/>
        <Map affectedAreasList={affectedAreasList} LocationMarker={LocationMarker} showMarker={showMarker}/>
        {showForm?
        <div className='overlay' onClick={handleShowForm}>
            <div onClick={e=>e.stopPropagation()}>
                <Form 
                    handleDisasterType={handleDisasterType}
                    disastersList={disastersList}
                    severityList={severityList}
                    handleSeverityType={handleSeverityType}
                    getCurrentLocation={getCurrentLocation}
                    severity={severity}
                    getMarkerLocation={getMarkerLocation}
                    postAffectedArea={postAffectedArea}
                    handleNameChange={handleNameChange}
                    handlePhNoChange={handlePhNoChange}
                    handleDescriptionChange={handleDescriptionChange}
                    reporterName={reporterName}
                    reporterPhNo={reporterPhNo}
                    description={description}
                />
            </div>
        </div>:<></>}
    
    </div>

  )
}

export default App
