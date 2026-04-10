import { useEffect, useState, useCallback } from "react";
import SimpleTable from "../../components/Admin/SimpleTable";
import SimpleForm from "../../components/Admin/SimpleForm";

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/brand`;

  const fetchBrands = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/brand`);
      const result = await res.json();
      if (result.success) {
        setBrands(result.data || []);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      console.log("");
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleSave = async (formData) => {
    const method = selectedBrand ? 'PUT' : 'POST';
    const url = selectedBrand ? `${API_URL}/${selectedBrand.id}` : API_URL;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      setShowForm(false);
      fetchBrands();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Brands</h1>
      <SimpleTable
        title="Brand"
        data={brands}
        onAdd={() => { setSelectedBrand(null); setShowForm(true); }}
        onEdit={(brand) => { setSelectedBrand(brand); setShowForm(true); }}
      />

      {showForm && (
        <SimpleForm
          title="Brand"
          key={selectedBrand ? selectedBrand.id : 'new'}
          existingItem={selectedBrand}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default BrandsPage;
