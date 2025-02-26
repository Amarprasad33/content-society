import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react"


export function ButtonLoading({ className, type, children, disabled, ...props }: 
    { className: string, type: "submit" | "reset" | "button" | undefined, children: React.ReactNode, disabled: boolean }) 
{   
    
    return (
        <Button 
            className={cn("", className)}
            disabled={disabled}
            type={type}
            {...props}
        >
            {disabled? <Loader2 className="animate-spin" /> : <></> } 
            {children}
        </Button>
    ) 
}