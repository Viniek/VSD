import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,

    signup: async (email, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/signup', { email, password });
            return { success: true, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Signup failed!" };
        }
    },

    login: async (email, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
            const token = response.data.token;
            set({ user: email, token });
            localStorage.setItem('token', token);
            return { success: true, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login failed!" };
        }
    },

    logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem('token');
    }
}));

export default useAuthStore;
