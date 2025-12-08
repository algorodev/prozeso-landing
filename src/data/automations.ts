import {
	Calendar,
	ClipboardList,
	Gift,
	MessageSquare,
	Phone,
	PieChart,
	RotateCw,
	Star,
	TrendingUp,
	Users,
	Zap,
} from 'lucide-react'

export const AUTOMATIONS = [
	{
		id: 'receptionist-ai',
		title: 'Receptionist AI',
		description: 'An always-on AI receptionist that answers calls and messages, gives information, and books, modifies or cancels reservations and appointments.',
		icon: Phone,
		categories: ['ai-agent', 'phone-msg'],
		verticals: ['Hair & Beauty', 'Restaurants', 'Clinics', 'Hotels', 'Real Estate'],
		metrics: ['+45% bookings recovered', '24/7 coverage', '60% faster first response'],
	},
	{
		id: 'missed-call-auto-callback',
		title: 'Missed Call Auto Callback',
		description: 'Automatically calls back or messages missed callers so you recover bookings and leads instead of losing them.',
		icon: RotateCw,
		category: ['lead-recovery', 'phone-msg'],
		verticals: ['Hair & Beauty', 'Restaurants', 'Clinics', 'Hotels', 'Real Estate'],
		metrics: ['+30% lead recovery', 'Callback < 60s', '+18% conversion after follow-up'],
	},
	{
		id: 'appointment-reminder',
		title: 'Appointment Reminder',
		description: 'Automatic reminders via SMS, WhatsApp, email or calls before an appointment, with confirmation and one-click reschedule or cancel.',
		icon: Calendar,
		category: ['retention', 'no-show-reduction'],
		verticals: ['Hair & Beauty', 'Restaurants', 'Clinics', 'Hotels', 'Real Estate'],
		metrics: ['-32% no-shows', '95% delivery rate', '1-click reschedule'],
	},
	{
		id: 'smart-pre-check-in',
		title: 'Smart Pre-Check-In',
		description: 'Pre-visit workflow to collect data, forms and preferences and send tailored instructions before the client arrives.',
		icon: ClipboardList,
		category: ['pre-visit', 'data-collection', 'experience-personalization'],
		verticals: ['Hair & Beauty', 'Restaurants', 'Clinics', 'Hotels', 'Real Estate'],
		metrics: ['70% forms completed pre-visit', '-25% front-desk time', 'Personalized instructions'],
	},
	{
		id: 'no-show-recovery-fee-capture',
		title: 'No-Show Recovery & Fee Capture',
		description: 'When a client doesn’t show up, automatically follows up to reschedule, charge a fee or deposit when applicable, and log the event.',
		icon: PieChart,
		category: ['no-show-management', 'revenue-protection'],
		verticals: ['Hair & Beauty', 'Restaurants', 'Clinics', 'Hotels', 'Real Estate'],
		metrics: ['-18% revenue leakage', '40% rescheduled after outreach', 'Automated fee collection'],
	},
	{
		id: 'smart-waitlist-cancellation-filler',
		title: 'Smart Waitlist & Cancellation Filler',
		description: 'Uses cancellations or empty slots to automatically reach out to a waitlist or recent customers and fill those gaps.',
		icon: Zap,
		category: ['revenue-optimization', 'capacity-management'],
		verticals: ['Hair & Beauty', 'Restaurants', 'Clinics', 'Hotels', 'Real Estate'],
		metrics: ['82% empty slots refilled', '+12% revenue per seat/hour', 'Instant outreach to waitlist'],
	},
	{
		id: 'abandoned-booking-follow-up',
		title: 'Abandoned Booking Follow-Up',
		description: 'If someone starts but doesn’t finish a booking or request, this workflow reaches out to help them complete it.',
		icon: MessageSquare,
		category: ['conversion', 'lead-recovery'],
		verticals: ['Hair & Beauty', 'Restaurants', 'Clinics', 'Hotels', 'Real Estate'],
		metrics: ['+22% checkout completion', '< 5 min follow-up', 'Multi-channel nudges'],
	},
	{
		id: 'reactivation-recalls',
		title: 'Reactivation & Recalls',
		description: 'Brings back inactive customers and triggers periodic recalls based on time since last visit or treatment schedule.',
		icon: RotateCw,
		category: ['retention', 'lifecycle-management'],
		verticals: ['Hair & Beauty', 'Restaurants', 'Clinics', 'Hotels', 'Real Estate'],
		metrics: ['16% reactivation rate', '+9% customer LTV', 'Automated recall schedules'],
	},
	{
		id: 'review-booster',
		title: 'Review Booster',
		description: 'After a positive experience, asks for a review and routes happy clients to Google/portals while handling negative feedback privately.',
		icon: Star,
		category: ['reputation', 'reviews'],
		verticals: ['Hair & Beauty', 'Restaurants', 'Clinics', 'Hotels', 'Real Estate'],
		metrics: ['3x reviews per month', '+0.4 average rating', 'Smart review routing'],
	},
	{
		id: 'billing-and-invoice',
		title: 'Billing & Invoice',
		description: 'Automates sending payment links, capturing deposits, and delivering invoices, integrated with your billing system.',
		icon: ClipboardList,
		category: ['billing', 'payments'],
		verticals: ['Hair & Beauty', 'Restaurants', 'Clinics', 'Hotels', 'Real Estate'],
		metrics: ['2x faster payments', '-35% overdue invoices', 'Secure payment links'],
	},
	{
		id: 'in-stay-concierge-upsell',
		title: 'In-Stay Concierge & Upsell',
		description: 'A virtual concierge for guests currently staying at the property: answers questions, handles requests and proposes upsells.',
		icon: Gift,
		category: ['guest-experience', 'concierge', 'upsell'],
		verticals: ['Hotels'],
		metrics: ['+14% ancillary revenue', '30% faster response time', '24/7 virtual concierge'],
	},
	{
		id: 'group-event-inquiry-handler',
		title: 'Group & Event Inquiry Handler',
		description: 'Specialised workflow for handling group and event requests (weddings, conferences, corporate stays), qualifying and structuring them for sales.',
		icon: Users,
		category: ['sales-enablement', 'lead-qualification', 'event-groups'],
		verticals: ['Restaurants', 'Hotels'],
		metrics: ['2x qualified RFPs', '-40% time-to-first-response', 'Structured briefs for sales'],
	},
	{
		id: 'portal-lead-qualification-routing',
		title: 'Portal Lead Qualification & Routing',
		description: 'Handles leads from property portals, qualifies them and routes them to the right agent/property with booked viewings when possible.',
		icon: TrendingUp,
		category: ['lead-management', 'qualification', 'routing'],
		verticals: ['Real Estate'],
		metrics: ['50% faster SLA', '+17% viewings booked', 'Automatic agent routing'],
	},
	{
		id: 'viewing-follow-up-offer-collector',
		title: 'Viewing Follow-Up & Offer Collector',
		description: 'After a property viewing, follows up to gather feedback, check interest level, and collect offers or applications.',
		icon: MessageSquare,
		category: ['lead-management', 'feedback', 'post-viewing'],
		verticals: ['Real Estate'],
		metrics: ['28% more offers collected', '< 24h feedback turnaround', 'Nurtures warm interest'],
	},
	{
		id: 'tenant-onboarding-docs-collection',
		title: 'Tenant Onboarding & Docs Collection',
		description: 'Orchestrates the journey from “accepted tenant” to “moved in”: documents, contract, payments and key handover instructions.',
		icon: ClipboardList,
		category: ['operations', 'onboarding', 'data-collection'],
		verticals: ['Real Estate'],
		metrics: ['-50% admin time', '95% document completion', 'Payment links & e-sign ready'],
	},
]

export const CATEGORIES = [
	{ id: 'all', label: 'Category' },
	{ id: 'ai-agent', label: 'AI Agent' },
	{ id: 'phone-msg', label: 'Phone & Messaging Automation' },
	{ id: 'lead-recovery', label: 'Lead Recovery' },
	{ id: 'retention', label: 'Retention' },
	{ id: 'no-show-reduction', label: 'No-Show Reduction' },
	{ id: 'pre-visit', label: 'Pre-Visit' },
	{ id: 'data-collection', label: 'Data Collection' },
	{ id: 'experience-personalization', label: 'Experience Personalization' },
	{ id: 'no-show-management', label: 'No-Show Management' },
	{ id: 'revenue-protection', label: 'Revenue Protection' },
	{ id: 'revenue-optimization', label: 'Revenue Optimization' },
	{ id: 'capacity-management', label: 'Capacity Management' },
	{ id: 'conversion', label: 'Conversion' },
	{ id: 'lifecycle-management', label: 'Lifecycle Management' },
	{ id: 'reputation', label: 'Reputation' },
	{ id: 'reviews', label: 'Reviews' },
	{ id: 'billing', label: 'Billing' },
	{ id: 'payments', label: 'Payments' },
	{ id: 'guest-experience', label: 'Guest Experience' },
	{ id: 'concierge', label: 'Concierge' },
	{ id: 'upsell', label: 'Upsell' },
	{ id: 'sales-enablement', label: 'Sales Enablement' },
	{ id: 'lead-qualification', label: 'Lead Qualification' },
	{ id: 'events-groups', label: 'Events & Groups' },
	{ id: 'lead-management', label: 'Lead Management' },
	{ id: 'qualification', label: 'Qualification' },
	{ id: 'routing', label: 'Routing' },
	{ id: 'feedback', label: 'Feedback' },
	{ id: 'post-viewing', label: 'Post-Viewing' },
	{ id: 'operations', label: 'Operations' },
	{ id: 'onboarding', label: 'Onboarding' },
]

export const AUTOMATIONS_DETAILS = [
	{
		name: "Receptionist AI",
		description: "Your 24/7 AI-powered answering service",
		headline: "Never Miss Another Call",
		subheading:
			"Your AI Receptionist answers every call, books appointments, answers FAQs, and qualifies leads—24/7, in any language.",
		slug: "receptionist-ai",
		problem:
			"Your phone rings but you're helping customers. Voicemail piles up. Calls go to competitors. You lose 40-50% of inbound leads simply because nobody picked up.",
		solution:
			"Your AI receptionist picks up every call instantly. It greets by name, understands the customer's need, answers FAQs, and books appointments directly into your calendar.",
		outcomes: [
			"Capture 100% of inbound calls, 24/7",
			"Book appointments directly—no manual follow-up needed",
			"Answer FAQs in 100+ languages",
			"Qualify leads before they reach your team",
			"Track every conversation for compliance & improvement",
		],
		tools: ["ElevenLabs", "Twilio", "Calendar APIs", "CRM Integration"],
		verticals: [
			{ name: "Hair & Beauty", slug: "hair-and-beauty" },
			{ name: "Restaurants", slug: "restaurants" },
			{ name: "Clinics & Health", slug: "clinics-and-health" },
			{ name: "Hotels", slug: "hotels" },
			{ name: "Real Estate", slug: "real-estate" },
		],
		examples: [
			{
				title: "Hair Salon Scenario",
				scenario:
					'Customer calls a busy salon at 3 PM. All stylists are with clients. Instead of voicemail, the AI receptionist answers: "Hi Sarah! Welcome to Bella\'s Salon. How can I help you today?"',
				result:
					"Customer books appointment for Saturday. AI confirms and sends SMS reminder. Revenue captured that would have been lost.",
			},
			{
				title: "Restaurant Scenario",
				scenario:
					"Party of 6 calls during dinner service. Host is busy. AI picks up, checks availability, offers tables, and books the reservation.",
				result: "Table filled. Customer satisfaction high. Restaurant never stops answering phones.",
			},
			{
				title: "Real Estate Scenario",
				scenario:
					"Hot lead calls when agent is showing property. Normally goes to voicemail. Instead, AI qualifies them, answers property questions, and books showing.",
				result: "Deal moves forward immediately. No delay. No lost lead. +50% faster conversion.",
			},
			{
				title: "Clinic Scenario",
				scenario:
					"Patient calls to ask about availability for a same‑week appointment and insurance coverage. AI answers FAQs and books a slot.",
				result: "Patient scheduled instantly, fewer front‑desk interruptions.",
			},
			{
				title: "Hotel Scenario",
				scenario:
					"Guest calls after hours to ask about late check‑in and parking. AI provides details and adds the reservation note.",
				result: "Guest reassured, staff sleeps, expectations set."
			},
		],
		metrics: [
			{ stat: "45", suffix: "%", description: "Bookings from captured calls" },
			{ stat: "24", suffix: "/7", description: "Always available, never tired" },
			{ stat: "100", suffix: "+", description: "Languages supported" },
		],
		features: [
			{
				title: "Natural Conversation",
				description: "Sounds like a real person. Understands context, asks follow-ups, never feels robotic.",
			},
			{
				title: "Multi-Language Support",
				description:
					"Detect or customer-selected language. Catalan, Valencian, Spanish, English, Arabic, Mandarin—all supported.",
			},
			{
				title: "Direct Calendar Integration",
				description:
					"Checks real-time availability and books directly. Syncs with Google Calendar, Outlook, or your booking software.",
			},
			{
				title: "Smart Qualification",
				description: "Asks the right questions to qualify leads. Transfers hot prospects to your team immediately.",
			},
			{
				title: "FAQ Knowledge Base",
				description: "Answers common questions about hours, pricing, services, policies without human intervention.",
			},
			{
				title: "After-Hours Handling",
				description: "Can take emergency calls, store messages, or route to on-call staff based on urgency.",
			},
		],
		faqs: [
			{
				question: "Will customers know they're talking to an AI?",
				answer:
					"The experience is seamless. Customers don't need to know—they're helped, booked, and happy. Transparency is optional.",
			},
			{
				question: "What if the customer wants a human?",
				answer:
					"Instant warm transfer. The AI shares the full conversation context with your team. Human never starts from zero.",
			},
			{
				question: "How does it learn about my business?",
				answer:
					"We train the AI with your specific business info: hours, services, pricing, policies, team names, common FAQs. Setup takes 30 minutes.",
			},
			{
				question: "Does it work with my existing phone system?",
				answer:
					"Yes. We integrate with Twilio, VoIP, traditional phone lines—any setup. Calls route through the AI then to you.",
			},
			{
				question: "What about GDPR and HIPAA compliance?",
				answer:
					"Full compliance. All calls encrypted, stored securely, accessible only to authorized staff. Regular audits ensure standards.",
			},
			{
				question: "Can I customize what the AI says?",
				answer:
					"Complete control. You write scripts, define responses, set tone. We train the AI to sound like your business.",
			},
		],
	},
	{
		name: "Missed Call Auto Callback",
		description: "Automatically recover missed calls with instant callbacks and smart messaging.",
		headline: "Turn Missed Calls Into Bookings",
		subheading:
			"When you miss a call, the workflow calls back or messages immediately, helps the customer, and books if relevant.",
		slug: "missed-call-auto-callback",
		problem:
			"Missed calls are missed revenue. Most callers never leave a voicemail and won’t call again.",
		solution:
			"Trigger an instant callback or SMS/WhatsApp message, identify intent, answer questions, and complete the booking.",
		outcomes: [
			"+30% lead recovery",
			"Under 60s automatic follow-up",
			"Reduce manual callbacks",
			"Protect reputation with fast responses",
		],
		tools: ["Twilio", "WhatsApp Business API", "Calendar APIs", "CRM"],
		verticals: [
			{ name: "Hair & Beauty", slug: "hair-and-beauty" },
			{ name: "Restaurants", slug: "restaurants" },
			{ name: "Clinics & Health", slug: "clinics-and-health" },
			{ name: "Hotels", slug: "hotels" },
			{ name: "Real Estate", slug: "real-estate" },
		],
		examples: [
			{
				title: "Clinic Missed Call",
				scenario:
					"Clinic misses a call during lunch. System texts within 20s, offers to book. Patient confirms a slot.",
				result: "+1 booking recovered, no staff effort.",
			},
			{
				title: "Salon Callback",
				scenario: "Hair salon misses a call during color service; auto‑text offers to rebook with preferred stylist.",
				result: "Appointment saved within 2 minutes.",
			},
			{
				title: "Restaurant Callback",
				scenario: "Dinner rush missed call; system calls back and books a table for 4 at 21:30.",
				result: "Covers a cancellation and keeps the table filled.",
			},
			{
				title: "Hotel Inquiry Recovery",
				scenario: "Front desk misses international call; WhatsApp auto‑reply answers and secures a two‑night stay.",
				result: "Direct booking captured without OTA fees.",
			},
			{
				title: "Real Estate Lead Recovery",
				scenario: "Agent misses a new buyer call; workflow texts, qualifies budget/timing, and books a viewing.",
				result: "Hot lead retained and scheduled.",
			},
		],
		metrics: [
			{ stat: "30", suffix: "%", description: "Lead recovery uplift" },
			{ stat: "60", suffix: "s", description: "Typical follow-up time" },
			{ stat: "18", suffix: "%", description: "Conversion boost post follow-up" },
		],
		features: [
			{ title: "Instant Trigger", description: "Detects missed calls and reacts immediately." },
			{ title: "Smart Channel", description: "Decides whether to call or message based on context and preferences." },
			{ title: "Auto-Booking", description: "Books, reschedules, or cancels directly in your calendar." },
		],
		faqs: [
			{ question: "Can it avoid duplicate callbacks?", answer: "Yes, it deduplicates and rate-limits per caller." },
			{ question: "What if voicemail exists?", answer: "It can parse voicemails and respond accordingly." },
		],
	},
	{
		name: "Appointment Reminder",
		description: "Automated multi-channel reminders with confirmations and easy rescheduling.",
		headline: "Slash No‑Shows",
		subheading:
			"Send timely reminders via SMS, WhatsApp, email, or voice with 1‑tap confirm/reschedule.",
		slug: "appointment-reminder",
		problem:
			"No‑shows waste time and revenue. Manual reminders are error‑prone and inconsistent.",
		solution:
			"Automate reminders with smart timing, confirmations, and frictionless rescheduling across channels.",
		outcomes: [
			"Reduce no‑shows by 30%+",
			"Improve schedule utilization",
			"Fewer manual calls and texts",
		],
		tools: ["Twilio", "WhatsApp Business API", "Email (Sendgrid)"],
		verticals: [
			{ name: "Hair & Beauty", slug: "hair-and-beauty" },
			{ name: "Restaurants", slug: "restaurants" },
			{ name: "Clinics & Health", slug: "clinics-and-health" },
			{ name: "Hotels", slug: "hotels" },
			{ name: "Real Estate", slug: "real-estate" },
		],
		examples: [
			{ title: "Salon Reminder", scenario: "SMS 24h and 3h before appointment with 1‑tap confirm.", result: "32% fewer no‑shows." },
			{ title: "Restaurant Reminder", scenario: "WhatsApp reminder 6h before dinner with modify/cancel link.", result: "Fewer empty tables, smoother turns." },
			{ title: "Clinic Reminder", scenario: "SMS 48h + 24h with pre‑visit instructions.", result: "Lower no‑shows and prepared patients." },
			{ title: "Hotel Spa Reminder", scenario: "In‑stay spa booking reminder 2h prior with add‑to‑calendar.", result: "Higher utilization of spa therapists." },
			{ title: "Viewing Reminder", scenario: "Email + SMS reminder for property viewing with map and parking tips.", result: "Fewer last‑minute cancellations." },
		],
		metrics: [
			{ stat: "32", suffix: "%", description: "No‑show reduction" },
			{ stat: "95", suffix: "%", description: "Delivery rate" },
		],
		features: [
			{ title: "Smart Timing", description: "Schedules reminders at optimal times." },
			{ title: "2‑Way", description: "Understands replies and updates the booking automatically." },
			{ title: "Reschedule Links", description: "1‑tap reschedule/cancel with policy enforcement." },
		],
		faqs: [
			{ question: "Can I set multiple reminders?", answer: "Yes, fully configurable sequences per service." },
		],
	},
	{
		name: "Smart Pre‑Check‑In",
		description: "Collect forms, preferences, and consents pre‑visit and share tailored instructions.",
		headline: "Arrive Prepared",
		subheading:
			"Reduce front‑desk time and improve experience with pre‑visit workflows.",
		slug: "smart-pre-check-in",
		problem:
			"Paper forms and last‑minute data collection slow everything down.",
		solution:
			"Send secure links to complete forms, upload IDs, and set preferences ahead of time.",
		outcomes: [
			"70%+ forms completed pre‑visit",
			"Shorter check‑in lines",
			"Higher CSAT from smoother arrivals",
		],
		tools: ["Typeform", "DocuSign", "Secure Upload", "CRM"],
		verticals: [
			{ name: "Hair & Beauty", slug: "hair-and-beauty" },
			{ name: "Restaurants", slug: "restaurants" },
			{ name: "Clinics & Health", slug: "clinics-and-health" },
			{ name: "Hotels", slug: "hotels" },
			{ name: "Real Estate", slug: "real-estate" },
		],
		examples: [
			{ title: "Clinic Intake", scenario: "Medical intake and consent collected 24h prior.", result: "-25% front‑desk time." },
			{ title: "Salon Pre‑Consult", scenario: "Form captures hair history and inspiration photos before visit.", result: "Stylist arrives prepared; better outcomes." },
			{ title: "Restaurant Pre‑Order", scenario: "Group pre‑selects menu and dietary notes day before.", result: "Service speeds up; fewer errors." },
			{ title: "Hotel Pre‑Arrival", scenario: "Guest uploads ID, selects arrival time, and room preferences.", result: "Faster check‑in; personalized welcome." },
			{ title: "Buyer Pre‑Viewing", scenario: "Collects proof‑of‑funds and preferences before tours.", result: "Agents tailor the route; higher fit." },
		],
		metrics: [
			{ stat: "70", suffix: "%", description: "Forms completed" },
			{ stat: "25", suffix: "%", description: "Front‑desk time reduced" },
		],
		features: [
			{ title: "Conditional Logic", description: "Show the right questions per service/guest." },
			{ title: "Secure Storage", description: "Encrypted at rest and in transit." },
			{ title: "Instruction Builder", description: "Auto‑generate what to bring/wear/expect." },
		],
		faqs: [
			{ question: "HIPAA/GDPR?", answer: "Compliant processing with audit trails and access controls." },
		],
	},
	{
		name: "No‑Show Recovery & Fee Capture",
		description: "Recover revenue from no‑shows with smart follow‑ups, rescheduling, and policy‑based fees.",
		headline: "Protect Your Schedule",
		subheading:
			"Automated outreach after no‑shows to rebook or collect fees when applicable.",
		slug: "no-show-recovery-fee-capture",
		problem:
			"Empty slots cost money and create unfairness for punctual clients.",
		solution:
			"Detect no‑shows, trigger empathetic follow‑ups, offer new times, and apply fees/deposits per policy.",
		outcomes: [
			"40% reschedule rate",
			"Reduced revenue leakage",
			"Consistent policy enforcement",
		],
		tools: ["Calendar Webhooks", "Payments", "Email/SMS"],
		verticals: [
			{ name: "Hair & Beauty", slug: "hair-and-beauty" },
			{ name: "Restaurants", slug: "restaurants" },
			{ name: "Clinics & Health", slug: "clinics-and-health" },
			{ name: "Hotels", slug: "hotels" },
			{ name: "Real Estate", slug: "real-estate" },
		],
		examples: [
			{ title: "Spa Policy", scenario: "No‑show triggers fee and rebooking options.", result: "-18% revenue leakage." },
			{ title: "Restaurant Policy", scenario: "No‑show dinner triggers deposit charge per policy and rebook link.", result: "Seats refilled; policy applied fairly." },
			{ title: "Clinic Policy", scenario: "Missed appointment asks reason, offers reschedule, applies fee when applicable.", result: "Fewer repeats; recovered revenue." },
			{ title: "Hotel Amenity No‑Show", scenario: "Spa/golf no‑show applies fee and offers new time.", result: "Amenity revenue protected." },
			{ title: "Property Viewing No‑Show", scenario: "Buyer misses viewing; assistant offers alternate slots and reconfirms seriousness.", result: "Keeps pipeline moving." },
		],
		metrics: [
			{ stat: "18", suffix: "%", description: "Revenue leakage reduced" },
			{ stat: "40", suffix: "%", description: "Clients rebooked" },
		],
		features: [
			{ title: "Policy Engine", description: "Percent/flat fees with grace rules." },
			{ title: "Empathetic Copy", description: "Tone controls and reason capture." },
			{ title: "Secure Links", description: "PCI‑compliant payment capture." },
		],
		faqs: [
			{ question: "Chargebacks?", answer: "Evidence logs and policy acknowledgement reduce disputes." },
		],
	},
	{
		name: "Smart Waitlist & Cancellation Filler",
		description: "Automatically fill last‑minute cancellations by reaching out to waitlists and recent customers.",
		headline: "Keep Your Calendar Full",
		subheading:
			"Detect empty slots and match them with people most likely to accept.",
		slug: "smart-waitlist-cancellation-filler",
		problem:
			"Gaps appear due to cancellations but staff is busy to refill them.",
		solution:
			"AI ranks the waitlist, sends offers, confirms bookings and updates the calendar in real‑time.",
		outcomes: [
			"82% empty slots refilled",
			"+12% revenue per seat/hour",
			"Delight customers with earlier dates",
		],
		tools: ["Calendar APIs", "SMS/WhatsApp", "Scoring Engine"],
		verticals: [
			{ name: "Hair & Beauty", slug: "hair-and-beauty" },
			{ name: "Restaurants", slug: "restaurants" },
			{ name: "Clinics & Health", slug: "clinics-and-health" },
			{ name: "Hotels", slug: "hotels" },
			{ name: "Real Estate", slug: "real-estate" },
		],
		examples: [
			{ title: "Dentist Gaps", scenario: "Morning cancellation triggers offers to top 10 waitlist.", result: "Chair time protected." },
			{ title: "Salon Cancellation", scenario: "Stylist cancellation fills with VIP list first.", result: "Day stays fully booked." },
			{ title: "Restaurant Table Fill", scenario: "Late cancellation sends offers to diners within 2km.", result: "Table re‑sold in minutes." },
			{ title: "Hotel Spa Slot", scenario: "Vacated massage spot offered to in‑house guests via WhatsApp.", result: "Occupancy of spa hours up." },
			{ title: "Open House Slot", scenario: "Viewing slot opens; auto‑offers to interested buyers.", result: "Schedule remains tight and efficient." },
		],
		metrics: [
			{ stat: "82", suffix: "%", description: "Empty slots filled" },
			{ stat: "12", suffix: "%", description: "Revenue per hour uplift" },
		],
		features: [
			{ title: "Priority Scoring", description: "Recent inquiries and VIPs first." },
			{ title: "Instant Confirm", description: "1‑tap accept with deposit if needed." },
			{ title: "Fairness Controls", description: "Throttle offers to avoid spam." },
		],
		faqs: [
			{ question: "How is priority set?", answer: "You can configure rules by recency, value, or membership." },
		],
	},
	{
		name: "Abandoned Booking Follow‑Up",
		description: "Recover started‑but‑unfinished bookings with timely nudges and assistance.",
		headline: "Finish What They Started",
		subheading:
			"Detect drop‑offs and help customers complete in a click or via a quick chat.",
		slug: "abandoned-booking-follow-up",
		problem:
			"People get distracted or confused during booking and never return.",
		solution:
			"Reach them within minutes with a tailored link or an assistant that completes the flow for them.",
		outcomes: [
			"+22% completion",
			"Higher conversion without discounts",
			"Better UX insights from reasons captured",
		],
		tools: ["Email", "SMS", "WhatsApp", "Session Tracking"],
		verticals: [
			{ name: "Hair & Beauty", slug: "hair-and-beauty" },
			{ name: "Restaurants", slug: "restaurants" },
			{ name: "Clinics & Health", slug: "clinics-and-health" },
			{ name: "Hotels", slug: "hotels" },
			{ name: "Real Estate", slug: "real-estate" },
		],
		examples: [
			{ title: "Table Booking", scenario: "Cart abandoned at payment; WhatsApp link completes in 2 taps.", result: "+1 table booked." },
			{ title: "Salon Abandon", scenario: "Haircut booking dropped at date step; SMS deep‑link resumes.", result: "Friction removed; booking completed." },
			{ title: "Clinic Abandon", scenario: "Patient drops at insurance entry; assistant clarifies accepted plans.", result: "Patient completes booking confidently." },
			{ title: "Hotel Abandon", scenario: "Guest leaves checkout; email with saved quote and perks brings them back.", result: "Direct booking recovered." },
			{ title: "Viewing Abandon", scenario: "Buyer stops at time selection; assistant proposes 3 options.", result: "Viewing scheduled within the hour." },
		],
		metrics: [
			{ stat: "22", suffix: "%", description: "Checkout completion uplift" },
			{ stat: "5", suffix: "m", description: "Typical follow‑up window" },
		],
		features: [
			{ title: "Intent Detection", description: "Understands where they dropped and why." },
			{ title: "One‑Click Resume", description: "Deep links to the exact step." },
			{ title: "Assistant Option", description: "Chat or voice help to finish." },
		],
		faqs: [
			{ question: "Privacy?", answer: "GDPR‑compliant with explicit consent and opt‑out controls." },
		],
	},
	{
		name: "Reactivation & Recalls",
		description: "Bring back inactive customers and schedule periodic recalls automatically.",
		headline: "Win Back Lapsed Customers",
		subheading:
			"Target by last visit and service cadence with personalized outreach.",
		slug: "reactivation-recalls",
		problem:
			"Dormant customers are expensive to acquire again but often return with the right nudge.",
		solution:
			"Automate recall schedules and personalized reactivation campaigns via preferred channels.",
		outcomes: [
			"16% reactivation rate",
			"+9% LTV",
			"Steady base utilization",
		],
		tools: ["CRM Segments", "Email", "SMS", "WhatsApp"],
		verticals: [
			{ name: "Hair & Beauty", slug: "hair-and-beauty" },
			{ name: "Restaurants", slug: "restaurants" },
			{ name: "Clinics & Health", slug: "clinics-and-health" },
			{ name: "Hotels", slug: "hotels" },
			{ name: "Real Estate", slug: "real-estate" },
		],
		examples: [
			{ title: "Hygiene Recall", scenario: "6‑month dental recall triggered automatically.", result: "Calendar filled in advance." },
			{ title: "Salon Reactivation", scenario: "Clients who haven’t visited in 12 weeks get a personalized style refresh offer.", result: "Dormant clients return." },
			{ title: "Restaurant Reactivation", scenario: "Guests from last season receive a chef’s tasting invite.", result: "Off‑peak nights fill up." },
			{ title: "Hotel Reactivation", scenario: "Past guests get a mid‑week upgrade offer.", result: "Shoulder nights improved." },
			{ title: "Buyer Recall", scenario: "Cold buyers pinged with new matching listings.", result: "Pipeline re‑engagement." },
		],
		metrics: [
			{ stat: "16", suffix: "%", description: "Reactivation rate" },
			{ stat: "9", suffix: "%", description: "LTV uplift" },
		],
		features: [
			{ title: "Cadence Rules", description: "Per service recall intervals and reminders." },
			{ title: "Offer Management", description: "Optional incentives to return." },
			{ title: "Opt‑down", description: "Lower‑frequency option instead of unsubscribe." },
		],
		faqs: [
			{ question: "Spam risk?", answer: "Built‑in frequency caps and preference centers." },
		],
	},
	{
		name: "Review Booster",
		description: "Increase reviews by asking at the right moment and routing happy clients to public sites.",
		headline: "Grow Your Reputation",
		subheading:
			"Encourage promoters, handle detractors privately, and monitor impact.",
		slug: "review-booster",
		problem:
			"Happy customers rarely leave reviews without a prompt; unhappy ones always do.",
		solution:
			"Trigger review asks post‑visit, filter by sentiment/NPS, and guide to Google or portals.",
		outcomes: [
			"3x monthly reviews",
			"+0.4 star average",
			"Private handling for negatives",
		],
		tools: ["NPS", "Google Reviews Link", "Email/SMS"],
		verticals: [
			{ name: "Hair & Beauty", slug: "hair-and-beauty" },
			{ name: "Restaurants", slug: "restaurants" },
			{ name: "Clinics & Health", slug: "clinics-and-health" },
			{ name: "Hotels", slug: "hotels" },
			{ name: "Real Estate", slug: "real-estate" },
		],
		examples: [
			{ title: "Post‑Dinner Ask", scenario: "CSAT > 4 triggers Google prompt.", result: "Reviews triple in 60 days." },
			{ title: "Salon Review Ask", scenario: "Satisfied client receives a review link 2h after visit.", result: "+0.4★ average within 8 weeks." },
			{ title: "Clinic Review Ask", scenario: "Positive NPS triggers healthcare‑appropriate portal link.", result: "More credible public feedback." },
			{ title: "Hotel Review Ask", scenario: "Checkout survey routes happy guests to Google/TripAdvisor.", result: "Ranking improves and visibility grows." },
			{ title: "Viewing Feedback", scenario: "After viewing, buyer rates experience privately; happy buyers get a public review prompt for the agency.", result: "Higher agency reputation." },
		],
		metrics: [
			{ stat: "3", suffix: "x", description: "Reviews per month" },
			{ stat: "+0.4", suffix: "★", description: "Average rating uplift" },
		],
		features: [
			{ title: "Sentiment Filter", description: "Asks only when experience is positive." },
			{ title: "Portal Routing", description: "Send to Google/TripAdvisor/industry portals." },
			{ title: "Response Templates", description: "Handle negatives privately with empathy." },
		],
		faqs: [
			{ question: "Against platform rules?", answer: "We never gate; we ask and route ethically." },
		],
	},
	{
		name: "Billing & Invoice",
		description: "Automate payment links, deposits, and invoice delivery integrated with your billing.",
		headline: "Get Paid Faster",
		subheading:
			"Reduce overdue invoices and friction with secure links and reminders.",
		slug: "billing-and-invoice",
		problem:
			"Chasing payments wastes time and hurts cash flow.",
		solution:
			"Send branded payment links, auto‑reconcile, and schedule polite reminders.",
		outcomes: [
			"2x faster payments",
			"-35% overdue",
			"Less manual reconciliation",
		],
		tools: ["Stripe", "GoCardless", "Xero/QuickBooks"],
		verticals: [
			{ name: "Hair & Beauty", slug: "hair-and-beauty" },
			{ name: "Restaurants", slug: "restaurants" },
			{ name: "Clinics & Health", slug: "clinics-and-health" },
			{ name: "Hotels", slug: "hotels" },
			{ name: "Real Estate", slug: "real-estate" },
		],
		examples: [
			{ title: "Deposit Capture", scenario: "Collect deposit at booking via link.", result: "No‑show risk reduced." },
			{ title: "Salon Invoice", scenario: "Color correction requires deposit link sent at booking.", result: "Commitment secured; cancellations drop." },
			{ title: "Restaurant Group Bill", scenario: "Pre‑event invoice with partial payments for a group menu.", result: "Cash flow improved before service." },
			{ title: "Clinic Co‑Pay", scenario: "Automated co‑pay link sent morning of appointment.", result: "Faster check‑out; less AR aging." },
			{ title: "Hotel Pre‑Auth", scenario: "Pre‑arrival payment link collects deposit and T&Cs.", result: "Fewer disputes; smoother check‑in." },
			{ title: "Reservation Deposit (Real Estate)", scenario: "Holding deposit link for rental application.", result: "Serious applicants prioritized." },
		],
		metrics: [
			{ stat: "2", suffix: "x", description: "Payment speed" },
			{ stat: "35", suffix: "%", description: "Overdue reduction" },
		],
		features: [
			{ title: "Auto Reconcile", description: "Syncs with accounting systems." },
			{ title: "Partial Payments", description: "Deposits and installment options." },
			{ title: "Reminders", description: "Smart cadence until paid." },
		],
		faqs: [
			{ question: "Fees?", answer: "Pass‑through or absorb; fully configurable." },
		],
	},
	{
		name: "In‑Stay Concierge & Upsell",
		description: "Virtual concierge for staying guests: requests, Q&A, and personalized upsells.",
		headline: "Delight Every Guest",
		subheading:
			"Answer instantly and grow ancillary revenue with timely offers.",
		slug: "in-stay-concierge-upsell",
		problem:
			"Front desk is overloaded, and guests wait for simple requests.",
		solution:
			"24/7 assistant handles requests, books services, and proposes relevant add‑ons.",
		outcomes: [
			"+14% ancillary revenue",
			"30% faster response",
			"Better review scores",
		],
		tools: ["WhatsApp", "PMS Integration", "Booking Engine", "ElevenLabs"],
		verticals: [{ name: "Hotels", slug: "hotels" }],
		examples: [
			{ title: "Late Check‑out", scenario: "Guest asks at 1am; assistant confirms with fee.", result: "Revenue per stay up." },
		],
		metrics: [
			{ stat: "14", suffix: "%", description: "Ancillary revenue" },
			{ stat: "30", suffix: "%", description: "Faster responses" },
		],
		features: [
			{ title: "Service Routing", description: "Sends tasks to housekeeping/maintenance." },
			{ title: "Menu of Upsells", description: "Spa, dining, room upgrades at the right time." },
			{ title: "Multi‑language", description: "Serve international guests naturally." },
		],
		faqs: [
			{ question: "PMS support?", answer: "We integrate with major PMS vendors and via iCal." },
		],
	},
	{
		name: "Group & Event Inquiry Handler",
		description: "Qualify and structure group/event requests and hand them to sales with everything needed.",
		headline: "From Inquiry To Qualified RFP",
		subheading:
			"Capture requirements, budget, and dates, then route to the right rep fast.",
		slug: "group-event-inquiry-handler",
		problem:
			"Large inquiries get stuck in inboxes and lose momentum.",
		solution:
			"Guided Q&A collects all details, checks availability, and books a discovery call or site tour.",
		outcomes: [
			"2x qualified RFPs",
			"-40% time‑to‑first‑response",
			"Handoff with zero back‑and‑forth",
		],
		tools: ["Web Forms", "Email", "Calendar", "CRM"],
		verticals: [
			{ name: "Restaurants", slug: "restaurants" },
			{ name: "Hotels", slug: "hotels" },
		],
		examples: [
			{ title: "Wedding Inquiry", scenario: "Collects guest count, spend, date; schedules tasting.", result: "Sales works only qualified leads." },
			{ title: "Restaurant Group Booking",
				scenario: "Corporate dinner inquiry captured via form; assistant confirms menu options and books a site visit.",
				result: "Sales receives a complete, qualified brief."
			},
		],
		metrics: [
			{ stat: "2", suffix: "x", description: "Qualified RFPs" },
			{ stat: "40", suffix: "%", description: "Faster first response" },
		],
		features: [
			{ title: "Availability Check", description: "Blocks pencil holds when approved." },
			{ title: "Proposal Kit", description: "Auto‑drafts a first proposal template." },
			{ title: "Routing", description: "Assigns to the right sales owner." },
		],
		faqs: [
			{ question: "Custom fields?", answer: "Add venue‑specific requirements and attachments." },
		],
	},
	{
		name: "Portal Lead Qualification & Routing",
		description: "Qualify property portal leads, answer FAQs, and auto‑book viewings, routing to the best agent.",
		headline: "Turn Portal Leads Into Viewings",
		subheading:
			"Fast qualification and smart routing improve SLA and conversion.",
		slug: "portal-lead-qualification-routing",
		problem:
			"Agents are busy; slow replies cause leads to go cold or to competitors.",
		solution:
			"Instant outreach verifies budget, timing, and needs; books viewings or nurtures until ready.",
		outcomes: [
			"50% faster SLA",
			"+17% viewings booked",
			"Right agent every time",
		],
		tools: ["Email", "SMS", "WhatsApp", "CRM"],
		verticals: [{ name: "Real Estate", slug: "real-estate" }],
		examples: [
			{ title: "Portal Ping", scenario: "Lead comes from Idealista; assistant qualifies and books Saturday 11:00.", result: "Agent meets hot, informed buyer." },
		],
		metrics: [
			{ stat: "50", suffix: "%", description: "Faster SLA" },
			{ stat: "17", suffix: "%", description: "More viewings booked" },
		],
		features: [
			{ title: "Qualification Tree", description: "Budget, area, financing, timeframe." },
			{ title: "Agent Matching", description: "Routes by territory and workload." },
			{ title: "Auto‑Scheduling", description: "Books the first available slot that works for all." },
		],
		faqs: [
			{ question: "Multiple listings?", answer: "It can bundle options and suggest similar properties." },
		],
	},
	{
		name: "Viewing Follow‑Up & Offer Collector",
		description: "After viewings, gather feedback, score interest, and collect offers or next steps.",
		headline: "Capture Momentum After The Viewing",
		subheading:
			"Structured follow‑ups keep warm buyers engaged and visible in the pipeline.",
		slug: "viewing-follow-up-offer-collector",
		problem:
			"Manual follow‑ups are inconsistent and forgettable.",
		solution:
			"Send intelligent follow‑ups with tailored questions and easy offer submission.",
		outcomes: [
			"28% more offers",
			"<24h feedback turnaround",
			"Clear interest scoring",
		],
		tools: ["Email", "SMS", "Offer Forms", "CRM"],
		verticals: [{ name: "Real Estate", slug: "real-estate" }],
		examples: [
			{ title: "Buyer Interest", scenario: "Asks 5 key questions and invites an offer.", result: "Pipeline clarity up." },
		],
		metrics: [
			{ stat: "28", suffix: "%", description: "More offers" },
			{ stat: "24", suffix: "h", description: "Feedback turnaround" },
		],
		features: [
			{ title: "Scorecards", description: "Rates seriousness and fit automatically." },
			{ title: "Offer Intake", description: "Structured forms with proof of funds uploads." },
			{ title: "Agent Alerts", description: "Hot interest pinged immediately." },
		],
		faqs: [
			{ question: "Multiple viewers?", answer: "Sends personalized follow‑ups to each attendee." },
		],
	},
	{
		name: "Tenant Onboarding & Docs Collection",
		description: "From accepted tenant to moved‑in: documents, contracts, payments, and handover.",
		headline: "Frictionless Move‑Ins",
		subheading:
			"Automate onboarding steps so nothing is missed and everyone is informed.",
		slug: 'tenant-onboarding-docs-collection',
		problem:
			"Manual onboarding causes delays, repeated emails, and lost documents.",
		solution:
			"A guided journey collects IDs, signatures, payments, and schedules key handover.",
		outcomes: [
			"-50% admin time",
			"95% document completion",
			"Happier tenants and landlords",
		],
		tools: [
			"DocuSign",
			"Payments",
			"File Upload",
			"Calendar",
		],
		verticals: [{ name: "Real Estate", slug: "real-estate" }],
		examples: [
			{ title: "Lease Package", scenario: "Automates contract, deposit, utilities setup.", result: "Keys handed over on time." },
		],
		metrics: [
			{ stat: "50", suffix: "%", description: "Admin time saved" },
			{ stat: "95", suffix: "%", description: "Docs completion" },
		],
		features: [
			{ title: "Checklist", description: "Visual progress for tenant and manager." },
			{ title: "E‑Sign", description: "Legally binding signatures and storage." },
			{ title: "Payment Links", description: "Collect deposits and first rent." },
		],
		faqs: [
			{ question: "Country differences?", answer: "Templates adapt to local requirements." },
		],
	},
	]
