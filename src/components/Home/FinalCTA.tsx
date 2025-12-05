"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRight, Phone } from 'lucide-react'

const FinalCTA = () => {
  return (
	  <section className="relative py-32 px-6 border-t border-border overflow-hidden bg-background text-foreground">
		  <div className="container mx-auto text-center max-w-2xl relative z-10">
			  <h2 className="font-sora text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-balance">
				  Ready to <span className="text-primary">automate</span>?
			  </h2>
			  <p className="text-lg text-foreground/70 mb-12 leading-relaxed">
				  Start your free assessment today. See exactly which automations will transform your business.
			  </p>
			  <Button size="lg">
				  <Phone className="w-5 h-5" />
				  Start Now
			  </Button>
		  </div>
	  </section>
  );
};

export default FinalCTA;
