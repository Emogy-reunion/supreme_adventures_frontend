import './globals.css';
import { AuthProvider } from '@/context/AuthContext';


export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export const metadata = {
    metadataBase: new URL("https://www.supremeadventures.co.ke"),

    title: {
        default: "Supreme Adventures | Explore the World",
        template: "%s | Supreme Adventures",
    },

    description:
        "Discover unforgettable travel experiences with Supreme Adventures. Book curated tours, explore top destinations, and embark on seamless adventures designed for every traveler.",

    keywords: [
        "Supreme Adventures",
        "Tour Booking",
        "Travel Agency Kenya",
        "Adventure Tours",
        "Vacation Packages",
        "Group Travel",
        "Solo Travel",
        "Safari Booking",
        "Holiday Destinations",
    ],

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },

    openGraph: {
        title: "Supreme Adventures | Curated Tours & Experiences",
        description:
            "Your journey starts here. Explore curated travel packages and book your next adventure with Supreme Adventures.",
        url: "https://www.supremeadventures.co.ke/",
        siteName: "Supreme Adventures",
        images: [
            {
                url: "/supreme.svg",
                width: 1200,
                height: 630,
                alt: "Supreme Adventures - Explore the World",
            },
        ],
        locale: "en_US",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Supreme Adventures | Travel & Tours",
        description:
            "Creating unforgettable tour experiences across the globe. Book your next trip today!",
        images: ["/supreme.svg"],
    },

    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
