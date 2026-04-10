const OrderTable = ({ type, data, onRowClick, onAdd }) => {
    // Define columns per type
    const config = {
        customer: { cols: ['ID', 'Customer', 'Staff', 'Total'], keys: ['id', 'customerId', 'staffId', 'totalPrice'] },
        purchase: { cols: ['ID', 'Date', 'Manager', 'Provider'], keys: ['id', 'createdDate', 'managerId', 'providerId'] },
        receipt: { cols: ['ID', 'Date', 'Staff', 'Provider', 'Total'], keys: ['id', 'createdDate', 'staffId', 'providerId', 'totalPrice'] }
    };

    const current = config[type];

    return (
        <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
                <h2 style={{ margin: 0 }}>{type.toUpperCase()}</h2>
                <button onClick={onAdd} style={{ padding: '5px 15px' }}>+ New</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f4f4f4' }}>
                    <tr>
                        {current.cols.map(c => <th key={c} style={{ padding: '12px', textAlign: 'left' }}>{c}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr
                            key={item.id}
                            onClick={() => onRowClick(item)}
                            style={{ cursor: 'pointer', borderBottom: '1px solid #eee' }}
                        >
                            {current.keys.map(key => (
                                <td key={key} style={{ padding: '12px' }}>
                                    {key.includes('Date') ? new Date(item[key]).toLocaleDateString() : item[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;