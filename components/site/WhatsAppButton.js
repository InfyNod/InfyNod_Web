'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

const WA_LINK = 'https://wa.me/919765303735?text=' + encodeURIComponent('Hi Infynod! I want to discuss a project.')

export default function WhatsAppButton() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null

  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-testid="whatsapp-button"
      className="fixed bottom-6 right-6 z-[60] group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] hover:scale-110 transition-transform">
        <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff" aria-hidden="true">
          <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.73 6.41L3.2 28.8l6.57-1.71a12.74 12.74 0 0 0 6.23 1.62h.01c7.06 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.63-3.75-9.05a12.72 12.72 0 0 0-9.05-3.66zm0 23.36h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.9 1.02 1.04-3.8-.25-.4a10.55 10.55 0 0 1-1.62-5.67c0-5.87 4.78-10.65 10.66-10.65 2.85 0 5.52 1.11 7.53 3.12a10.58 10.58 0 0 1 3.12 7.54c0 5.87-4.78 10.65-10.65 10.65zm5.84-7.98c-.32-.16-1.9-.94-2.19-1.04-.29-.11-.51-.16-.72.16-.21.32-.83 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.6-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.48 4.84.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.16-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37z" />
        </svg>
      </span>
      <span className="absolute right-16 top-1/2 -translate-y-1/2 pill bg-[#0d0c09] text-white text-xs font-semibold px-3.5 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat on WhatsApp
      </span>
    </a>
  )
}
