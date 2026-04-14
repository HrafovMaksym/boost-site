"use client";

import { Container, SectionTitle } from "@/shared/ui";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Jake M.",
    game: "CS2",
    rating: 5,
    avatar: "JM",
    rank: "Silver → Global Elite",
    text: "Insane speed. My account went from Silver to Global Elite in 3 days. Support was super responsive the entire time. Will definitely use again.",
  },
  {
    name: "Alex R.",
    game: "Valorant",
    rating: 5,
    avatar: "AR",
    rank: "Iron → Diamond",
    text: "Was stuck in Iron for months. These guys got me to Diamond and even gave me tips on how to stay there. Best boosting service I've used.",
  },
  {
    name: "Chris T.",
    game: "Dota 2",
    rating: 5,
    avatar: "CT",
    rank: "2K → 5K MMR",
    text: "Smooth process from start to finish. The booster communicated well and I could track everything live. My MMR jumped from 2K to 5K.",
  },
  {
    name: "Daniel K.",
    game: "CS2",
    rating: 5,
    avatar: "DK",
    rank: "Gold Nova → Faceit 10",
    text: "Tried a few services before — this one is by far the best. Fast, secure, and actually affordable. The Discord support is a huge plus.",
  },
  {
    name: "Sam W.",
    game: "Valorant",
    rating: 4,
    avatar: "SW",
    rank: "Silver → Ascendant",
    text: "Great experience overall. The team was professional and the boost was done way faster than expected. Highly recommend to anyone who needs ranking up.",
  },
  {
    name: "Ryan P.",
    game: "Dota 2",
    rating: 5,
    avatar: "RP",
    rank: "3K → 6K MMR",
    text: "The live tracking feature is amazing. I watched my MMR climb in real time. Zero issues with account security. These guys know what they're doing.",
  },
];

const gameColors: Record<string, string> = {
  CS2: "text-[#f5a623]",
  Valorant: "text-[#ff4655]",
  "Dota 2": "text-[#e44d2e]",
};

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-bg-secondary overflow-hidden">
      <Container>
        <SectionTitle
          title="What Players Say"
          subtitle="Trusted by thousands of gamers worldwide. Here's what our customers think."
        />
      </Container>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletClass: "testimonial-bullet",
            bulletActiveClass: "testimonial-bullet-active",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.name}>
              <div className="h-full p-6 md:p-8 rounded-[var(--radius-lg)] bg-bg-card border border-border hover:border-border-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] flex flex-col">
                {/* Header: avatar + info */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-text-primary text-base truncate">
                      {t.name}
                    </div>
                    <div className={`text-xs font-medium ${gameColors[t.game] ?? "text-text-muted"}`}>
                      {t.game}
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < t.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-text-muted"
                      }
                    />
                  ))}
                </div>

                {/* Rank badge */}
                <div className="inline-flex self-start px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-text-secondary mb-4">
                  {t.rank}
                </div>

                {/* Text */}
                <p className="text-text-secondary text-sm leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
