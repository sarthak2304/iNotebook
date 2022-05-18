import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom'; 

export const Navbar = () => {

    // React.useEffect(() => {                     //useLocation 
        let location = useLocation();
        useEffect(() =>{
          console.log(location.pathname);
        }, [location]);

    let history = useHistory();
    
    const handleLogout = () =>{
        localStorage.removeItem('token');
        history.push('/login');
    }   
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"?"active" : ""}`}aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"?"active" : ""}`} to="/about">About</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className={`nav-link dropdown-toggle ${location.pathname==="/"?"active" : ""}`} to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">                                 {/*location pathname mein location change karna padega*/}
                                    Categories
                                </Link>
                                
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/">Tags</Link></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><Link className="dropdown-item" to="/">Archive</Link></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><Link className="dropdown-item" to="/">Deleted</Link></li>
                                </ul>
                            </li>
                            
                        </ul>
                        {!localStorage.getItem('token')? <form className="d-flex">
                                <Link className="btn btn-primary" to="/login" role="button">Login</Link>
                                <Link className="btn btn-success mx-2" to="/signup" role="button">Sign up</Link>
                        </form>: <button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
