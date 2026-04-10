import { useEffect, useState, useCallback } from "react";
import SimpleTable from "../../components/Admin/SimpleTable";
import SimpleForm from "../../components/Admin/SimpleForm";

const SizesPage = () => {
    const [sizes, setSizes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const API_URL = `${import.meta.env.VITE_API_BASE_URL}/size`;

    const fetchSizes = useCallback(async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/size`);
            const result = await res.json();
            if (result.success) {
                setSizes(result.data || []);
            }
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            console.log("");
        }
    }, []);

    useEffect(() => {
        fetchSizes();
    }, [fetchSizes]);

    const handleSave = async (formData) => {
        const method = selectedSize ? 'PUT' : 'POST';
        const url = selectedSize ? `${API_URL}/${selectedSize.id}` : API_URL;

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            setShowForm(false);
            fetchSizes();
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Sizes</h1>
            <SimpleTable
                title="Size"
                data={sizes}
                onAdd={() => { setSelectedSize(null); setShowForm(true); }}
                onEdit={(size) => { setSelectedSize(size); setShowForm(true); }}
            />

            {showForm && (
                <SimpleForm
                    title="Size"
                    key={selectedSize ? selectedSize.id : 'new'}
                    existingItem={selectedSize}
                    onSave={handleSave}
                    onCancel={() => setShowForm(false)}
                />
            )}
        </div>
    );
};


export default SizesPage;
