import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside style={styles.sidebar}>
            <h2 style={styles.logo}>Admin Panel</h2>

            <nav style={styles.nav}>
                {/* MAIN SECTION */}
                <div style={styles.section}>
                    <p style={styles.label}>Main</p>
                    <div style={styles.linkGroup}>
                        <Link to="/admin-dashboard/staffs" style={styles.link}>Manage Staffs</Link>
                        <Link to="/admin-dashboard/products" style={styles.link}>Products</Link>
                        <Link to="/admin-dashboard/orders" style={styles.link}>Orders (Provider)</Link>
                    </div>
                </div>

                <div style={styles.section}>
                    <p style={styles.label}>Product Settings</p>
                    <div style={styles.linkGroup}>
                        <Link to="/admin-dashboard/colors" style={styles.link}>Colors</Link>
                        <Link to="/admin-dashboard/sizes" style={styles.link}>Sizes</Link>
                        <Link to="/admin-dashboard/brands" style={styles.link}>Brands</Link>
                        <Link to="/admin-dashboard/types" style={styles.link}>Product Types</Link>
                    </div>
                </div>

                <div style={styles.section}>
                    <p style={styles.label}>Inventory</p>
                    <div style={styles.linkGroup}>
                        <Link to="/admin-dashboard/providers" style={styles.link}>Providers</Link>
                    </div>
                </div>
            </nav>
        </aside>
    );
};

const styles = {
    sidebar: {
        width: '260px',
        height: '100vh',
        background: '#1a1a2e',
        color: 'white',
        padding: '30px 20px',
        position: 'fixed',
        left: 0,
        top: 0,
        boxSizing: 'border-box' // Prevents padding from breaking width
    },
    logo: {
        fontSize: '1.6rem',
        marginBottom: '40px',
        textAlign: 'center',
        color: '#4facfe',
        fontWeight: 'bold'
    },
    section: {
        marginBottom: '25px'
    },
    label: {
        fontSize: '0.7rem',
        color: '#6c7293',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '10px',
        paddingLeft: '10px'
    },
    linkGroup: {
        display: 'flex',
        flexDirection: 'column', // This is the fix!
        gap: '5px'
    },
    link: {
        color: '#a9abbd',
        textDecoration: 'none',
        padding: '12px 15px',
        fontSize: '0.95rem',
        borderRadius: '6px',
        transition: '0.2s',
        display: 'block' // Ensures it takes the full width
    }
};

export default Sidebar;