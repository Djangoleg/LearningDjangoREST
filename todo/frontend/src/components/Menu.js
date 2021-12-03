import React from 'react'
import {Link} from 'react-router-dom'
import app_path from "../AppPath";


const Menu = () => {

    function inactiveLinkClass () {
        var header = document.getElementsByClassName('header');
        if (header) {
            if (header.length > 0) {
                if (header[0].children) {
                    for (var i = 0; i < header[0].children.length; i++) {
                        header[0].children[i].className = 'inactive';
                    }
                }
            }
        }
    }

    function handleClick(e) {
        //e.preventDefault();
        inactiveLinkClass();
        e.target.className = 'active';
    }

    return (
        <div className="header">
            <Link to={app_path.users} onClick={function(e) { handleClick(e);}}>Users</Link>
            <Link to={app_path.projects} onClick={function(e) { handleClick(e);}}>Projects</Link>
            <Link to={app_path.todo} onClick={function(e) { handleClick(e);}}>TODO</Link>
        </div>
    )
}

export default Menu
