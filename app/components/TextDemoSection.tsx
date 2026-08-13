"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * TextDemoSection — "Text yourself the demo"
 *
 * The interactive twin of the passive hero phone. A barber enters their own
 * name + cell, proves they own the number with a one-time code, and then
 * McArthur texts them for real over iMessage. The number is verified BEFORE
 * any demo text goes out, so the form can only ever text the person filling
 * it in — it can't be weaponized to spam a stranger.
 *
 * Anti-abuse (layers, cheapest first):
 *  1. Cloudflare Turnstile token, required server-side.
 *  2. Honeypot field ("company") — real barbers never see it.
 *  3. Time-trap — submits faster than MIN_FILL_MS are bots.
 *  4. One-time code to the entered number — the hard gate. You can only
 *     demo a phone you physically hold.
 *  Server owns the real rate limits (per-number, per-IP, global cap).
 */

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const MIN_FILL_MS = 2500;
const CODE_LEN = 6;

type Step = "form" | "code" | "done";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

// Preview conversation shown in the on-page phone. The REAL text McArthur
// sends lives in the backend — this is just the "here's what lands" hint.
function previewMsgs(name: string) {
  const who = name.trim() || "fam";
  return [
    { t: "them", x: `yo ${who}, this is McArthur from ChairFill 👋🏾` },
    {
      t: "them",
      x: "this text you just got? that's the whole thing. i take the place of the booking app you're fighting with and text your clients back the second they reach out, even when you're mid fade.",
    },
    { t: "me", x: "how's that win me clients back?" },
    {
      t: "them",
      x: "i spot who went quiet, reach out in your voice, and book em before they drift to another shop. wanna watch me pull one back right now?",
    },
  ];
}

export default function TextDemoSection() {
  const [step, setStep] = useState<Step>("form");
  const [firstName, setFirstName] = useState("");
  const [cell, setCell] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [consent, setConsent] = useState(false);
  const [code, setCode] = useState("");
  const [requestId, setRequestId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);

  const mountedAt = useRef<number>(0);
  const turnstileToken = useRef<string>("");
  const turnstileEl = useRef<HTMLDivElement | null>(null);
  const turnstileId = useRef<string>("");

  // spots meter (reuses the live /api/spots-taken endpoint)
  const TOTAL_SPOTS = 5;
  const [spotsTaken, setSpotsTaken] = useState(0);

  useEffect(() => {
    mountedAt.current = Date.now();
    fetch("/api/spots-taken")
      .then((r) => r.json())
      .then((d) => {
        if (typeof d?.spotsTaken === "number") {
          setSpotsTaken(Math.min(TOTAL_SPOTS, Math.max(0, d.spotsTaken)));
        }
      })
      .catch(() => {});
  }, []);

  // Load + render Turnstile
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const render = () => {
      if (!window.turnstile || !turnstileEl.current || turnstileId.current) return;
      turnstileId.current = window.turnstile.render(turnstileEl.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "dark",
        callback: (token: string) => {
          turnstileToken.current = token;
        },
        "expired-callback": () => {
          turnstileToken.current = "";
        },
        "error-callback": () => {
          turnstileToken.current = "";
        },
      });
    };
    if (window.turnstile) {
      render();
      return;
    }
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    s.defer = true;
    s.onload = render;
    document.head.appendChild(s);
  }, []);

  const resetTurnstile = useCallback(() => {
    turnstileToken.current = "";
    if (window.turnstile && turnstileId.current) {
      window.turnstile.reset(turnstileId.current);
    }
  }, []);

  const requestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (busy) return;
    if (company) return; // honeypot tripped — silently drop
    if (!firstName.trim() || !cell.trim()) {
      setError("Drop your first name and cell to get the demo.");
      return;
    }
    if (!consent) {
      setError("Check the box to agree to receive your demo text.");
      return;
    }
    if (TURNSTILE_SITE_KEY && !turnstileToken.current) {
      setError("Give the box a second to finish checking you're human.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/demo-text/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          cell: cell.trim(),
          company, // honeypot echoed for server-side check
          consent,
          elapsedMs: Date.now() - mountedAt.current,
          turnstileToken: turnstileToken.current,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        requestId?: string;
        error?: string;
      };
      if (!res.ok || !data.requestId) {
        setError(data.error || "Could not send the code. Try again in a bit.");
        resetTurnstile();
        setBusy(false);
        return;
      }
      setRequestId(data.requestId);
      setStep("code");
    } catch {
      setError("Network hiccup. Try again.");
      resetTurnstile();
    }
    setBusy(false);
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (busy) return;
    if (code.length !== CODE_LEN) {
      setError(`Enter the ${CODE_LEN}-digit code we just texted you.`);
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/demo-text/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, code }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        attemptsLeft?: number;
      };
      if (!res.ok || !data.ok) {
        setError(data.error || "That code did not match.");
        if (typeof data.attemptsLeft === "number") setAttemptsLeft(data.attemptsLeft);
        setBusy(false);
        return;
      }
      setStep("done");
    } catch {
      setError("Network hiccup. Try again.");
    }
    setBusy(false);
  };

  return (
    <section id="text-demo" className="cf-demo">
      <style>{cfDemoCss}</style>
      <div className="cf-demo__inner">
        <span className="cf-demo__badge">
          <span className="cf-demo__pd" />
          See it work · on your own phone
        </span>

        <div className="cf-demo__grid">
          {/* LEFT — the pitch + flow */}
          <div>
            <h2 className="cf-demo__h2">
              Text yourself
              <br />
              the <span className="cf-demo__gold">demo.</span>
            </h2>

            {step !== "done" && (
              <p className="cf-demo__lede">
                Drop your name and cell.{" "}
                <b>ChairFill texts you back in seconds</b> the same way it texts
                the clients who stopped booking. The text you get is the whole
                product, working. No app to download.
              </p>
            )}

            {/* STEP 1 — request code */}
            {step === "form" && (
              <form className="cf-demo__form" onSubmit={requestCode} autoComplete="off" noValidate>
                <div className="cf-demo__row">
                  <div className="cf-demo__field">
                    <input
                      id="cf-demo-name"
                      type="text"
                      placeholder=" "
                      maxLength={24}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <label htmlFor="cf-demo-name">First name</label>
                  </div>
                  <div className="cf-demo__field">
                    <input
                      id="cf-demo-cell"
                      type="tel"
                      inputMode="tel"
                      placeholder=" "
                      value={cell}
                      onChange={(e) => setCell(e.target.value)}
                      required
                    />
                    <label htmlFor="cf-demo-cell">Cell number</label>
                  </div>
                </div>

                {/* honeypot — visually hidden, off-screen, not tab-reachable */}
                <div className="cf-demo__hp" aria-hidden="true">
                  <label htmlFor="cf-demo-company">Company</label>
                  <input
                    id="cf-demo-company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                {TURNSTILE_SITE_KEY && <div ref={turnstileEl} className="cf-demo__turnstile" />}

                <label className="cf-demo__consent">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <span>
                    I agree to receive text messages from ChairFill at the number I
                    provide, including an automated code and demo messages. Consent
                    isn&apos;t a condition of purchase. Msg &amp; data rates may apply.
                    Reply STOP to opt out. See our{" "}
                    <a href="/terms" target="_blank" rel="noopener noreferrer">Terms</a>{" "}
                    and{" "}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>

                <button className="cf-demo__cta" type="submit" disabled={busy}>
                  {busy ? "Sending your code…" : "Text me the demo"}
                  {!busy && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 12h15M13 6l6 6-6 6"
                        stroke="#000"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                {error && <p className="cf-demo__err">{error}</p>}
                <p className="cf-demo__fine">
                  <b>It texts the exact number you type.</b> We send a quick code
                  to make sure it's really you. No spam, no list.
                </p>
              </form>
            )}

            {/* STEP 2 — verify code */}
            {step === "code" && (
              <form className="cf-demo__form" onSubmit={verifyCode} autoComplete="off" noValidate>
                <p className="cf-demo__codehint">
                  We just texted a {CODE_LEN}-digit code to{" "}
                  <b>{cell.trim()}</b>. Punch it in to unlock your demo.
                </p>
                <input
                  className="cf-demo__code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={CODE_LEN}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, CODE_LEN))}
                  placeholder="••••••"
                  aria-label="Verification code"
                  autoFocus
                />
                <button className="cf-demo__cta" type="submit" disabled={busy}>
                  {busy ? "Checking…" : "Verify + send my demo"}
                </button>
                {error && (
                  <p className="cf-demo__err">
                    {error}
                    {attemptsLeft !== null && attemptsLeft > 0 && (
                      <> {attemptsLeft} tries left.</>
                    )}
                  </p>
                )}
                <button
                  type="button"
                  className="cf-demo__link"
                  onClick={() => {
                    setStep("form");
                    setCode("");
                    setError("");
                    setAttemptsLeft(null);
                    resetTurnstile();
                  }}
                >
                  ← Wrong number? Start over
                </button>
              </form>
            )}

            {/* DONE */}
            {step === "done" && (
              <div className="cf-demo__done">
                <p className="cf-demo__lede">
                  <b>Check your phone.</b> McArthur is texting{" "}
                  <b>{firstName.trim() || "you"}</b> right now. Text him back like
                  a client would and watch him work. That is exactly what your
                  clients feel.
                </p>
                <div className="cf-demo__founding cf-demo__founding--tight">
                  <p className="cf-demo__founding-sub cf-demo__founding-sub--big">
                    Liked it? The first 5 barbers in stay <b>free for life.</b>
                  </p>
                  <a className="cf-demo__cta cf-demo__cta--inline" href="#founding">
                    Claim a founding chair
                  </a>
                </div>
              </div>
            )}

            {/* founding meter (hidden on done to avoid double-CTA) */}
            {step !== "done" && (
              <div className="cf-demo__founding">
                <div className="cf-demo__founding-top">
                  <span className="cf-demo__founding-label">Founding chairs</span>
                  <span className="cf-demo__founding-count">
                    <b>{spotsTaken}</b> of {TOTAL_SPOTS} claimed
                  </span>
                </div>
                <div className="cf-demo__chairs">
                  {Array.from({ length: TOTAL_SPOTS }, (_, i) => (
                    <span key={i} className={`cf-demo__chair${i < spotsTaken ? " on" : ""}`} />
                  ))}
                </div>
                <p className="cf-demo__founding-sub">
                  First 5 barbers in stay <b>free for life.</b>{" "}
                  {TOTAL_SPOTS - spotsTaken} {TOTAL_SPOTS - spotsTaken === 1 ? "chair" : "chairs"}{" "}
                  left before it locks.
                </p>
              </div>
            )}
          </div>

          {/* RIGHT — phone preview */}
          <PhonePreview name={firstName} play={step === "done"} />
        </div>
      </div>
    </section>
  );
}

/* ---- Phone preview (animates the incoming demo once verified) ---- */
function PhonePreview({ name, play }: { name: string; play: boolean }) {
  const threadRef = useRef<HTMLDivElement | null>(null);
  const typingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const thread = threadRef.current;
    const typing = typingRef.current;
    if (!thread || !typing) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion:reduce)").matches;

    let timer: ReturnType<typeof setTimeout>;
    const clear = () =>
      thread.querySelectorAll(".cf-demo__bubble").forEach((b) => b.remove());
    const bubble = (m: { t: string; x: string }) => {
      const d = document.createElement("div");
      d.className = "cf-demo__bubble " + (m.t === "them" ? "them" : "me");
      d.textContent = m.x;
      thread.insertBefore(d, typing);
      requestAnimationFrame(() => d.classList.add("show"));
    };
    const list = previewMsgs(name);
    clear();
    typing.classList.remove("show");
    if (!play) {
      // idle: show the opener line only, so the phone isn't empty
      bubble(list[0]);
      return;
    }
    if (reduce) {
      list.forEach(bubble);
      return () => clear();
    }
    let i = 0;
    const step = () => {
      if (i >= list.length) return;
      const m = list[i++];
      typing.classList.add("show");
      const wait = Math.min(m.t === "them" ? 700 + m.x.length * 11 : 600, 2100);
      timer = setTimeout(() => {
        typing.classList.remove("show");
        bubble(m);
        timer = setTimeout(step, 420);
      }, wait);
    };
    step();
    return () => clearTimeout(timer);
  }, [name, play]);

  return (
    <div className="cf-demo__stage">
      <div className="cf-demo__phone">
        <div className="cf-demo__glow" />
        <div className="cf-demo__screen">
          <div className="cf-demo__island" />
          <div className="cf-demo__head">
            <div className="cf-demo__avatar">CF</div>
            <div>
              <div className="cf-demo__hname">McArthur · ChairFill</div>
              <div className="cf-demo__hsub">iMessage</div>
            </div>
          </div>
          <div className="cf-demo__thread" ref={threadRef}>
            <div className="cf-demo__tstamp">Text message · now</div>
            <div className="cf-demo__typing" ref={typingRef}>
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="cf-demo__bar">
            <div className="cf-demo__inp">iMessage</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* scoped styles — namespaced .cf-demo, mirrors globals.css tokens */
const cfDemoCss = `
.cf-demo{background:radial-gradient(ellipse 60% 80% at 72% 45%,rgba(212,160,23,.07) 0%,transparent 70%),#0a0a0a;color:#fafafa;padding:clamp(48px,7vw,96px) clamp(16px,5vw,32px);overflow:hidden}
.cf-demo *{box-sizing:border-box}
.cf-demo__inner{max-width:72rem;margin:0 auto}
.cf-demo__badge{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(212,175,55,.4);background:rgba(212,175,55,.1);color:#d4af37;border-radius:100px;padding:6px 16px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase}
.cf-demo__pd{width:6px;height:6px;border-radius:50%;background:#d4af37;animation:cfdpulse 1.8s infinite}
@keyframes cfdpulse{0%,100%{opacity:1}50%{opacity:.35}}
.cf-demo__grid{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(32px,5vw,60px);align-items:center;margin-top:clamp(22px,3vw,36px)}
@media(max-width:860px){.cf-demo__grid{grid-template-columns:1fr;gap:44px}}
.cf-demo__h2{margin:20px 0 0;font-family:var(--font-bebas),"Arial Narrow",Impact,sans-serif;font-weight:400;font-size:clamp(52px,9vw,96px);line-height:.9;letter-spacing:.01em;text-transform:uppercase;text-wrap:balance;color:#fff}
.cf-demo__gold{color:#d4af37}
.cf-demo__lede{margin:20px 0 0;max-width:36ch;font-size:clamp(16px,2vw,19px);line-height:1.55;color:#a3a3a3}
.cf-demo__lede b{color:#fafafa;font-weight:600}
.cf-demo__form{margin:28px 0 0;display:flex;flex-direction:column;gap:10px;max-width:440px}
.cf-demo__row{display:flex;gap:10px}
@media(max-width:440px){.cf-demo__row{flex-direction:column}}
.cf-demo__field{flex:1;position:relative}
.cf-demo__field label{position:absolute;left:18px;top:14px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#888880;font-weight:600;pointer-events:none;transition:.15s}
.cf-demo__field input{width:100%;background:#141414;border:2px solid rgba(212,175,55,.3);border-radius:12px;color:#fff;padding:28px 18px 12px;font-size:16px;font-family:inherit;transition:border-color .15s}
.cf-demo__field input:focus{outline:none;border-color:#d4af37}
.cf-demo__field input:focus + label,.cf-demo__field input:not(:placeholder-shown) + label{top:9px;font-size:9.5px;color:#d4af37}
.cf-demo__hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
.cf-demo__turnstile{margin-top:2px}
.cf-demo__consent{display:flex;gap:10px;align-items:flex-start;margin-top:4px;font-size:12.5px;line-height:1.5;color:#8a8078;cursor:pointer}
.cf-demo__consent input{margin-top:2px;width:16px;height:16px;flex-shrink:0;accent-color:#d4af37;cursor:pointer}
.cf-demo__consent a{color:#d4af37;text-decoration:underline}
.cf-demo__consent a:hover{color:#e8c547}
.cf-demo__cta{margin-top:4px;cursor:pointer;border:none;border-radius:100px;background:#d4af37;color:#000;font-family:inherit;font-weight:700;font-size:16px;padding:15px 22px;display:flex;align-items:center;justify-content:center;gap:9px;transition:transform .2s,background .15s,box-shadow .2s;box-shadow:0 4px 12px rgba(0,0,0,.25)}
.cf-demo__cta:hover{background:#e8c547;transform:scale(1.02);box-shadow:0 12px 40px rgba(0,0,0,.3)}
.cf-demo__cta:active{transform:scale(.98)}
.cf-demo__cta:disabled{opacity:.6;cursor:default;transform:none}
.cf-demo__cta--inline{display:inline-flex;text-decoration:none;margin-top:14px;width:auto}
.cf-demo__fine{margin:12px 0 0;font-size:13px;color:#888880;line-height:1.45}
.cf-demo__fine b{color:#a3a3a3;font-weight:600}
.cf-demo__err{margin:10px 0 0;font-size:13.5px;color:#e5b8b8;line-height:1.4}
.cf-demo__link{margin:14px auto 0;background:none;border:none;color:#888880;font-family:inherit;font-size:13px;cursor:pointer;padding:4px}
.cf-demo__link:hover{color:#d4af37}
.cf-demo__codehint{margin:22px 0 0;font-size:15.5px;color:#a3a3a3;line-height:1.5;max-width:36ch}
.cf-demo__codehint b{color:#fff}
.cf-demo__code{margin-top:18px;width:100%;max-width:280px;background:#141414;border:2px solid rgba(212,175,55,.3);border-radius:14px;color:#fff;text-align:center;font-size:32px;letter-spacing:.35em;padding:16px 10px;font-family:var(--font-geist-mono),monospace;caret-color:#d4af37}
.cf-demo__code:focus{outline:none;border-color:#d4af37}
.cf-demo__code::placeholder{color:#3a3a38;letter-spacing:.35em}
.cf-demo__done{animation:cfdup .5s ease}
@keyframes cfdup{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.cf-demo__founding{margin:32px 0 0;max-width:440px;padding:20px 22px;border-radius:16px;border:1px solid rgba(212,175,55,.3);background:linear-gradient(180deg,rgba(212,175,55,.07),rgba(212,175,55,.02))}
.cf-demo__founding--tight{margin-top:22px}
.cf-demo__founding-top{display:flex;align-items:baseline;justify-content:space-between;gap:12px}
.cf-demo__founding-label{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#d4af37}
.cf-demo__founding-count{font-size:14px;color:#a3a3a3}
.cf-demo__founding-count b{color:#fff;font-weight:700}
.cf-demo__chairs{display:flex;gap:8px;margin:14px 0 12px}
.cf-demo__chair{flex:1;height:8px;border-radius:100px;background:rgba(250,250,250,.08);position:relative;overflow:hidden}
.cf-demo__chair.on{background:#d4af37}
.cf-demo__chair.on::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);animation:cfdsheen 3.2s linear infinite}
@keyframes cfdsheen{0%{transform:translateX(-100%)}60%,100%{transform:translateX(220%)}}
.cf-demo__founding-sub{margin:0;font-size:13.5px;color:#a3a3a3;line-height:1.5}
.cf-demo__founding-sub--big{font-size:16px;color:#fafafa}
.cf-demo__founding-sub b{color:#fff;font-weight:600}
.cf-demo__stage{display:flex;justify-content:center}
.cf-demo__phone{position:relative;width:min(320px,86vw);background:#050505;border-radius:55px;padding:6px;border:4px solid #2A2A2A;box-shadow:15px 20px 50px rgba(0,0,0,.8),inset 0 1px 1px rgba(255,255,255,.1)}
.cf-demo__glow{position:absolute;width:300px;height:300px;left:50%;top:45%;transform:translate(-50%,-50%);background:rgba(212,175,55,.15);border-radius:50%;filter:blur(40px);pointer-events:none;z-index:0}
.cf-demo__screen{position:relative;z-index:1;background:#1A1A1A;border-radius:44px;overflow:hidden;height:520px;display:flex;flex-direction:column}
.cf-demo__island{position:absolute;top:9px;left:50%;transform:translateX(-50%);width:112px;height:28px;background:#000;border-radius:100px;z-index:5;border:1px solid rgba(255,255,255,.05)}
.cf-demo__head{padding:44px 16px 12px;display:flex;align-items:center;gap:11px;border-bottom:1px solid rgba(255,255,255,.06);background:#151515}
.cf-demo__avatar{width:42px;height:42px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,#d4af37,#8B6914);display:flex;align-items:center;justify-content:center;font-weight:800;color:#000;font-size:15px;box-shadow:0 4px 10px rgba(212,175,55,.3)}
.cf-demo__hname{font-size:14px;font-weight:700;color:#fff;line-height:1.1}
.cf-demo__hsub{font-size:10.5px;color:#888880;margin-top:2px}
.cf-demo__thread{flex:1;padding:16px 13px;display:flex;flex-direction:column;gap:8px;justify-content:flex-end;overflow:hidden}
.cf-demo__tstamp{align-self:center;font-size:10px;color:#6b6b73;letter-spacing:.04em;margin-bottom:2px}
.cf-demo__bubble{max-width:82%;padding:9px 13px;border-radius:18px;font-size:14px;line-height:1.4;opacity:0;transform:translateY(8px)}
.cf-demo__bubble.show{animation:cfdpop .38s cubic-bezier(.2,.7,.3,1) forwards}
@keyframes cfdpop{to{opacity:1;transform:none}}
.cf-demo__bubble.them{align-self:flex-start;background:#262528;color:#fff;border-bottom-left-radius:5px}
.cf-demo__bubble.me{align-self:flex-end;background:#1D86EA;color:#fff;border-bottom-right-radius:5px}
.cf-demo__typing{align-self:flex-start;background:#262528;border-radius:18px;border-bottom-left-radius:5px;padding:12px 15px;display:none;gap:4px}
.cf-demo__typing.show{display:flex}
.cf-demo__typing span{width:7px;height:7px;border-radius:50%;background:#8a8a92;animation:cfdblink 1.2s infinite}
.cf-demo__typing span:nth-child(2){animation-delay:.2s}
.cf-demo__typing span:nth-child(3){animation-delay:.4s}
@keyframes cfdblink{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}
.cf-demo__bar{padding:10px 14px 16px;border-top:1px solid rgba(255,255,255,.06);display:flex;align-items:center;gap:9px;background:#151515}
.cf-demo__inp{flex:1;height:32px;border-radius:100px;border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;padding:0 14px;color:#5f5f66;font-size:13px}
@media(prefers-reduced-motion:reduce){.cf-demo__bubble{opacity:1;transform:none}.cf-demo__chair.on::after,.cf-demo__pd{animation:none}.cf-demo__typing{display:none!important}}
`;
