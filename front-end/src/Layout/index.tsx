import { Outlet } from 'react-router-dom';
import 'preline/preline';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

function Layout() {    
    return (
        <div className="flex h-[100vh] bg-gray-100 border">
           <main className="flex-1 lg:ml-64">
                <Header/>
                <Sidebar/>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
