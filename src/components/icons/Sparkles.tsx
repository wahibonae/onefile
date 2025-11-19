import React from "react";

type SparklesProps = {
  className?: string;
};

const Sparkles = ({ className }: SparklesProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    className={className}
    fill="currentColor"
  >
    <path d="M1 5.51a1 1 0 0 1 .69-.953l1.786-.584a2.43 2.43 0 0 0 1.512-1.506L5.546.7A1 1 0 0 1 7.452.695l.576 1.796a2.4 2.4 0 0 0 1.497 1.502l1.776.56a1 1 0 0 1 .004 1.907l-1.778.569a2.39 2.39 0 0 0-1.5 1.502l-.567 1.774a1 1 0 0 1-1.9.014l-.6-1.776V8.54a2.44 2.44 0 0 0-1.507-1.514l-1.76-.566A1 1 0 0 1 1 5.51m2.77.568A3.43 3.43 0 0 1 5.907 8.22l.6 1.78l.57-1.78a3.4 3.4 0 0 1 2.138-2.142L11 5.508l-1.785-.564a3.39 3.39 0 0 1-2.137-2.141L6.5 1l-.563 1.78a3.43 3.43 0 0 1-2.144 2.142L2 5.508zM2 9v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1H3v.5a.5.5 0 0 1-1 0V10h-.5a.5.5 0 0 1 0-1z" />
  </svg>
);

export default Sparkles;
