
const ProviderTable = ({ data = [], onAdd, onEdit }) => {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={{ margin: 0 }}>Providers Management</h2>
                <button
                    style={styles.addButton}
                    onClick={onAdd}
                >
                    + Add New Provider
                </button>
            </div>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Address</th>
                        <th style={styles.th}>Phone</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((provider) => (
                            <tr key={provider.id} style={styles.row}>
                                <td style={styles.td}>
                                    <strong>{provider.name}</strong>
                                </td>
                                <td style={styles.td}>{provider.address || 'N/A'}</td>
                                <td style={styles.td}>{provider.phoneNumber || 'N/A'}</td>
                                <td style={styles.td}>
                                    <button
                                        style={styles.editBtn}
                                        onClick={() => onEdit(provider)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} style={styles.empty}>No Providers found.</td>
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

export default ProviderTable;