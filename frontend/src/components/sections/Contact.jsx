import { useState } from "react";
import { Button } from "../ui/Button";
import { API_URL, UPLOADS_URL } from "../../config";

export function Contact() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
        type: null,
        message: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: "" });

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Convert FormData to JSON object
        const data = Object.fromEntries(formData.entries());

        try {
            // NOTE: For production, this should be an environment variable.
            const response = await fetch(`${API_URL}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus({ type: "success", message: "Message sent! I'll get back to you soon." });
                form.reset();
            } else {
                setStatus({ type: "error", message: result.error || "Failed to send message." });
            }
        } catch (error) {
            console.error(error);
            setStatus({ type: "error", message: "An error occurred while sending." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">Get in Touch</h2>
                    <div className="w-12 h-1 bg-primary rounded-full"></div>
                    <p className="max-w-[600px] text-muted-foreground md:text-lg/relaxed">
                        Have a question or want to work together? Leave a message.
                    </p>
                </div>

                <div className="mx-auto max-w-xl">
                    <form onSubmit={handleSubmit} className="space-y-6 bg-background border rounded-xl shadow-sm p-6 sm:p-8">
                        {/* Honeypot field - hidden from users but bots will fill it */}
                        <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                required
                                className="flex h-12 w-full rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-violet focus-visible:border-neon-violet disabled:cursor-not-allowed disabled:opacity-50 text-white transition-colors"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="flex h-12 w-full rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-violet focus-visible:border-neon-violet disabled:cursor-not-allowed disabled:opacity-50 text-white transition-colors"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                className="flex min-h-[120px] w-full rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md px-5 py-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-violet focus-visible:border-neon-violet disabled:cursor-not-allowed disabled:opacity-50 text-white transition-colors"
                                placeholder="Your message here..."
                            />
                        </div>

                        {status.message && (
                            <div className={`p-4 rounded-md text-sm font-medium ${status.type === "error" ? "bg-destructive/15 text-destructive" : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"}`}>
                                {status.message}
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
