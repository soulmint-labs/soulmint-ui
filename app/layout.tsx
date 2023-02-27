import './globals.css';
import Header from '@/components/Header';

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
      <body className='bg-gray-900'>
        <Header />
        {children}
      </body>
    </html>
  )
}
