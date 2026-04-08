"use client";

export default function GuaranteeSection() {
  return (
    <div className="guarantee-scope">
      <style>{`
        .guarantee-scope {
          background: #111111;
          border-top: 1px solid #242424;
          border-bottom: 1px solid #242424;
          color: #F0EDE6;
          font-family: var(--font-satoshi), system-ui, sans-serif;
        }
        .guarantee-scope *, .guarantee-scope *::before, .guarantee-scope *::after {
          box-sizing: border-box;
        }
        .guarantee-scope .g-section {
          padding: 96px 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .guarantee-scope .label {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C9A84C;
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 100px;
          padding: 6px 16px;
          margin-bottom: 28px;
        }
        .guarantee-scope .section-title {
          font-family: var(--font-satoshi), system-ui, sans-serif;
          font-weight: 700;
          font-size: clamp(30px, 4.5vw, 50px);
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin: 0 0 16px;
          color: #F0EDE6;
        }
        @keyframes pulseGold {
          0%, 100% { box-shadow: 0 0 50px rgba(201,168,76,0.10); }
          50% { box-shadow: 0 0 90px rgba(201,168,76,0.22); }
        }
        .guarantee-scope .guarantee-wrap {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 80px;
          align-items: center;
        }
        .guarantee-scope .badge-ring {
          width: 260px;
          height: 260px;
          border-radius: 50%;
          border: 1.5px solid #C9A84C;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          animation: pulseGold 3.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        .guarantee-scope .badge-ring::before {
          content: '';
          position: absolute;
          inset: 12px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.2);
        }
        .guarantee-scope .badge-inner {
          text-align: center;
          padding: 24px;
        }
        .guarantee-scope .badge-number {
          font-family: var(--font-satoshi), system-ui, sans-serif;
          font-weight: 700;
          font-size: 68px;
          color: #C9A84C;
          line-height: 1;
          display: block;
        }
        .guarantee-scope .badge-unit {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #E8C97A;
          display: block;
          margin-top: 4px;
        }
        .guarantee-scope .badge-sub {
          font-size: 12px;
          color: #888880;
          margin: 10px 0 0;
          line-height: 1.6;
        }
        .guarantee-scope .guarantee-promise {
          background: #161616;
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 10px;
          padding: 24px 28px;
          margin: 24px 0;
          position: relative;
          overflow: hidden;
        }
        .guarantee-scope .guarantee-promise::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
        }
        .guarantee-scope .guarantee-promise p {
          font-size: 15px;
          line-height: 1.8;
          color: #F0EDE6;
          margin: 0;
        }
        .guarantee-scope .guarantee-promise strong { color: #C9A84C; }
        .guarantee-scope .guarantee-steps {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .guarantee-scope .guarantee-steps li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          color: #888880;
          line-height: 1.65;
        }
        .guarantee-scope .step-num {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(201,168,76,0.08);
          border: 1px solid #6B5520;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          color: #C9A84C;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .guarantee-scope .guarantee-name {
          font-family: var(--font-satoshi), system-ui, sans-serif;
          font-weight: 700;
          font-size: 17px;
          letter-spacing: 0.01em;
          color: #C9A84C;
          border-bottom: 1px solid #6B5520;
          padding-bottom: 4px;
          display: inline-block;
        }
        .guarantee-scope .g-body-text {
          font-size: 13px;
          color: #888880;
          margin-bottom: 20px;
          line-height: 1.8;
        }
        @media (max-width: 800px) {
          .guarantee-scope .guarantee-wrap { grid-template-columns: 1fr; gap: 0; }
          .guarantee-scope .badge-ring { margin: 0 auto 48px; }
        }
      `}</style>

      <section className="g-section">
        <div className="guarantee-wrap">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="badge-ring">
              <div className="badge-inner">
                <span className="badge-number">30</span>
                <span className="badge-unit">Day Guarantee</span>
                <p className="badge-sub">
                  One client back.
                  <br />
                  Or every dollar refunded.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="label">Zero Risk</div>
            <h2 className="section-title">
              Try it for 30 days.
              <br />
              If it doesn&apos;t work,
              <br />
              you don&apos;t pay.
            </h2>
            <div className="guarantee-promise">
              <p>
                <strong>
                  If ChairFill doesn&apos;t bring back at least one lapsed
                  client in your first 30 days
                </strong>{" "}
                — after you&apos;ve completed onboarding and run your first
                campaign — we refund every dollar. Same day you ask. No forms.
                No conversation about it.
              </p>
            </div>
            <p className="g-body-text">
              We make this offer because we know what happens when barbers
              actually launch. Within the first few days, replies start coming
              in — clients who went quiet months ago, responding like no time
              passed. The system works when you use it. So we guarantee the
              first result and let the outcome speak for itself.
            </p>
            <ul className="guarantee-steps">
              <li>
                <span className="step-num">1</span>Complete your done-for-you
                onboarding — we handle the heavy lifting
              </li>
              <li>
                <span className="step-num">2</span>Run your first reactivation
                campaign to your existing client list
              </li>
              <li>
                <span className="step-num">3</span>If zero clients come back in
                30 days — full refund, no questions
              </li>
              <li>
                <span className="step-num">4</span>You keep every campaign we
                built for you regardless
              </li>
            </ul>
            <p className="g-body-text">
              The only barbers who don&apos;t win are the ones who never launch. We
              made launching take less than 48 hours. Then we put our money
              behind the rest.
            </p>
            <span className="guarantee-name">The First Chair Guarantee™</span>
          </div>
        </div>
      </section>
    </div>
  );
}
