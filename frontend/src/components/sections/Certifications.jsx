import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { API_URL, UPLOADS_URL } from "../../config";

export function Certifications() {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const res = await fetch(`${API_URL}/certifications`);
                const data = await res.json();
                setCertifications(data);
            } catch (err) {
                console.error("Failed to fetch certifications", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCertifications();
    }, []);

    if (!loading && certifications.length === 0) return null; // Hide section if empty

    return (
        <section id="certifications" className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden bg-black">
            <div className="container relative z-10 px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">Certifications</h2>
                    <div className="w-12 h-1 bg-neon-magenta rounded-full"></div>
                    <p className="max-w-[800px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Professional credentials and ongoing continuous learning.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                    {loading ? (
                        <div className="col-span-full text-center text-gray-500">Loading certifications...</div>
                    ) : (
                        certifications.map((cert) => {
                            const certUrl = cert.fileUrl
                                ? (cert.fileUrl.startsWith('http') ? cert.fileUrl : `${UPLOADS_URL}${cert.fileUrl}`)
                                : null;
                            const CardWrapper = certUrl ? 'a' : 'div';
                            const wrapperProps = certUrl ? { href: certUrl, target: "_blank", rel: "noreferrer" } : {};

                            return (
                                <CardWrapper {...wrapperProps} key={cert._id} className="block group relative overflow-hidden rounded-2xl glass-panel border border-white/5 hover:border-neon-magenta/30 hover:shadow-[0_0_30px_rgba(217,70,239,0.15)] transition-all duration-300">
                                    {/* Preview Background */}
                                    <div className="h-48 overflow-hidden bg-white/5 relative flex items-center justify-center">
                                        {cert.fileUrl ? (
                                            cert.fileUrl.endsWith('.pdf') ? (
                                                <div className="text-white/20 font-mono text-4xl uppercase tracking-widest font-bold rotate-[-15deg] select-none">PDF DOC</div>
                                            ) : (
                                                <img
                                                    src={certUrl}
                                                    alt={cert.title}
                                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 will-change-transform"
                                                />
                                            )
                                        ) : (
                                            <div className="text-white/10 font-mono text-xl uppercase tracking-widest font-bold">Verified</div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                    </div>

                                    {/* Content Details */}
                                    <div className="relative p-6 -mt-10">
                                        <div className="inline-block bg-black px-3 py-1 rounded-full text-xs font-semibold text-neon-magenta border border-neon-magenta/20 shadow-[0_0_10px_rgba(217,70,239,0.2)] mb-3">
                                            {cert.date}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neon-magenta transition-colors">{cert.title}</h3>
                                        <p className="text-sm font-medium text-gray-400 mb-6">{cert.issuer}</p>

                                        {cert.fileUrl && (
                                            <span className="inline-flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                                                View Credential <ExternalLink className="w-4 h-4" />
                                            </span>
                                        )}
                                    </div>
                                </CardWrapper>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
}
