import "./globals.css";
import Footer from "../components/Footer";

export const metadata = {
  title: "Raya | Branded Promotional Products UK",
  description: "Custom branded promotional products for UK businesses."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}