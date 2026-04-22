"use client";

import { useState, useEffect } from "react";

const TOTAL_SPOTS = 5;
const ANCHOR_PRICE = 247;
const OFFER_PRICE = 0;
export default function FoundingMemberSection() {
  const [spotsTaken, setSpotsTaken] = useState(0); // Fallback to 0 while loading
  const [totalSpots] = useState(TOTAL_SPOTS);
  const [spotsLeft, setSpotsLeft] = useState(TOTAL_SPOTS - 0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Fetch real spots count
    fetch("/api/spots-taken")
      .then((res) => res.json())
      .then((data) => {
        if (data.spotsTaken !== undefined) {
          setSpotsTaken(data.spotsTaken);
          setSpotsLeft(TOTAL_SPOTS - data.spotsTaken);
        }
      })
      .catch((err) => console.error("Error fetching spots:", err));

    const interval = setInterval(() => setPulse((p) => !p), 1800);
    return () => clearInterval(interval);
  }, []);

  const filledSpots = Array.from(
    { length: TOTAL_SPOTS },
    (_, i) => i < spotsTaken,
  );

  return (
    <div
      className="founding-member-scope"
      style={{
        fontFamily: "var(--font-satoshi), system-ui, sans-serif",
        background: "#0a0a0a",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <style>{`
        .founding-member-scope {
          box-sizing: border-box;
        }
        
        .founding-member-scope * {
          box-sizing: border-box;
        }

        .founding-member-scope .gold { color: #D4AF37; }
        .founding-member-scope .gold-bg { background: #D4AF37; }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(212,175,55,0.4); }
          70% { box-shadow: 0 0 0 12px rgba(212,175,55,0); }
          100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .founding-member-scope .card {
          animation: fadeUp 0.7s ease forwards;
        }
        .founding-member-scope .card:nth-child(2) { animation-delay: 0.1s; opacity: 0; }
        .founding-member-scope .card:nth-child(3) { animation-delay: 0.2s; opacity: 0; }
        .founding-member-scope .card:nth-child(4) { animation-delay: 0.3s; opacity: 0; }

        .founding-member-scope .cta-btn {
          background: linear-gradient(135deg, #D4AF37 0%, #f0d060 50%, #D4AF37 100%);
          background-size: 200% auto;
          color: #0a0a0a;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 18px 40px;
          width: 100%;
          border-radius: 4px;
          transition: background-position 0.4s ease, transform 0.15s ease;
        }
        .founding-member-scope .cta-btn:hover {
          background-position: right center;
          transform: translateY(-1px);
        }
        .founding-member-scope .cta-btn:active {
          transform: translateY(0);
        }

        .founding-member-scope .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ef4444;
          animation: pulse-ring 1.8s ease infinite, breathe 1.8s ease infinite;
          display: inline-block;
          margin-right: 8px;
          vertical-align: middle;
        }

        .founding-member-scope .spot-taken {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #D4AF37;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: #0a0a0a;
        }
        .founding-member-scope .spot-open {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px dashed rgba(212,175,55,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: rgba(212,175,55,0.4);
        }

        .founding-member-scope .divider {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #D4AF37, transparent);
          margin: 20px 0;
        }

        .founding-member-scope .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #D4AF37;
          background: rgba(212,175,55,0.05);
          margin-bottom: 24px;
        }

        .founding-member-scope .price-box {
          background: rgba(212,175,55,0.04);
          border: 1px solid rgba(212,175,55,0.15);
          border-radius: 6px;
          padding: 20px 24px;
        }

        .founding-member-scope .strikethrough {
          text-decoration: line-through;
          opacity: 0.4;
          font-size: 1rem;
          font-weight: 400;
        }

        .founding-member-scope .feature-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 0.88rem;
          color: rgba(255,255,255,0.75);
        }
        .founding-member-scope .feature-row:last-child { border-bottom: none; }

        .founding-member-scope .check {
          color: #D4AF37;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .founding-member-scope .urgency-bar {
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 4px;
          padding: 10px 16px;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.7);
          display: flex;
          align-items: center;
          gap: 4px;
        }
      `}</style>

      <div style={{ maxWidth: 520, width: "100%" }}>
        {/* Header */}
        <div className="card" style={{ textAlign: "center", marginBottom: 32 }}>
          <div className="badge">
            <span className="pulse-dot" />
            ChairFill Founding Member — {TOTAL_SPOTS} Spots Only
          </div>
          <h2
            style={{
              fontSize: "clamp(1.7rem, 5vw, 2.4rem)",
              fontFamily: "var(--font-satoshi), system-ui, sans-serif",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: 14,
            }}
          >
            <span className="gold">{spotsLeft} Free Spots</span> Left
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.65,
              maxWidth: 440,
              margin: "0 auto",
            }}
          >
            First month is completely free. No card required. We set everything
            up for you. If ChairFill brings back even one client — you stay at{" "}
            <strong style={{ color: "rgba(255,255,255,0.85)" }}>$147/mo</strong>{" "}
            locked in for life. If it doesn't, walk away. Nothing owed.
          </p>
        </div>

        {/* Spot tracker */}
        <div
          className="card"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 8,
            padding: "20px 24px",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <span
              style={{
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Spots claimed
            </span>
            <span
              style={{ fontSize: "0.85rem", color: "#D4AF37", fontWeight: 600 }}
            >
              {spotsTaken}/{TOTAL_SPOTS} taken
            </span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {filledSpots.map((taken, i) =>
              taken ? (
                <div key={i} className="spot-taken">
                  ✓
                </div>
              ) : (
                <div key={i} className="spot-open">
                  ?
                </div>
              ),
            )}
          </div>
        </div>

        {/* Price */}
        <div className="card price-box" style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Standard price after launch
            </span>
            <span
              className="strikethrough"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              ${ANCHOR_PRICE}/mo
            </span>
          </div>
          <div style={{ divider: true }}>
            <div className="divider" />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 4,
                }}
              >
                Your price — locked forever
              </div>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#D4AF37",
                  lineHeight: 1,
                }}
              >
                ${OFFER_PRICE}
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 400,
                    color: "rgba(212,175,55,0.7)",
                  }}
                >
                  /mo
                </span>
              </div>
            </div>
            <div
              style={{
                background: "rgba(212,175,55,0.12)",
                border: "1px solid rgba(212,175,55,0.25)",
                borderRadius: 4,
                padding: "4px 10px",
                fontSize: "0.78rem",
                color: "#D4AF37",
                fontWeight: 600,
              }}
            >
              {OFFER_PRICE === 0 ? "FREE" : "50% OFF"}
            </div>
          </div>
          <p
            style={{
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.4)",
              marginTop: 10,
              lineHeight: 1.5,
            }}
          >
            First month free. No card, no commitment. After your free month, you
            pay $147/mo — locked in for life. Only 5 barbers get this. Once these
            spots are gone, this offer disappears permanently.
          </p>
        </div>

        {/* Features */}
        <div
          className="card"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 8,
            padding: "16px 20px",
            marginBottom: 16,
          }}
        >
          {[
            "First month completely free — no card required",
            "We handle your full setup and onboarding for you",
            "AI outreach via iMessage — calibrated to sound like you",
            "$147/mo locked in for life after your free month — price never increases",
            "Direct line to the founding team — your feedback shapes the product",
            "Founding Member status on your profile forever",
          ].map((f, i) => (
            <div key={i} className="feature-row">
              <span className="check">✓</span>
              <span>{f}</span>
            </div>
          ))}
        </div>

        {/* Urgency */}
        <div className="card urgency-bar" style={{ marginBottom: 20 }}>
          <span className="pulse-dot" style={{ width: 6, height: 6 }} />
          <span>
            <strong style={{ color: "#ef9999" }}>
              {spotsLeft} of {TOTAL_SPOTS} free spots remaining.
            </strong>{" "}
            When they're gone, this offer is gone — no exceptions.
          </span>
        </div>

        {/* CTA */}
        <div className="card" style={{ opacity: 1 }}>
          <a 
            href="https://app.chairfill.co/signup" 
            className="cta-btn"
            style={{ 
              display: "block", 
              textAlign: "center", 
              textDecoration: "none" 
            }}
          >
            Start Free — No Card Required →
          </a>
          <p
            style={{
              textAlign: "center",
              marginTop: 12,
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Free for 30 days. Then $147/mo locked in for life. Cancel before day
            30 and you owe nothing.
          </p>
        </div>
      </div>
    </div>
  );
}
