import { Outlet } from 'react-router-dom';
import Navbar from './NavBar'; 
import { Header } from './Header';
import { Footer } from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;