import AdminLayout from '../../components/Admin/Layout';

const AdminDashboard = () => {
    const staffName = localStorage.getItem('staffFullName') || 'Manager';

    return (
        <AdminLayout>
            <div style={styles.header}>
                <h1>Welcome, {staffName}</h1>
            </div>

            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <h3>Staffs</h3>
                    <p>4 Active</p>
                </div>
                <div style={styles.statCard}>
                    <h3>Products</h3>
                    <p>120 Items</p>
                </div>
                <div style={styles.statCard}>
                    <h3>Orders</h3>
                    <p>5 Pending</p>
                </div>
            </div>
        </AdminLayout>
    );
};

const styles = {
    header: { marginBottom: '30px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
    statCard: {
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        textAlign: 'center'
    }
};

export default AdminDashboard;