import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxWrapper from "@/components/hocs/ReduxWrapper";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EduDatt - Your Child's Progress",
  description: "The ultimate parental dashboard for tracking your child's academic performance, attendance, and school activities in real-time.",
  keywords: [
    "parent school tracker",
    "child academic monitoring",
    "school progress app",
    "student performance tracker",
    "parental school dashboard"
  ],
  authors: [{ name: "Edudatt", url: "https://edudatt.com" }],
  openGraph: {
    title: "EduDatt - Parental School Monitoring App",
    description: "Stay connected with your child's education journey with real-time updates and comprehensive tracking.",
    url: "https://edudatt.com",
    siteName: "EduDatt",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "EduDatt Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduDatt - Parental School Monitoring App",
    description: "Stay connected with your child's education journey",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "EduDatt Logo",
      },
    ],
  },
  metadataBase: new URL('https://edudatt.com'),
  alternates: {
    canonical: '/',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <title>EduDatt | Empowering Parents in Their Child's Education Journey</title>
        <meta
          name="description"
          content="EduDatt provides real-time insights into your child's academic performance, attendance, and school activities."
        />
        <meta
          name="keywords"
          content="child education, real-time insights, academic performance, parent support, school activities, education tracking"
        />
      </head>
      <body
        className={`${geistMono.variable} ${poppins.variable} font-sans antialiased`}
      >
        <ReduxWrapper>
          {children}
        </ReduxWrapper>
      </body>
    </html>
  );
}