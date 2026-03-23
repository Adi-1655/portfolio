import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Github, Linkedin, Mail } from "lucide-react";
import { API_URL, UPLOADS_URL } from "../../config";

export function Hero() {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${API_URL}/profile`);
                const data = await res.json();
                setProfile(data);
            } catch (err) {
                console.error("Failed to fetch profile data in Hero");
            }
        };
        fetchProfile();
    }, []);

    return (
        <section id="hero" className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 md:py-24 lg:py-32 overflow-hidden">
            <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto -mt-12 md:-mt-24">

                {/* Avatar / Hello Badge */}
                <div className="flex flex-col items-center gap-4 mb-4">
                    <p className="text-xl md:text-2xl font-medium tracking-wide text-gray-300 relative z-10">Hello! I Am <span className="text-neon-violet font-semibold">{profile.name || "Aditya"}</span></p>

                    {/* Image & Orbits Wrapper */}
                    <div className="relative z-0 flex items-center justify-center">
                        {/* Core Backlight Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neon-violet/10 blur-[100px] rounded-full pointer-events-none" />

                        {/* Orbital Decorative Elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-neon-violet/40 rounded-full shadow-[0_0_80px_rgba(138,43,226,0.25)_inset,0_0_80px_rgba(138,43,226,0.25)] pointer-events-none" />

                        {/* Small glowing dots on orbits */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
                            <div className="w-full h-full rounded-full animate-[spin_10s_linear_infinite]">
                                <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-neon-violet rounded-full shadow-[0_0_12px_#8a2be2]"></div>
                            </div>
                        </div>

                        {/* Profile Image */}
                        <div className="relative z-10 w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-[3px] border-white/10 shadow-[0_0_50px_rgba(138,43,226,0.6)] bg-secondary">
                            <img
                                src={profile.profileImage ? (profile.profileImage.startsWith('http') || profile.profileImage.startsWith('/profile') ? profile.profileImage : `${UPLOADS_URL}${profile.profileImage}`) : "/profile.jpg"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                style={{
                                    objectPosition: `${profile.imagePosX !== undefined ? profile.imagePosX : 50}% ${profile.imagePosY !== undefined ? profile.imagePosY : 20}%`,
                                    transform: `scale(${profile.imageScale !== undefined ? profile.imageScale : 1.3})`
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-white drop-shadow-lg font-sans">
                        I'm a <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-violet to-neon-magenta inline-block">{profile.title || "Software Engineer"}</span>
                    </h1>

                    <p className="mx-auto max-w-[600px] text-gray-400 text-sm md:text-base font-light tracking-wide mt-6 leading-relaxed whitespace-pre-line">
                        {profile.heroSubtitle || "A self-taught developer functioning in the industry.\nI make meaningful and delightful digital products that create an equilibrium between user needs and business goals."}
                    </p>
                </div>

                <div className="flex items-center gap-8 pt-10">
                    <a href={profile.githubUrl || "https://github.com/username"} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-violet transition-all hover:shadow-[0_0_15px_rgba(138,43,226,0.6)]">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a href={profile.linkedinUrl || "https://linkedin.com/in/username"} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-magenta transition-all hover:shadow-[0_0_15px_rgba(217,70,239,0.6)]">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a href={profile.email ? `mailto:${profile.email}` : "mailto:you@example.com"} className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-violet transition-all hover:shadow-[0_0_15px_rgba(138,43,226,0.6)]">
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
