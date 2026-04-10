import { useState, useEffect } from 'react';

const StaffForm = ({ existingStaff, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        staffID: existingStaff?.staffID || "",
        fullName: existingStaff?.fullName || '',
        age: existingStaff?.age,
        gender: existingStaff?.gender || '',
        address: existingStaff?.address || '',
        phoneNumber: existingStaff?.phoneNumber || '',
        isWorking: existingStaff?.isWorking || true,
        roleId: existingStaff?.roleId || ''
    });

    const [options, setOptions] = useState({
        role: []
    });

    useEffect(() => {
        const fetchOptions = async () => {
            const [r] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_BASE_URL}/role`).then(res => res.json()),
            ]);
            setOptions({
                role: r.data || []
            });
        };
        fetchOptions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let finalValue = (name === 'age')
            ? Number(value)
            : value;

        if (value === "true") finalValue = true;
        if (value === "false") finalValue = false;
        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div style={styles.overlay}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h3>{existingStaff ? 'Edit Staff' : 'Add New Staff'}</h3>

                <div style={styles.inputGroup}>
                    <label>Staff Id</label>
                    <input name="staffID" value={formData.staffID} onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.inputGroup}>
                    <label>Full Name</label>
                    <input name="fullName" value={formData.fullName} onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.inputGroup}>
                    <label>Age</label>
                    <input type='number' name="age" value={formData.age} onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.inputGroup}>
                    <label>Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div style={styles.inputGroup}>
                    <label>Address</label>
                    <input name="address" value={formData.address} onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.inputGroup}>
                    <label>Phone Number</label>
                    <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.inputGroup}>
                    <label>Is Working</label>
                    <select
                        name="isWorking"
                        value={String(formData.isWorking)}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    >
                        <option value="">Please select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <div style={styles.row}>
                    <div style={styles.inputGroup}>
                        <label>Role</label>
                        <select name="roleId" value={formData.roleId} onChange={handleChange} style={styles.input}>
                            <option value="">Select Role</option>
                            {options.role.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </select>
                    </div>
                </div>

                <div style={styles.buttonGroup}>
                    <button type="button" onClick={onCancel} style={styles.cancelBtn}>Cancel</button>
                    <button type="submit" style={styles.saveBtn}>Save Product</button>
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

export default StaffForm;