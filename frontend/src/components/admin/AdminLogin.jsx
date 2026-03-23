import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL, UPLOADS_URL } from "../../config";

export function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server error connecting to backend.');
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md glass-panel p-8 rounded-[2rem] space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Admin <span className="text-neon-violet">Access</span></h1>
                    <p className="text-gray-400 text-sm">Secure authorization required</p>
                </div>

                {error && (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-xl text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email Vector</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-12 bg-white/5 border border-white/10 rounded-full px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-violet focus:ring-1 focus:ring-neon-violet transition-all"
                            placeholder="admin@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Override Key (Password)</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-12 bg-white/5 border border-white/10 rounded-full px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-violet focus:ring-1 focus:ring-neon-violet transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 rounded-full bg-neon-violet/80 text-white font-medium shadow-[0_0_15px_rgba(138,43,226,0.5)] hover:bg-neon-violet hover:shadow-[0_0_25px_rgba(138,43,226,0.8)] transition-all border border-white/20"
                    >
                        Initialize Uplink
                    </button>
                </form>
            </div>
        </div>
    );
}
