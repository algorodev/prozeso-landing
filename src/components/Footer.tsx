"use client";

import logoBlanco from '@/assets/logo-blanco.svg'
import { LocalizedLink } from '@/i18n/LocalizedLink'
import Image from 'next/image'

const Footer = () => {
  const year = new Date().getFullYear();

  return (
	  <footer className="py-16 px-6 border-t border-border">
		  <div className="container mx-auto">
			  <div className="flex flex-col md:flex-row justify-between items-start gap-12">
				  <div className="space-y-4">
					  <LocalizedLink href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
						  <Image
							  src={logoBlanco}
							  width={120}
							  alt="Prozeso logo"
						  />
					  </LocalizedLink>
					  <p className="text-sm text-muted-foreground max-w-xs">
						  AI that listens, understands, and acts for your business.
					  </p>
				  </div>
				  <div className="flex gap-16">
					  <div>
						  <h4 className="font-medium text-sm mb-4">Product</h4>
						  <ul className="space-y-3 text-sm">
							  <li>
								  <LocalizedLink
									  href="/automations"
									  className="text-muted-foreground hover:text-foreground transition-colors"
								  >
									  Automations
								  </LocalizedLink>
							  </li>
							  <li>
								  <LocalizedLink href="/start" className="text-muted-foreground hover:text-foreground transition-colors">
									  Assessment
								  </LocalizedLink>
							  </li>
						  </ul>
					  </div>
					  <div>
						  <h4 className="font-medium text-sm mb-4">Company</h4>
						  <ul className="space-y-3 text-sm">
							  <li>
								  <LocalizedLink href="/legal/terms" className="text-muted-foreground hover:text-foreground transition-colors">
									  Terms & Conditions
								  </LocalizedLink>
							  </li>
							  <li>
								  <LocalizedLink href="/legal/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
									  Privacy policy
								  </LocalizedLink>
							  </li>
						  </ul>
					  </div>
				  </div>
			  </div>
			  <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
				  <p>{year} Prozeso. All rights reserved.</p>
				  <div className="flex gap-6">
					  <a href="https://instagram.com/prozeso.ai" className="hover:text-foreground transition-colors">
						  Instagram
					  </a>
					  <a href="https://linkedin.com/prozeso" className="hover:text-foreground transition-colors">
						  LinkedIn
					  </a>
				  </div>
			  </div>
		  </div>
	  </footer>
  );
}

export default Footer;
