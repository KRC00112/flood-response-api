import { useEffect, useState } from "react";

function AffectedAreasComponent({affectedAreasList}){

    
    
    const [affectedAreaId, setAffectedAreaId]=useState("");
    const [affectedArea, setAffectedArea]=useState({});
    const position = [51.505, -0.09]

    async function getAffectedArea(){

    const response=await fetch(`http://localhost:8080/api/v1/affected-areas/${affectedAreaId}`);
    const data= await response.json();
    setAffectedArea(data);

   }


  
   

   let disasterTypes=['flood', 'earthquake', 'landslide'];

    return(
        <>
            <input type="number" value={affectedAreaId} onChange={e=>setAffectedAreaId(e.target.value)}></input>
            <button onClick={getAffectedArea}>Click Me</button>
            <div>{JSON.stringify(affectedArea)}</div>
            <br/><br/>
            <div>{affectedAreasList.map(item=>{
                return (
                    <div key={item.id}>
                        <div>{item.name}</div>
                    </div>
                )
            })}
            </div>
            
            
            
        
        </>
    );


}

export default AffectedAreasComponent