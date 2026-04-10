import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

const styles = {
  content: {
    marginLeft: '260px',
    padding: '40px',
    width: 'calc(100% - 260px)',
    minHeight: '100vh',
    background: '#f4f7fe'
  }
};

export default AdminLayout;