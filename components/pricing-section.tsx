"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      link: "/signup",
      description: "Perfect for getting started",
      features: [
        "Up to 100 saved items",
        "Basic AI chat",
        "Public sharing",
        "Standard support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      link: "/signup",
      description: "For power users",
      features: [
        "Unlimited saved items",
        "Advanced AI chat",
        "Custom domains",
        "Priority support",
        "API access",
        "No ads",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Team",
      price: "$19.99",
      period: "/month",
      link: "mailto:bhuyanmanash2002@gmail.com",
      description: "For collaborative teams",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Shared workspaces",
        "Admin controls",
        "Usage analytics",
        "SSO authentication",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-16 px-4">
      <div className="absolute inset-0 bg-gradient-to-tl from-primary/11 via-background/50 to-secondary/10 -z-10" />
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 halloween-font">
            Simple, <span className="text-primary">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that&apos;s right for you. All plans include a
            14-day free trial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`bg-card border ${
                plan.popular ? "border-primary" : "border-border/50"
              } rounded-xl overflow-hidden transition-all duration-300 hover:bg-primary/10 hover:border-primary hover:shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 halloween-font">
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.link}
                  className="block"
                  target={`${plan.name === "Team" ? "_blank" : ""}`}
                >
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className={`w-full ${plan.popular ? "glow" : ""}`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-2">
            Special Opening Offer: Use code{" "}
            <span className="text-primary font-bold">
              SPOOKY{new Date().getFullYear() + 1}
            </span>{" "}
            for 31% off any annual plan!
          </p>
          <p className="text-sm text-muted-foreground">
            Offer valid until April 31, {new Date().getFullYear() + 1}. Cannot
            be combined with other offers.
          </p>
        </div>
      </div>
    </section>
  );
}
