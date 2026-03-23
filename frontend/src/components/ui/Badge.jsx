import React from "react";
import { cn } from "../../lib/utils";

function Badge({ className, variant = "default", ...props }) {
    const baseStyles = "inline-flex items-center rounded-md border px-3 py-1 text-[10px] uppercase tracking-wider font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

    const variants = {
        default: "border-neon-violet/50 bg-neon-violet/10 text-neon-violet shadow-[0_0_10px_rgba(138,43,226,0.2)]",
        secondary: "border-neon-magenta/50 bg-neon-magenta/10 text-neon-magenta shadow-[0_0_10px_rgba(217,70,239,0.2)]",
        outline: "text-foreground border-white/20 bg-white/5 backdrop-blur-md",
    };

    return (
        <div className={cn(baseStyles, variants[variant], className)} {...props} />
    );
}

export { Badge };
