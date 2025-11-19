"use client";

import React from "react";
import { motion } from "motion/react";

export interface Testimonial {
  text: string;
  gender: "man" | "woman";
  name: string;
  role: string;
}

const WomanAvatar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 512 501.451"
    className="h-full w-full"
  >
    <path
      fill="currentColor"
      d="M90.396 260.923c38.16-40.465 18.438-130.599 36.706-183.524 25.655-74.227 120.495-99.594 173.333-56.158 41.432-4.412 83.182 16.956 92.184 80.835 7.36 52.248 2.867 123.098 28.979 163.408-27.902 26.737-71.407 29.008-107.856 30.963 2.256 16.995.899 22.835 13.367 36.698C376.651 388.21 512 338.219 512 494.87c0 3.625-2.959 6.581-6.592 6.581H6.592c-3.636 0-6.592-2.956-6.592-6.581 0-168.597 143.337-87.788 185.168-161.699 8.31-14.676 6.456-20.466 5.748-36.089-39.105-1.85-73.255-3.68-100.52-36.159z"
    />
  </svg>
);

const ManAvatar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 512 511.142"
    className="h-full w-full"
  >
    <path
      fill="currentColor"
      fillRule="nonzero"
      d="M147.532 262.835c-9.491-15.114-27.284-35.632-27.284-53.334 0-10.001 7.88-23.041 19.17-25.943-.898-14.966-1.485-30.172-1.485-45.209 0-8.905.168-17.894.504-26.715 3.507-39.979 32.149-68.182 68.492-81.43C221.504 24.89 214.44.343 230.431.02c37.366-.968 98.79 33.225 122.753 59.168 15.251 16.864 23.961 38.69 24.469 61.43l-1.52 65.434c6.645 1.621 14.069 6.807 15.712 13.451 5.109 20.652-16.32 46.356-26.28 62.779-9.196 15.164-44.304 64.211-44.337 64.551-.167 1.771.741 4.024 3.155 7.637C378.895 409.396 512 362.119 512 511.142H0c0-149.115 133.15-101.744 187.617-176.67 2.691-3.957 3.92-6.089 3.89-7.826-.016-.93-40.362-58.059-43.975-63.811z"
    />
  </svg>
);

interface TestimonialsColumnProps {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}

export const TestimonialsColumn = ({
  className,
  testimonials,
  duration = 25,
}: TestimonialsColumnProps) => {
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 hover:[animation-play-state:paused]"
        style={{
          animationPlayState: "running",
        }}
        whileHover={{
          animationPlayState: "paused",
        }}
      >
        {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, gender, name, role }, i) => (
              <div
                className="bg-card border border-border rounded-2xl p-6 shadow-sm max-w-xs w-full"
                key={`${index}-${i}`}
              >
                <p className="text-foreground text-sm leading-relaxed">
                  {text}
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center text-primary/80">
                    {gender === "woman" ? <WomanAvatar /> : <ManAvatar />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm text-foreground tracking-tight leading-5">
                      {name}
                    </span>
                    <span className="text-xs text-muted-foreground tracking-tight leading-5">
                      {role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
