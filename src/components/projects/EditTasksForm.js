import React, { useEffect, useState } from 'react';
import { useGetTaskQuery, useUpdateTaskMutation } from '../../features/tasks/tasksApi';
import { useGetTeamQuery } from '../../features/team/teamApi';
import { useGetUserQuery } from '../../features/auth/authApi';

const EditTasksForm = ({ open, control, id, project_Id }) => {

    // console.log(id);

    const { data: getTask, isSuccess: getTaskSuccess } = useGetTaskQuery(id);

    const { assignTo, dateLine, projectName, status, tasks } = getTask || {};

    const { data: project, isSuccess: getProjectSuccess } = useGetTeamQuery(project_Id);

    const [assigned, setAssignTo] = useState("")
    const [uTask, setUtask] = useState("")
    const [uDate, setUDate] = useState("")

    const { data: user, isSuccess: userSuccess } = useGetUserQuery();

    const getMemberName = user?.data.find(dt => dt._id == assignTo)
    const [updateTask]=useUpdateTaskMutation()
    // console.log(getMemberName);
    const getActiveUser = user?.data.map(dt => {
        const isTeamMember = project?.teamMembers?.includes(dt.email)
        if (isTeamMember) {
            return dt;
        }
    }).filter(name => name); // Filter out any undefined values


    useEffect(() => {
        setUtask(tasks)
        setUDate(dateLine)
        setAssignTo(assignTo)
    }, [getTask, tasks, dateLine,assignTo])


    console.log(getTask);
    const UpdateDTask = { ...getTask, assignTo: assigned, tasks: uTask, dateLine: uDate }

    const hendleSubmitTask = (e) => {
        control();
        console.log(UpdateDTask);
        updateTask({id,data:UpdateDTask})
    }

    return (open && <><div
        onClick={control}
        className="fixed w-full h-full inset-0 z-10 bg-black/40 cursor-pointer"
    ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white  p-10 fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <form onSubmit={(e) => { e.preventDefault(); hendleSubmitTask() }}>
                <div className="overflow-hidden  sm:rounded-md">
                    <div className="px-4 py-3 sm:p-3 space-y-4">
                        <div>
                            <label for="project-name" className="block font-medium text-gray-700">Project Name</label>
                            <input type="text" id="project-name" name="project-name" className="mt-1 border p-2 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder='defalut readonly' value={projectName} readOnly />
                        </div>
                        <div className="mt-4">
                            <label for="assign-to" className="block font-medium text-gray-700">Assign To</label>
                            <select id="assign-to" disabled={!getActiveUser?.length} name="assign-to" onChange={(e) => setAssignTo(e.target.value)} className="mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm border p-2 focus:outline-none sm:text-sm" defaultValue={assigned}> 
                                {
                                    getActiveUser?.map((dt, idx) => <option value={dt._id} key={idx}>{dt.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="mt-4">
                            <label for="task" className="block font-medium text-gray-700">Task </label>
                            <textarea value={uTask} onChange={e => setUtask(e.target.value)} id="task" name="task" rows="4" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                        </div>
                        <div className="mt-4">
                            <label for="deadline" className="block font-medium text-gray-700">Deadline</label>
                            <input value={uDate} onChange={e => setUDate(e.target.value)} type="date" id="deadline" name="deadline" className="mt-1 border p-2 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md cursor-pointer" />
                        </div>
                    </div>

                    <div className="mt-8">

                        <button type="submit" className="w-full flex  gap-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            UPDATE TASK
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </>
    );
};

export default EditTasksForm;