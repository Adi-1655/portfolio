import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { ExternalLink, Github } from "lucide-react";
import { API_URL, UPLOADS_URL } from "../../config";

export function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${API_URL}/projects`);
                const data = await res.json();
                setProjects(data);
            } catch (error) {
                console.error("Failed to fetch projects");
            }
        };
        fetchProjects();
    }, []);

    return (
        <section id="projects" className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
            <div className="container relative z-10 px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-violet to-neon-magenta">Projects</span></h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-neon-violet to-neon-magenta rounded-full box-glow"></div>
                    <p className="max-w-[700px] text-gray-400 md:text-lg/relaxed font-light">
                        A selection of my recent work and side projects.
                    </p>
                </div>

                <div className="grid gap-12 max-w-5xl mx-auto">
                    {projects.map((project, index) => (
                        <Card key={project._id} className={`overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:shadow-[0_0_40px_rgba(138,43,226,0.15)] hover:border-neon-violet/30 border-white/5 bg-white/5 backdrop-blur-xl rounded-[2rem] group ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="md:w-1/2 relative overflow-hidden bg-black/40 min-h-[300px]">
                                {/* Image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-neon-violet/20 to-neon-magenta/20 group-hover:scale-105 group-hover:opacity-70 transition-all duration-700"></div>
                                {project.image ? (
                                    <img src={project.image.startsWith('http') || project.image.startsWith('/placeholder') ? project.image : `${UPLOADS_URL}${project.image}`} alt={project.title} className="w-full h-full object-cover object-center relative z-0 opacity-80" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/30 font-light relative z-10">
                                        Project Cover
                                    </div>
                                )}
                            </div>
                            <div className="md:w-1/2 flex flex-col pt-8 pb-8">
                                <CardHeader className="pt-0 md:pt-4 px-6 md:px-8">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-px w-8 bg-neon-violet/50"></div>
                                        <span className="text-neon-violet uppercase tracking-[0.2em] text-[10px] font-bold">Featured Project</span>
                                    </div>
                                    <CardTitle className="text-3xl font-bold text-white tracking-tight">{project.title}</CardTitle>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10 shadow-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1 px-6 md:px-8 mt-4 md:mt-2">
                                    <div className={`glass-panel p-5 rounded-xl border border-white/5 shadow-md relative z-10 bg-black/40 backdrop-blur-2xl ${index % 2 === 0 ? '-ml-4 md:-ml-16' : '-mr-4 md:-mr-16 z-10'}`}>
                                        <p className="text-sm text-gray-300 font-light leading-relaxed">{project.description}</p>
                                    </div>
                                </CardContent>
                                <CardFooter className="gap-4 px-6 md:px-8 pt-6 mt-auto">
                                    <Button variant="outline" size="sm" className="rounded-full flex gap-2 border-white/10 bg-white/5 hover:bg-white/10 shadow-sm text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white" onClick={() => window.open(project.github, "_blank")}>
                                        <Github className="w-4 h-4" /> Code
                                    </Button>
                                    {project.demo && (
                                        <Button variant="default" size="sm" className="rounded-full flex gap-2 shadow-[0_0_15px_rgba(138,43,226,0.3)] text-xs font-semibold uppercase tracking-wider hover:shadow-[0_0_25px_rgba(138,43,226,0.6)]" onClick={() => window.open(project.demo, "_blank")}>
                                            <ExternalLink className="w-4 h-4" /> Live Demo
                                        </Button>
                                    )}
                                </CardFooter>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
