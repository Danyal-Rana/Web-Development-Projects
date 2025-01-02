import React, { useState } from 'react';
import axios from 'axios';

const Task = ({ task, onTaskUpdated, onTaskDeleted }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [content, setContent] = useState(task.content);
    const [error, setError] = useState('');

    const handleUpdate = async () => {
        setError('');
        try {
            const { data } = await axios.patch(
                `${import.meta.env.VITE_API_URL}/tasks/${task._id}`,
                { title, content },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            onTaskUpdated(data);
            setIsEditing(false);
        } catch (error) {
            setError('Failed to update task');
        }
    };

    const handleDelete = async () => {
        setError('');
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${task._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            onTaskDeleted(task._id);
        } catch (error) {
            setError('Failed to delete task');
        }
    };

    if (isEditing) {
        return (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
                    rows="3"
                />
                {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                <div className="flex justify-end space-x-2">
                    <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Save
                    </button>
                    <button onClick={() => setIsEditing(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
            <p className="text-gray-700 mb-4">{task.content}</p>
            {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
            <div className="flex justify-end space-x-2">
                <button onClick={() => setIsEditing(true)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Edit
                </button>
                <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Task;