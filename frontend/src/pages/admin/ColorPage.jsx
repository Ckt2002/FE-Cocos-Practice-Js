import { useEffect, useState, useCallback } from "react";
import SimpleTable from "../../components/Admin/SimpleTable";
import SimpleForm from "../../components/Admin/SimpleForm";

const ColorsPage = () => {
    const [colors, setColors] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const API_URL = `${import.meta.env.VITE_API_BASE_URL}/color`;

    const fetchColors = useCallback(async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/color`);
            const result = await res.json();
            if (result.success) {
                setColors(result.data || []);
            }
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            console.log("");
        }
    }, []);

    useEffect(() => {
        fetchColors();
    }, [fetchColors]);

    const handleSave = async (formData) => {
        const method = selectedColor ? 'PUT' : 'POST';
        const url = selectedColor ? `${API_URL}/${selectedColor.id}` : API_URL;

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            setShowForm(false);
            fetchColors();
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Colors</h1>
            <SimpleTable
                title="Color"
                data={colors}
                onAdd={() => { setSelectedColor(null); setShowForm(true); }}
                onEdit={(color) => { setSelectedColor(color); setShowForm(true); }}
            />

            {showForm && (
                <SimpleForm
                    title="Color"
                    key={selectedColor ? selectedColor.id : 'new'}
                    existingItem={selectedColor}
                    onSave={handleSave}
                    onCancel={() => setShowForm(false)}
                />
            )}
        </div>
    );
};

export default ColorsPage;
