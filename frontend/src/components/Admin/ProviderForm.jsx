import { useState } from 'react';

const ProviderForm = ({ existingProvider, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: existingProvider?.name || '',
        address: existingProvider?.address || '',
        phoneNumber: existingProvider?.phoneNumber || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div style={styles.overlay}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h3>{existingProvider ? 'Edit Provider' : 'Add New Provider'}</h3>

                <div style={styles.inputGroup}>
                    <label>Provider Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.inputGroup}>
                    <label>Provider Address</label>
                    <input name="address" value={formData.address} onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.inputGroup}>
                    <label>Provider Phone Number</label>
                    <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.buttonGroup}>
                    <button type="button" onClick={onCancel} style={styles.cancelBtn}>Cancel</button>
                    <button type="submit" style={styles.saveBtn}>Save Provider</button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    form: { background: 'white', padding: '30px', borderRadius: '12px', width: '500px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' },
    inputGroup: { marginBottom: '15px', display: 'flex', flexDirection: 'column', flex: 1 },
    row: { display: 'flex', gap: '15px' },
    input: { padding: '10px', borderRadius: '6px', border: '1px solid #ddd', marginTop: '5px' },
    buttonGroup: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' },
    saveBtn: { background: '#4facfe', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' },
    cancelBtn: { background: '#eee', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }
};

export default ProviderForm;