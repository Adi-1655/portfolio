import { useState, useEffect } from 'react';
import { API_URL, UPLOADS_URL } from "../../config";

export function AdminProjects() {
    const [projects, setProjects] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState({
        title: '', description: '', image: '', tags: '', github: '', demo: '', order: 0
    });

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${API_URL}/projects`);
            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error("Failed to fetch projects");
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const url = currentProject._id
            ? `${API_URL}/projects/${currentProject._id}`
            : `${API_URL}/projects`;

        const method = currentProject._id ? 'PUT' : 'POST';

        // Convert comma separated tags to array
        const payload = {
            ...currentProject,
            tags: typeof currentProject.tags === 'string'
                ? currentProject.tags.split(',').map(t => t.trim())
                : currentProject.tags
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
            setCurrentProject({ title: '', description: '', image: '', tags: '', github: '', demo: '', order: 0 });
            fetchProjects();
        } catch (err) {
            alert('Failed to save project');
        }
    };

    const uploadImageHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const url = await res.text();
            setCurrentProject({ ...currentProject, image: url });
        } catch (err) {
            console.error(err);
            alert('Image upload failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            await fetch(`${API_URL}/projects/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchProjects();
        } catch (err) {
            alert('Failed to delete project');
        }
    };

    return (
        <div className="space-y-6 text-white animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight text-white">Manage Projects</h2>
                <button
                    onClick={() => {
                        setCurrentProject({ title: '', description: '', image: '', tags: '', github: '', demo: '', order: 0 });
                        setIsEditing(true);
                    }}
                    className="h-10 px-5 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-all shadow-sm"
                >
                    + Add New Project
                </button>
            </div>

            {isEditing && (
                <div className="glass-panel p-8 rounded-2xl mb-8 border border-white/10 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">{currentProject._id ? 'Edit Project' : 'New Project'}</h3>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Title</label>
                                <input required value={currentProject.title} onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Project Image</label>
                                <div className="flex gap-2 items-center w-full">
                                    <input type="file" accept="image/*" onChange={uploadImageHandler} className="flex-1 bg-black/20 border border-white/10 rounded-lg p-1.5 focus:border-white/50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 cursor-pointer text-sm transition-colors" />
                                    {currentProject.image && !currentProject.image.includes('placeholder') && <span className="text-xs text-green-400 whitespace-nowrap px-2 flex-shrink-0">File Selected</span>}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Description</label>
                            <textarea required value={currentProject.description} onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 h-24 focus:border-white/50 focus:outline-none transition-colors" />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Tags (comma separated)</label>
                                <input value={Array.isArray(currentProject.tags) ? currentProject.tags.join(', ') : currentProject.tags} onChange={e => setCurrentProject({ ...currentProject, tags: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" placeholder="React, Node, CSS" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">GitHub URL</label>
                                <input required value={currentProject.github} onChange={e => setCurrentProject({ ...currentProject, github: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Live Demo URL</label>
                                <input value={currentProject.demo} onChange={e => setCurrentProject({ ...currentProject, demo: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button type="submit" className="px-6 py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors shadow-sm">Save Project</button>
                            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-4">
                {projects.map(proj => (
                    <div key={proj._id} className="glass-panel p-5 rounded-xl flex justify-between items-center border border-white/5">
                        <div className="flex items-center gap-4">
                            <img src={proj.image?.startsWith('http') || proj.image?.startsWith('/placeholder') ? proj.image : `${UPLOADS_URL}${proj.image}`} alt="" className="w-16 h-12 object-cover rounded opacity-70" />
                            <div>
                                <h4 className="font-semibold text-white">{proj.title}</h4>
                                <p className="text-sm text-gray-400 truncate w-64">{proj.description}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => { setCurrentProject(proj); setIsEditing(true); }} className="text-sm text-white underline decoration-white/30 underline-offset-2 hover:decoration-white transition-colors">Edit</button>
                            <button onClick={() => handleDelete(proj._id)} className="text-sm text-red-400 hover:text-red-300 transition-colors">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
