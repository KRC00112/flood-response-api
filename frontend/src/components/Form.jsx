import '../css/form.css'

function Form({
    handleDisasterType,
    disastersList,
    severityList,
    handleSeverityType,
    getCurrentLocation,
    getMarkerLocation,
    severity,
    postAffectedArea,
    handleNameChange,
    handlePhNoChange,
    handleDescriptionChange,
    reporterName,
    reporterPhNo,
    description,
}){


    return(
        <div className='form'>
            <select onChange={e=>handleDisasterType(e.target.value)}>
                <option value="">Select Disaster</option>
                {disastersList.map(item=>{
                    return(
                        <option key={item.id} value={item.id} >{item.id}. {item.name}</option>
                    );
                })}
            </select>
            <textarea placeholder='description' rows='7' cols='30'  value={description} onChange={e=>handleDescriptionChange(e)}></textarea>
            <div>
                <p>Severity:</p>
                <div className='severities'>
                    {severityList.map(item=>{
                        return(
                            <div key={item} className='choice'>
                                <input className='checkbox-radio' type="checkbox" id={item} name="severity" value={item} checked={severity===item} onChange={e=>handleSeverityType(e)}></input>
                                <label htmlFor={item}>{item}</label>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='reporter-details'>
                <input type='text' placeholder='Enter Name...' value={reporterName} onChange={e=>handleNameChange(e)}></input>
                <input type='tel' placeholder='Enter Phone Number...' value={reporterPhNo} onChange={e=>handlePhNoChange(e)}></input>
            </div>
            <div className='location-input-types'>
                <button onClick={getCurrentLocation}>Use My Current Language</button>
                <button onClick={getMarkerLocation}>Select on Map</button>
            </div>
            <button onClick={postAffectedArea}>POST</button>
            
        </div>
    )


}

export default Form; 