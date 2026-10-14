import '../css/navbar.css'

function NavBar({handleShowForm}){
    return(
        <div className='navigation-menu'>
            <ul>
                <li>
                    <button onClick={handleShowForm}>Report Affected Area</button>
                </li>
                <li>
                    <button onClick={handleShowForm}>SOS</button>
                </li>
            </ul>
        </div>
    );

}

export default NavBar;