import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Download, GraduationCap } from "lucide-react";
import { API_URL, UPLOADS_URL } from "../../config";

export function Resume() {
    const [experiences, setExperiences] = useState([]);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const expRes = await fetch(`${API_URL}/experience`);
                const expData = await expRes.json();

                // Sort by date (you might need better parsing depending on format, but assuming mostly recent first)
                setExperiences(expData.reverse());

                const profRes = await fetch(`${API_URL}/profile`);
                const profData = await profRes.json();
                setProfile(profData);
            } catch (error) {
                console.error("Failed to fetch data for timeline");
            }
        };
        fetchData();
    }, []);

    return (
        <section id="resume" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Education</h2>
                    <div className="w-12 h-1 bg-primary rounded-full"></div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 mt-12 relative z-10 w-full max-w-5xl mx-auto">
                    {/* Dynamic Experience Items */}
                    {experiences.map((exp, index) => (
                        <div key={exp._id} className={`glass-panel p-6 rounded-[2rem] flex flex-col sm:flex-row gap-6 hover:shadow-[0_0_30px_rgba(138,43,226,0.3)] transition-all duration-300 group ${index % 2 === 0 ? 'hover:border-neon-violet/50' : 'hover:border-neon-magenta/50 hover:shadow-[0_0_30px_rgba(217,70,239,0.3)]'}`}>
                            <div className={`flex-shrink-0 w-14 h-14 rounded-full border flex items-center justify-center font-bold shadow-lg ${index % 2 === 0 ? 'bg-neon-violet/10 border-neon-violet/30 text-neon-violet shadow-[0_0_15px_rgba(138,43,226,0.2)]' : 'bg-neon-magenta/10 border-neon-magenta/30 text-neon-magenta shadow-[0_0_15px_rgba(217,70,239,0.2)]'}`}>
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <div className="flex-1 space-y-3">
                                <div>
                                    <h3 className={`font-bold text-xl text-white transition-colors ${index % 2 === 0 ? 'group-hover:text-neon-violet' : 'group-hover:text-neon-magenta'}`}>{exp.role}</h3>
                                    <p className={`text-sm font-medium uppercase tracking-wider mt-1 ${index % 2 === 0 ? 'text-neon-magenta' : 'text-neon-violet'}`}>{exp.company}</p>
                                </div>
                                <p className="text-xs text-gray-500 font-mono tracking-widest">{exp.startDate} - {exp.endDate}</p>
                                <p className="text-sm text-gray-400 leading-relaxed font-light">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {profile.resumeUrl && (
                    <div className="mt-16 flex justify-center">
                        <Button size="lg" className="gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]" onClick={() => window.open(profile.resumeUrl.startsWith('http') ? profile.resumeUrl : `${UPLOADS_URL}${profile.resumeUrl}`, "_blank")}>
                            <Download className="w-5 h-5" /> Download Full Resume
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
