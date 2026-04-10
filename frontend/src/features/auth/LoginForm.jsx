import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/UI/Input';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuth();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const result = await login(username, password);
        if (result) {
            console.log("Success!", result);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Input
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button disabled={loading} style={styles.button}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};

const styles = {
    button: { width: '100%', padding: '0.75rem', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default LoginForm;