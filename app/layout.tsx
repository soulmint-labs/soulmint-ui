import './globals.css'

export const metadata = {
  title: 'SoulMint',
  description: 'Unleash your identity in the metaverse with Soulmint - the soulbound NFT avatar marketplace.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
