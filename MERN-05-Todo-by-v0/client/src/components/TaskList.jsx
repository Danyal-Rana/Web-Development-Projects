import React, { useEffect } from 'react';
import axios from 'axios';
import Task from './Task';

const TaskList = ({ tasks, setTasks }) => {
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
    };

    const handleTaskDeleted = (deletedTaskId) => {
        setTasks(tasks.filter((task) => task._id !== deletedTaskId));
    };

    return (
        <div className="space-y-4">
            {tasks.length === 0 ? (
                <p className="text-center text-gray-500">No tasks yet. Add a new task to get started!</p>
            ) : (
                tasks.map((task) => (
                    <Task
                        key={task._id}
                        task={task}
                        onTaskUpdated={handleTaskUpdated}
                        onTaskDeleted={handleTaskDeleted}
                    />
                ))
            )}
        </div>
    );
};

export default TaskList;