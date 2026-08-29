export default function Logo({ size = 34, dark = true }) {
  const text = dark ? '#111111' : '#ffffff'
  return (
    <span className="inline-flex items-center gap-2.5 select-none" aria-label="Infynod">
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="lg-gold" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8a5a08" />
            <stop offset="0.5" stopColor="#d4a017" />
            <stop offset="1" stopColor="#eec453" />
          </linearGradient>
        </defs>
        <path d="M10 36 L24 12 L38 36" stroke="url(#lg-gold)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M10 36 L38 36" stroke="url(#lg-gold)" strokeWidth="2.4" strokeLinecap="round" opacity="0.45" />
        <circle cx="24" cy="12" r="5" fill="url(#lg-gold)" />
        <circle cx="10" cy="36" r="4" fill="url(#lg-gold)" opacity="0.85" />
        <circle cx="38" cy="36" r="4" fill="url(#lg-gold)" opacity="0.85" />
        <circle cx="24" cy="36" r="2.2" fill="url(#lg-gold)" opacity="0.6" />
      </svg>
      <span
        className="font-semibold tracking-tight"
        style={{ fontFamily: 'var(--font-heading)', fontSize: size * 0.62, color: text }}
      >
        Infy<span className="gold-text">nod</span>
      </span>
    </span>
  )
}
