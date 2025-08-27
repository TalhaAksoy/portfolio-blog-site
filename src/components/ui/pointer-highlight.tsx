// components/PointerHighlight.tsx
"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";

type Offset = number | { x?: number; y?: number };

export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
  offset = 12,
  title,
  color = "#0000FF"
}: {
  children: React.ReactNode;
  rectangleClassName?: string;
  pointerClassName?: string;
  containerClassName?: string;
  offset?: Offset;
  title?: string;
  color ?:string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const ox = typeof offset === "number" ? offset : offset?.x ?? 0;
  const oy = typeof offset === "number" ? offset : offset?.y ?? 0;

  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      const { width, height } = containerRef.current!.getBoundingClientRect();
      setDimensions({ width, height });
    };
    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const overlayW = dimensions.width + ox * 2;
  const overlayH = dimensions.height + oy * 2;

  return (
    <div ref={containerRef} className={cn("relative inline-block", containerClassName)}>
      
      {/* CHILD → üst katmanda */}
      <div className="relative z-10 group">{children}</div>

      {/* OVERLAY → arkada + etkileşimsiz */}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute z-0"
          style={{ left: -ox, top: -oy, width: overlayW, height: overlayH }}
          initial={{ opacity: 0, scale: 0.95, originX: 0, originY: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className={cn(
              "absolute inset-0 border border-neutral-800 dark:border-neutral-200 rounded-md",
              rectangleClassName
            )}
            initial={{ width: 0, height: 0 }}
            whileInView={{ width: "100%", height: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, x: overlayW + 4, y: overlayH + 4 }}
            style={{ rotate: -90 }}
            transition={{
              opacity: { duration: 0.1, ease: "easeInOut" },
              duration: 1,
              ease: "easeInOut",
            }}
          >
            <Pointer color={color} className={cn(`w-5 h-5`, pointerClassName)} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

const Pointer = ({ ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
  </svg>
);
