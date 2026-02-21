import Footer from "@/components/custom/footer";
import SectionHeading from "@/components/custom/section-heading";

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description:
      "Perfect for individuals exploring the platform and getting started with content hiring.",
    features: [
      "Browse talent profiles",
      "Up to 3 job postings",
      "Basic search filters",
      "Community support",
      "Standard visibility",
    ],
    cta: "Get Started",
    highlighted: false,
    comingSoon: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description:
      "For growing teams and creators who need advanced features and priority access to talent.",
    features: [
      "Everything in Starter",
      "Unlimited job postings",
      "Advanced search & filters",
      "Priority support",
      "Featured job listings",
      "Analytics dashboard",
      "Direct messaging",
    ],
    cta: "Coming Soon",
    highlighted: true,
    comingSoon: true,
  },
  {
    name: "Enterprise",
    price: "$79",
    period: "/mo",
    description:
      "For agencies and large teams with custom requirements and dedicated account management.",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom branding",
      "API access",
      "Team collaboration tools",
      "Bulk hiring tools",
      "Premium placement",
      "SLA guarantee",
    ],
    cta: "Coming Soon",
    highlighted: false,
    comingSoon: true,
  },
];

export default function PricingPage() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-[#0B051D]">
      {/* Hero / Header */}
      <section className="flex flex-col items-center w-full pt-20 pb-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#4A00F6]/15 rounded-full blur-[120px]" />
        <SectionHeading
          mainHeading="Simple, Transparent Pricing"
          subHeading="Choose the plan that fits your hiring needs. Start free and scale as you grow."
        />
      </section>

      {/* Pricing Cards */}
      <section className="w-full flex justify-center px-4 pb-24 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col rounded-2xl p-[1px] transition-all duration-300 ${
                tier.comingSoon ? "opacity-50 pointer-events-none" : ""
              } ${
                tier.highlighted
                  ? "bg-gradient-to-b from-[#7E5BFF] via-[#4A00F6]/40 to-transparent"
                  : "bg-gradient-to-b from-[#363151] via-[#26176A]/30 to-transparent"
              }`}
            >
              {/* Coming Soon badge */}
              {tier.comingSoon && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <div className="px-4 py-1 rounded-full bg-gradient-to-r from-[#7E5BFF] to-[#4A00F6] text-white text-xs font-semibold tracking-wide shadow-[0_0_20px_rgba(126,91,255,0.4)]">
                    Coming Soon
                  </div>
                </div>
              )}

              {/* Popular badge */}
              {tier.highlighted && !tier.comingSoon && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <div className="px-4 py-1 rounded-full bg-gradient-to-r from-[#F0EEBD] via-[#F17945] to-[#7431E8] text-black text-xs font-semibold tracking-wide">
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`flex flex-col h-full rounded-2xl px-7 py-8 ${
                  tier.highlighted ? "bg-[#110D27]" : "bg-[#0F0B28]"
                }`}
              >
                {/* Tier name */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      tier.highlighted ? "bg-[#7E5BFF]" : "bg-[#4A00F6]/60"
                    }`}
                  />
                  <span className="text-sm font-medium text-[#9DA7B3] uppercase tracking-widest">
                    {tier.name}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-2">
                  <span
                    className={`text-5xl font-bold ${
                      tier.highlighted
                        ? "bg-gradient-to-r from-[#F0EEBD] via-[#F17945] to-[#7431E8] bg-clip-text text-transparent"
                        : "text-white"
                    }`}
                  >
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-[#9DA7B3] text-base font-normal">
                      {tier.period}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm font-normal text-[#9DA7B3] leading-[22px] mb-6">
                  {tier.description}
                </p>

                {/* Divider */}
                <div className="h-px bg-[#241B36]/90 mb-6" />

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 flex-grow">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="flex-shrink-0"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="7.5"
                          stroke={tier.highlighted ? "#7E5BFF" : "#363151"}
                          strokeWidth="1"
                          fill={tier.highlighted ? "#7E5BFF15" : "transparent"}
                        />
                        <path
                          d="M5 8L7 10L11 6"
                          stroke={tier.highlighted ? "#A78BFA" : "#9DA7B3"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-sm text-[#C4C5C8] font-normal">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    tier.comingSoon
                      ? "bg-[#1A1243] text-[#9DA7B3] border border-[#363151] cursor-not-allowed"
                      : tier.highlighted
                        ? "bg-gradient-to-r from-[#7E5BFF] to-[#4A00F6] text-white hover:shadow-[0_0_24px_rgba(126,91,255,0.35)] hover:scale-[1.02]"
                        : "bg-white text-black hover:bg-gray-100 hover:scale-[1.02]"
                  }`}
                  disabled={tier.comingSoon}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ-like blurb */}
      <section className="w-full flex flex-col items-center pb-16 px-4">
        <div className="max-w-2xl w-full bg-[#0F0B28] border border-[#26176A] rounded-2xl px-8 py-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-[#4A00F6]/10 rounded-full blur-[60px]" />
          <h3 className="text-xl font-semibold text-white relative z-10 mb-2">
            Need something custom?
          </h3>
          <p className="text-sm text-[#9DA7B3] relative z-10 mb-5">
            We&apos;re working on more plans tailored for large-scale agencies
            and enterprise needs. Reach out and we&apos;ll craft a solution
            together.
          </p>
          <a
            href="/#footer"
            className="inline-block px-8 py-2.5 rounded-full bg-[#1A1243] border border-[#363151] text-sm font-medium text-[#C4C5C8] hover:border-[#7E5BFF]/40 hover:text-white transition-all duration-200"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
