import { Loader2 } from "lucide-react";

interface LoadingProps {
  className?: string;
  fullScreen?: boolean;
}

export function Loading({ className = "", fullScreen = false }: LoadingProps) {
  const content = (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 blur-xl bg-accent-primary/40 rounded-full animate-pulse" />
        <Loader2 
          size={48} 
          className="text-accent-primary animate-spin relative z-10" 
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-xl font-bold tracking-tight">
          <span className="gradient-text">Boost</span>Pro
        </span>
        <div className="h-1 w-24 bg-border/40 rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-accent-gradient animate-[loading_1.5s_infinite_linear]" />
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}
