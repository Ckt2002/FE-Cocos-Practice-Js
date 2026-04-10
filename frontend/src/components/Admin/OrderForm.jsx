import { useState } from "react";

const OrderForm = ({ type, initialData, onClose, refresh }) => {
    const [formData, setFormData] = useState(initialData || {});

    const detailKey = type === 'customer' ? 'customerOrderDetails' :
        type === 'purchase' ? 'purchaseOrderDetails' :
            'goodsReceiptDetails';

    const details = formData[detailKey] || [];

    const handleSave = async () => {
        const method = initialData ? 'PUT' : 'POST';
        const endpoint = type === 'customer' ? '/orders/customer' : type === 'purchase' ? '/orders/purchase' : '/inventory/receipts';
        const url = `${import.meta.env.VITE_API_BASE_URL}${endpoint}${initialData ? `/${initialData.id}` : ''}`;

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            refresh();
            onClose();
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, right: 0, width: '500px', height: '100%',
            background: 'white', boxShadow: '-2px 0 10px rgba(0,0,0,0.2)', padding: '20px', overflowY: 'auto'
        }}>
            <h2>{initialData ? 'Edit' : 'New'} {type}</h2>

            <div style={{ display: 'grid', gap: '15px', marginBottom: '20px' }}>
                {/* Dynamic Header Fields */}
                <label>Provider/Customer ID</label>
                <input value={formData.customerId || formData.providerId || ''} onChange={(e) => setFormData({ ...formData, customerId: e.target.value, providerId: e.target.value })} />

                <label>Staff/Manager ID</label>
                <input value={formData.staffId || formData.managerId || ''} onChange={(e) => setFormData({ ...formData, staffId: e.target.value, managerId: e.target.value })} />

                {type !== 'purchase' && (
                    <>
                        <label>Total Price</label>
                        <input type="number" value={formData.totalPrice || 0} readOnly />
                    </>
                )}
            </div>

            <h3>Line Items</h3>
            <table style={{ width: '100%', fontSize: '0.9em' }}>
                <thead>
                    <tr style={{ textAlign: 'left' }}>
                        <th>Product</th>
                        <th>Qty</th>
                        {type !== 'purchase' && <th>Price</th>}
                    </tr>
                </thead>
                <tbody>
                    {details.map((item, idx) => (
                        <tr key={idx}>
                            <td>{item.productId}</td>
                            <td>{item.quantity}</td>
                            {type !== 'purchase' && <td>{item.price}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
                <button onClick={handleSave} style={{ background: 'green', color: 'white', flex: 1 }}>Save</button>
                <button onClick={onClose} style={{ flex: 1 }}>Cancel</button>
            </div>
        </div>
    );
};

export default OrderForm;