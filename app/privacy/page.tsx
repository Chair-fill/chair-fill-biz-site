import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#080808] font-['Satoshi'] selection:bg-[#C9A84C]/30 text-[#E5DFD5]">
      <Navbar showLinks={false} />

      <main className="w-full">
        {/* Hero Section */}
        <header className="relative overflow-hidden pt-[80px] px-[48px] pb-[64px] border-b border-[#C9A84C]/18 group">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.06)_0%,transparent_65%)] pointer-events-none" />

          {/* Legal Badge */}
          <div className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase text-[#C9A84C] border border-[#C9A84C]/18 bg-[#C9A84C]/12 px-[14px] py-[5px] rounded-[2px] mb-[28px] font-medium relative z-10">
            LEGAL
          </div>

          {/* Header */}
          <h1 className="text-[clamp(2.4rem,5vw,3.8rem)] font-bold leading-[1.1] text-white mb-5 tracking-[-0.02em] relative z-10 [font-family:var(--font-satoshi)]">
            Privacy <span className="text-[#C9A84C]">Policy</span>
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
        `,
          }}
        />

        <div className="max-w-[800px] mx-auto px-[48px] py-[72px] pb-[120px]">
          {/* Section 1: Overview */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-1">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Overview
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <p>
                ChairFill LLC ("ChairFill," "we," "our," or "us") operates an
                AI-powered platform built for independent barbers and
                barbershops. This Privacy Policy explains how we collect, use,
                disclose, and protect information when you use our platform,
                website, and related services (collectively, the "Services").
              </p>
              <p>
                By using ChairFill, you agree to the practices described in this
                policy. If you do not agree, please discontinue use of our
                Services.
              </p>
              <div className="bg-[#C9A84C]/12 border border-[#C9A84C]/18 border-l-[3px] border-l-[#C9A84C] p-[18px_22px] rounded-[4px] my-5">
                <p className="text-[#E5DFD5] m-0 text-[0.88rem]">
                  ChairFill is designed for professional use by barbershop
                  owners and operators. If you are a client of a barbershop
                  using ChairFill, this policy also describes how your
                  information may be processed through our platform.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Information We Collect */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-2">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Information We Collect
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <p>
                We collect information in several ways depending on how you
                interact with our Services:
              </p>

              <p className="text-[#E5DFD5] font-bold mt-8">
                Information You Provide Directly
              </p>
              <ul className="my-4 list-none divide-y divide-white/[0.04]">
                {[
                  "Account registration details (name, email address, phone number, business name)",
                  "Billing and payment information (processed securely via third-party payment processors)",
                  "Business information including shop name, location, and contact details",
                  "Communications and support requests submitted to our team",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-[28px] py-[10px] before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem] before:top-[12px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-[#E5DFD5] font-bold mt-8">
                Information Collected Automatically
              </p>
              <ul className="my-4 list-none divide-y divide-white/[0.04]">
                {[
                  "Usage data including features accessed, session duration, and interaction patterns",
                  "Device and browser information (IP address, operating system, browser type)",
                  "Log data and performance analytics",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-[28px] py-[10px] before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem] before:top-[12px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-[#E5DFD5] font-bold mt-8">
                Client Contact Data (Barbershop Operators)
              </p>
              <ul className="my-4 list-none divide-y divide-white/[0.04]">
                {[
                  "Client phone numbers and contact lists imported by barbershop subscribers",
                  "Content generated through platform services on behalf of subscribers",
                  "Opt-out and consent status records for client contacts",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-[28px] py-[10px] before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem] before:top-[12px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 3: Platform Services & Client Data */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-3">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Platform Services & Client Data
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <p>
                ChairFill facilitates automated outreach to barbershop clients on
                behalf of our subscribers. Subscribers are responsible for
                ensuring they have appropriate consent from their clients before
                importing contact lists into the platform.
              </p>
              <ul className="my-4 list-none divide-y divide-white/[0.04]">
                {[
                  "All opt-out requests received through the platform are honored immediately and permanently",
                  "ChairFill enforces hard stops on messaging for any contact that has opted out",
                  "Client contact data imported by subscribers is used solely to deliver platform services",
                  "We do not use client contact data for our own marketing purposes",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-[28px] py-[10px] before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem] before:top-[12px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-[#C9A84C]/12 border border-[#C9A84C]/18 border-l-[3px] border-l-[#C9A84C] p-[18px_22px] rounded-[4px] my-5">
                <p className="text-[#E5DFD5] m-0 text-[0.88rem]">
                  Barbershop operators using ChairFill are responsible for
                  compliance with applicable messaging laws (including the TCPA)
                  as it relates to their client communications. ChairFill
                  provides the infrastructure; consent management remains the
                  operator's responsibility.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: AI-Generated Communications */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-4">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              AI-Generated Communications
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <p>
                ChairFill uses artificial intelligence to assist in generating
                outbound messages sent to barbershop clients on behalf of our
                barber subscribers. The following disclosures apply:
              </p>
              <p>
                <span className="text-[#E5DFD5] font-bold">Nature of AI messaging.</span>{" "}
                Messages delivered through ChairFill are generated or assisted by
                AI and sent on behalf of the barber subscriber. Recipients may be
                communicating with an AI system acting on behalf of their barber.
              </p>
              <p>
                <span className="text-[#E5DFD5] font-bold">Consent and opt-in.</span>{" "}
                ChairFill captures affirmative consent before delivering ongoing
                communications through platform services. Clients who do not
                consent or who do not respond to an initial outreach will not
                receive follow-up messages.
              </p>
              <p>
                <span className="text-[#E5DFD5] font-bold">Opt-out.</span>{" "}
                Any client who replies with STOP, UNSUBSCRIBE, NO, or any similar
                opt-out signal will be immediately and permanently removed from
                all future messaging for that barber's account. A single
                confirmation message will be sent, and no further messages will
                follow. Opt-out status is retained indefinitely, including after
                account cancellation.
              </p>
              <p>
                <span className="text-[#E5DFD5] font-bold">AI and third-party data processing.</span>{" "}
                Message content may be processed by third-party AI providers to
                generate responses. We do not permit these providers to use
                client contact data or message content to train their models.
                Contact <a href="mailto:admin@chairfill.co" className="text-[#C9A84C] hover:underline">admin@chairfill.co</a> with questions about
                third-party AI data practices.
              </p>
              <p>
                <span className="text-[#E5DFD5] font-bold">Time-of-day restrictions.</span>{" "}
                Platform services operate within legally required delivery windows
                in the recipient's local time zone.
              </p>
            </div>
          </section>

          {/* Section 5: Do Not Call (DNC) Registry Compliance */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-5">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Do Not Call (DNC) Registry Compliance
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <p>
                ChairFill scrubs all client phone numbers against the National Do
                Not Call Registry and applicable state DNC registries before any
                outbound message is sent. This process is automatic and occurs as
                part of our standard message pipeline.
              </p>
              <ul className="my-4 list-none divide-y divide-white/[0.04]">
                {[
                  "Numbers listed on the National DNC Registry are suppressed from all outbound campaigns",
                  "Numbers listed on applicable state DNC registries are suppressed where required",
                  "Barber subscribers may not direct ChairFill to contact numbers flagged through this process",
                  "DNC scrubbing records are retained as part of our compliance logs",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-[28px] py-[10px] before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem] before:top-[12px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                Barbershop operators remain responsible for ensuring their client
                lists comply with all applicable telemarketing and messaging laws
                in their jurisdiction.
              </p>
            </div>
          </section>

          {/* Section 6: How We Use Your Information */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-6">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              How We Use Your Information
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <ul className="my-4 list-none divide-y divide-white/[0.04]">
                {[
                  "Provision and delivery of the ChairFill platform and features",
                  "Processing payments and managing your subscription",
                  "Sending transactional communications (receipts, service updates, alerts)",
                  "Providing customer support and responding to inquiries",
                  "Improving platform performance and developing new features",
                  "Complying with legal obligations and enforcing our Terms of Service",
                  "Detecting and preventing fraud, abuse, or unauthorized use",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-[28px] py-[10px] before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem] before:top-[12px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                We do not sell your personal information or client contact data
                to third parties.
              </p>
            </div>
          </section>

          {/* Section 7: Data Sharing & Disclosure */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-7">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Data Sharing & Disclosure
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <ul className="my-4 list-none divide-y divide-white/[0.04]">
                {[
                  {
                    title: "Service Providers",
                    text: "Trusted vendors who assist in operating our platform (hosting, payments, analytics, AI providers), bound by confidentiality obligations",
                  },
                  {
                    title: "Legal Requirements",
                    text: "When required by law, court order, or to protect the rights and safety of ChairFill or others",
                  },
                  {
                    title: "Business Transfers",
                    text: "In connection with a merger, acquisition, or sale of assets, with prior notice to affected users",
                  },
                  {
                    title: "With Your Consent",
                    text: "Any other sharing will only occur with your explicit permission",
                  },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-[28px] py-[10px] before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem] before:top-[12px]"
                  >
                    <strong className="text-[#E5DFD5] font-bold">
                      {item.title}:
                    </strong>{" "}
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 8: Data Retention & Security */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-8">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Data Retention & Security
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <p>
                We retain your information for as long as your account is active
                or as needed to provide Services, comply with legal obligations,
                resolve disputes, and enforce our agreements.
              </p>
              <p>
                Consent and opt-out records — including client consent status,
                opt-out history, and DNC scrubbing logs — are retained
                indefinitely for compliance purposes, even after account
                termination. These records are stored in an append-only audit log
                and are not subject to deletion requests where retention is
                legally required.
              </p>
              <p>
                We implement industry-standard security measures including
                encrypted data transmission (TLS), access controls, and regular
                security reviews. No method of transmission over the internet is
                100% secure.
              </p>
              <p>
                Upon account termination or written request, we will delete or
                anonymize your personal data within 30 days, except where
                retention is required by law.
              </p>
            </div>
          </section>

          {/* Section 9: Your Rights & Choices */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-9">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              Your Rights & Choices
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <ul className="my-4 list-none divide-y divide-white/[0.04]">
                {[
                  "Access and receive a copy of your personal information",
                  "Correct inaccurate or incomplete data",
                  "Request deletion of your personal information",
                  "Opt out of non-essential communications",
                  "Data portability where technically feasible",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-[28px] py-[10px] before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[0.75rem] before:top-[12px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                To exercise any of these rights, contact us at{" "}
                <a
                  href="mailto:admin@chairfill.co"
                  className="text-[#C9A84C] border-b border-[#C9A84C]/25 hover:border-[#C9A84C] transition-colors"
                >
                  admin@chairfill.co
                </a>
                . We will respond within 30 days.
              </p>
            </div>
          </section>

          {/* Section 10: California Residents — CCPA/CPRA Rights */}
          <section className="mb-[60px] pb-[60px] border-b border-white/5 animate-fade-up section-10">
            <h2 className="flex items-center gap-[14px] text-[#E8C96A] text-[1.15rem] font-bold tracking-[0.02em] mb-5 before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[#C9A84C] before:rounded-[2px] before:shrink-0">
              California Residents — CCPA/CPRA Rights
            </h2>
            <div className="space-y-[14px] text-[#BEB8AE] leading-[1.8] font-normal text-[0.95rem]">
              <p>
                If you are a California resident, the California Consumer Privacy
                Act (CCPA) and California Privacy Rights Act (CPRA) provide you
                with additional rights regarding your personal information.
              </p>
              <p>
                <span className="text-[#E5DFD5] font-bold">Right to know.</span>{" "}
                You may request disclosure of the categories and specific pieces
                of personal information we have collected about you, the sources
                from which it was collected, the business purpose for collecting
                it, and the categories of third parties with whom we share it.
              </p>
              <p>
                <span className="text-[#E5DFD5] font-bold">Right to delete.</span>{" "}
                You may request deletion of personal information we have
                collected from you, subject to certain exceptions including where
                retention is required for legal compliance, fraud prevention, or
                completing a requested transaction.
              </p>
              <p>
                <span className="text-[#E5DFD5] font-bold">Right to correct.</span>{" "}
                You may request correction of inaccurate personal information we
                maintain about you.
              </p>
              <p>
                <span className="text-[#E5DFD5] font-bold">Right to opt out of sharing.</span>{" "}
                ChairFill does not sell personal information and does not share
                it for cross-context behavioral advertising. No opt-out action is
                required, but you may contact us to confirm.
              </p>
              <p>
                <span className="text-[#E5DFD5] font-bold">Right to limit use of sensitive personal information.</span>{" "}
                To the extent we process sensitive personal information as
                defined under CPRA, you may request that we limit its use to
                purposes permitted by law.
              </p>
              <p>
                <span className="text-[#E5DFD5] font-bold">Automated decision-making.</span>{" "}
                ChairFill uses AI to deliver platform services on behalf of
                barber subscribers. If you are a client of a barber using
                ChairFill, you may request information about how automated
                processing may affect you and opt out of AI-generated
                communications at any time by replying STOP to any message or
                contacting us at{" "}
                <a href="mailto:admin@chairfill.co" className="text-[#C9A84C] hover:underline">admin@chairfill.co</a>.
              </p>
              <p>
                <span className="text-[#E5DFD5] font-bold">Non-discrimination.</span>{" "}
                We will not discriminate against you for exercising any
                CCPA/CPRA rights.
              </p>
              <p>
                <span className="text-[#E5DFD5] font-bold">How to submit a request.</span>{" "}
                Contact <a href="mailto:admin@chairfill.co" className="text-[#C9A84C] hover:underline">admin@chairfill.co</a>. We will respond within 45
                days and may need to verify your identity before processing your
                request.
              </p>
            </div>
          </section>

          {/* Section 11: Contact Us */}
          <section className="animate-fade-up section-11">
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
                We may update this Privacy Policy from time to time. Material
                changes will be communicated via email or a notice on our
                platform. Continued use after changes constitutes acceptance of
                the updated policy.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
