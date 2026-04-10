
const ProductTable = ({ data = [], onAdd, onEdit }) => {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={{ margin: 0 }}>Product Inventory</h2>
                <button
                    style={styles.addButton}
                    onClick={onAdd}
                >
                    + Add New Product
                </button>
            </div>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Brand</th>
                        <th style={styles.th}>Type</th>
                        <th style={styles.th}>Color/Size</th>
                        <th style={styles.th}>Price</th>
                        <th style={styles.th}>Qty</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((product) => (
                            <tr key={product.id} style={styles.row}>
                                <td style={styles.td}>
                                    <strong>{product.name}</strong>
                                    <div style={styles.idText}>{product.id}</div>
                                </td>
                                <td style={styles.td}>{product.brand?.name || 'N/A'}</td>
                                <td style={styles.td}>{product.type?.name || 'N/A'}</td>
                                <td style={styles.td}>
                                    {product.color?.name} / {product.size?.name}
                                </td>
                                <td style={styles.td}>${product.price?.toLocaleString()}</td>
                                <td style={styles.td}>{product.quantity}</td>
                                <td style={styles.td}>
                                    <button
                                        style={styles.editBtn}
                                        onClick={() => onEdit(product)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} style={styles.empty}>No products found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: { background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    addButton: { padding: '8px 16px', backgroundColor: '#4facfe', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '12px', borderBottom: '2px solid #eee', color: '#666', fontSize: '0.85rem', textTransform: 'uppercase' },
    td: { padding: '12px', borderBottom: '1px solid #eee', fontSize: '0.9rem' },
    idText: { fontSize: '0.7rem', color: '#999' },
    editBtn: { marginRight: '10px', color: '#4facfe', background: 'none', border: 'none', cursor: 'pointer' },
    deleteBtn: { color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer' },
    empty: { textAlign: 'center', padding: '40px', color: '#999' }
};

export default ProductTable;