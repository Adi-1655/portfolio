import { useState, useEffect } from 'react';
import { API_URL, UPLOADS_URL } from "../../config";

export function AdminSkills() {
    const [skillsList, setSkillsList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkill, setCurrentSkill] = useState({
        title: '', skills: '', order: 0
    });

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await fetch(`${API_URL}/skills`);
            const data = await res.json();
            setSkillsList(data);
        } catch (err) {
            console.error("Failed to fetch skills category");
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const url = currentSkill._id
            ? `${API_URL}/skills/${currentSkill._id}`
            : `${API_URL}/skills`;

        const method = currentSkill._id ? 'PUT' : 'POST';

        // Convert comma separated string to array of clean strings
        const payload = {
            ...currentSkill,
            skills: typeof currentSkill.skills === 'string'
                ? currentSkill.skills.split(',').map(s => s.trim()).filter(Boolean)
                : currentSkill.skills
        };

        try {
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            setIsEditing(false);
            setCurrentSkill({ title: '', skills: '', order: 0 });
            fetchSkills();
        } catch (err) {
            alert('Failed to save skill category');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this skills category?')) return;
        try {
            await fetch(`${API_URL}/skills/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchSkills();
        } catch (err) {
            alert('Failed to delete skill category');
        }
    };

    return (
        <div className="space-y-6 text-white animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight text-white">Manage Technical Skills</h2>
                <button
                    onClick={() => {
                        setCurrentSkill({ title: '', skills: '', order: 0 });
                        setIsEditing(true);
                    }}
                    className="h-10 px-5 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-all shadow-sm"
                >
                    + Add Category
                </button>
            </div>

            {isEditing && (
                <div className="glass-panel p-8 rounded-2xl mb-8 border border-white/10 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">{currentSkill._id ? 'Edit Category' : 'New Category'}</h3>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Category Title</label>
                                <input required value={currentSkill.title} onChange={e => setCurrentSkill({ ...currentSkill, title: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" placeholder="e.g. Languages" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Display Order (optional)</label>
                                <input type="number" value={currentSkill.order} onChange={e => setCurrentSkill({ ...currentSkill, order: parseInt(e.target.value) || 0 })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Skills (Comma separated list)</label>
                            <textarea required value={Array.isArray(currentSkill.skills) ? currentSkill.skills.join(', ') : currentSkill.skills} onChange={e => setCurrentSkill({ ...currentSkill, skills: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 h-24 focus:border-white/50 focus:outline-none transition-colors" placeholder="React, Node.js, Express, MongoDB" />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button type="submit" className="px-6 py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors shadow-sm">Save Category</button>
                            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-4">
                {skillsList.map(item => (
                    <div key={item._id} className="glass-panel p-5 rounded-xl flex justify-between items-start border border-white/5">
                        <div className="flex-1 mr-4">
                            <h4 className="font-semibold text-white mb-2">{item.title} <span className="text-gray-500 text-xs ml-2 font-normal">Order: {item.order}</span></h4>
                            <div className="flex flex-wrap gap-2">
                                {item.skills.map(skill => (
                                    <span key={skill} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300">{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-3 flex-shrink-0 pt-1">
                            <button onClick={() => { setCurrentSkill(item); setIsEditing(true); }} className="text-sm text-white underline decoration-white/30 underline-offset-2 hover:decoration-white transition-colors">Edit</button>
                            <button onClick={() => handleDelete(item._id)} className="text-sm text-red-400 hover:text-red-300 transition-colors">Delete</button>
                        </div>
                    </div>
                ))}

                {skillsList.length === 0 && (
                    <div className="text-center py-12 text-gray-400 border border-white/5 border-dashed rounded-xl">
                        No skill categories created yet. Click above to add one.
                    </div>
                )}
            </div>
        </div>
    );
}
