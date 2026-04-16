import { Container } from "@/shared/ui";
import { ContactForm } from "@/features/contact/ui/contact-form";
import { Mail, MessageCircle } from "lucide-react";

const CONTACTS = [
  {
    icon: Mail,
    label: "Email",
    value: "info@carryme.com",
    href: "mailto:info@carryme.com",
  },
  {
    icon: MessageCircle,
    label: "Discord",
    value: "carryme",
    href: "#",
  },
];

export function ContactPage() {
  return (
    <section className="min-h-screen py-10">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Contact <span className="gradient-text">CarryMe</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-md mx-auto leading-relaxed">
            Have a question or need help? We&apos;re here for you.
          </p>
        </div>

        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 max-w-6xl mx-auto">
          <div className="rounded-[var(--radius-xl)] p-8 md:p-12 bg-bg-card/60 backdrop-blur-xl border border-border/40 shadow-[0_20px_80px_-30px_rgba(124,58,237,0.35)] hover:border-accent-primary/20 transition-colors duration-500">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
              Leave a Message
            </h2>
            <p className="text-base text-text-secondary mb-8">
              Fill in the form and we&apos;ll get back to you shortly. Our team
              usually responds within a few hours.
            </p>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-[var(--radius-xl)] p-8 bg-bg-card/60 backdrop-blur-xl border border-border/40 shadow-[var(--shadow-card)] hover:border-accent-secondary/20 transition-colors duration-500">
              <h3 className="text-xl font-bold text-text-primary mb-8">
                Get in Touch
              </h3>
              <div className="flex flex-col gap-6">
                {CONTACTS.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="flex items-center gap-5 group"
                  >
                    <div className="w-12 h-12 rounded-[var(--radius-md)] bg-accent-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-accent-primary group-hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                      <contact.icon
                        size={22}
                        className="text-accent-primary group-hover:text-white transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted font-medium mb-0.5">
                        {contact.label}
                      </p>
                      <p className="text-base font-semibold text-text-primary group-hover:text-accent-primary transition-colors duration-300">
                        {contact.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-[var(--radius-xl)] p-8 bg-bg-card/60 backdrop-blur-xl border border-border/40 shadow-[var(--shadow-card)] flex-1 hover:border-accent-primary/20 transition-colors duration-500">
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                  <Mail size={16} className="text-accent-primary" />
                </span>
                Response Time
              </h3>
              <p className="text-base text-text-secondary leading-relaxed">
                We typically respond within{" "}
                <span className="text-accent-primary font-bold">2-4 hours</span>{" "}
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
