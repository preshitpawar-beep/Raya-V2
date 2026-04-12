export default function TrustIntro() {
  return (
    <section style={{ backgroundColor: "#F5F0EB", width: "100%" }}>

      {/* ── DESKTOP: side by side ── */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: "1fr 1fr",
          maxWidth: "1280px",
          margin: "0 auto",
          minHeight: "620px",
        }}
      >
        {/* LEFT — text panel */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "4rem 3.5rem",
        }}>

          <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,26,24,0.35)" }}>
            Our products
          </p>

          <div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 500, lineHeight: 1.15, color: "#1a1a18", marginBottom: "1.25rem" }}>
              Merchandise<br />
              that holds up —<br />
              <span style={{ color: "rgba(26,26,24,0.45)" }}>in quality and</span><br />
              <span style={{ color: "rgba(26,26,24,0.45)" }}>perception.</span>
            </h2>
            <p style={{ fontSize: "0.95rem", color: "rgba(26,26,24,0.5)", lineHeight: 1.7, maxWidth: "26rem" }}>
              Designed for businesses that care how they show up. Personal service, clear pricing, real products.
            </p>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              {["Thoughtful", "Reliable", "Consistent"].map((tag, i) => (
                <div key={tag} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  {i > 0 && <span style={{ height: "1px", width: "1.25rem", background: "rgba(26,26,24,0.15)", display: "block" }} />}
                  <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,26,24,0.3)" }}>{tag}</span>
                </div>
              ))}
            </div>
            <a
              href="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "1px solid rgba(26,26,24,0.2)",
                color: "rgba(26,26,24,0.75)",
                fontSize: "0.875rem",
                fontWeight: 500,
                padding: "0.7rem 1.5rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                transition: "background 0.15s ease",
              }}
            >
              Browse products →
            </a>
          </div>
        </div>

        {/* RIGHT — image, fully visible */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2.5rem 2.5rem 2.5rem 1rem",
          position: "relative",
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 65% 55%, rgba(181,132,90,0.13) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />
          <img
            src="/trust/Bag 1.png"
            alt="Legacy Imprint SW branded cotton tote bag"
            style={{
              position: "relative",
              zIndex: 1,
              maxHeight: "540px",
              width: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.12))",
            }}
          />
        </div>
      </div>

      {/* ── MOBILE: stacked ── */}
      <div className="md:hidden" style={{ paddingBottom: "3rem" }}>

        <div style={{
          display: "flex",
          justifyContent: "center",
          padding: "2.5rem 2rem 1.5rem",
          background: "radial-gradient(ellipse at 50% 55%, rgba(181,132,90,0.12) 0%, transparent 70%)",
        }}>
          <img
            src="/trust/Bag 1.png"
            alt="Legacy Imprint SW branded cotton tote bag"
            style={{ width: "100%", maxWidth: "280px", objectFit: "contain", filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.1))" }}
          />
        </div>

        <div style={{ padding: "1.5rem 1.5rem 0" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,26,24,0.35)", marginBottom: "0.75rem" }}>
            Our products
          </p>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 500, lineHeight: 1.2, color: "#1a1a18", marginBottom: "0.75rem" }}>
            Merchandise that holds up — in quality and perception.
          </h2>
          <p style={{ fontSize: "0.875rem", color: "rgba(26,26,24,0.5)", lineHeight: 1.65, marginBottom: "1.5rem" }}>
            Designed for businesses that care how they show up.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
            {["Thoughtful", "Reliable", "Consistent"].map((tag, i) => (
              <div key={tag} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {i > 0 && <span style={{ height: "1px", width: "1rem", background: "rgba(26,26,24,0.15)", display: "block" }} />}
                <span style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,26,24,0.3)" }}>{tag}</span>
              </div>
            ))}
          </div>
          <a
            href="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              border: "1px solid rgba(26,26,24,0.2)",
              color: "rgba(26,26,24,0.75)",
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "0.65rem 1.25rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
            }}
          >
            Browse products →
          </a>
        </div>
      </div>

    </section>
  );
}
