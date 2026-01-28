"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    Layers,
    TrendingUp,
    Settings,
    LogOut,
    Bell,
    Search,
    User,
    Menu,
    X
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Handle window resize to auto-close/open sidebar
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };
        handleResize(); // Init on mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
        { name: 'News Posts', icon: FileText, href: '/admin/posts' },
        { name: 'Categories', icon: Layers, href: '/admin/categories' },
        { name: 'Trending', icon: TrendingUp, href: '/admin/trending' },
        { name: 'SEO Settings', icon: Settings, href: '/admin/settings' },
    ];

    const handleLogout = () => {
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        bg-secondary text-white transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-50 
        lg:relative
        ${isSidebarOpen ? 'w-64' : 'w-0 lg:w-20'}
        ${isMobileMenuOpen ? 'w-[280px] translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800 shrink-0">
                    <Link href="/admin" className="text-primary font-black text-xl truncate">
                        {(isSidebarOpen || isMobileMenuOpen) ? 'NEXGEN ADMIN' : 'NG'}
                    </Link>
                    <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-grow py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        const showLabel = isSidebarOpen || isMobileMenuOpen;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <item.icon size={20} className={`${isActive ? '' : 'group-hover:scale-110'} transition-transform`} />
                                {showLabel && <span className="font-semibold text-sm whitespace-nowrap">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-800 shrink-0">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-3 w-full text-gray-400 hover:text-red-400 transition-colors group"
                    >
                        <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                        {(isSidebarOpen || isMobileMenuOpen) && <span className="font-semibold text-sm">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow flex flex-col min-w-0">
                {/* Admin Header */}
                <header className="h-16 bg-white border-b border-border px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                if (window.innerWidth < 1024) {
                                    setIsMobileMenuOpen(true);
                                } else {
                                    setIsSidebarOpen(!isSidebarOpen);
                                }
                            }}
                            className="text-muted hover:text-secondary p-2 hover:bg-gray-100 rounded-full transition-all"
                        >
                            <Menu size={20} />
                        </button>
                        <div className="h-6 w-px bg-border hidden md:block" />
                        <span className="hidden md:block text-xs font-bold text-muted uppercase tracking-widest truncate max-w-[200px]">
                            {menuItems.find(i => i.href === pathname)?.name || 'Admin Panel'}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 md:gap-6">
                        <button className="relative text-muted hover:text-secondary p-2 hover:bg-gray-100 rounded-full transition-all">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white" />
                        </button>
                        <div className="flex items-center gap-3 pl-2 md:pl-6 border-l border-border">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-secondary">Admin User</p>
                                <p className="text-[10px] text-muted uppercase tracking-wider">Super Admin</p>
                            </div>
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center text-primary border border-border shadow-inner">
                                <User size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-4 md:p-8 flex-grow overflow-y-auto">
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
