import { useState, useEffect, useCallback } from 'react';
import StaffTable from '../../components/Admin/StaffTable';
import StaffForm from '../../components/Admin/StaffForm';

const StaffPage = () => {
    const [staffs, setStaffs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [selectedStaff, setEditingStaff] = useState(null);

    const fetchStaffs = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/staff`);
            const result = await res.json();
            if (result.success) {
                setStaffs(result.data);
            }
        } catch (err) {
            console.error("Error fetching staffs:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStaffs();
    }, [fetchStaffs]);

    const handleOpenAddForm = () => {
        setEditingStaff(null);
        setShowForm(true);
    };

    const handleOpenEditForm = (staff) => {
        setEditingStaff(staff);
        setShowForm(true);
    };


    const handleSave = async (formData) => {
        const method = selectedStaff ? 'PUT' : 'POST';
        const url = selectedStaff
            ? `${import.meta.env.VITE_API_BASE_URL}/staff/${selectedStaff.id}`
            : `${import.meta.env.VITE_API_BASE_URL}/staff`;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowForm(false);
                fetchStaffs();
            } else {
                alert("Failed to save staff.");
            }
        } catch (error) {
            console.error("Save error:", error);
        }
    };

    if (loading) {
        return <div>Loading staff members...</div>;
    }

    return (
        <div>
            <h2>Staff Management</h2>
            <StaffTable
                data={staffs}
                onEdit={handleOpenEditForm}
                onAdd={handleOpenAddForm}
            />
            {showForm && <StaffForm
                existingStaff={selectedStaff}
                onSave={handleSave}
                onCancel={() => setShowForm(false)}
            />}
        </div>
    );
};

export default StaffPage;