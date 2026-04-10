import { useState, useEffect } from 'react';

const ProductForm = ({ existingProduct, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: existingProduct?.name || '',
        price: existingProduct?.price || 0,
        quantity: existingProduct?.quantity || 0,
        brandId: existingProduct?.brandId || '',
        colorId: existingProduct?.colorId || '',
        sizeId: existingProduct?.sizeId || '',
        typeId: existingProduct?.typeId || ''
    });

    const [options, setOptions] = useState({
        brands: [], colors: [], sizes: [], types: []
    });

    useEffect(() => {
        const fetchOptions = async () => {
            const [b, c, s, t] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_BASE_URL}/brand`).then(res => res.json()),
                fetch(`${import.meta.env.VITE_API_BASE_URL}/color`).then(res => res.json()),
                fetch(`${import.meta.env.VITE_API_BASE_URL}/size`).then(res => res.json()),
                fetch(`${import.meta.env.VITE_API_BASE_URL}/type`).then(res => res.json()),
            ]);
            setOptions({
                brands: b.data || [],
                colors: c.data || [],
                sizes: s.data || [],
                types: t.data || []
            });
        };
        fetchOptions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const finalValue = (name === 'price' || name === 'quantity')
            ? Number(value)
            : value;
        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div style={styles.overlay}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h3>{existingProduct ? 'Edit Product' : 'Add New Product'}</h3>

                <div style={styles.inputGroup}>
                    <label>Product Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.row}>
                    <div style={styles.inputGroup}>
                        <label>Price</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.inputGroup}>
                        <label>Quantity</label>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} style={styles.input} />
                    </div>
                </div>

                <div style={styles.row}>
                    <div style={styles.inputGroup}>
                        <label>Brand</label>
                        <select name="brandId" value={formData.brandId} onChange={handleChange} style={styles.input}>
                            <option value="">Select Brand</option>
                            {options.brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                    </div>
                    <div style={styles.inputGroup}>
                        <label>Type</label>
                        <select name="typeId" value={formData.typeId} onChange={handleChange} style={styles.input}>
                            <option value="">Select Type</option>
                            {options.types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>
                </div>

                <div style={styles.row}>
                    <div style={styles.inputGroup}>
                        <label>Color</label>
                        <select name="colorId" value={formData.colorId} onChange={handleChange} style={styles.input}>
                            <option value="">Select Color</option>
                            {options.colors.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div style={styles.inputGroup}>
                        <label>Size</label>
                        <select name="sizeId" value={formData.sizeId} onChange={handleChange} style={styles.input}>
                            <option value="">Select Size</option>
                            {options.sizes.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
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

export default ProductForm;