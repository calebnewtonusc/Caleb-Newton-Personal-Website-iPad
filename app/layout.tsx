import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caleb Newton",
  description:
    "Caleb Newton - CS + Applied Mathematics @ USC. Machine Learning, Data Engineering, Computer Vision.",
  keywords: ["Caleb Newton", "USC", "Machine Learning", "Computer Science", "Portfolio"],
  authors: [{ name: "Caleb Newton" }],
  icons: {
    icon: "/assets/CalebAtBeachUSCHoodie.jpg",
    apple: "/assets/CalebAtBeachUSCHoodie.jpg",
  },
  openGraph: {
    title: "Caleb Newton",
    description: "CS + Applied Mathematics @ USC. Building AI systems that serve people.",
    url: "https://calebnewton.me",
    siteName: "Caleb Newton",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caleb Newton",
    description: "CS + Applied Mathematics @ USC. Building AI systems that serve people.",
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
        <link rel="icon" href="/assets/CalebAtBeachUSCHoodie.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/assets/CalebAtBeachUSCHoodie.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/assets/CalebAtBeachUSCHoodie.jpg" />
        {/* Preload critical above-the-fold assets */}
        <link rel="preload" href="/assets/CalebAtBeachUSCHoodie.jpg" as="image" />
        <link rel="preload" href="/assets/icons/contacts_ios.png" as="image" />
        <link rel="preload" href="/assets/icons/appstore_ios.png" as="image" />
        <link rel="preload" href="/assets/icons/applemusic_ios.png" as="image" />
        <link rel="preload" href="/assets/icons/settings_ios.png" as="image" />
        <link rel="preload" href="/assets/icons/photos_ios.png" as="image" />
        <link rel="preload" href="/assets/icons/spotify.png" as="image" />
        <link rel="preload" href="/assets/icons/github.webp" as="image" />
        <link rel="preload" href="/assets/icons/linkedin.jpg" as="image" />
      </head>
      <body>{children}</body>
    </html>
  );
}
