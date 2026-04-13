import { Container } from "@/shared/ui";
import { ContactForm } from "@/features/contact/ui/contact-form";
import { Mail, MessageCircle } from "lucide-react";

const CONTACTS = [
  {
    icon: Mail,
    label: "Email",
    value: "info@boostpro.com",
    href: "mailto:info@boostpro.com",
  },
  {
    icon: MessageCircle,
    label: "Discord",
    value: "boostpro",
    href: "#",
  },
];

export function ContactPage() {
  return (
    <section className="min-h-screen pt-[var(--header-height)]">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Contact <span className="gradient-text">BoostPro</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-md mx-auto leading-relaxed">
            Have a question or need help? We&apos;re here for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="rounded-[var(--radius-lg)] p-8 bg-bg-card/60 backdrop-blur-xl border border-border/40 shadow-[0_20px_80px_-30px_rgba(124,58,237,0.35)]">
            <h2 className="text-xl font-semibold text-text-primary mb-1">
              Leave a Message
            </h2>
            <p className="text-sm text-text-secondary mb-2">
              Fill in the form and we&apos;ll get back to you shortly.
            </p>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-[var(--radius-lg)] p-8 bg-bg-card/60 backdrop-blur-xl border border-border/40 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-semibold text-text-primary mb-6">
                Get in Touch
              </h3>
              <div className="flex flex-col gap-5">
                {CONTACTS.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-[var(--radius-md)] bg-accent-primary/15 flex items-center justify-center transition-colors duration-300 group-hover:bg-accent-primary/25">
                      <contact.icon size={20} className="text-accent-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">{contact.label}</p>
                      <p className="text-sm font-medium text-text-primary group-hover:text-accent-primary transition-colors duration-300">
                        {contact.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-[var(--radius-lg)] p-8 bg-bg-card/60 backdrop-blur-xl border border-border/40 shadow-[var(--shadow-card)] flex-1">
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Response Time
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                We typically respond within{" "}
                <span className="text-accent-primary font-medium">
                  2-4 hours
                </span>{" "}
                during business hours. For urgent order issues, reach us on
                Discord for instant support.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
