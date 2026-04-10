import { useEffect, useState, useCallback } from 'react';
import ProductTable from '../../components/Admin/ProductTable';
import ProductForm from '../../components/Admin/ProductForm';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/product`);
            const result = await res.json();
            if (result.success) {
                setProducts(result.data);
            }
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleOpenAddForm = () => {
        setSelectedProduct(null);
        setShowForm(true);
    };

    const handleOpenEditForm = (product) => {
        setSelectedProduct(product); // Pass the product data to the form
        setShowForm(true);
    };

    const handleSave = async (formData) => {
        const method = selectedProduct ? 'PUT' : 'POST';
        const url = selectedProduct
            ? `${import.meta.env.VITE_API_BASE_URL}/product/${selectedProduct.id}`
            : `${import.meta.env.VITE_API_BASE_URL}/product`;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowForm(false);
                fetchProducts();
            } else {
                alert("Failed to save product.");
            }
        } catch (error) {
            console.error("Save error:", error);
        }
    };

    if (loading) return <div style={{ padding: '20px' }}>Loading Inventory...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h1>Products</h1>
            </div>

            <ProductTable
                data={products}
                onEdit={handleOpenEditForm}
                onAdd={handleOpenAddForm}
            />

            {showForm && (
                <ProductForm
                    key={selectedProduct ? selectedProduct.id : 'new'}
                    existingProduct={selectedProduct}
                    onSave={handleSave}
                    onCancel={() => setShowForm(false)}
                />
            )}
        </div>
    );
};

export default ProductsPage;