import '../css/navbar.css'

function NavBar({}){
    return(
        <div className='navigation-menu'>
            <ul>
                <li>
                    <button>Home</button>
                </li>
                <li>
                    <button>SOS</button>
                </li>
                <li>
                    <button>Profile</button>
                </li>
            </ul>
        </div>
    );

}

export default NavBar;