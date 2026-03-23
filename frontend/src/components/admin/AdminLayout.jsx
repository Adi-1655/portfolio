import { Outlet, Navigate } from 'react-router-dom';

export function AdminLayout() {
    const token = localStorage.getItem('adminToken');

    if (!token) {
        return <Navigate to="/admin" replace />;
    }

    // A simple wrapper for future dashboard styling/nav
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
            <header className="h-16 border-b border-white/10 flex items-center px-6 justify-between bg-white/5 backdrop-blur-md">
                <div className="flex items-center gap-6">
                    <h1 className="font-bold text-xl tracking-tight text-white cursor-pointer" onClick={() => window.location.href = '/admin/dashboard'}>
                        Admin <span className="text-neon-magenta">Console</span>
                    </h1>
                    <a href="/admin/dashboard" className="text-sm text-gray-400 hover:text-white hover:underline transition-all">Overview</a>
                    <a href="/admin/projects" className="text-sm text-gray-400 hover:text-white hover:underline transition-all">Projects</a>
                    <a href="/admin/experience" className="text-sm text-gray-400 hover:text-white hover:underline transition-all">Timeline</a>
                    <a href="/admin/profile" className="text-sm text-gray-400 hover:text-white hover:underline transition-all">Profile</a>
                </div>
                <button
                    onClick={() => {
                        localStorage.removeItem('adminToken');
                        window.location.href = '/';
                    }}
                    className="text-sm text-destructive hover:text-red-400 transition-colors"
                >
                    Terminate Session
                </button>
            </header>
            <main className="flex-1 p-6 container mx-auto">
                <Outlet />
            </main>
        </div>
    );
}
