import { useState, useEffect } from 'react';
import { API_URL, UPLOADS_URL } from "../../config";

export function AdminProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: '', title: '', heroSubtitle: '', aboutText1: '', aboutText2: '',
        education: { degree: '', school: '', year: '' },
        achievements: '', resumeUrl: '',
        profileImage: '', imageScale: 1, imagePosX: 50, imagePosY: 50,
        githubUrl: '', linkedinUrl: '', email: ''
    });

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch(`${API_URL}/profile`);
            const data = await res.json();

            const defaults = {
                name: 'Aditya',
                title: 'Software Engineer.',
                heroSubtitle: 'A self-taught developer functioning in the industry.\nI make meaningful and delightful digital products that create an equilibrium between user needs and business goals.',
                aboutText1: "I'm a senior Computer Science student passionate about building performant and accessible software applications. Over the past few years, I've dived deep into building full-stack web platforms and backend APIs, always prioritizing clean design and optimal user experience.",
                aboutText2: "When I'm not coding, you can find me exploring new technologies, participating in hackathons, or contributing to open-source projects.",
                education: { degree: 'B.S. in Computer Science', school: 'University Name', year: 'Expected 2026' },
                achievements: 'Hackathon Winner, AWS Certified',
                resumeUrl: '',
                profileImage: '/profile.jpg',
                imageScale: 1.15,
                imagePosX: 50,
                imagePosY: 20,
                githubUrl: 'https://github.com/username',
                linkedinUrl: 'https://linkedin.com/in/username',
                email: 'you@example.com'
            };

            setProfile({
                ...data,
                name: data.name || defaults.name,
                title: data.title || defaults.title,
                heroSubtitle: data.heroSubtitle || defaults.heroSubtitle,
                aboutText1: data.aboutText1 || defaults.aboutText1,
                aboutText2: data.aboutText2 || defaults.aboutText2,
                education: {
                    degree: data.education?.degree || defaults.education.degree,
                    school: data.education?.school || defaults.education.school,
                    year: data.education?.year || defaults.education.year,
                },
                achievements: data.achievements !== undefined ? data.achievements : defaults.achievements,
                resumeUrl: data.resumeUrl || defaults.resumeUrl,
                profileImage: data.profileImage || defaults.profileImage,
                imageScale: data.imageScale !== undefined ? data.imageScale : defaults.imageScale,
                imagePosX: data.imagePosX !== undefined ? data.imagePosX : defaults.imagePosX,
                imagePosY: data.imagePosY !== undefined ? data.imagePosY : defaults.imagePosY,
                githubUrl: data.githubUrl || defaults.githubUrl,
                linkedinUrl: data.linkedinUrl || defaults.linkedinUrl,
                email: data.email || defaults.email
            });

        } catch (err) {
            console.error("Failed to fetch profile");
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_URL}/profile`, {
                method: 'POST', // POST acts as create or update for the singleton profile
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(profile)
            });
            setIsEditing(false);
            fetchProfile();
        } catch (err) {
            alert('Failed to save profile configuration');
        }
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('resume', file);
        try {
            const res = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const url = await res.text();
            setProfile({ ...profile, resumeUrl: url });
        } catch (err) {
            console.error(err);
            alert('File upload failed');
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
            setProfile({ ...profile, profileImage: url });
        } catch (err) {
            console.error(err);
            alert('Image upload failed');
        }
    };

    return (
        <div className="space-y-6 text-white animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight text-white">Profile Configuration</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="h-10 px-6 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-all border border-white/20"
                    >
                        Edit Configuration
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="glass-panel p-8 rounded-2xl mb-8 border border-white/10 shadow-lg">
                    <form onSubmit={handleSave} className="space-y-6">
                        {/* Avatar Settings */}
                        <div className="flex flex-col md:flex-row gap-8 items-start pb-6 border-b border-white/10">
                            {/* Live Preview Circle */}
                            <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0 bg-secondary">
                                <img
                                    src={profile.profileImage?.startsWith('http') || profile.profileImage?.startsWith('/profile') ? profile.profileImage : `${UPLOADS_URL}${profile.profileImage}`}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    style={{
                                        objectPosition: `${profile.imagePosX}% ${profile.imagePosY}%`,
                                        transform: `scale(${profile.imageScale})`
                                    }}
                                />
                            </div>

                            <div className="flex-1 space-y-4 w-full">
                                <h4 className="font-semibold text-lg text-white">Avatar Configuration</h4>
                                <div>
                                    <label className="text-sm text-gray-400 block mb-1">Upload New Photo</label>
                                    <input type="file" accept="image/*" onChange={uploadImageHandler} className="w-full bg-black/20 border border-white/10 rounded-lg p-1.5 focus:border-white/50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 cursor-pointer text-sm transition-colors" />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-400 block mb-1">Zoom (Scale: {profile.imageScale})</label>
                                        <input type="range" min="0.5" max="3" step="0.05" value={profile.imageScale} onChange={(e) => setProfile({ ...profile, imageScale: parseFloat(e.target.value) })} className="w-full accent-white" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 block mb-1">Pan X (Left/Right: {profile.imagePosX}%)</label>
                                        <input type="range" min="0" max="100" step="1" value={profile.imagePosX} onChange={(e) => setProfile({ ...profile, imagePosX: parseInt(e.target.value) })} className="w-full accent-white" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 block mb-1">Pan Y (Up/Down: {profile.imagePosY}%)</label>
                                        <input type="range" min="0" max="100" step="1" value={profile.imagePosY} onChange={(e) => setProfile({ ...profile, imagePosY: parseInt(e.target.value) })} className="w-full accent-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Display Name</label>
                                <input required value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Headline / Title</label>
                                <input required value={profile.title} onChange={e => setProfile({ ...profile, title: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Hero Subtitle</label>
                            <input value={profile.heroSubtitle} onChange={e => setProfile({ ...profile, heroSubtitle: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">About Text (Paragraph 1)</label>
                                <textarea value={profile.aboutText1} onChange={e => setProfile({ ...profile, aboutText1: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 h-32 focus:border-white/50 focus:outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">About Text (Paragraph 2)</label>
                                <textarea value={profile.aboutText2} onChange={e => setProfile({ ...profile, aboutText2: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 h-32 focus:border-white/50 focus:outline-none transition-colors" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Achievements (comma separated)</label>
                                <input value={profile.achievements} onChange={e => setProfile({ ...profile, achievements: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 focus:border-white/50 focus:outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Resume File Upload</label>
                                <div className="flex gap-2 items-center w-full">
                                    <input type="file" accept=".pdf,.doc,.docx" onChange={uploadFileHandler} className="flex-1 bg-black/20 border border-white/10 rounded-lg p-1.5 focus:border-white/50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 cursor-pointer text-sm transition-colors" />
                                    {profile.resumeUrl && <span className="text-xs text-green-400 whitespace-nowrap px-2">File Selected</span>}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h4 className="font-semibold text-lg mb-4 text-white">Social Links</h4>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm text-gray-400 block mb-1">GitHub URL</label>
                                    <input value={profile.githubUrl} onChange={e => setProfile({ ...profile, githubUrl: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-white/50 focus:outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 block mb-1">LinkedIn URL</label>
                                    <input value={profile.linkedinUrl} onChange={e => setProfile({ ...profile, linkedinUrl: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-white/50 focus:outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 block mb-1">Email Address</label>
                                    <input value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-white/50 focus:outline-none transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6 border-t border-white/10">
                            <button type="submit" className="px-8 py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors shadow-sm">Save Configuration</button>
                            <button type="button" onClick={() => setIsEditing(false)} className="px-8 py-2.5 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10">Cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="glass-panel p-8 rounded-2xl">
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border border-white/20 bg-secondary">
                            <img
                                src={profile.profileImage?.startsWith('http') || profile.profileImage?.startsWith('/profile') ? profile.profileImage : `${UPLOADS_URL}${profile.profileImage}`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                style={{
                                    objectPosition: `${profile.imagePosX}% ${profile.imagePosY}%`,
                                    transform: `scale(${profile.imageScale})`
                                }}
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{profile.name || 'Not set'}</h2>
                            <p className="text-gray-400">{profile.title || 'Not set'}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Hero Subtitle</h4>
                                <p className="text-gray-300">{profile.heroSubtitle || 'Not set'}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Resume URL</h4>
                                <a href={profile.resumeUrl?.startsWith('http') ? profile.resumeUrl : `${UPLOADS_URL}${profile.resumeUrl}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline w-48 block truncate">{profile.resumeUrl || 'Not set'}</a>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">About Text</h4>
                                <p className="text-sm text-gray-300 line-clamp-3 mb-2">{profile.aboutText1}</p>
                                <p className="text-sm text-gray-300 line-clamp-3">{profile.aboutText2}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Education</h4>
                                {profile.education?.degree ? (
                                    <p className="text-sm">{profile.education.degree} <br /><span className="text-gray-400">{profile.education.school} ({profile.education.year})</span></p>
                                ) : <p>Not set</p>}
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">GitHub</h4>
                                    <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline w-full block truncate">{profile.githubUrl || 'Not set'}</a>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">LinkedIn</h4>
                                    <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline w-full block truncate">{profile.linkedinUrl || 'Not set'}</a>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Email</h4>
                                    <a href={`mailto:${profile.email}`} className="text-blue-400 hover:underline w-full block truncate">{profile.email || 'Not set'}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
