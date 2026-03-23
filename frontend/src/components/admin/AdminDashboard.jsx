import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL, UPLOADS_URL } from "../../config";

export function AdminDashboard() {
    const [projects, setProjects] = useState([]);
    const [skillsCategories, setSkillsCategories] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    // Using a quick mock fetch here until we build the full form components
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${API_URL}/projects`);
                const data = await res.json();
                setProjects(data);
            } catch (err) {
                console.error("Failed to fetch projects", err);
            }
        };

        const fetchSkills = async () => {
            try {
                const res = await fetch(`${API_URL}/skills`);
                const data = await res.json();
                setSkillsCategories(data);
            } catch (err) {
                console.error("Failed to fetch skills", err);
            }
        };

        const fetchCertifications = async () => {
            try {
                const res = await fetch(`${API_URL}/certifications`);
                const data = await res.json();
                setCertifications(data);
            } catch (err) {
                console.error("Failed to fetch certifications", err);
            }
        };

        const fetchExperiences = async () => {
            try {
                const res = await fetch(`${API_URL}/experience`);
                const data = await res.json();
                setExperiences(data);
            } catch (err) {
                console.error("Failed to fetch experiences", err);
            }
        };

        const fetchMessages = async () => {
            try {
                // Must pass token as it is a protected route!
                const token = localStorage.getItem('adminToken');
                const res = await fetch(`${API_URL}/contact`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();

                if (res.ok) {
                    setMessages(data);
                }
            } catch (err) {
                console.error("Failed to fetch messages", err);
            }
        };

        fetchProjects();
        fetchSkills();
        fetchCertifications();
        fetchExperiences();
        fetchMessages();
    }, []);

    return (
        <div className="space-y-8 animate-fade-in text-white">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Dashboard Overview</h2>
                <p className="text-gray-400">Welcome to the central control node. Manage your portfolio data below.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between border border-white/5">
                    <h3 className="font-semibold text-lg text-white">Projects</h3>
                    <div className="text-4xl font-bold my-4">{projects.length}</div>
                    <button onClick={() => navigate('/admin/projects')} className="text-sm text-gray-400 hover:text-white self-start underline decoration-white/30 decoration-2 underline-offset-4">Manage Projects &rarr;</button>
                </div>
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between border border-white/5">
                    <h3 className="font-semibold text-lg text-white">Education Timeline</h3>
                    <div className="text-4xl font-bold my-4">{experiences.length}</div>
                    <button onClick={() => navigate('/admin/experience')} className="text-sm text-gray-400 hover:text-white self-start underline decoration-white/30 decoration-2 underline-offset-4">Manage Education &rarr;</button>
                </div>
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between border border-white/5">
                    <h3 className="font-semibold text-lg text-white">Skills</h3>
                    <div className="text-4xl font-bold my-4">{skillsCategories.length}</div>
                    <button onClick={() => navigate('/admin/skills')} className="text-sm text-gray-400 hover:text-white self-start underline decoration-white/30 decoration-2 underline-offset-4">Manage Skills &rarr;</button>
                </div>
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between border border-white/5">
                    <h3 className="font-semibold text-lg text-white">Certifications</h3>
                    <div className="text-4xl font-bold my-4">{certifications.length}</div>
                    <button onClick={() => navigate('/admin/certifications')} className="text-sm text-gray-400 hover:text-white self-start underline underline-offset-4 decoration-white/30 decoration-2">Manage Credentials &rarr;</button>
                </div>
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between border border-white/5">
                    <h3 className="font-semibold text-lg text-white">Messages</h3>
                    <div className="text-4xl font-bold my-4 text-neon-blue">{messages.length}</div>
                    <button onClick={() => navigate('/admin/messages')} className="text-sm text-gray-400 hover:text-white self-start underline decoration-white/30 decoration-2 underline-offset-4">Read Messages &rarr;</button>
                </div>
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between border border-white/5">
                    <h3 className="font-semibold text-lg text-white">Profile</h3>
                    <div className="text-4xl font-bold my-4 uppercase text-sm text-gray-400 tracking-widest mt-6 mb-2">Active</div>
                    <button onClick={() => navigate('/admin/profile')} className="text-sm text-gray-400 hover:text-white self-start underline decoration-white/30 decoration-2 underline-offset-4">Edit Configuration &rarr;</button>
                </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl mt-8">
                <h3 className="font-semibold text-xl mb-4 text-white">System Status</h3>
                <p className="text-gray-400">All systems nominal. The Admin panel is ready for full CRUD form integration.</p>
            </div>
        </div>
    );
}
