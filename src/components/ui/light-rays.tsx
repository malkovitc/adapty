"use client";

import { cn } from "@/lib/utils";

interface LightRaysProps {
  className?: string;
  color?: string;
}

export function LightRays({
  className,
  color = "rgba(103, 32, 255, 0.2)",
}: LightRaysProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0",
        className
      )}
      aria-hidden="true"
    >
      {/* Main glow - right side */}
      <div
        className="absolute top-1/4 right-0 w-[800px] h-[800px] rounded-full"
        style={{
          background: `radial-gradient(circle at center, ${color} 0%, rgba(103, 32, 255, 0.1) 40%, transparent 70%)`,
          filter: 'blur(100px)',
          transform: 'translateX(30%)',
        }}
      />

      {/* Secondary glow - purple - lower right */}
      <div
        className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 60%)',
          filter: 'blur(80px)',
          transform: 'translateX(20%)',
        }}
      />

      {/* Indigo accent - top right */}
      <div
        className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}

export default LightRays;
