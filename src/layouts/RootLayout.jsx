import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from '../components';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
};
export default RootLayout;
