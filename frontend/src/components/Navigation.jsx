import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/Button";

const LINKS = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Certifications", href: "#certifications" },
    { name: "Projects", href: "#projects" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
];

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.2)]" : "bg-transparent"}`}>
            <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                <a href="#" className="text-xl font-bold tracking-tight">Portfolio.</a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {LINKS.map((link) => (
                        <a key={link.name} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Mobile Nav Toggle */}
                <div className="flex md:hidden items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-b bg-background px-4 py-4 space-y-4">
                    {LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="block text-sm font-medium p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
}
