export default function Home() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui',
      background: '#0d1117',
      color: '#c9d1d9'
    }}>
      <h1 style={{ fontSize: '3rem', color: '#58a6ff' }}>Hello from Pytharies</h1>
      <p style={{ fontSize: '1.2rem', color: '#8b949e' }}>
        Deployed via Coolify on the Mac Mini home server
      </p>
      <p style={{ marginTop: '2rem', color: '#3fb950' }}>
        {new Date().toISOString()} - Auto-deploy is working!
      </p>
    </main>
  )
}
