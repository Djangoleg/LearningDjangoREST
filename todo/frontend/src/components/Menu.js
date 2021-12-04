import React from 'react'
import {Link} from 'react-router-dom'
import app_path from "../AppPath";
import {inactiveLinkClass} from "../common"

const Menu = () => {

    function handleClick(e) {
        inactiveLinkClass();
        e.target.className = 'active';
        //e.preventDefault();
    }

    return (
        <div className="switchButtoms">
            <Link to={app_path.users} onClick={function (e) {
                handleClick(e);
            }}>Users</Link>
            <Link to={app_path.projects} onClick={function (e) {
                handleClick(e);
            }}>Projects</Link>
            <Link to={app_path.todo} onClick={function (e) {
                handleClick(e);
            }}>TODO</Link>
        </div>
    )
}

export default Menu
