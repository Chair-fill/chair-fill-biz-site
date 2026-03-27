import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#080808] font-['Satoshi'] selection:bg-[#C9A84C]/30 text-[#E5DFD5]">
      <Navbar showLinks={false} />

      <main className="w-full">
        {/* Hero Section */}
        <header className="relative overflow-hidden pt-[80px] px-[48px] pb-[64px] border-b border-[#C9A84C]/18">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.06)_0%,transparent_65%)] pointer-events-none" />

          {/* Legal Badge */}
          <div className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase text-[#C9A84C] border border-[#C9A84C]/18 bg-[#C9A84C]/12 px-[14px] py-[5px] rounded-[2px] mb-[28px] font-medium relative z-10">
            LEGAL
          </div>

          {/* Header */}
          <h1 className="text-[clamp(2.4rem,5vw,3.8rem)] font-bold leading-[1.1] text-white mb-5 tracking-[-0.02em] relative z-10">
            Terms of <span className="text-[#C9A84C]">Service</span>
          </h1>

          <div className="text-[#777] text-[0.82rem] tracking-[0.04em] relative z-10">
            Effective Date: January 1, 2026 · Last Updated: March 2026
          </div>
        </header>

        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-up {
            animation: fadeUp 0.6s ease both;
          }
          .section-1 { animation-delay: 0.05s; }
          .section-2 { animation-delay: 0.1s; }
          .section-3 { animation-delay: 0.15s; }
          .section-4 { animation-delay: 0.2s; }
          .section-5 { animation-delay: 0.25s; }
          .section-6 { animation-delay: 0.3s; }
          .section-7 { animation-delay: 0.35s; }
          .section-8 { animation-delay: 0.4s; }
          .section-9 { animation-delay: 0.45s; }
          .section-10 { animation-delay: 0.5s; }
          .section-11 { animation-delay: 0.55s; }
          .section-12 { animation-delay: 0.6s; }
          .section-13 { animation-delay: 0.65s; }

          .callout {
            background: rgba(201,168,76,0.12);
            border: 1px solid rgba(201,168,76,0.18);
            border-left: 3px solid #C9A84C;
            padding: 18px 22px;
            border-radius: 4px;
            margin: 20px 0;
          }
          .callout p { color: #E5DFD5; margin: 0; font-size: 0.88rem; }

          .warning {
            background: rgba(180,60,60,0.08);
            border: 1px solid rgba(180,60,60,0.2);
            border-left: 3px solid #B43C3C;
            padding: 18px 22px;
            border-radius: 4px;
            margin: 20px 0;
          }
          .warning p { color: #E5DFD5; margin: 0; font-size: 0.88rem; }

          .plan-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 14px;
            margin: 20px 0;
          }
          .plan-card {
            background: #111111;
            border: 1px solid rgba(201,168,76,0.18);
            border-radius: 6px;
            padding: 20px 18px;
          }
          .plan-card h3 {
            font-size: 0.8rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #E8C96A;
            margin-bottom: 10px;
          }
          .plan-card .price {
            font-size: 1.6rem;
            font-weight: 700;
            color: #fff;
            letter-spacing: -0.02em;
          }
          .plan-card .price span { font-size: 0.8rem; color: #777; font-weight: 400; }
          .plan-card p { font-size: 0.78rem; color: #777; margin-top: 6px; margin-bottom: 0; }
        `,
          }}
        />

        <div className="max-w-[800px] mx-auto px-[48px] py-[72px] pb-[120px]">
          {/* Section 1: Agreement to Terms */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-1">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Agreement to Terms
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <p>
                These Terms of Service ("Terms") constitute a legally binding
                agreement between you ("Subscriber," "you," or "your") and
                ChairFill LLC ("ChairFill," "we," "our," or "us"), governing
                your access to and use of the ChairFill platform, website, and
                all related services (collectively, the "Services").
              </p>
              <p>
                By creating an account, subscribing to a plan, or otherwise
                accessing the Services, you confirm that you have read,
                understood, and agree to be bound by these Terms and our Privacy
                Policy.
              </p>
              <div className="callout">
                <p>
                  ChairFill is a business-to-business platform intended for
                  professional use by barbershop owners and operators. You must
                  be at least 18 years of age and have the legal authority to
                  enter into agreements on behalf of your business.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Description of Services */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-2">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Description of Services
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <p>
                ChairFill provides an AI-powered client communication platform
                that enables barbershop owners to send automated, personalized
                messages to their existing client base to drive repeat bookings
                and increase revenue.
              </p>
              <ul className="space-y-2 mt-4">
                {[
                  "Automated outreach campaigns to client contact lists",
                  "AI-assisted conversational messaging tailored to barbershop businesses",
                  "Client response monitoring and campaign management dashboard",
                  "Opt-out tracking and compliance safeguards",
                  "Performance analytics and reporting",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-7 text-[0.95rem] border-b border-white/5 pb-2 last:border-0 before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                ChairFill reserves the right to modify, enhance, or discontinue
                any feature of the Services with reasonable notice to active
                subscribers.
              </p>
            </div>
          </section>

          {/* Section 3: Subscription Plans & Billing */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-3">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Subscription Plans & Billing
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <p>
                ChairFill offers the following subscription tiers for barbershop
                operators:
              </p>
              <div className="plan-grid">
                <div className="plan-card">
                  <h3>Independent</h3>
                  <div className="price">
                    $147<span>/mo</span>
                  </div>
                  <p>Solo barbers and single chairs</p>
                </div>
                <div className="plan-card">
                  <h3>Professional</h3>
                  <div className="price">
                    $247<span>/mo</span>
                  </div>
                  <p>Multi-chair operators</p>
                </div>
                <div className="plan-card">
                  <h3>Shop Owner</h3>
                  <div className="price">TBD</div>
                  <p>Full shop management</p>
                </div>
              </div>
              <ul className="space-y-2 mt-4">
                {[
                  "All subscriptions are billed monthly in advance",
                  "Subscriptions auto-renew unless cancelled before the next billing cycle",
                  "Price changes will be communicated with at least 30 days' notice",
                  "All payments are processed securely via our third-party payment processor",
                  "Taxes may apply depending on your jurisdiction",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-7 text-[0.95rem] border-b border-white/5 pb-2 last:border-0 before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 4: Cancellation & Refunds */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-4">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Cancellation & Refunds
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <p>
                You may cancel your ChairFill subscription at any time through
                your account dashboard or by contacting our support team.
              </p>
              <ul className="space-y-2 mt-4">
                {[
                  "Cancellations take effect at the end of the current billing period",
                  "No partial refunds are issued for unused time within a billing cycle",
                  "All outstanding balances must be settled prior to account closure",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-7 text-[0.95rem] border-b border-white/5 pb-2 last:border-0 before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                ChairFill may issue refunds at its sole discretion in cases of
                documented technical failure attributable solely to our
                platform. Refund requests must be submitted within 7 days of the
                billing date in question.
              </p>
            </div>
          </section>

          {/* Section 5: Subscriber Consent Certification & Messaging Compliance */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-5">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Subscriber Consent Certification & Messaging Compliance
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <p>
                This section governs your obligations as a ChairFill subscriber
                with respect to client contact data, consent, and compliance
                with applicable messaging laws. This is a material term of your
                agreement. Failure to comply may result in immediate account
                termination and you remaining solely liable for any resulting
                claims.
              </p>
              <p className="font-bold text-white">Consent certification.</p>
              <p>
                By importing any contact list into the ChairFill platform, you
                represent, warrant, and certify that:
              </p>
              <ul className="space-y-2">
                {[
                  "Every contact in that list is an existing client with whom you have a prior established business relationship",
                  "You have obtained, or have a lawful basis to claim, prior express written consent from each contact to receive automated, AI-assisted communications on behalf of your business",
                  "Your consent records are accurate, current, and available for production upon request",
                  "You have not purchased, rented, leased, or otherwise acquired the contact list from a third party without independent verification of consent status",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-7 text-[0.95rem] border-b border-white/5 pb-2 last:border-0 before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                <span className="font-bold text-white">
                  Annual recertification.
                </span>{" "}
                You agree to recertify compliance with the above representations
                on an annual basis, or upon request by ChairFill.
                Recertification may be required as a condition of continued
                platform access.
              </p>
              <p>
                <span className="font-bold text-white">
                  AI disclosure acknowledgment.
                </span>{" "}
                You acknowledge that ChairFill uses artificial intelligence to
                generate messages sent to your clients on your behalf. You
                understand that certain jurisdictions require disclosure of
                AI-generated communications to recipients, and you agree that
                you are solely responsible for ensuring any required disclosures
                are made to your clients in compliance with the laws of the
                states and jurisdictions where they reside.
              </p>
              <p className="font-bold text-white">Opt-out obligations.</p>
              <p>You agree to:</p>
              <ul className="space-y-2">
                {[
                  "Honor all opt-out requests immediately and permanently",
                  "Never re-import a contact who has previously opted out",
                  "Never direct ChairFill to message a contact after an opt-out has been recorded, whether through the platform or communicated to you directly outside the platform",
                  "Maintain your own opt-out records independent of the ChairFill platform",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-7 text-[0.95rem] border-b border-white/5 pb-2 last:border-0 before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                <span className="font-bold text-white">
                  TCPA and state law compliance.
                </span>{" "}
                You are solely responsible for ensuring your use of the platform
                complies with the Telephone Consumer Protection Act (TCPA), the
                CAN-SPAM Act, and all applicable state messaging, telemarketing,
                and consumer protection laws — including but not limited to laws
                in Florida, California, Texas, Virginia, and Connecticut.
                ChairFill provides platform-level safeguards including DNC
                registry scrubbing and time-zone delivery restrictions, but
                these safeguards do not constitute legal compliance advice and
                do not transfer compliance responsibility to ChairFill.
              </p>
              <p>
                <span className="font-bold text-white">Indemnification.</span>{" "}
                You agree to defend, indemnify, and hold harmless ChairFill LLC,
                its officers, employees, contractors, and agents from and
                against any and all claims, damages, fines, penalties, costs,
                and attorneys' fees arising out of or related to: (i) your
                failure to obtain proper consent from any contact you import
                into the platform; (ii) your violation of the TCPA or any
                applicable state messaging law; (iii) any opt-out you failed to
                honor; or (iv) any misrepresentation made in your consent
                certification. This indemnification obligation survives
                termination of your subscription.
              </p>
            </div>
          </section>

          {/* Section 6: Subscriber Responsibilities & Acceptable Use */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-6">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Subscriber Responsibilities & Acceptable Use
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <p>
                As a ChairFill subscriber, you are solely responsible for your
                use of the platform and all messaging sent through it. You agree
                to:
              </p>
              <ul className="space-y-2 mt-4">
                {[
                  "Obtain all legally required consents from contacts before importing them into the platform",
                  "Use the Services only for lawful barbershop client outreach purposes",
                  "Maintain accurate account information and keep credentials secure",
                  "Honor all opt-out requests immediately and not re-import opted-out contacts",
                  "Comply with all applicable laws including the TCPA, CAN-SPAM Act, and state messaging regulations",
                  "Not use the platform to send spam, unsolicited bulk messages, or deceptive communications",
                  "Not attempt to reverse engineer, scrape, or exploit the platform's infrastructure",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-7 text-[0.95rem] border-b border-white/5 pb-2 last:border-0 before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 7: Prohibited Conduct */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-7">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Prohibited Conduct
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <ul className="space-y-2">
                {[
                  "Uploading contact lists you do not have legal authorization to message",
                  "Sending harassing, threatening, or abusive messages through the platform",
                  "Impersonating another business or individual",
                  "Using the platform for any purpose other than legitimate barbershop client outreach",
                  "Sharing account access with unauthorized third parties",
                  "Attempting to circumvent platform safety controls or opt-out mechanisms",
                  "Reselling or sublicensing access to the ChairFill platform",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-7 text-[0.95rem] border-b border-white/5 pb-2 last:border-0 before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 8: Intellectual Property */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-8">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Intellectual Property
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <p>
                All technology, software, design, trademarks, and content
                comprising the ChairFill platform are the exclusive intellectual
                property of ChairFill LLC. Your subscription grants you a
                limited, non-exclusive, non-transferable license to use the
                Services for their intended purpose during your active
                subscription period.
              </p>
              <p>
                You retain ownership of any contact data and business
                information you upload to the platform. By using ChairFill, you
                grant us a limited license to process that data solely to
                deliver the Services to you.
              </p>
              <p>
                You may not copy, reproduce, distribute, modify, or create
                derivative works based on any ChairFill platform component
                without our prior written consent.
              </p>
            </div>
          </section>

          {/* Section 9: Disclaimers */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-9">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Disclaimers
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <p>
                The ChairFill platform is provided "as is" and "as available."
                We make no guarantees regarding uptime, deliverability rates, or
                specific business outcomes from use of the platform. Results
                from use of the Services vary. Individual outcomes depend on
                client list size, response rates, and other factors outside
                ChairFill's control. No specific revenue recovery or booking
                volume is guaranteed.
              </p>
            </div>
          </section>

          {/* Section 10: Limitation of Liability */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-10">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Limitation of Liability
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <p>
                <span className="font-bold text-white">Liability cap.</span>{" "}
                ChairFill's total cumulative liability to you for any and all
                claims arising under or related to these Terms, the Services, or
                your use of the platform — regardless of the form of action or
                theory of liability — shall not exceed the total subscription
                fees actually paid by you to ChairFill in the twelve (12) months
                immediately preceding the event giving rise to the claim.
              </p>
              <p>
                <span className="font-bold text-white">
                  Exclusion of consequential damages.
                </span>{" "}
                To the maximum extent permitted by applicable law, ChairFill
                shall not be liable for any indirect, incidental, special,
                consequential, exemplary, or punitive damages, including without
                limitation lost profits, lost revenue, lost data, loss of
                goodwill, business interruption, or cost of substitute services,
                even if ChairFill has been advised of the possibility of such
                damages and even if a limited remedy fails of its essential
                purpose.
              </p>
              <p>
                <span className="font-bold text-white">
                  No liability for subscriber compliance failures.
                </span>{" "}
                ChairFill shall have no liability whatsoever for any fines,
                penalties, damages, claims, or legal fees arising from your
                failure to obtain proper consent, your violation of TCPA or any
                applicable messaging law, or your failure to honor opt-out
                requests. These risks are solely yours as the operator.
              </p>
              <p>
                <span className="font-bold text-white">
                  Essential basis of the bargain.
                </span>{" "}
                You acknowledge that the limitations of liability set forth in
                this section reflect a reasonable allocation of risk and are a
                fundamental element of the basis of the bargain between
                ChairFill and you. ChairFill would not provide the Services
                without these limitations.
              </p>
            </div>
          </section>

          {/* Section 11: Termination */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-11">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Termination
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <ul className="space-y-2">
                {[
                  "You violate these Terms or our Acceptable Use Policy",
                  "We receive credible complaints about your messaging practices",
                  "Continued service to you poses legal, regulatory, or reputational risk to ChairFill",
                  "You engage in fraudulent or deceptive conduct",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-7 text-[0.95rem] border-b border-white/5 pb-2 last:border-0 before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Upon termination, your right to access the platform ceases
                immediately. We will retain your data in accordance with our
                Privacy Policy. Your indemnification obligations and the consent
                certification representations you made survive termination.
              </p>
            </div>
          </section>

          {/* Section 12: Governing Law & Disputes */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-12">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Governing Law & Disputes
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <p>
                These Terms are governed by the laws of the State of Florida,
                without regard to its conflict of law provisions. Any disputes
                arising under these Terms shall be resolved through binding
                arbitration in Hillsborough County, Florida, except that either
                party may seek injunctive relief in court for intellectual
                property violations.
              </p>
              <p>
                By agreeing to these Terms, you waive your right to participate
                in class action lawsuits against ChairFill.
              </p>
              <p>
                For questions, contact us at{" "}
                <a
                  href="mailto:admin@chairfill.co"
                  className="text-[#C9A84C] border-b border-[#C9A84C]/25 hover:border-[#C9A84C] transition-colors"
                >
                  admin@chairfill.co
                </a>
                .
              </p>
            </div>
          </section>

          {/* Section 13: Contact Us */}
          <section className="animate-fade-up section-13">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Contact Us
            </h2>
            <div className="space-y-6 text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <ul className="my-4 list-none divide-y divide-white/[0.04]">
                <li className="relative pl-[28px] py-[10px] before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem] before:top-[12px]">
                  Email:{" "}
                  <a
                    href="mailto:admin@chairfill.co"
                    className="text-[#C9A84C] border-b border-[#C9A84C]/25 hover:border-[#C9A84C] transition-colors"
                  >
                    admin@chairfill.co
                  </a>
                </li>
                <li className="relative pl-[28px] py-[10px] before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem] before:top-[12px]">
                  Business: ChairFill LLC
                </li>
                <li className="relative pl-[28px] py-[10px] before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem] before:top-[12px]">
                  Website:{" "}
                  <a
                    href="https://chairfill.co"
                    className="text-[#C9A84C] border-b border-[#C9A84C]/25 hover:border-[#C9A84C] transition-colors"
                  >
                    chairfill.co
                  </a>
                </li>
              </ul>
              <p>
                We may update these Terms from time to time. Material changes
                will be communicated via email or a notice on our platform.
                Continued use after changes constitutes acceptance of the
                updated Terms.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
