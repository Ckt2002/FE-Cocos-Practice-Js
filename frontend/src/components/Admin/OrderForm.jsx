import { useState, useEffect } from "react";

const OrderForm = ({ type, initialData, onClose, refresh }) => {
    const detailKey = type === 'customer' ? 'customerOrderDetails' :
        type === 'purchase' ? 'purchaseOrderDetails' :
            'goodsReceiptDetails';

    const [formData, setFormData] = useState(initialData || { [detailKey]: [], totalPrice: 0 });
    const [newItem, setNewItem] = useState({ productId: '', quantity: 1, price: 0 });

    const [customers, setCustomers] = useState([]);
    const [providers, setProviders] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchLookups = async () => {
            try {
                const base = import.meta.env.VITE_API_BASE_URL;
                const [resCust, resProv, resStaff, resProd] = await Promise.all([
                    fetch(`${base}/customer`),
                    fetch(`${base}/provider`),
                    fetch(`${base}/staff`),
                    fetch(`${base}/product`)
                ]);

                const [custD, provD, staffD, prodD] = await Promise.all([
                    resCust.json(), resProv.json(), resStaff.json(), resProd.json()
                ]);

                if (custD.success) setCustomers(custD.data);
                if (provD.success) setProviders(provD.data);
                if (staffD.success) setStaffList(staffD.data);
                if (prodD.success) setProducts(prodD.data);
            } catch (err) {
                console.error("Lookup error:", err);
            }
        };
        fetchLookups();
    }, []);

    const handleProductChange = (productId) => {
        const product = products.find(p => p.id === productId);
        setNewItem({
            ...newItem,
            productId,
            price: product ? product.price : 0
        });
    };

    const addItem = () => {
        if (!newItem.productId) return alert("Select a product");
        const updatedDetails = [...(formData[detailKey] || []), newItem];
        const newTotal = updatedDetails.reduce((sum, item) => sum + (item.quantity * (item.price || 0)), 0);
        setFormData({ ...formData, [detailKey]: updatedDetails, totalPrice: newTotal });
        setNewItem({ productId: '', quantity: 1, price: 0 });
    };

    const removeItem = (index) => {
        const updatedDetails = formData[detailKey].filter((_, i) => i !== index);
        const newTotal = updatedDetails.reduce((sum, item) => sum + (item.quantity * (item.price || 0)), 0);
        setFormData({ ...formData, [detailKey]: updatedDetails, totalPrice: newTotal });
    };

    const handleSave = async () => {
        const endpoint = type === 'customer' ? '/customerOrder' : type === 'purchase' ? '/purchaseOrder' : '/goodsReceipt';
        const url = initialData
            ? `${import.meta.env.VITE_API_BASE_URL}${endpoint}/${initialData.id}`
            : `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;

        try {
            console.log(formData);
            const res = await fetch(url, {
                method: initialData ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                refresh();
                onClose();
            } else {
                const errData = await res.json();
                alert(`Error: ${errData.message || "Failed to save"}`);
            }
        } catch (err) {
            console.error("Save error:", err);
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '600px', height: '100%', background: 'white', boxShadow: '-2px 0 10px rgba(0,0,0,0.2)', padding: '20px', overflowY: 'auto', zIndex: 1000 }}>
            <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                {initialData ? 'Edit' : 'New'} {type.replace('_', ' ').toUpperCase()}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>
                        {type === 'customer' ? 'Customer' : 'Provider'}
                    </label>
                    <select
                        style={{ width: '100%', padding: '8px' }}
                        value={type === 'customer' ? (formData.customerId || '') : (formData.providerId || '')}
                        onChange={(e) => {
                            if (type === 'customer') setFormData({ ...formData, customerId: e.target.value });
                            else setFormData({ ...formData, providerId: e.target.value });
                        }}
                    >
                        <option value="">Select Name...</option>
                        {type === 'customer'
                            ? customers.map(c => <option key={c.id} value={c.id}>{c.fullName || c.name}</option>)
                            : providers.map(p => <option key={p.id} value={p.id}>{p.fullName || p.name}</option>)
                        }
                    </select>
                </div>

                {/* --- Staff OR Manager Dropdown --- */}
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>
                        {type === 'purchase' ? 'Manager' : 'Staff'}
                    </label>
                    <select
                        style={{ width: '100%', padding: '8px' }}
                        value={type === 'purchase' ? (formData.managerId || '') : (formData.staffId || '')}
                        onChange={(e) => {
                            if (type === 'purchase') setFormData({ ...formData, managerId: e.target.value });
                            else setFormData({ ...formData, staffId: e.target.value });
                        }}
                    >
                        <option value="">Select Person...</option>
                        {staffList.map(s => <option key={s.id} value={s.id}>{s.fullName || s.name}</option>)}
                    </select>
                </div>
            </div>

            {/* --- ADD PRODUCT SECTION --- */}
            <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <h4 style={{ marginTop: 0 }}>Add Items</h4>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                    <div style={{ flex: 2 }}>
                        <label>Product</label>
                        <select
                            style={{ width: '100%', padding: '8px' }}
                            value={newItem.productId}
                            onChange={(e) => handleProductChange(e.target.value)}
                        >
                            <option value="">Choose Product...</option>
                            {products.map(p => <option key={p.id} value={p.id}>{p.name} (${p.price})</option>)}
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label>Qty</label>
                        <input
                            type="number" style={{ width: '100%', padding: '8px' }}
                            value={newItem.quantity}
                            onChange={e => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                        />
                    </div>
                    <button onClick={addItem} style={{ padding: '8px 15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add</button>
                </div>
            </div>

            {/* --- DETAILS TABLE --- */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                        <th style={{ padding: '10px' }}>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {formData[detailKey]?.map((item, idx) => {
                        const productName = products.find(p => p.id === item.productId)?.name || item.productId;
                        return (
                            <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '10px' }}>{productName}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price}</td>
                                <td>${(item.quantity * item.price).toFixed(2)}</td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => removeItem(idx)}
                                        style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div style={{ marginTop: '20px', textAlign: 'right', fontSize: '1.4em', borderTop: '2px solid #eee', paddingTop: '10px' }}>
                <strong>Grand Total: ${formData.totalPrice?.toFixed(2) || 0}</strong>
            </div>

            <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
                <button onClick={handleSave} style={{ background: '#007bff', color: 'white', flex: 2, padding: '12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    SAVE {type.toUpperCase()}
                </button>
                <button onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default OrderForm;