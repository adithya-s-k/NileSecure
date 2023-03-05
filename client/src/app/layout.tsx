import './globals.css';

export const metadata = {
  title: 'Nile Secure',
  description: 'Issue Finder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen h-full w-full bg-white">{children}</body>
    </html>
  );
}
