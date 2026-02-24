import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caleb Newton",
  description:
    "Caleb Newton — CS + Applied Mathematics @ USC. Machine Learning, Data Engineering, Computer Vision.",
  keywords: ["Caleb Newton", "USC", "Machine Learning", "Computer Science", "Portfolio"],
  authors: [{ name: "Caleb Newton" }],
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
      <body>{children}</body>
    </html>
  );
}
