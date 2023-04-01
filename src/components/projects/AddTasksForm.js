import { useState, useEffect } from 'react';
import Layout from '../../Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTeamQuery } from '../../features/team/teamApi';
import { useGetUserQuery } from '../../features/auth/authApi';
import { useAddNewTaskMutation } from '../../features/tasks/tasksApi';

const AddTasksForm = () => {
    const { addId } = useParams();
    const navigate = useNavigate();
    const { data: project, isSuccess, isError, error, isLoading } = useGetTeamQuery(addId);
    const { data: user, isSuccess: userSuccess } = useGetUserQuery()

    const [addNewTask, { data: assignNewTask }] = useAddNewTaskMutation();

    const [projectName, setProjectName] = useState("")
    const [assignTo, setAssignTo] = useState("")
    const [tasks, setTasks] = useState("")
    const [dateLine, setDateLine] = useState("")


    useEffect(() => {
        if (project?.teamName) setProjectName(project?.teamName)
    }, [isSuccess, project?.teamName])


    const getActiveUser = user?.data.map(dt => {
        const isTeamMember = project?.teamMembers?.includes(dt.email)
        if (isTeamMember) {
            return dt;
        }
    }).filter(d => d); // Filter out any undefined values

    // console.log(getActiveUser)

    const hendleSubmitTask = (e) => {
        e.preventDefault();
        const data = { projectName, assignTo, tasks, dateLine, project_Id: project?._id, status: 'pending' };
        addNewTask(data)
        console.log(data)
        navigate(`/projects/${addId}`)
    }


    return (
        <Layout title="Add Task" className="bg-[#f5f7f9] h-[89.9vh] flex justify-center items-center">
            <div className='py-9 w-11/12'>
                <form className="max-w-md mx-auto  border-2 p-6 bg-white" onSubmit={hendleSubmitTask}>
                    <div>
                        <label htmlFor="project-name" className="block font-medium text-gray-700">Project Name</label>
                        <input type="text" id="project-name" name="project-name" className="mt-1 border p-2 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder='defalut readonly' value={project?.teamName || ""} readOnly />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="assign-to" className="block font-medium text-gray-700">Assign To</label>
                        <select id="assign-to" disabled={!getActiveUser?.length} name="assign-to" onChange={(e) => setAssignTo(e.target.value)} className="mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm border p-2 focus:outline-none sm:text-sm">
                            <option hidden value="">Select any team member</option>
                            {
                                getActiveUser?.map((dt, idx) => <option value={dt._id} key={idx}>{dt.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="task" className="block font-medium text-gray-700">Task </label>
                        <textarea id="task" name="task" value={tasks} onChange={(e) => setTasks(e.target.value)} rows="4" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="deadline" className="block font-medium text-gray-700">Deadline</label>
                        <input type="date" id="deadline" onChange={(e) => setDateLine(e.target.value)} name="deadline" className="mt-1 border p-2 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md cursor-pointer" />
                    </div>
                    <div className="mt-8">

                        <button disabled={!getActiveUser?.length} type="submit" className="w-full flex  gap-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            ADD TASK
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default AddTasksForm;