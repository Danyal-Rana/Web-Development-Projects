import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setTasks(data);
        } catch (error) {
            setError('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleTaskAdded = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
    };

    const handleTaskDeleted = (deletedTaskId) => {
        setTasks(tasks.filter((task) => task._id !== deletedTaskId));
    };

    if (loading) {
        return <div className="text-center">Loading tasks...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

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