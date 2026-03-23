import React from "react";
import { cn } from "../../lib/utils";


const Button = React.forwardRef(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

        const variants = {
            default: "bg-neon-violet/80 text-white shadow-[0_0_15px_rgba(138,43,226,0.5)] hover:bg-neon-violet hover:shadow-[0_0_25px_rgba(138,43,226,0.8)] border border-white/20",
            outline: "glass-button text-foreground hover:bg-white/10 hover:text-white hover:border-white/30",
            ghost: "hover:bg-white/5 hover:text-white",
            link: "text-neon-violet underline-offset-4 hover:underline hover:text-neon-magenta",
        };

        const sizes = {
            default: "h-11 px-6 py-2 rounded-full",
            sm: "h-9 rounded-full px-4 text-xs",
            lg: "h-12 rounded-full px-10 text-base",
            icon: "h-11 w-11 rounded-full",
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
