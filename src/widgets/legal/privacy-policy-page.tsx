"use client";

import { Container, SectionTitle, FadeIn } from "@/shared/ui";

export function PrivacyPolicyPage() {
  return (
    <section className="min-h-screen py-20 md:py-28 bg-bg-primary">
      <Container>
        <FadeIn>
          <SectionTitle
            title="Privacy Policy"
            subtitle="Last updated: April 16, 2026"
            centered
          />
        </FadeIn>

        <div className="max-w-4xl mx-auto mt-12">
          <FadeIn delay={0.1}>
            <div className="bg-bg-card/30 border border-border rounded-[var(--radius-lg)] p-6 md:p-10 backdrop-blur-sm shadow-xl">
              <div className="space-y-10 text-text-secondary leading-relaxed">
                {/* Section 1 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-primary/20 text-accent-primary flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    Our Company and Introduction
                  </h2>
                  <div className="space-y-4">
                    <p>
                      Our Company is CarryMe (&quot;Company&quot;,
                      &quot;we&quot;, &quot;us&quot; or &quot;our&quot;), and
                      this Privacy Policy is between our Company and you, the
                      customer and user of our website address:{" "}
                      <span className="text-accent-primary font-medium">
                        carryme.com
                      </span>
                    </p>
                    <p>
                      We understand the significance of your privacy. This
                      Privacy Policy explains what personal data we collect, how
                      we use it, with whom we share it, and the choices you may
                      have.
                    </p>
                  </div>
                </section>

                {/* Section 2 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-primary/20 text-accent-primary flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    What Personal Data we collect and how we use it
                  </h2>
                  <div className="space-y-4">
                    <p>
                      Depending on how you use the Website and our services, we
                      may obtain the following personal data:
                    </p>
                    <ul className="grid gap-3 list-none">
                      {[
                        {
                          title: "Account and profile data",
                          desc: "login/username, email address, password (stored in hashed form).",
                        },
                        {
                          title: "Order and transaction data",
                          desc: "order history and order-related communications (including specific game IDs or character names needed for boosting).",
                        },
                        {
                          title: "Communications",
                          desc: "messages, screenshots, and files you provide through your personal dashboard or chat.",
                        },
                        {
                          title: "Technical data",
                          desc: "approximate location derived from IP address, device/browser information, and usage patterns via cookies.",
                        },
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          className="flex gap-3 p-3 rounded-lg bg-bg-primary/40 border border-border/50"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-2 flex-shrink-0" />
                          <div>
                            <strong className="text-text-primary block text-sm mb-1">
                              {item.title}
                            </strong>
                            <p className="text-sm opacity-80">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6">We use this information to:</p>
                    <ul className="flex flex-col gap-2 pl-4 border-l-2 border-accent-primary/20">
                      <li>
                        Provide access to the CarryMe Members Area and execute
                        your orders.
                      </li>
                      <li>
                        Communicate with you regarding support requests and
                        order status.
                      </li>
                      <li>
                        Maintain website security and prevent fraudulent
                        activities.
                      </li>
                      <li>Comply with legal obligations.</li>
                    </ul>
                  </div>
                </section>

                {/* Section 3 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-primary/20 text-accent-primary flex items-center justify-center text-sm font-bold">
                      3
                    </span>
                    Where do we store your personal data?
                  </h2>
                  <p>
                    Your personal data may be stored using reliable cloud
                    providers. We take reasonable measures to ensure that any
                    data stored or distributed is protected according to
                    industry standards.
                  </p>
                </section>

                {/* Section 4 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-primary/20 text-accent-primary flex items-center justify-center text-sm font-bold">
                      4
                    </span>
                    Protection of Personal Data
                  </h2>
                  <div className="space-y-4">
                    <p>
                      We implement technical and organisational measures
                      designed to protect your information. However, no method
                      of transmission over the internet is 100% secure. You use
                      the Website at your own risk and are responsible for the
                      security of your account credentials.
                    </p>
                    <p className="px-4 py-3 bg-accent-secondary/10 border-l-4 border-accent-secondary rounded-r-lg text-sm italic">
                      CarryMe acts as a Data Controller for information used to
                      manage accounts and orders, and as a Data Processor when
                      following specific customer instructions during the
                      boosting process, in accordance with the GDPR.
                    </p>
                  </div>
                </section>

                {/* Section 5 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-primary/20 text-accent-primary flex items-center justify-center text-sm font-bold">
                      5
                    </span>
                    Sharing your Personal Data
                  </h2>
                  <div className="space-y-4">
                    <p>
                      Your data is accessible only to authorised employees on a
                      need-to-know basis.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex gap-4">
                        <span className="text-accent-secondary font-bold whitespace-nowrap">
                          Service Providers:
                        </span>
                        <span>
                          We may share data with hosting, infrastructure, and
                          analytics providers (like Google Analytics) only to
                          the extent necessary.
                        </span>
                      </li>
                      <li className="flex gap-4">
                        <span className="text-accent-secondary font-bold whitespace-nowrap">
                          Payment Processing:
                        </span>
                        <span>
                          We use secure third-party payment processors (Stripe,
                          etc). We do not store your full card details.
                        </span>
                      </li>
                      <li className="flex gap-4">
                        <span className="text-accent-secondary font-bold whitespace-nowrap">
                          Legal Requirements:
                        </span>
                        <span>
                          We may disclose data if required by court order or to
                          protect the safety and rights of CarryMe and its
                          users.
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Section 6 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-primary/20 text-accent-primary flex items-center justify-center text-sm font-bold">
                      6
                    </span>
                    Cookies and Analytics
                  </h2>
                  <p>
                    We use cookies to analyze website traffic and improve your
                    experience. We may use tools like Google Analytics to
                    understand how users interact with our site. You can manage
                    cookie preferences through your browser settings or our
                    cookie banner.
                  </p>
                </section>

                {/* Section 7 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-primary/20 text-accent-primary flex items-center justify-center text-sm font-bold">
                      7
                    </span>
                    Hyperlinks
                  </h2>
                  <p>
                    Our Website may contain links to third-party services such
                    as <span className="text-accent-secondary">Discord</span>,{" "}
                    <span className="text-accent-secondary">Mail</span>, and{" "}
                    <span className="text-accent-secondary">
                      Payment Gateways
                    </span>
                    . We are not responsible for the privacy practices or
                    content of these third-party sites. Please read their
                    respective policies carefully.
                  </p>
                </section>

                {/* Section 8 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-primary/20 text-accent-primary flex items-center justify-center text-sm font-bold">
                      8
                    </span>
                    Children
                  </h2>
                  <p>
                    To use CarryMe services, you must satisfy the minimum age
                    requirement of the selected game (e.g., CS2, Faceit). We do
                    not knowingly collect data from individuals below this age.
                  </p>
                </section>

                {/* Section 9 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-primary/20 text-accent-primary flex items-center justify-center text-sm font-bold">
                      9
                    </span>
                    Your Rights
                  </h2>
                  <p>
                    Depending on your location, you may have the right to
                    access, correct, delete, or restrict the processing of your
                    personal data. To exercise these rights, please contact us
                    using the details below.
                  </p>
                </section>

                {/* Section 10 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-primary/20 text-accent-primary flex items-center justify-center text-sm font-bold">
                      10
                    </span>
                    Contact Details
                  </h2>
                  <div className="p-4 bg-bg-primary/60 border border-border/50 rounded-xl flex flex-col sm:flex-row gap-6">
                    <div>
                      <span className="text-xs text-text-muted uppercase font-bold block mb-1">
                        Email Support
                      </span>
                      <a
                        href="mailto:carryme.support@gmail.com"
                        className="text-accent-primary hover:underline font-medium"
                      >
                        carryme.support@gmail.com
                      </a>
                    </div>
                    <div>
                      <span className="text-xs text-text-muted uppercase font-bold block mb-1">
                        Discord Community
                      </span>
                      <a
                        href="https://discord.gg/23w7QQuB"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-secondary hover:underline font-medium"
                      >
                        Join Discord Server
                      </a>
                    </div>
                  </div>
                </section>

                {/* Section 11 */}
                <section className="pt-6 border-t border-border/50">
                  <h2 className="text-lg md:text-xl font-bold text-text-primary mb-3">
                    11. Changes to Privacy Policy
                  </h2>
                  <p className="text-sm">
                    CarryMe reserves the right to modify this Privacy Policy at
                    any time. We will notify users of significant changes via
                    the Website or email.
                  </p>
                </section>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
