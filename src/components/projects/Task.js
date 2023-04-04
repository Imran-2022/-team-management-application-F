import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetUserQuery } from '../../features/auth/authApi';
import { useDeleteTasksMutation, useEditTasksStatusMutation } from '../../features/tasks/tasksApi';
import EditTasksForm from './EditTasksForm';

const Task = ({ dt = {}, id }) => {
  const [editTasksStatus, { isSuccess }] = useEditTasksStatusMutation();
  const [deleteTasks, { isSuccess: deleteTasksSuccess }] = useDeleteTasksMutation();
  const [openModal, setOpenModal] = useState(false);
  const controlModal = () => {
    setOpenModal((prevState) => !prevState);
};
  const { projectName, assignTo, tasks, dateLine, project_Id, status, _id } = dt;
  // console.log(dt);
  const { data: user, isSuccess: userSuccess } = useGetUserQuery()

  const getMemberName = user?.data.find(dt => dt._id == assignTo)

  // console.log(getMemberName);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(dateLine).toDateString()}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-progress" title={tasks}>{tasks?.slice(0, 70)} ...</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{getMemberName?.name}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2 justify-center">
        {
          status == 'completed' ? <button className="" onClick={() => deleteTasks(dt?._id)}><svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-600 hover:text-red-600"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg></button> :<>
           <button  onClick={controlModal} className=""><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-600 hover:text-indigo-600"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path></svg></button>
           <EditTasksForm project_Id={project_Id} id={_id} open={openModal} control={controlModal} />
          </>

           
        }
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <select onChange={
          (e) => {
            editTasksStatus({
              id: dt?._id,
              data: { ...dt, status: e.target.value }
            })

          }
        } className='focus:outline-none px-2 pb-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800 cursor-pointer' defaultValue={status}>
          <option value="pending" selected={status === 'pending'} >pending</option>
          <option value="inProgress" selected={status === 'inProgress'}>inProgress</option>
          <option value="completed" selected={status === 'completed'}>Completed</option>
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <select className='focus:outline-none px-2 pb-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800 cursor-pointer' defaultValue={status}>
          <option value="pending" selected={status === 'no'} >No review given</option>
          <option value="inProgress" selected={status === 'inProgress'}>updates needed</option>
          <option value="completed" selected={status === 'completed'}>Success</option>
        </select>
      </td>
    </tr>
  );
};

export default Task;
