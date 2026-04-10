import { useState } from 'react';

const SimpleForm = ({ title, existingItem, onSave, onCancel }) => {
    const [name, setName] = useState(existingItem?.name || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name });
    };

    return (
        <div style={styles.overlay}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h3>{existingItem ? `Edit ${title}` : `Add New ${title}`}</h3>

                <div style={styles.inputGroup}>
                    <label>{title} Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={styles.input}
                        autoFocus
                    />
                </div>

                <div style={styles.buttonGroup}>
                    <button type="button" onClick={onCancel} style={styles.cancelBtn}>Cancel</button>
                    <button type="submit" style={styles.saveBtn}>Save {title}</button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    form: { background: 'white', padding: '30px', borderRadius: '12px', width: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' },
    inputGroup: { marginBottom: '15px', display: 'flex', flexDirection: 'column' },
    input: { padding: '10px', borderRadius: '6px', border: '1px solid #ddd', marginTop: '5px' },
    buttonGroup: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' },
    saveBtn: { background: '#4facfe', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' },
    cancelBtn: { background: '#eee', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }
};

export default SimpleForm;