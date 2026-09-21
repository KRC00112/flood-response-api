import { useEffect, useState } from 'react'

function DisastersComponent(){
  const [healthCheck, setHealthCheck]=useState({});
  const [disastersList, setDisastersList]=useState([]);
  
  const [disasterId, setDisasterId]=useState("");
  const [disaster, setDisaster]=useState({});

  const [disasterName, setDisasterName]=useState("");
  const [disasterDescription, setDisasterDescription]=useState("");
  const [disasterType, setDisasterType]=useState("");
  const [disasterStartsAt, setDisasterStartsAt]=useState("");
  const [disasterEndsAt, setDisasterEndsAt]=useState("");


  useEffect(()=>{
    async function fetchData(){
      const response=await fetch("http://127.0.0.1:8080/health");
      const data=await response.json();
      setHealthCheck(data);
    }
    
    fetchData();
  },[])

  useEffect(()=>{
    async function fetchData(){
      const response=await fetch("http://127.0.0.1:8080/api/v1/disasters");
      const data=await response.json();
      setDisastersList(data.data);
    }
    
    fetchData();
  },[])




  function getDisaster(){

    async function fetchData(){
      const response=await fetch(`http://127.0.0.1:8080/api/v1/disasters/${disasterId}`);
      const data=await response.json();
      setDisaster(data.data);
    }
    
    fetchData();

  }



function postDisaster(){

      async function postAndUpdateList(){
      const postData=await fetch(`http://127.0.0.1:8080/api/v1/disasters`,{
          method: 'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify({
              name: disasterName,
              description: disasterDescription,
              type: disasterType,
              starts_at: disasterStartsAt,
              ends_at: disasterEndsAt,
          })
      });

        const response=await fetch("http://127.0.0.1:8080/api/v1/disasters");
        const data=await response.json();
        const post=await postData.json()
        console.log(post);
        setDisastersList(data.data);

        setDisasterName("");
        setDisasterDescription("");
        setDisasterType("");
        setDisasterStartsAt("");
        setDisasterEndsAt("");

    } 

    postAndUpdateList();

}



  return (
    <>
      <input type='text' placeholder='Enter name...' onChange={e=>setDisasterName(e.target.value)} value={disasterName}></input>
      <input type='text' placeholder='Enter description...' onChange={e=>setDisasterDescription(e.target.value)} value={disasterDescription}></input>
      <input type='text' placeholder='Enter type...' onChange={e=>setDisasterType(e.target.value)} value={disasterType}></input>
      <div>
      <input
        id="starts-at"
        type="datetime-local"
        name="starts-at-date"
        onChange={e=>setDisasterStartsAt(()=>{
            if (e.target.value===''){
                return '';
            }else{
                return new Date(e.target.value).toISOString()
            }
        })}
        value={disasterStartsAt.slice(0,-1)}
       />

      <input
        id="ends-at"
        type="datetime-local"
        name="ends-at-date"
        onChange={e=>setDisasterEndsAt(()=>{
            if (e.target.value===''){
                return '';
            }else{
                return new Date(e.target.value).toISOString()
            }
        })}
        value={disasterEndsAt.slice(0,-1)}
       />


      </div>

      <button onClick={postDisaster}>click me</button>
      
      <br/><br/>
      <input type='number' placeholder='enter id...' onChange={e=>setDisasterId(e.target.value)} value={disasterId}></input>
      <button onClick={getDisaster}>Click me</button>
      <div>{JSON.stringify(healthCheck)}</div>
      <div>{JSON.stringify(disaster)}</div>


      
      


      <div>{disastersList.map(item=>{
        return <div key={item.id}>
                  <div>{item.name}</div>
          </div>
      })}</div>
      
      
    </>
  )
}

export default DisastersComponent