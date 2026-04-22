import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface FloatingNavItem {
  name: string;
  link: `#${string}`;
}

interface FloatingNavbarProps {
  navItems: readonly FloatingNavItem[];
  className?: string;
  children?: React.ReactNode;
}

export function FloatingNavbar({
  navItems,
  className,
  children,
}: FloatingNavbarProps) {
  const lastScrollYRef = useRef(0);
  const [isVisible, setIsVisible] = useState(true);

  const items = useMemo(() => navItems, [navItems]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY ?? 0;
      const lastY = lastScrollYRef.current;
      const delta = currentY - lastY;

      // Always show at top
      if (currentY < 16) {
        setIsVisible(true);
        lastScrollYRef.current = currentY;
        return;
      }

      // Hide when scrolling down (with small dead zone)
      if (delta > 6) {
        setIsVisible(false);
      }

      // Show when scrolling up
      if (delta < -6) {
        setIsVisible(true);
      }

      lastScrollYRef.current = currentY;
    };

    lastScrollYRef.current = window.scrollY ?? 0;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      role="navigation"
      aria-label="Primary"
      initial={false}
      animate={{
        y: isVisible ? 0 : -80,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 50 }}
      className={cn(
        "fixed inset-x-0 top-4 z-50 mx-auto w-[min(56rem,calc(100%-2rem))]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 rounded-full border bg-background/60 px-4 py-2 backdrop-blur-2xl">
        <div className="flex items-center gap-1">
          <a href="#home">
            <h3 className="px-3 py-2">Enzo.</h3>
          </a>
          {items.map((item) => (
            <a
              key={item.link}
              href={item.link}
              className="rounded-full px-3 py-2 text-sm text-foreground/80 transition hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">{children}</div>
      </div>
    </motion.nav>
  );
}

