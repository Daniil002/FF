import Header from '../Header/Header';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;


