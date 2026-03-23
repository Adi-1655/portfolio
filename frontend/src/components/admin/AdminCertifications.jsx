import { useState, useEffect } from 'react';
import { API_URL, UPLOADS_URL } from "../../config";

export function AdminCertifications() {
    const [certifications, setCertifications] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCert, setCurrentCert] = useState({
        title: '', issuer: '', date: '', fileUrl: '', order: 0
    });

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            const res = await fetch(`${API_URL}/certifications`);
            const data = await res.json();
            setCertifications(data);
        } catch (err) {
            console.error("Failed to fetch certifications", err);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const url = currentCert._id
            ? `${API_URL}/certifications/${currentCert._id}`
            : `${API_URL}/certifications`;

        const method = currentCert._id ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(currentCert)
            });
            setIsEditing(false);
            setCurrentCert({ title: '', issuer: '', date: '', fileUrl: '', order: 0 });
            fetchCertifications();
        } catch (err) {
            alert('Failed to save certification');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this record?')) return;
        try {
            await fetch(`${API_URL}/certifications/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCertifications();
        } catch (err) {
            alert('Failed to delete certification');
        }
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file); // Use 'image' for images or adjust backend upload route if using PDF
        try {
            const res = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: formData,
                headers: { Authorization: `Bearer ${token}` }
            });
            const url = await res.text();
            setCurrentCert({ ...currentCert, fileUrl: url });
        } catch (err) {
            console.error(err);
            alert('File upload failed');
        }
    };

    return (
        <div className="space-y-6 animate-fade-in text-white">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight text-white">Manage Certifications</h2>
                <button
                    onClick={() => {
                        setCurrentCert({ title: '', issuer: '', date: '', fileUrl: '', order: 0 });
                        setIsEditing(true);
                    }}
                    className="h-10 px-5 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-all shadow-sm"
                >
                    + Add Certification
                </button>
            </div>

            {isEditing && (
                <div className="glass-panel p-8 rounded-2xl mb-8 border border-white/10 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">{currentCert._id ? 'Edit Certification' : 'New Certification'}</h3>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Certification Title</label>
                                <input required value={currentCert.title} onChange={e => setCurrentCert({ ...currentCert, title: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Issuing Organization</label>
                                <input required value={currentCert.issuer} onChange={e => setCurrentCert({ ...currentCert, issuer: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-6">
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Date / Year Acquired</label>
                                <input required value={currentCert.date} onChange={e => setCurrentCert({ ...currentCert, date: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" placeholder="e.g. June 2024" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Sort Order (Lower = First)</label>
                                <input type="number" value={currentCert.order} onChange={e => setCurrentCert({ ...currentCert, order: parseInt(e.target.value) || 0 })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" />
                            </div>
                        </div>

                        <div className="pt-2">
                            <label className="text-sm text-gray-400 block mb-1">Certificate Image / File Upload</label>
                            <input type="file" accept="image/*,.pdf" onChange={uploadFileHandler} className="w-full bg-black/20 border border-white/10 rounded-lg p-1.5 focus:border-white/50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 cursor-pointer text-sm transition-colors mb-2" />
                            {currentCert.fileUrl && (
                                <p className="text-xs text-green-400 break-all">Current file: {currentCert.fileUrl}</p>
                            )}
                        </div>

                        <div className="flex gap-4 pt-4 mt-4">
                            <button type="submit" className="px-6 py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors shadow-sm">Save Certification</button>
                            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
                {certifications.map(item => (
                    <div key={item._id} className="glass-panel p-5 rounded-xl flex gap-4 items-start border border-white/5 group hover:border-white/20 transition-all">
                        {item.fileUrl && (
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white/5 border border-white/10 flex items-center justify-center">
                                {item.fileUrl.endsWith('.pdf') ? (
                                    <span className="text-xs text-gray-400 font-mono">PDF</span>
                                ) : (
                                    <img src={item.fileUrl.startsWith('http') ? item.fileUrl : `${UPLOADS_URL}${item.fileUrl}`} alt={item.title} className="w-full h-full object-cover" />
                                )}
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white truncate text-lg mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-400 truncate">{item.issuer}</p>
                            <p className="text-xs text-neon-violet mt-1">{item.date}</p>

                            <div className="flex gap-3 mt-3">
                                <button onClick={() => { setCurrentCert(item); setIsEditing(true); }} className="text-sm text-white underline decoration-white/30 underline-offset-2 hover:decoration-white transition-colors">Edit</button>
                                <button onClick={() => handleDelete(item._id)} className="text-sm text-red-500 hover:text-red-400 transition-colors">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
                {certifications.length === 0 && !isEditing && (
                    <div className="col-span-full text-center text-gray-500 py-8 border border-dashed border-white/10 rounded-2xl">
                        No certifications added yet. Click "+ Add Certification" to start.
                    </div>
                )}
            </div>
        </div>
    );
}
