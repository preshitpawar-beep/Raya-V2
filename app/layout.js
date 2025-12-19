import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Raya | Branded Promotional Products UK",
  description: "Custom branded promotional products for UK businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-dark antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
