import { useState, useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { API_URL, UPLOADS_URL } from "../config";

export function Footer() {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${API_URL}/profile`);
                const data = await res.json();
                setProfile(data);
            } catch (err) {
                console.error("Failed to fetch profile in Footer");
            }
        };
        fetchProfile();
    }, []);

    return (
        <footer className="w-full border-t bg-background py-8 relative z-10">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} {profile.name || "Your Name"}. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                    <a href={profile.githubUrl || "https://github.com/username"} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors hover:text-neon-violet">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a href={profile.linkedinUrl || "https://linkedin.com/in/username"} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors hover:text-neon-magenta">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a href={profile.email ? `mailto:${profile.email}` : "mailto:you@example.com"} className="text-muted-foreground hover:text-foreground transition-colors hover:text-neon-violet">
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
