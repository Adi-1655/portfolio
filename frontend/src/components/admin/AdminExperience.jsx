import { useState, useEffect } from 'react';
import { API_URL, UPLOADS_URL } from "../../config";

export function AdminExperience() {
    const [experiences, setExperiences] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentExp, setCurrentExp] = useState({
        role: '', company: '', startDate: '', endDate: '', description: '', order: 0
    });

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const res = await fetch(`${API_URL}/experience`);
            const data = await res.json();
            setExperiences(data);
        } catch (err) {
            console.error("Failed to fetch experiences");
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const url = currentExp._id
            ? `${API_URL}/experience/${currentExp._id}`
            : `${API_URL}/experience`;

        const method = currentExp._id ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(currentExp)
            });
            setIsEditing(false);
            setCurrentExp({ role: '', company: '', startDate: '', endDate: '', description: '', order: 0 });
            fetchExperiences();
        } catch (err) {
            alert('Failed to save experience');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this record?')) return;
        try {
            await fetch(`${API_URL}/experience/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchExperiences();
        } catch (err) {
            alert('Failed to delete experience');
        }
    };

    return (
        <div className="space-y-6 text-white animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight text-white">Manage Education</h2>
                <button
                    onClick={() => {
                        setCurrentExp({ role: '', company: '', startDate: '', endDate: '', description: '', order: 0 });
                        setIsEditing(true);
                    }}
                    className="h-10 px-5 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-all shadow-sm"
                >
                    + Add Education
                </button>
            </div>

            {isEditing && (
                <div className="glass-panel p-8 rounded-2xl mb-8 border border-white/10 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">{currentExp._id ? 'Edit Education' : 'New Education'}</h3>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Degree / Certification</label>
                                <input required value={currentExp.role} onChange={e => setCurrentExp({ ...currentExp, role: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">School / Institution</label>
                                <input required value={currentExp.company} onChange={e => setCurrentExp({ ...currentExp, company: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Start Date</label>
                                <input required value={currentExp.startDate} onChange={e => setCurrentExp({ ...currentExp, startDate: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" placeholder="Jan 2022" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">End Date</label>
                                <input required value={currentExp.endDate} onChange={e => setCurrentExp({ ...currentExp, endDate: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" placeholder="Present" />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Description</label>
                            <textarea required value={currentExp.description} onChange={e => setCurrentExp({ ...currentExp, description: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 h-24 focus:border-white/50 focus:outline-none transition-colors" />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button type="submit" className="px-6 py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors shadow-sm">Save Record</button>
                            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-4">
                {experiences.map(exp => (
                    <div key={exp._id} className="glass-panel p-5 rounded-xl flex justify-between items-center border border-white/5">
                        <div>
                            <h4 className="font-semibold text-white mb-1">{exp.role} <span className="text-gray-400 font-normal">@ {exp.company}</span></h4>
                            <p className="text-sm text-gray-400">{exp.startDate} - {exp.endDate}</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => { setCurrentExp(exp); setIsEditing(true); }} className="text-sm text-white underline decoration-white/30 underline-offset-2 hover:decoration-white transition-colors">Edit</button>
                            <button onClick={() => handleDelete(exp._id)} className="text-sm text-red-400 hover:text-red-300 transition-colors">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
