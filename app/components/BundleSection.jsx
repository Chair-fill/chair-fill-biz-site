"use client";

import {
  MessageSquare,
  Smartphone,
  ShieldX,
  Zap,
  BarChart3,
  Wrench,
} from "lucide-react";

const CARDS = [
  {
    num: "01",
    Icon: MessageSquare,
    name: "The Reactivation Engine™",
    tagline: "Your quiet clients, back in the chair.",
    desc: "Identifies every client who's gone silent and reaches out automatically — timed to feel personal, written in your voice, sent at the pace of a real conversation. Not a blast. A reactivation.",
    result:
      "Clients who haven't booked in months start responding within days — without you making a single call or sending a single text yourself.",
    value: "$200/mo",
  },
  {
    num: "02",
    Icon: Smartphone,
    name: "Personal Channel Delivery™",
    tagline: "Sent the way people actually respond to.",
    desc: "ChairFill reaches clients through the same personal channel they use every day — not a marketing app, not a group text, not an email. The kind of message they open the second it lands.",
    result:
      "Your outreach gets seen. Not buried. Not ignored. The open rates are in a different category than anything you've tried before.",
    value: "$150/mo",
  },
  {
    num: "03",
    Icon: ShieldX,
    name: "The No-Show Shield™",
    tagline: "Stop giving away free appointments.",
    desc: "A layered reminder system that runs automatically before every appointment — confirming, reminding, and following up at exactly the right intervals. No-shows drop. Revenue stops disappearing.",
    result:
      "The appointments you book actually show up. Every empty chair from a no-show is money your current system is silently costing you.",
    value: "$100/mo",
  },
  {
    num: "04",
    Icon: Zap,
    name: "The Gap Filler™",
    tagline: "Cancellations become revenue — automatically.",
    desc: "The moment a slot opens, ChairFill reaches the clients most likely to book it — people who are overdue, who haven't been in a while, who are most likely to say yes right now.",
    result:
      "Last-minute cancellations stop being lost revenue. They become the nudge that brings a lapsed client back.",
    value: "$120/mo",
  },
  {
    num: "05",
    Icon: BarChart3,
    name: "Revenue Recovered Dashboard™",
    tagline: "Not metrics. Money.",
    desc: "Every client ChairFill brought back, every filled gap, every blocked no-show — tied to a real dollar amount. You see exactly what the system made you this month. Not open rates. Revenue.",
    result:
      "You always know your ROI. No guessing whether the system is working. The number is right there.",
    value: "$80/mo",
  },
  {
    num: "06",
    Icon: Wrench,
    name: "Done-For-You Launch™",
    tagline: "Live in 48 hours. We handle everything.",
    desc: "Founding members don't set anything up themselves. We configure the system, write the first campaign in your voice, and launch it. You'll see your first replies before you've touched a single setting.",
    result:
      "You go from signed up to seeing results in 48 hours — without learning software, reading docs, or figuring anything out on your own.",
    value: "$300 one-time",
  },
];

export default function BundleSection() {
  return (
    <div className="bundle-scope">
      <style>{`
        .bundle-scope {
          background: #0a0a0a;
          border-top: 1px solid #242424;
          color: #F0EDE6;
          font-family: var(--font-satoshi), system-ui, sans-serif;
        }
        .bundle-scope *, .bundle-scope *::before, .bundle-scope *::after {
          box-sizing: border-box;
        }
        .bundle-scope .b-section {
          padding: 96px 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .bundle-scope .label {
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
        .bundle-scope .section-title {
          font-family: var(--font-satoshi), system-ui, sans-serif;
          font-weight: 700;
          font-size: clamp(30px, 4.5vw, 50px);
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin: 0 0 16px;
          color: #F0EDE6;
        }
        .bundle-scope .section-sub {
          font-size: 16px;
          color: #888880;
          line-height: 1.75;
          max-width: 580px;
          margin: 0 auto;
          text-align: center;
        }
        .bundle-scope .gold { color: #C9A84C; }
        .bundle-scope .bundle-header { text-align: center; margin-bottom: 64px; }
        .bundle-scope .bundle-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
          gap: 2px;
        }
        .bundle-scope .bundle-card {
          background: #111111;
          padding: 34px 30px;
          position: relative;
          overflow: hidden;
          transition: background 0.25s;
        }
        .bundle-scope .bundle-card:hover { background: #161616; }
        .bundle-scope .bundle-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #6B5520, transparent);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .bundle-scope .bundle-card:hover::after { opacity: 1; }
        .bundle-scope .bundle-num {
          font-family: var(--font-satoshi), system-ui, sans-serif;
          font-weight: 700;
          font-size: 11px;
          color: #6B5520;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .bundle-scope .bundle-icon {
          width: 42px;
          height: 42px;
          background: rgba(201,168,76,0.07);
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          color: #C9A84C;
        }
        .bundle-scope .bundle-name {
          font-family: var(--font-satoshi), system-ui, sans-serif;
          font-weight: 700;
          font-size: 18px;
          color: #F0EDE6;
          margin: 0 0 6px;
          line-height: 1.25;
        }
        .bundle-scope .bundle-tagline {
          font-size: 12px;
          font-weight: 600;
          color: #C9A84C;
          letter-spacing: 0.02em;
          margin-bottom: 12px;
        }
        .bundle-scope .bundle-desc {
          font-size: 13px;
          color: #888880;
          line-height: 1.8;
          margin: 0 0 16px;
        }
        .bundle-scope .bundle-result {
          background: #0a0a0a;
          border-left: 2px solid #6B5520;
          padding: 10px 14px;
          margin-bottom: 18px;
          font-size: 12px;
          color: #888880;
          line-height: 1.6;
        }
        .bundle-scope .bundle-result strong { color: #F0EDE6; font-weight: 500; }
        .bundle-scope .bundle-value {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .bundle-scope .bundle-value-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #888880;
        }
        .bundle-scope .bundle-value-price {
          font-size: 13px;
          font-weight: 700;
          color: #C9A84C;
        }
      `}</style>

      <section className="b-section">
        <div className="bundle-header">
          <div className="label">The Founding Member Stack</div>
          <h2 className="section-title">
            Everything inside
            <br />
            <span className="gold">The Full Chair System.</span>
          </h2>
          <p className="section-sub">
            Not a subscription to features. A complete system — six named
            components, each doing a specific job, all working together to keep
            your chair full without you chasing anyone.
          </p>
        </div>
        <div className="bundle-grid">
          {CARDS.map(({ num, Icon, name, tagline, desc, result, value }) => (
            <div className="bundle-card" key={num}>
              <div className="bundle-num">{num}</div>
              <div className="bundle-icon">
                <Icon size={20} />
              </div>
              <h3 className="bundle-name">{name}</h3>
              <div className="bundle-tagline">{tagline}</div>
              <p className="bundle-desc">{desc}</p>
              <div className="bundle-result">
                <strong>The result:</strong> {result}
              </div>
              <div className="bundle-value">
                <span className="bundle-value-label">Value</span>
                <span className="bundle-value-price">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
