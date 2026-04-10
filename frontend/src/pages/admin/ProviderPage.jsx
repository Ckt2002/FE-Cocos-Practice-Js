import { useEffect, useState, useCallback } from "react";
import ProviderTable from "../../components/Admin/ProviderTable";
import ProviderForm from "../../components/Admin/ProviderForm";

const ProvidersPage = () => {
    const [providers, setProvider] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const API_URL = `${import.meta.env.VITE_API_BASE_URL}/provider`;

    const fetchProviders = useCallback(async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/provider`);
            const result = await res.json();
            if (result.success) {
                setProvider(result.data || []);
            }
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            console.log("");
        }
    }, []);

    useEffect(() => {
        fetchProviders();
    }, [fetchProviders]);

    const handleSave = async (formData) => {
        const method = selectedProvider ? 'PUT' : 'POST';
        const url = selectedProvider ? `${API_URL}/${selectedProvider.id}` : API_URL;

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            setShowForm(false);
            fetchProviders();
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>ProductTypes</h1>
            <ProviderTable
                data={providers}
                onAdd={() => { setSelectedProvider(null); setShowForm(true); }}
                onEdit={(provider) => { setSelectedProvider(provider); setShowForm(true); }}
            />

            {showForm && (
                <ProviderForm
                    existingProvider={selectedProvider}
                    onSave={handleSave}
                    onCancel={() => setShowForm(false)}
                />
            )}
        </div>
    );
};


export default ProvidersPage;
