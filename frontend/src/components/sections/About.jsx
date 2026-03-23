import { useState, useEffect } from "react";
import { API_URL, UPLOADS_URL } from "../../config";

export function About() {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${API_URL}/profile`);
                const data = await res.json();
                setProfile(data);
            } catch (err) {
                console.error("Failed to fetch profile in About");
            }
        };
        fetchProfile();
    }, []);

    return (
        <section id="about" className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
            <div className="container relative z-10 px-4 md:px-6">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/3 flex justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-neon-violet/50 shadow-[0_0_30px_rgba(138,43,226,0.3)] bg-secondary">
                            <img
                                src={profile.profileImage ? (profile.profileImage.startsWith('http') || profile.profileImage.startsWith('/profile') ? profile.profileImage : `${UPLOADS_URL}${profile.profileImage}`) : "/profile.jpg"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                style={{
                                    objectPosition: `${profile.imagePosX !== undefined ? profile.imagePosX : 50}% ${profile.imagePosY !== undefined ? profile.imagePosY : 20}%`,
                                    transform: `scale(${profile.imageScale !== undefined ? profile.imageScale : 1.15})`
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-violet to-neon-magenta">Me</span></h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-neon-violet to-neon-magenta rounded-full box-glow"></div>
                        </div>

                        <p className="text-gray-300 text-lg/relaxed font-light">
                            {profile.aboutText1 || "I'm a senior Computer Science student passionate about building performant and accessible software applications. Over the past few years, I've dived deep into building full-stack web platforms and backend APIs, always prioritizing clean design and optimal user experience."}
                        </p>

                        {profile.aboutText2 && (
                            <p className="text-gray-300 text-lg/relaxed font-light">
                                {profile.aboutText2}
                            </p>
                        )}
                        {!profile.aboutText2 && !profile._id && (
                            <p className="text-gray-300 text-lg/relaxed font-light">
                                When I'm not coding, you can find me exploring new technologies, participating in hackathons, or contributing to open-source projects.
                            </p>
                        )}

                        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2 p-6 rounded-2xl glass-panel hover:-translate-y-1 transition-transform">
                                <h3 className="font-semibold text-white/90 text-lg">Education</h3>
                                <p className="text-sm text-neon-violet">{profile.education?.degree || "B.S. in Computer Science"}</p>
                                <p className="text-xs text-gray-400">{profile.education?.school || "University Name"}, {profile.education?.year || "Expected 2026"}</p>
                            </div>
                            <div className="space-y-2 p-6 rounded-2xl glass-panel hover:-translate-y-1 transition-transform">
                                <h3 className="font-semibold text-white/90 text-lg">Achievements</h3>
                                <p className="text-sm text-neon-magenta">{profile.achievements || "Hackathon Winner, Certified Cloud Practitioner"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
