import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  // --- Base ---
  metadataBase: new URL("https://www.legacyimprint.co.uk"),

  // --- Default title + template for child pages ---
  title: {
    default: "Legacy Imprint SW | Branded Promotional Products UK",
    template: "%s | Legacy Imprint SW",
  },

  description:
    "Custom branded promotional products for UK businesses. Pens, notebooks, bags and corporate giveaways — with free visual proof, clear pricing, and a personal service. Based in Tiverton, Devon.",

  keywords: [
    "branded promotional products UK",
    "custom branded merchandise",
    "promotional pens UK",
    "branded notebooks",
    "corporate giveaways UK",
    "branded bags UK",
    "promotional products Tiverton",
    "promotional products Devon",
    "branded keyrings",
    "business merchandise UK",
  ],

  // --- Authorship & ownership ---
  authors: [{ name: "Legacy Imprint SW", url: "https://www.legacyimprint.co.uk" }],
  creator: "Legacy Imprint SW",
  publisher: "Legacy Imprint SW",

  // --- Canonical ---
  alternates: {
    canonical: "/",
  },

  // --- Open Graph (LinkedIn, Facebook, WhatsApp previews) ---
  openGraph: {
    title: "Legacy Imprint SW | Branded Promotional Products UK",
    description:
      "Custom branded promotional products for UK businesses. Pens, notebooks, bags and corporate giveaways — with free visual proof, clear pricing, and a personal service.",
    url: "https://www.legacyimprint.co.uk",
    siteName: "Legacy Imprint SW",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Add a 1200x630px image to your /public folder
        width: 1200,
        height: 630,
        alt: "Legacy Imprint SW – Branded Promotional Products for UK Businesses",
      },
    ],
  },

  // --- Twitter / X card ---
  twitter: {
    card: "summary_large_image",
    title: "Legacy Imprint SW | Branded Promotional Products UK",
    description:
      "Custom branded promotional products for UK businesses. Free visual proof, clear pricing, personal service.",
    images: ["/og-image.png"],
  },

  // --- Robots ---
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body className="bg-white text-dark antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
