import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashBoard';
import BrandsPage from './pages/admin/BrandsPage';
import SizesPage from './pages/admin/SizePage';
import ProductTypesPage from './pages/admin/ProductTypePage';
import ColorsPage from './pages/admin/ColorPage';
import ProductsPage from './pages/admin/ProductsPage';
import StaffPage from './pages/admin/StaffPage';
import ProvidersPage from './pages/admin/ProviderPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route path="/admin-dashboard/staffs" element={<StaffPage />} />
          {/* <Route path="/admin-dashboard/orders" element={<AdminLayout><h1>Provider Orders</h1></AdminLayout>} />*/}
          <Route path="/admin-dashboard/products" element={<ProductsPage />} />
          <Route path="/admin-dashboard/types" element={<ProductTypesPage />} />
          <Route path="/admin-dashboard/sizes" element={<SizesPage />} />
          <Route path="/admin-dashboard/brands" element={<BrandsPage />} />
          <Route path="/admin-dashboard/colors" element={<ColorsPage />} />
          <Route path="/admin-dashboard/providers" element={<ProvidersPage />} />
        </Route >

        <Route path="/user-home" element={<h1>User Home</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;