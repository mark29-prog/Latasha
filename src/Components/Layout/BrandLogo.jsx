import { useId } from "react";

export default function BrandLogo({ light = false, className = "" }) {
  const titleId = useId();
  const ink = light ? "#fff" : "#744257";
  const accent = light ? "#d3b989" : "#b99a70";

  return (
    <svg
      viewBox="0 0 300 72"
      role="img"
      aria-labelledby={titleId}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={titleId}>Latasha Consignment</title>
      <g fill="none" stroke={ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 26h49l-4 37H13L9 26Z" />
        <path d="M20 27v-7a13.5 13.5 0 0 1 27 0v7" />
        <path d="M19 36c6 5 18 5 29 0" stroke={accent} />
        <path d="m33.5 41 1.7 3.5 3.8.5-2.8 2.6.7 3.7-3.4-1.8-3.4 1.8.7-3.7-2.8-2.6 3.8-.5 1.7-3.5Z" fill={accent} stroke="none" />
      </g>
      <text x="75" y="39" fill={ink} fontFamily="Playfair Display, Georgia, serif" fontSize="31" fontWeight="500" letterSpacing="1.2">
        LATASHA
      </text>
      <text x="77" y="57" fill={accent} fontFamily="DM Sans, Arial, sans-serif" fontSize="9" fontWeight="600" letterSpacing="4.3">
        CONSIGNMENT
      </text>
    </svg>
  );
}
