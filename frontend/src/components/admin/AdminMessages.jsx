import { useState, useEffect } from "react";
import { format } from "date-fns";
import { API_URL, UPLOADS_URL } from "../../config";

export function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/contact`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();

            if (res.ok) {
                setMessages(data);
            } else {
                console.error("Failed to fetch messages", data);
            }
        } catch (err) {
            console.error("Failed to fetch messages", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this message?")) return;

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/contact/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                fetchMessages();
            } else {
                const data = await res.json();
                console.error("Failed to delete message", data);
                alert("Failed to delete the message.");
            }
        } catch (err) {
            console.error("Failed to delete message", err);
        }
    };

    return (
        <div className="space-y-6 text-white animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Incoming Messages</h2>
                    <p className="text-gray-400 text-sm">Review communications submitted through the public contact form.</p>
                </div>
            </div>

            <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-400">Loading messages...</div>
                ) : messages.length === 0 ? (
                    <div className="p-12 flex flex-col items-center justify-center text-gray-500">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                            <span className="text-2xl">&#x1F4E4;</span>
                        </div>
                        <p className="text-lg font-medium">No messages yet.</p>
                        <p className="text-sm mt-1">When users submit the contact form, their messages will appear here.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/10">
                        {messages.map((msg) => (
                            <div key={msg._id} className="p-6 transition-colors hover:bg-white/5 flex flex-col md:flex-row gap-6">
                                {/* Sender Info Block */}
                                <div className="md:w-1/3 flex-shrink-0 space-y-2 relative md:border-r border-white/10 md:pr-6">
                                    <div className="font-semibold text-lg text-white">{msg.name}</div>
                                    <a href={`mailto:${msg.email}`} className="text-sm text-neon-blue hover:text-white transition-colors block break-all">
                                        {msg.email}
                                    </a>
                                    <div className="text-xs text-gray-500 font-mono">
                                        {format(new Date(msg.createdAt), "MMM d, yyyy 'at' h:mm a")}
                                    </div>
                                </div>

                                {/* Message Body Block */}
                                <div className="md:w-2/3 flex flex-col justify-between items-start gap-4">
                                    <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed flex-grow">
                                        {msg.message}
                                    </p>

                                    <div className="w-full flex justify-end">
                                        <button
                                            onClick={() => handleDelete(msg._id)}
                                            className="text-xs bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded transition-colors"
                                        >
                                            Delete Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
