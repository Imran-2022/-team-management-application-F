import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetTeamQuery } from '../../features/team/teamApi';
import Layout from '../../Layout';
import { useGetUserQuery } from '../../features/auth/authApi';
import Task from './Task';
import { useGetTasksQuery } from '../../features/tasks/tasksApi';
import TaskStatus from './TaskStatus';
import { useSelector } from 'react-redux';
import Meet from './Meet';

const ProjectsDetails = () => {
    const { user: loggedUser } = useSelector(state => state.auth);
    // console.log(loggedUser);

    const { projectId } = useParams();
    const { data: project, isSuccess, isError, error, isLoading } = useGetTeamQuery(projectId);
    const { data: user, isSuccess: userSuccess } = useGetUserQuery()
    const { data: tasks } = useGetTasksQuery()

    const { teamColor, teamMembers, teamName, _id } = project || {};

    const getActiveUser = user?.data.map(dt => {
        const isTeamMember = project?.teamMembers?.includes(dt.email)
        if (isTeamMember) {
            return dt.name;
        }
    }).filter(name => name); // Filter out any undefined values

    // get valid tasks -

    const userTasks = tasks?.map(dt => {
        if (dt.project_Id == project?._id) {
            return dt;
        }
    }).filter(d => d);

    // console.log(project);
    // console.log(tasks);
    // console.log(userTasks);
    // console.log(getActiveUser);

    const getManager = user?.data.find(dt => dt.email == project?.teamMembers?.[0]) // Filter out any undefined values

    // console.log(getManager);

    return (
        <Layout title="Team List" className="bg-[#f5f7f9] h-[89.9vh]">

            <div className='w-auto mx-9 m-auto py-9'>
                <div className="grid grid-cols-5 gap-2 ">
                    <div className='border border-gray-300 rounded-sm p-1 min-h-[80vh] flex flex-col gap-2 bg-white'>
                        <div className="justify-between space-y-2 md:flex md:space-y-0 bg-black text-white  text-sm py-1 px-2 rounded">
                            <span className="group-hover:text-indigo-500">Meet - 8pm,Thu Mar 30 2023</span>
                        </div>
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
                            <span className="text-xs font-medium uppercase tracking-wider "> <span className='text-xs'>P.Lead:</span> {getManager?.name || "none"} <span className='text-red-400 lowercase'><a href={`mailto:${getManager?.email}`}>{(getManager?.email)}</a></span></span>
                        </div>
                        {
                            getManager?.email ? <div className="justify-between space-y-2 md:flex md:space-y-0 bg-cyan-200  text-sm py-1 px-2 rounded">
                                <span className="text-xs font-medium uppercase tracking-wider "> <span className='text-xs'>project supervisor :</span> {getManager?.name || "none"} <span className='text-red-400 lowercase'><a href={`mailto:${getManager?.email}`}>{(getManager?.email)}</a></span></span>
                            </div> : <div className="justify-between space-y-2 md:flex md:space-y-0 bg-cyan-200  text-sm py-1 px-2 rounded">
                                <span className="text-xs font-medium uppercase tracking-wider ">project supervisor : <span className='text-red-400 lowercase'>
                                    <form className="max-w-sm mx-auto">
                                        <div className="py-2">
                                            <input className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="email" type="email" placeholder="supervisor@example.com" />
                                        </div>
                                    </form>
                                </span></span>
                            </div>
                        }

                        <p className='p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Active Team Members are :</p>

                        <div className='flex gap-4 flex-col py-2'>
                            {
                                (getActiveUser?.length) ? (getActiveUser.map((dt, idx) => <p className='px-3 break-words justify-items-start items-center flex gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider' key={idx}><img className='w-6' src={idx % 2 == 0 ? 'http://robohash.org/stefan-one' : 'http://robohash.org/stefan-two'} alt="" /> {dt}</p>)) : <p className='px-3'>No active members yet !</p>
                            }
                        </div>

                    </div>
                    <div className='border border-gray-300 rounded-sm col-span-4 p-1 bg-white'>
                        <div className='flex justify-between items-center'>
                            <TaskStatus task={userTasks} />
                            <Meet id={_id} />
                            <div className="justify-between space-y-2 md:flex md:space-y-0 space-x-12">

                                <div className=' bg-cyan-200 hover:bg-cyan-300  text-sm py-1 px-2 rounded'>
                                    {/* <Link to={`/projects/add/${_id}`} className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        <span className="group-hover:text-indigo-500">Assign New Task</span>
                                    </Link> */}
                                    {(getManager?.email == loggedUser?.email) ? <Link to={`/projects/add/${_id}`} className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        <span className="group-hover:text-indigo-500">Assign New Task</span>
                                    </Link> : <button disabled className="group-hover:text-indigo-500">Assign New Task</button>}
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
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">reviewed</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    userTasks?.map((dt, idx) => <Task key={idx} dt={dt} id={_id} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProjectsDetails;