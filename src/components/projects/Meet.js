import React from 'react';
import { Link } from 'react-router-dom';

const Meet = ({ id }) => {

    // if it is not a meeting time , don't showing this button.
    
    return (
        <div className='flex gap-3'>
            <div  className="justify-between space-y-2 md:flex md:space-y-0 bg-red-500 text-white  text-sm py-1 px-2 rounded">
                <button disabled className="group-hover:text-indigo-500">Join Meeting</button>
            </div>
            <Link to={`/projects/meet/${id}`} className="justify-between space-y-2 md:flex md:space-y-0 bg-black text-white  text-sm py-1 px-2 rounded">
                <span className="group-hover:text-indigo-500">Add Meet Schedule</span>
            </Link>
            <Link to={`/projects/meet/${id}`} className="justify-between space-y-2 md:flex md:space-y-0 bg-black text-white  text-sm py-1 px-2 rounded">
                <span className="group-hover:text-indigo-500">End Meet</span>
            </Link>
        </div>
    );
};

export default Meet;