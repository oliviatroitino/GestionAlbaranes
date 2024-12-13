import NavBar from '@/components/layout/NavBar';
import SideBar from '@/components/layout/SideBar';

const Layout = ({ children }) => {
    return (
        <div className="layout min-h-screen">
            <NavBar />
            <div className="layout-body relative">
                <SideBar />
                <main className="main-content ml-20 p-4">{children}</main>
            </div>
        </div>
    );
};

export default Layout;