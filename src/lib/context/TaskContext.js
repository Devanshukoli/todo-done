"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create TaskContext
const TaskContext = createContext();

// TaskProvider component to wrap your application
export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    // Fetch tasks from the API
    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/tasks`, {
                headers: { Authorization: `${token}` },
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks(); // Fetch tasks on first render
    }, []);

    const emptyTasks = () => {
        console.log("EMPTYYYY")
        setTasks([]);
    }

    return (
        <TaskContext.Provider value={{ tasks, fetchTasks, emptyTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

// Custom hook to use the TaskContext
export const useTasks = () => useContext(TaskContext);