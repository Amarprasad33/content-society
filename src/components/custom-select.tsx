import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

const CustomSelect = React.forwardRef<HTMLSelectElement, CustomSelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:border-input transition",
            "hover:bg-gray-800 hover:text-white",
            "peer appearance-none cursor-pointer",
            // "hover:bg-accent hover:text-accent-foreground",
            "text-white bg-black hover:bg-zinc-900 hover:text-white",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none peer-focus:rotate-180 transition-transform duration-200" />
      </div>
    );
  }
);
CustomSelect.displayName = "CustomSelect";
export { CustomSelect };