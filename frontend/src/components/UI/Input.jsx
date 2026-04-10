const Input = ({ label, type, value, onChange, required }) => (
    <div style={styles.inputGroup}>
        <label style={styles.label}>{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            style={styles.input}
        />
    </div>
);

const styles = {
    inputGroup: { marginBottom: '1rem', display: 'flex', flexDirection: 'column' },
    label: { marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' },
    input: { padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc' }
};

export default Input;