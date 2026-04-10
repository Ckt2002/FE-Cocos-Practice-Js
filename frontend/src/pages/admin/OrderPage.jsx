/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useCallback } from "react";
import OrderTable from "../../components/Admin/OrderTable";
import OrderForm from "../../components/Admin/OrderForm";


const TABS = [
    { id: "customer_orders", label: "Customer Orders", endpoint: "/customerOrder", type: "customer" },
    { id: "purchase_orders", label: "Purchase Order", endpoint: "/purchaseOrder", type: "purchase" },
    { id: "goods_receipts", label: "Goods Receipts", endpoint: "/goodsReceipt", type: "receipt" }
];

const OrdersPage = () => {
    const [activeTab, setActiveTab] = useState("customer_orders");
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const currentTab = TABS.find(t => t.id === activeTab);

    const fetchData = useCallback(async (endpoint) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`);
            const result = await res.json();
            if (result.success) setData(result.data || []);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    }, []);

    useEffect(() => {
        fetchData(currentTab.endpoint);
    }, [activeTab, fetchData]);

    const handleRowClick = (item) => {
        setSelectedItem(item);
        setShowForm(true);
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* Tab Bar */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setShowForm(false); }}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: activeTab === tab.id ? '#007bff' : '#eee',
                            color: activeTab === tab.id ? 'white' : 'black',
                            border: 'none', borderRadius: '4px', cursor: 'pointer'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <OrderTable
                type={currentTab.type}
                data={data}
                onRowClick={handleRowClick}
                onAdd={() => { setSelectedItem(null); setShowForm(true); }}
            />

            {showForm && (
                <OrderForm
                    type={currentTab.type}
                    initialData={selectedItem}
                    onClose={() => setShowForm(false)}
                    refresh={() => fetchData(currentTab.endpoint)}
                />
            )}
        </div>
    );
};

export default OrdersPage;