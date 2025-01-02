import axios from 'axios';

export const getUserFromToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.user;
    } catch (error) {
        console.error('Error verifying token:', error);
        localStorage.removeItem('token');
        return null;
    }
};