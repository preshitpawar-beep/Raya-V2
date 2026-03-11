import QuoteForm from "./QuoteForm.jsx";

export const metadata = {
  title: "Get a Free Quote",
  description:
    "Request a personalised quote for custom branded promotional products. Tell us what you need and we'll get back to you within one working day. No obligation.",
  alternates: {
    canonical: "https://www.legacyimprint.co.uk/quote",
  },
  openGraph: {
    title: "Get a Free Quote | Legacy Imprint SW",
    description:
      "Request a personalised quote for custom branded promotional products. We respond within one working day. No obligation.",
    url: "https://www.legacyimprint.co.uk/quote",
  },
};

export default function QuotePage() {
  return <QuoteForm />;
}
