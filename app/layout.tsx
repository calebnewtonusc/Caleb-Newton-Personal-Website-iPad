import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caleb Newton",
  description:
    "Caleb Newton. Autistic Jesus follower and USC sophomore at the Iovine & Young Academy. Founding GTM and Product Lead at Amber Intelligence.",
  keywords: ["Caleb Newton", "USC", "Iovine & Young Academy", "Amber Intelligence", "GTM"],
  authors: [{ name: "Caleb Newton" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Caleb Newton",
    description: "Autistic Jesus follower. USC Iovine & Young Academy. Founding GTM and Product Lead at Amber Intelligence.",
    url: "https://calebnewton.me",
    siteName: "Caleb Newton",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caleb Newton",
    description: "Autistic Jesus follower. USC Iovine & Young Academy. Founding GTM and Product Lead at Amber Intelligence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        {/* Preload critical above-the-fold assets */}
        <link rel="preload" href="/assets/CalebAtBeachUSCHoodie.jpg" as="image" />
        <link rel="preload" href="/assets/icons/spotify.png" as="image" />
        <link rel="preload" href="/assets/icons/github.webp" as="image" />
        <link rel="preload" href="/assets/icons/linkedin.jpg" as="image" />
      </head>
      <body>
        <a href="#ipad" className="skip-link">
          Skip to content
        </a>
        <main id="ipad">{children}</main>
      </body>
    </html>
  );
}
