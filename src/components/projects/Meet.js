import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteMeetMutation, useGetTeamMeetQuery } from '../../features/team/teamApi';

const Meet = ({ id }) => {

    // if it is not a meeting time , don't showing this button.
    const { data: getMeet, isSuccess, isError, error, isLoading } = useGetTeamMeetQuery(id);
    const [deleteMeet]=useDeleteMeetMutation();
    const { project_id, scheduleNow } = getMeet || {}
    // console.log(scheduleNow);
    const handleEndMeet=()=>{
        deleteMeet(id)
    }

    return (
        <div className='flex gap-3'>
            {
                scheduleNow && <div className="justify-between space-y-2 md:flex md:space-y-0 bg-red-500 text-white  text-sm py-1 px-2 rounded">
                    <button disabled className="group-hover:text-indigo-500"><a target='_black' href={scheduleNow}>Join Meeting</a></button>
                </div>
            }
            {
                !scheduleNow && <Link to={`/projects/meet/${id}`} className="justify-between space-y-2 md:flex md:space-y-0 bg-red-500 text-white  text-sm py-1 px-2 rounded">
                    <span className="group-hover:text-indigo-500">Add Meet Schedule</span>
                </Link>
            }
            {
                scheduleNow && <button onClick={handleEndMeet} className="justify-between space-y-2 md:flex md:space-y-0 bg-black text-white  text-sm py-1 px-2 rounded">
                    <span className="group-hover:text-indigo-500">End Meet</span>
                </button>
            }
        </div>
    );
};

export default Meet;