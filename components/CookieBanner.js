"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

export default function CookieBanner() {
  // null = not decided yet, true = accepted, false = rejected
  const [consent, setConsent] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie_consent");
    if (stored === "accepted") {
      setConsent(true);
    } else if (stored === "rejected") {
      setConsent(false);
    } else {
      // No decision yet — show banner after short delay
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setConsent(true);
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setConsent(false);
    setVisible(false);
  };

  return (
    <>
      {/* Load GA only if consent given */}
      {consent === true && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-YR2SQ4W2X6"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YR2SQ4W2X6');
            `}
          </Script>
        </>
      )}

      {/* Banner */}
      {visible && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 99999,
            backgroundColor: "#fff",
            borderTop: "1px solid #e5e7eb",
            boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
            padding: "1.25rem 1.5rem",
            animation: "slideUpBanner 0.3s ease both",
          }}
        >
          <style>{`
            @keyframes slideUpBanner {
              from { opacity: 0; transform: translateY(20px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          <div style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}>

            {/* Text */}
            <div>
              <p style={{ fontWeight: 600, fontSize: "0.95rem", color: "#111827", marginBottom: "0.35rem" }}>
                We use cookies 🍪
              </p>
              <p style={{ fontSize: "0.82rem", color: "#6b7280", lineHeight: 1.6 }}>
                We use analytics cookies to understand how visitors use our site, so we can improve your experience.
                You can accept all cookies or continue with essential cookies only.
                See our{" "}
                <a href="/privacy-policy" style={{ color: "#111827", textDecoration: "underline" }}>
                  Privacy Policy
                </a>{" "}
                for details.
              </p>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>

              {/* Accept — primary, prominent */}
              <button
                onClick={handleAccept}
                style={{
                  backgroundColor: "#111827",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.6rem",
                  padding: "0.65rem 1.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                Accept all cookies
              </button>

              {/* Reject — secondary, less visually prominent but equally accessible */}
              <button
                onClick={handleReject}
                style={{
                  backgroundColor: "transparent",
                  color: "#6b7280",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.6rem",
                  padding: "0.65rem 1.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                Use necessary only
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
