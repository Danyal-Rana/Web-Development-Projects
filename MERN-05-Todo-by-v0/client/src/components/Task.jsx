import React, { useState } from 'react';
import axios from 'axios';

const Task = ({ task, onTaskUpdated, onTaskDeleted }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [content, setContent] = useState(task.content);

    const handleUpdate = async () => {
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
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${task._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            onTaskDeleted(task._id);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    if (isEditing) {
        return (
            <div className="bg-white p-4 rounded shadow">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <div className="flex justify-end space-x-2">
                    <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded">
                        Save
                    </button>
                    <button onClick={() => setIsEditing(false)} className="bg-gray-300 p-2 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="mt-2">{task.content}</p>
            <div className="flex justify-end space-x-2 mt-4">
                <button onClick={() => setIsEditing(true)} className="text-blue-500">
                    Edit
                </button>
                <button onClick={handleDelete} className="text-red-500">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Task;