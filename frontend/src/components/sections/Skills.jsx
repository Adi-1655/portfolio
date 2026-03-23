import { useState, useEffect } from "react";
import { Badge } from "../ui/Badge";
import { API_URL, UPLOADS_URL } from "../../config";

export function Skills() {
    const [skillCategories, setSkillCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await fetch(`${API_URL}/skills`);
                const data = await res.json();
                setSkillCategories(data);
            } catch (err) {
                console.error("Failed to fetch skills", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    return (
        <section id="skills" className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden bg-black/20">
            <div className="container relative z-10 px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-violet to-neon-magenta">Skills</span></h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-neon-violet to-neon-magenta rounded-full box-glow"></div>
                    <p className="max-w-[700px] text-gray-400 md:text-lg/relaxed font-light">
                        Technologies I've worked with across various projects and coursework.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                    {loading ? (
                        <div className="col-span-3 text-center text-gray-500">Loading skills...</div>
                    ) : skillCategories.length > 0 ? (
                        skillCategories.map((category) => (
                            <div key={category._id || category.title} className="flex flex-col space-y-6 p-8 glass-panel rounded-2xl hover:-translate-y-2 transition-transform duration-300">
                                <h3 className="text-xl font-bold text-white/90 border-b border-white/10 pb-4">{category.title}</h3>
                                <div className="flex flex-wrap gap-3">
                                    {category.skills.map((skill) => (
                                        <Badge key={skill} variant="outline" className="text-sm py-1.5 px-4 font-medium tracking-wide">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center text-gray-500">No skills currently added.</div>
                    )}
                </div>
            </div>
        </section>
    );
}
