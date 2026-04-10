import LoginForm from '../features/auth/LoginForm';

const LoginPage = () => {
    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h1>Sign In</h1>
                <LoginForm />
            </div>
        </div>
    );
};

const styles = {
    wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5' },
    card: { padding: '2.5rem', background: 'white', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px' }
};

export default LoginPage;