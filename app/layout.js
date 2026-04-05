export const metadata = {
  title: 'Hello Pytharies',
  description: 'First app on the home server',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
