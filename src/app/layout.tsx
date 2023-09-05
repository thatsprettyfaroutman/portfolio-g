import StyledComponentsRegistry from '@/styles/StyledComponentsRegistry'

export const metadata = {
  title: 'Viljami.dev',
  description: 'Portfolio of Viljami Anttonen',
  // viewport is changed dynamically in @/components/Main
  viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
