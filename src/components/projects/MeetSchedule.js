import React, { useState } from 'react';
import Layout from '../../Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddTeamMeetMutation, useGetTeamQuery } from '../../features/team/teamApi';

const MeetSchedule = () => {
    const {mId}=useParams()
    const navigate = useNavigate();
    const [addTeamMeet]=useAddTeamMeetMutation();
    const [scheduleNow,setScheduleNow]=useState("");
    const [scheduleLater,setScheduleLater]=useState("");
    const { data: project, isSuccess, isError, error, isLoading } = useGetTeamQuery(mId);

    const handleScheduleM = (e) => {
        e.preventDefault()
        const dt={scheduleNow}
        console.log(scheduleNow,mId)
        addTeamMeet({id:mId,data:dt})
        navigate(`/projects/${mId}`)
    }
    // console.log(project)
    return (
        <Layout title="Add Task" className="bg-[#f5f7f9] h-[89.9vh] flex justify-center items-center">
            <div className='py-9 w-11/12'>
                <form className="max-w-md mx-auto  border-2 p-6 bg-white" onSubmit={(e)=>handleScheduleM(e)}>
                    <div>
                        <label for="projectName" className="block font-medium text-gray-700">Meeting For Project : </label>
                        <input type="text"  name="projectName" value={project?.teamName} className="mt-1 border p-2 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder='project readonly' readOnly />
                    </div>
                    <div className="mt-4">
                        <label for="assign-to" className="block font-medium text-gray-700">Just for now</label>
                        <input type="text" name="scheduleNow" className="mt-1 border p-2 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder='meet link' value={scheduleNow} onChange={(e)=>setScheduleNow(e.target.value)} />
                    </div>
                    <div className="mt-4">
                        <label for="assign-to" className="block font-medium text-gray-700">Schedule Meeting</label>
                        <input disabled type="text" name="scheduleLater" className="mt-1 border p-2 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder='schedule link' />
                        <input disabled type="text"  name="scheduleLater" className="mt-1 border p-2 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder='Meeting Time & Date' value={scheduleLater} onChange={(e)=>setScheduleLater(e.target.value)} />
                    </div>
                    <div className="mt-8">
                        <button type="submit" className="w-full flex  gap-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            ADD MEETING SCHEDULE
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default MeetSchedule;