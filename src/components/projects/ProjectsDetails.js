import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetTeamQuery } from '../../features/team/teamApi';
import Layout from '../../Layout';
import profileIcon from '../../assets/profile.png'
import { useGetUserQuery } from '../../features/auth/authApi';

const ProjectsDetails = () => {
    const { projectId } = useParams();
    const { data: project, isSuccess, isError, error, isLoading } = useGetTeamQuery(projectId);
    const { data: user, isSuccess: userSuccess } = useGetUserQuery()
    const { teamColor, teamMembers, teamName, _id } = project || {};

    const getActiveUser = user?.data.map(dt => {
        const isTeamMember = project?.teamMembers?.includes(dt.email)
        if (isTeamMember) {
            return dt.name;
        }
    }).filter(name => name); // Filter out any undefined values



    return (
        <Layout title="Team List" className="bg-[#f5f7f9] h-[89.9vh]">

            <div className='w-auto mx-9 m-auto py-9'>
                <div className="grid grid-cols-5 gap-2 ">
                    <div className='border border-gray-300 rounded-sm p-1 min-h-[80vh] flex flex-col gap-2 bg-white'>
                        <p className='font-mono underline underline-offset-4'>Project Name :</p>
                        <p>{teamName}</p>
                        <p className='underline underline-offset-4 font-mono'>Team Members : {project?.teamMembers.length}</p>
                        <p className='underline underline-offset-4 text-xs text-red-600 font-bold'>inActive Members : {project?.teamMembers.length - getActiveUser.length}</p>

                        {
                            (getActiveUser?.length) ? (getActiveUser.map((dt, idx) => <p className='break-words flex gap-1' key={idx}><img className='w-6' src={profileIcon} alt="" /> {dt}</p>)) : <p>No active members yet !</p>
                        }

                    </div>
                    <div className='border border-gray-300 rounded-sm col-span-4 p-1 bg-white'>
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
                                    <span className="group-hover:text-indigo-500">Assign New Task</span>
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