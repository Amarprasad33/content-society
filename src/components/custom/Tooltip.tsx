import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";
import { ClassValue } from "class-variance-authority/types";
  
const CustomTooltip = ({ triggerContent, tooltipContent, className }: { triggerContent: string, tooltipContent: string, className: ClassValue }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger className="max-w-64 md:max-w-xl lg:max-w-[34rem] whitespace-nowrap overflow-hidden text-ellipsis">{triggerContent}</TooltipTrigger>
                <TooltipContent className={cn("",className)}>
                    <p className="max-w-xl text-wrap">{tooltipContent}</p>
                </TooltipContent>
        </Tooltip>
    </TooltipProvider>
)

export default CustomTooltip;
