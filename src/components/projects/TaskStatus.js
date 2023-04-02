import React, { useEffect, useState } from 'react';

const TaskStatus = ({ task }) => {

    const [total, setTotal] = useState(0);
    const [pending, setPending] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [inProgress,setInProgress]=useState(0);

    useEffect(() => {
        if (task) {
            setTotal(task?.length)
            const statusPending = task.filter(dt => dt.status === 'pending').length;
            setPending(statusPending);
            const statusinProgress = task.filter(dt => dt.status === 'inProgress').length;
            setInProgress(statusinProgress);
            const statusCompleted = task.filter(dt => dt.status === 'completed').length;
            setCompleted(statusCompleted);
        }

    }, [task])

    return (
        <div className='flex gap-4'>

            <div className="justify-between space-y-2 md:flex md:space-y-0 bg-cyan-200 hover:bg-cyan-300  text-sm py-1 px-2 rounded">
                <span className="group-hover:text-indigo-500">Total Tasks: {total || 0}</span>
            </div>
            <div className="justify-between space-y-2 md:flex md:space-y-0 bg-cyan-200 hover:bg-cyan-300  text-sm py-1 px-2 rounded">
                <span className="group-hover:text-indigo-500">Pending Tasks: {pending||0}</span>
            </div>
            <div className="justify-between space-y-2 md:flex md:space-y-0 bg-cyan-200 hover:bg-cyan-300   text-sm py-1 px-2 rounded">
                <span className="group-hover:text-indigo-500">In Process Tasks: {inProgress||0}</span>
            </div>
            <div className="justify-between space-y-2 md:flex md:space-y-0 bg-cyan-200 hover:bg-cyan-300   text-sm py-1 px-2 rounded">
                <span className="group-hover:text-indigo-500">Completed Tasks: {completed||0}</span>
            </div>
        </div>
    );
};

export default TaskStatus;