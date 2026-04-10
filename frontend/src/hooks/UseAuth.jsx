import { useState } from 'react';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const login = async (username, password) => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();
            console.log(result);
            if (!response.ok) throw new Error(result.message || 'Login failed');

            const roleName = result.data.role;
            localStorage.setItem('staffFullName', result.data.fullname);

            if (roleName === 'Manager') {
                window.location.href = '/admin-dashboard';
            } else {
                window.location.href = '/user-home';
            }

            return result;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};