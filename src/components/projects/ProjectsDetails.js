import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetTeamQuery } from '../../features/team/teamApi';
import Layout from '../../Layout';
import profileIcon from '../../assets/profile.png'
import { useGetUserQuery } from '../../features/auth/authApi';
import Task from './Task';

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
                        <table className="min-w-full divide-y divide-gray-200 py-3">
                            <thead>
                                <tr className='bg-cyan-200'>
                                    <th scope="col" className="p-3 text-left text-xs font-medium  uppercase tracking-wider ">{teamName?.slice(0, 25)}...</th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Members :</th>
                                    <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{project?.teamMembers.length}</th>
                                </tr>
                                <tr>
                                    <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">inActive Members :</th>
                                    <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{project?.teamMembers.length - getActiveUser?.length}</th>
                                </tr>
                                <tr>
                                    <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Team Members :</th>
                                    <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{getActiveUser?.length || 0}</th>
                                </tr>
                            </thead>
                        </table>
                        <div className="justify-between space-y-2 md:flex md:space-y-0 bg-cyan-200  text-sm py-1 px-2 rounded">
                            <span className="text-xs font-medium uppercase tracking-wider "> <span className='text-xs '>P.Manager:</span> {getActiveUser?.[0] || "none"}</span>
                        </div>

                        <p className='p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Active Team Members are :</p>

                        <div className='flex gap-4 flex-col py-2'>
                            {
                                (getActiveUser?.length) ? (getActiveUser.map((dt, idx) => <p className='px-3 break-words justify-items-start items-center flex gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider' key={idx}><img className='w-6' src={profileIcon} alt="" /> {dt}</p>)) : <p>No active members yet !</p>
                            }
                        </div>

                    </div>
                    <div className='border border-gray-300 rounded-sm col-span-4 p-1 bg-white'>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-4'>

                                <div className="justify-between space-y-2 md:flex md:space-y-0 bg-cyan-200 hover:bg-cyan-300  text-sm py-1 px-2 rounded">
                                    <span className="group-hover:text-indigo-500">Pending Tasks: {0}</span>
                                </div>
                                <div className="justify-between space-y-2 md:flex md:space-y-0 bg-cyan-200 hover:bg-cyan-300   text-sm py-1 px-2 rounded">
                                    <span className="group-hover:text-indigo-500">In Process Tasks: {0}</span>
                                </div>
                                <div className="justify-between space-y-2 md:flex md:space-y-0 bg-cyan-200 hover:bg-cyan-300   text-sm py-1 px-2 rounded">
                                    <span className="group-hover:text-indigo-500">Completed Tasks: {0}</span>
                                </div>
                            </div>


                            <div className="justify-between space-y-2 md:flex md:space-y-0 space-x-12">
                                <div className='flex gap-2 justify-center items-center border'>
                                    <input type="text" placeholder="Search task " className="px-2 border-gray-300 focus:outline-none" />
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 17l-5-5m0 0l5-5m-5 5h12" />
                                    </svg>
                                </div>
                                <div className=' bg-cyan-200 hover:bg-cyan-300  text-sm py-1 px-2 rounded'>
                                    <Link to={`/projects/add/${_id}`} className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        <span className="group-hover:text-indigo-500">Assign New Task</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200 py-3">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date line</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task to do</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">who is responsible</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">update/delete</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <Task id={_id} />
                                <Task id={_id} />
                                <Task id={_id} />
                                <Task id={_id} />
                                <Task id={_id} />
                                <Task id={_id} />
                                <Task id={_id} />
                                <Task id={_id} />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProjectsDetails;