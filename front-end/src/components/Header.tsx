import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageSetting } from '../contexts/pageSettingContext';

const Header: React.FC = () => {
    const location = useLocation();  // Get the current location
    const { title, setTitle } = usePageSetting();

    useEffect(() => {
        // Set the page title based on the current route
        switch (location.pathname) {
            case '/':
                setTitle('แดชบอร์ด');
                break;
            case '/work':
                setTitle('ดูงาน');
                break;
                case '/profile':
                    setTitle('โปรไฟล์');
                    break;
            default:
                setTitle('Default Title');
        }
    }, [location.pathname, setTitle]);

    return (
        <header className="bg-white border-b border-gray-200 shadow-md">
            <div className="container py-3 flex items-center justify-between">
                <div className="flex items-center font-bold px-2">
                    <h1 className="text-xl">{title}</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;
