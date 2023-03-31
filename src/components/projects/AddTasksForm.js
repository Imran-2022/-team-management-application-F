import React from 'react';
import Layout from '../../Layout';
import { useNavigate, useParams } from 'react-router-dom';

const AddTasksForm = () => {
    const { addId } = useParams();
    const navigate = useNavigate();
    const hendleSubmitTask = (e) => {
        e.preventDefault();
        navigate(`/projects/${addId}`)
    }

    return (
        <Layout title="Add Task" className="bg-[#f5f7f9] h-[89.9vh] flex justify-center items-center">
            <div className='py-9 w-11/12'>
                <form className="max-w-md mx-auto  border-2 p-6 bg-white" onSubmit={hendleSubmitTask}>
                    <div>
                        <label for="project-name" className="block font-medium text-gray-700">Project Name</label>
                        <input type="text" id="project-name" name="project-name" className="mt-1 border p-2 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder='defalut readonly' />
                    </div>
                    <div className="mt-4">
                        <label for="assign-to" className="block font-medium text-gray-700">Assign To</label>
                        <select id="assign-to" name="assign-to" className="mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm border p-2 focus:outline-none sm:text-sm">
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <label for="task" className="block font-medium text-gray-700">Task </label>
                        <textarea id="task" name="task" rows="4" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div className="mt-4">
                        <label for="deadline" className="block font-medium text-gray-700">Deadline</label>
                        <input type="date" id="deadline" name="deadline" className="mt-1 border p-2 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md cursor-pointer" />
                    </div>
                    <div className="mt-8">

                        <button type="submit" className="w-full flex  gap-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600">
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