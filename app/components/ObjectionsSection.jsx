"use client";

const ROWS = [
  {
    problem:
      "\"I don't want to spam my clients and look desperate.\"",
    problemEm: "So they do nothing. And the clients keep drifting.",
    solution:
      "ChairFill messages feel like you wrote them — casual, timed right, one at a time. Clients don't feel marketed to. They feel like their barber remembered them.",
    solutionEm:
      "The difference between a text and a blast is how it reads. ChairFill always reads like a text.",
    bubbles: [
      { dir: "out", text: "Aye [Name] what's good, it's [Barber] 💈" },
      {
        dir: "out",
        text: "Been a minute — wanted to stay in your contacts. Sending my card real quick",
      },
      { dir: "in", text: "Saved bro 🤝 been a minute, ima pull up soon" },
    ],
  },
  {
    problem:
      "\"My texts get ignored anyway. Why would this be different?\"",
    problemEm:
      "Because every text they've sent before looked like a text. ChairFill doesn't.",
    solution:
      "ChairFill reaches clients through the same personal channel they use to text friends and family. Not a marketing app. Not a mass text service. The messages land the way a personal text lands — and they get opened the same way.",
    solutionEm:
      "That's why the response rate is different. The channel is different.",
  },
  {
    problem: "\"What if a client replies and I miss it?\"",
    problemEm: "The fear of dropping the ball right when the system delivers.",
    solution:
      "Every reply triggers an instant alert. If a client is ready to book, your booking link goes back automatically and the lead is marked hot. If they ask a question, ChairFill handles it or flags it for you immediately.",
    solutionEm:
      "Nothing falls through. The system closes the loop before you even see the notification.",
  },
  {
    problem: "\"I don't have time to learn new software.\"",
    problemEm:
      "Barbers are behind the chair all day. They can't afford to figure something out.",
    solution:
      "Founding members get a done-for-you launch. We build your first campaign, configure your setup, and send your first outreach. You're live — and already getting replies — before you've touched a single setting yourself.",
    solutionEm: "You'll be cutting hair while ChairFill runs. That's the whole point.",
  },
  {
    problem: "\"I'm already using Booksy or Square. Why switch?\"",
    problemEm:
      "Because Booksy and Square have never sent a single message to bring a client back to your chair.",
    solution:
      "Your old booking software waits for clients to come to it. ChairFill goes out and gets them. It's your booking calendar and your reactivation system in one — built specifically for barbers who are done watching clients go quiet.",
    solutionEm: "One platform. No duct tape. No wondering if your software is working.",
  },
  {
    problem: "\"What if I message a client who doesn't want to hear from me?\"",
    problemEm: "A real concern. And one ChairFill takes seriously.",
    solution:
      "ChairFill only reaches clients who've already done business with you — people who chose you once and went quiet. Anyone who opts out is removed instantly and never contacted again. Your reputation stays clean. Always.",
    solutionEm: "The system is built to protect your name, not risk it.",
  },
  {
    problem: "\"How will I know if this is actually making me money?\"",
    problemEm:
      "Barbers have heard promises before. They've seen dashboards full of nothing.",
    solution:
      "Your dashboard shows Revenue Recovered — the actual dollar amount tied to every client ChairFill brought back. Not open rates. Not impressions. Real appointments, real money, traced to the exact outreach that triggered them.",
    solutionEm: "You'll know what ChairFill made you this month. To the dollar.",
  },
];

export default function ObjectionsSection() {
  return (
    <div className="objections-scope">
      <style>{`
        .objections-scope {
          background: #0a0a0a;
          border-top: 1px solid #242424;
          border-bottom: 1px solid #242424;
          color: #F0EDE6;
          font-family: var(--font-satoshi), system-ui, sans-serif;
        }
        .objections-scope *, .objections-scope *::before, .objections-scope *::after {
          box-sizing: border-box;
        }
        .objections-scope .obj-section {
          padding: 96px 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .objections-scope .label {
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
        .objections-scope .section-title {
          font-family: var(--font-satoshi), system-ui, sans-serif;
          font-weight: 700;
          font-size: clamp(30px, 4.5vw, 50px);
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin: 0 0 16px;
          color: #F0EDE6;
        }
        .objections-scope .section-sub {
          font-size: 16px;
          color: #888880;
          line-height: 1.75;
          max-width: 580px;
          margin: 0;
        }
        .objections-scope .obj-header { margin-bottom: 56px; }
        .objections-scope .obj-col-labels {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          margin-bottom: 2px;
        }
        .objections-scope .obj-col-label {
          padding: 10px 28px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .objections-scope .obj-col-label.p {
          color: #E05252;
          background: rgba(224,82,82,0.06);
        }
        .objections-scope .obj-col-label.s {
          color: #4CAF7D;
          background: rgba(76,175,125,0.06);
        }
        .objections-scope .obj-grid { display: grid; gap: 2px; }
        .objections-scope .obj-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
        }
        .objections-scope .obj-cell {
          padding: 28px 30px;
          background: #111111;
        }
        .objections-scope .obj-cell.problem { border-left: 3px solid #E05252; }
        .objections-scope .obj-cell.solution { border-left: 3px solid #4CAF7D; }
        .objections-scope .obj-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
        }
        .objections-scope .obj-tag.t-problem { color: #E05252; }
        .objections-scope .obj-tag.t-solution { color: #4CAF7D; }
        .objections-scope .obj-text {
          font-size: 14px;
          line-height: 1.7;
          color: #F0EDE6;
          margin: 0;
        }
        .objections-scope .obj-text em {
          display: block;
          font-style: normal;
          font-size: 12px;
          color: #888880;
          margin-top: 8px;
          line-height: 1.6;
        }
        .objections-scope .mini-bubble-wrap {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .objections-scope .mini-bubble {
          display: inline-block;
          max-width: 85%;
          padding: 9px 14px;
          border-radius: 16px;
          font-size: 12px;
          line-height: 1.5;
          font-style: italic;
        }
        .objections-scope .mini-bubble.out {
          background: #1B5299;
          color: #fff;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }
        .objections-scope .mini-bubble.in {
          background: #2C2C2E;
          color: #eee;
          align-self: flex-start;
          border-bottom-left-radius: 4px;
        }
        @media (max-width: 680px) {
          .objections-scope .obj-row,
          .objections-scope .obj-col-labels { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="obj-section">
        <div className="obj-header">
          <div className="label">Every Objection. Killed.</div>
          <h2 className="section-title">
            We already know
            <br />
            what&apos;s holding you back.
          </h2>
          <p className="section-sub">
            These are the exact reasons barbers don&apos;t reactivate their
            client list — and what ChairFill does about each one.
          </p>
        </div>
        <div className="obj-col-labels">
          <div className="obj-col-label p">⚠ What barbers think</div>
          <div className="obj-col-label s">✓ What actually happens</div>
        </div>
        <div className="obj-grid">
          {ROWS.map((row, i) => (
            <div className="obj-row" key={i}>
              <div className="obj-cell problem">
                <div className="obj-tag t-problem">The Fear</div>
                <p className="obj-text">
                  {row.problem}
                  <em>{row.problemEm}</em>
                </p>
              </div>
              <div className="obj-cell solution">
                <div className="obj-tag t-solution">What Happens</div>
                <p className="obj-text">
                  {row.solution}
                  <em>{row.solutionEm}</em>
                </p>
                {row.bubbles && (
                  <div className="mini-bubble-wrap">
                    {row.bubbles.map((b, bi) => (
                      <div key={bi} className={`mini-bubble ${b.dir}`}>
                        {b.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
