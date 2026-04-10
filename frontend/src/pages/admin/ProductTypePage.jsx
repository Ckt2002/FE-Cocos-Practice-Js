import { useEffect, useState, useCallback } from "react";
import SimpleTable from "../../components/Admin/SimpleTable";
import SimpleForm from "../../components/Admin/SimpleForm";

const ProductTypesPage = () => {
    const [productTypes, setProductTypes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedProductType, setSelectedProductType] = useState(null);
    const API_URL = `${import.meta.env.VITE_API_BASE_URL}/type`;

    const fetchProductTypes = useCallback(async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/type`);
            const result = await res.json();
            if (result.success) {
                setProductTypes(result.data || []);
            }
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            console.log("");
        }
    }, []);

    useEffect(() => {
        fetchProductTypes();
    }, [fetchProductTypes]);

    const handleSave = async (formData) => {
        const method = selectedProductType ? 'PUT' : 'POST';
        const url = selectedProductType ? `${API_URL}/${selectedProductType.id}` : API_URL;

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            setShowForm(false);
            fetchProductTypes();
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>ProductTypes</h1>
            <SimpleTable
                title="ProductType"
                data={productTypes}
                onAdd={() => { setSelectedProductType(null); setShowForm(true); }}
                onEdit={(type) => { setSelectedProductType(type); setShowForm(true); }}
            />

            {showForm && (
                <SimpleForm
                    title="ProductType"
                    key={selectedProductType ? selectedProductType.id : 'new'}
                    existingItem={selectedProductType}
                    onSave={handleSave}
                    onCancel={() => setShowForm(false)}
                />
            )}
        </div>
    );
};


export default ProductTypesPage;
