import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <>
            {/* Sidebar */}
            <div
                id="docs-sidebar"
                className="hs-overlay translate-x-0 fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
            >
                <div className="px-6">
                    <a
                        className="flex-none text-xl font-semibold"
                        href="#"
                        aria-label="Brand"
                    >
                        TEAM3 work report
                    </a>
                </div>
                <nav
                    className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
                    data-hs-accordion-always-open
                >
                    <ul className="space-y-1.5">
                        <li>
                            <Link
                                to="/"
                                className={`flex items-center justify-start gap-2 px-4 py-2 mt-2 rounded ${location.pathname === '/' ? 'bg-gray-200 text-gray-600' : 'text-gray-600 hover:bg-gray-200'}`}
                            >
                                <svg
                                    className="size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                                แดชบอร์ด
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/work"
                                className={`flex items-center justify-start gap-2 px-4 py-2 mt-2 rounded ${location.pathname === '/work' ? 'bg-gray-200 text-gray-600' : 'text-gray-600 hover:bg-gray-200'}`}
                            >
                                <svg
                                    className="size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                                    <path d="M12 2v8h4l2 2v10H4V12l2-2h6V2h2z" />
                                </svg>
                                ดูงาน
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Sidebar;
