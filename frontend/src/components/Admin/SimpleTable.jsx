
const SimpleTable = ({ title, data = [], onAdd, onEdit }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>{title} Management</h2>
        <button style={styles.addButton} onClick={onAdd}>
          + Add New {title}
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td style={styles.td}>{item.id}</td>
                <td style={styles.td}>{item.name}</td>
                <td style={styles.td}>
                  <button style={styles.editBtn} onClick={() => onEdit(item)}>
                    Edit
                  </button>
                  <button style={styles.deleteBtn}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={styles.empty}>
                No {title} found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  addButton: {
    padding: "8px 16px",
    backgroundColor: "#4facfe",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "12px",
    borderBottom: "2px solid #eee",
    color: "#666",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
  editBtn: {
    marginRight: "10px",
    color: "#4facfe",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  deleteBtn: {
    color: "#ff4d4d",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  empty: {
    textAlign: "center",
    padding: "20px",
    color: "#999",
  },
};

export default SimpleTable;