import Nav from './Nav'

export default function LegalPageShell({ children }) {
  return (
    <>
      <Nav />

      <main className="pt-24 md:pt-32 min-h-[60vh]">
        {children}
      </main>
    </>
  )
}