import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetTeamQuery } from '../../features/team/teamApi';
import Layout from '../../Layout';
import profileIcon from '../../assets/profile.png'

const ProjectsDetails = () => {
    const { projectId } = useParams();
    const { data: project, isSuccess, isError, error, isLoading } = useGetTeamQuery(projectId);
    const { teamColor, teamMembers, teamName, _id } = project || {};
    return (
        <Layout title="Team List" className="bg-[#f5f7f9] h-[89.9vh]">

            <div className='w-10/12 m-auto py-9'>
                <div className="grid grid-cols-5 gap-2 ">
                    <div className='border border-gray-300 rounded-sm p-1 min-h-[80vh] flex flex-col gap-2'>
                        <p className='font-mono underline underline-offset-4'>Project Name :</p>
                        <p>{teamName}</p>
                        <p className='underline underline-offset-4 font-mono' title='LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLD'>Team Members :(different color when not found in user api)</p>
                        {
                            (teamMembers?.length) ? (teamMembers.map((dt, idx) => <p className='break-words flex gap-1' key={idx}><img className='w-6' src={profileIcon} alt="" /> {dt.slice(0, 20)}...</p>)) : <p>No members yet !</p>
                        }

                    </div>
                    <div className='border border-gray-300 rounded-sm col-span-4 p-1'>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-4'>
                                <div className="justify-between space-y-2 md:flex md:space-y-0 bg-blue-400 hover:bg-blue-500 text-white text-sm py-1 px-2 rounded">
                                    <span className="group-hover:text-indigo-500">Pending Tasks: {0}</span>
                                </div>
                                <div className="justify-between space-y-2 md:flex md:space-y-0 bg-blue-400 hover:bg-blue-500 text-white text-sm py-1 px-2 rounded">
                                    <span className="group-hover:text-indigo-500">In Process Tasks: {0}</span>
                                </div>
                                <div className="justify-between space-y-2 md:flex md:space-y-0 bg-blue-400 hover:bg-blue-500 text-white text-sm py-1 px-2 rounded">
                                    <span className="group-hover:text-indigo-500">Completed Tasks: {0}</span>
                                </div>
                            </div>
                            <div className="justify-between space-y-2 md:flex md:space-y-0 bg-blue-400 hover:bg-blue-500 text-white text-sm py-1 px-2 rounded">
                                <Link to='/add' className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                        stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <span className="group-hover:text-indigo-500">Add New Task</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProjectsDetails;