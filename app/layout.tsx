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

        {/* Structured data so search engines describe him accurately */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Caleb Newton",
              url: "https://calebnewton.me",
              image: "https://calebnewton.me/assets/CalebAtUSC.jpg",
              jobTitle: "Founding GTM & Product Lead",
              worksFor: { "@type": "Organization", name: "Amber Intelligence" },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "University of Southern California, Iovine & Young Academy",
              },
              homeLocation: {
                "@type": "Place",
                name: "San Marino, California",
              },
              sameAs: [
                "https://github.com/calebnewtonusc",
                "https://linkedin.com/in/calebnewton-",
                "https://x.com/klubnootuhn",
                "https://substack.com/@calebnewton",
              ],
            }),
          }}
        />

        {/* For anyone who opens dev tools */}
        <script
          dangerouslySetInnerHTML={{
            __html: `console.log("%cYou opened the console.","font:600 16px -apple-system,sans-serif");console.log("Which means you are the kind of person I built this for.\\nThe source is at github.com/calebnewtonusc/Caleb-Newton-Personal-Website-iPad\\nIf you want to argue with any of it: calebnew@usc.edu");`,
          }}
        />
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
