import Nav from './Nav'
import Footer from './Footer'
import { getSettings, getServices } from '@/lib/db'

export default async function PageShell({ children }) {
  const [settings, services] = await Promise.all([getSettings(), getServices()])
  return (
    <>
      <Nav />
      <main className="pt-24 md:pt-32 min-h-[60vh]">{children}</main>
      <Footer settings={settings} services={services} />
    </>
  )
}
