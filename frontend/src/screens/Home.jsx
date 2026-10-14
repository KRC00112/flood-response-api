import { useState } from "react";
import '../css/home.css'


function Card({children}){
    return(
        <div className="card">
            <div className="card-desc">
                {children}
            </div>
            <button className="view-more-arrow">&gt;</button>
        </div>
    );
}

function Home(){

    const languages=[
        "English", 
        "অসমীয়া",
        "हिंदी",
        "বাংলা"
    ]

    const [languageList, setLanguageList]=useState(languages)
    const [selectedLanguage, setSelectedLanguage]=useState(languageList[0]);

    return(
        <div className="home">
            <ul className="languageList">
                {languageList.map(item=>{
                    return(
                        <li key={item}>
                            <button className={item===selectedLanguage?`selectedLang`:``} onClick={()=>setSelectedLanguage(item)}>{item}</button>
                        </li>
                    );
                })}
            </ul>
            <div className="home-cards">
                <Card>
                    <h4>View Affected Areas</h4>
                    <div>See all actively affected areas</div>
                </Card>
                 <Card>
                    <h4>Report Affected Area</h4>
                    <div>Share real time disaster data</div>
                </Card>
                 <Card>
                    <h4>Request Relief</h4>
                    <div>Request Emergency Supplies</div>
                </Card>
            </div>
            
            
        </div>
    )
}

export default Home;