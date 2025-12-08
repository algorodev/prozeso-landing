import { Hotel, House, Scissors, Stethoscope, Utensils } from "lucide-react";

export const VERTICALS = {
  "clinics-and-health": {
    name: "Clinics & Health",
    icon: Stethoscope,
    slug: "clinics-and-health",
    description:
      "AI automations for medical practices and healthcare providers",
    headline: "Automations for Clinics & Health Practices",
    subheading:
      "Reduce no-shows, handle patient intake, and deliver exceptional care coordination.",
    problems: [
      {
        title: "Missed Appointment Calls",
        items: [
          "Patients call but can't reach clinic during business hours",
          "Urgent cases go unanswered or referred elsewhere",
          "No call history = repeated patient frustration",
        ],
      },
      {
        title: "High No-Show Rates",
        items: [
          "25-40% no-show rate typical in healthcare",
          "Wasted clinical time and staff capacity",
          "Impacts billing and patient care continuity",
        ],
      },
      {
        title: "Compliance Complexity",
        items: [
          "Manual verification of insurance takes staff time",
          "Missing documentation creates compliance issues",
          "Repetitive patient questions waste clinic resources",
        ],
      },
    ],
    solution: [
      {
        title: "24/7 AI Receptionist with HIPAA Compliance",
        description:
          "Your AI receptionist handles patient calls securely, verifies insurance, and schedules appointments while maintaining strict privacy standards.",
      },
      {
        title: "Automated Pre-Appointment Intake",
        description:
          "Collect medical history, insurance info, and pre-visit surveys before patients arrive. Reduce check-in time from 15 minutes to 2.",
      },
      {
        title: "Smart No-Show Prevention",
        description:
          "Multi-touch reminders with confirmation reduce no-shows by 35%. Automated rescheduling fills gaps immediately.",
      },
    ],
    recommendedAutomations: [
      "receptionist-ai",
      "missed-call-auto-callback",
      "appointment-reminder",
      "smart-pre-check-in",
      "no-show-recovery-fee-capture",
      "smart-waitlist-cancellation-filler",
      "abandoned-booking-follow-up",
      "reactivation-recalls",
      "review-booster",
      "billing-and-invoice",
    ],
    journey: {
      customer: "Dr. López",
      steps: [
        {
          stage: "3 PM - Patient Calls",
          description:
            "New patient calls to schedule. AI answers, verifies insurance in real-time, and collects medical history.",
        },
        {
          stage: "3:10 PM - Intake Complete",
          description:
            "Appointment scheduled for next week. Patient receives secure link to complete additional intake forms at home.",
        },
        {
          stage: "Day Before - Reminder",
          description:
            "AI sends appointment reminder. Patient pre-confirms and completes brief health survey digitally.",
        },
        {
          stage: "Appointment Day - No Wait",
          description:
            "Patient arrives. Check-in is 90 seconds (intake already done). Dr. López has full context before entering room.",
        },
        {
          stage: "After Visit - Follow-up",
          description:
            "AI sends summary of visit, medication instructions, and booking link for follow-up.",
        },
        {
          stage: "One Week Later - Feedback",
          description:
            "AI collects satisfaction survey. Patient satisfaction score improves, referrals increase.",
        },
      ],
    },
    metrics: [
      {
        stat: "35",
        suffix: "%",
        description: "No-show rate reduction",
        quote:
          "Automated reminders with confirmation requests dramatically reduced missed appointments.",
      },
      {
        stat: "90",
        suffix: " mins",
        description: "Time saved daily in admin tasks",
        quote:
          "Staff freed from phone tag focus on patient care instead of scheduling.",
      },
      {
        stat: "45",
        suffix: "%",
        description: "Patient satisfaction increase",
        quote:
          "Seamless intake and follow-up makes patients feel heard and cared for.",
      },
    ],
    faqs: [
      {
        question: "Is this HIPAA compliant and secure?",
        answer:
          "Yes. All data is encrypted end-to-end. We use HIPAA-compliant hosting, audit logs, and access controls. Your clinic data never leaves secure servers.",
      },
      {
        question: "Can it integrate with our EHR system?",
        answer:
          "Yes. We integrate with Epic, Cerner, NextGen, SimplePractice, and major EHR platforms. Real-time sync keeps all systems updated.",
      },
      {
        question: "How does it handle emergency or urgent calls?",
        answer:
          "The AI can route urgent calls to on-call staff immediately. You define urgency keywords and routing rules.",
      },
      {
        question: "Can patients reschedule via text or voice?",
        answer:
          'Absolutely. Patients can text "reschedule", and the AI shows available slots. Voice rescheduling works too.',
      },
      {
        question: "Does it support multiple languages?",
        answer:
          "Yes. All 100+ languages supported. Auto-detection or patient preference. Critical for clinics serving diverse communities.",
      },
    ],
  },
  "hair-and-beauty": {
    name: "Hair & Beauty",
    icon: Scissors,
    slug: "hair-and-beauty",
    description:
      "AI automations specifically designed for hair salons and beauty businesses",
    headline: "Automations for Hair & Beauty",
    subheading:
      "Handle calls, reschedule no-shows, recover missed bookings, and keep your chairs full 24/7",
    problems: [
      {
        title: "Phones Ring Off The Hook",
        items: [
          "Missed calls during peak hours when stylists are booked",
          "Customers hang up without reaching anyone",
          "No system to capture those leads—they go to competitors",
        ],
      },
      {
        title: "No-Shows Tank Your Revenue",
        items: [
          "15-25% of bookings never show up",
          "Empty chair slots waste time and money",
          "Stylists stand idle while revenue disappears",
        ],
      },
      {
        title: "Manual Follow-Ups Are A Nightmare",
        items: [
          "WhatsApp, text messages, emails scattered everywhere",
          "No reminders → customers forget their appointment",
          "Late cancellations come too close to service time",
        ],
      },
    ],
    solution: [
      {
        title: "24/7 AI Receptionist Answers Every Call",
        description:
          "Your AI receptionist picks up missed calls, answers FAQs, and books appointments in the customer's language. Customers feel welcomed. You never miss another lead.",
      },
      {
        title: "Smart Appointment Reminders Reduce No-Shows",
        description:
          "Reminders go out via SMS and WhatsApp 24 hours before. If a customer says they'll be late, the AI automatically reschedules them. Full chair, happy customer.",
      },
      {
        title: "Instant Recovery of Missed Calls",
        description:
          "The AI automatically calls back customers who couldn't reach you. Result: 45% of missed calls become confirmed bookings.",
      },
    ],
    recommendedAutomations: [
      "receptionist-ai",
      "missed-call-auto-callback",
      "appointment-reminder",
      "smart-pre-check-in",
      "no-show-recovery-fee-capture",
      "smart-waitlist-cancellation-filler",
      "abandoned-booking-follow-up",
      "reactivation-recalls",
      "review-booster",
      "billing-and-invoice",
    ],
    journey: {
      customer: "Maria",
      steps: [
        {
          stage: "9:00 AM - Phone Call Comes In",
          description:
            "A customer calls during peak hours when all stylists are with clients. Your AI receptionist answers, welcomes them by name, and checks availability.",
        },
        {
          stage: "9:05 AM - Booking Confirmed",
          description:
            "The AI offers 3 time slots. Customer books for tomorrow at 2 PM. Confirmation text is sent instantly.",
        },
        {
          stage: "Tomorrow 1 PM - Reminder Sent",
          description:
            'SMS reminder goes out: "Hi! Your appointment is tomorrow at 2 PM. Reply YES to confirm or call to reschedule."',
        },
        {
          stage: "Tomorrow 1:30 PM - Running Late",
          description:
            "Customer texts back. AI immediately offers to reschedule to 2:20 PM. Customer confirms. Stylist is notified.",
        },
        {
          stage: "Tomorrow 2:20 PM - Customer Arrives",
          description:
            "Appointment happens. Stylist upsells a treatment. Customer books next month.",
        },
        {
          stage: "Tomorrow 3:30 PM - Follow-up",
          description:
            "AI sends review request. Customer leaves 5-star review and mentions specific stylist.",
        },
      ],
    },
    metrics: [
      {
        stat: "45",
        suffix: "%",
        description: "Bookings recovered from missed calls",
        quote:
          "In a chain of 15 salons, the AI handled over 5000 calls in one month, freeing up staff time.",
      },
      {
        stat: "32",
        suffix: "%",
        description: "No-show rate decrease within 30 days",
        quote:
          "Clients confirm appointments via WhatsApp. Late arrivals are automatically rescheduled.",
      },
      {
        stat: "18",
        suffix: "%",
        description: "Average revenue increase per visit",
        quote:
          "AI suggests complementary treatments and books follow-ups before clients leave.",
      },
    ],
    faqs: [
      {
        question:
          "Can the AI speak multiple languages like Catalan and Valencian?",
        answer:
          "Yes! The AI receptionist supports 100+ languages including Catalan, Valencian, Spanish, English, and more. Customers can choose or we auto-detect.",
      },
      {
        question: "Does it work with my booking software?",
        answer:
          "We integrate with all major salon booking systems: Acuity, Mindbody, Simplybook, and more. If not on this list, we can add custom integration.",
      },
      {
        question: "How does pricing work for salons?",
        answer:
          "Transparent pricing: flat fee per month + per-call charges. No hidden fees. Most salons pay €150-300/month depending on volume.",
      },
      {
        question: "Can I customize what the AI says?",
        answer:
          "Absolutely. You control the greeting, questions, offerings, and tone. We train the AI with your exact business logic and policies.",
      },
      {
        question: "What if there's a complex request the AI can't handle?",
        answer:
          "Seamlessly transfers to a human. You control when and how. The AI shares the full conversation context so your team picks up immediately.",
      },
    ],
  },
  hotels: {
    name: "Hotels",
    icon: Hotel,
    slug: "hotels",
    description: "AI automations for hotels and hospitality businesses",
    headline: "Automations for Hotels",
    subheading:
      "24/7 guest support, reservation management, and upsell opportunities—all automated.",
    problems: [
      {
        title: "Lost Reservation Calls",
        items: [
          "Calls come in during peak check-in hours",
          "Guests call competitors when they can't reach you",
          "Late-night calls go unanswered completely",
        ],
      },
      {
        title: "High No-Show Rate",
        items: [
          "No-shows waste rooms and revenue",
          "Late cancellations impossible to re-sell",
          "Overbooking creates unhappy guests",
        ],
      },
      {
        title: "Guest Service Gaps",
        items: [
          "FAQs answered manually by staff",
          "Room service and concierge requests pile up",
          "No follow-up = missed upsell opportunities",
        ],
      },
    ],
    solution: [
      {
        title: "AI Concierge 24/7",
        description:
          "Your AI handles room requests, restaurant reservations, local recommendations, and upsells. Guests feel premium service at every touchpoint.",
      },
      {
        title: "Reservation Management",
        description:
          "Smart reminders reduce no-shows. AI offers late check-in or date changes automatically.",
      },
      {
        title: "Intelligent Upselling",
        description:
          "AI recommends room upgrades, experiences, and services based on guest profile and booking history.",
      },
    ],
    recommendedAutomations: [
      "receptionist-ai",
      "missed-call-auto-callback",
      "appointment-reminder",
      "smart-pre-check-in",
      "no-show-recovery-fee-capture",
      "smart-waitlist-cancellation-filler",
      "abandoned-booking-follow-up",
      "reactivation-recalls",
      "review-booster",
      "billing-and-invoice",
      "in-stay-concierge-upsell",
      "group-event-inquiry-handler",
    ],
    journey: {
      customer: "Emma",
      steps: [
        {
          stage: "10 AM - Booking Call",
          description:
            "Emma calls to book a suite. AI answers, offers room types and upgrades. She books 3 nights.",
        },
        {
          stage: "Day Before - Reminder",
          description:
            "AI sends check-in reminder with parking info, restaurant recommendations, and option to request early check-in.",
        },
        {
          stage: "Arrival - Seamless Check-in",
          description:
            "Emma arrives. Mobile check-in already done via AI conversation. Key card ready. Concierge AI suggests spa package.",
        },
        {
          stage: "During Stay - Concierge",
          description:
            "Emma texts for restaurant reservation. AI instantly books at top-rated venue nearby and books car service.",
        },
        {
          stage: "Check-out - Upgrade Offer",
          description:
            "AI offers 20% discount if Emma books a return stay this month. She books immediately for next month.",
        },
        {
          stage: "Post-Stay - Loyalty",
          description:
            "AI sends satisfaction survey and collects 5-star review. Emma gets loyalty points and early access to special offers.",
        },
      ],
    },
    metrics: [
      {
        stat: "35",
        suffix: "%",
        description: "Bookings from upsell offers",
        quote: "AI recommends upgrades based on guest history and preferences.",
      },
      {
        stat: "28",
        suffix: "%",
        description: "No-show rate reduction",
        quote: "Smart reminders and flexible rescheduling keep rooms filled.",
      },
      {
        stat: "40",
        suffix: "%",
        description: "Guest satisfaction increase",
        quote: "24/7 concierge support makes every guest feel like a VIP.",
      },
    ],
    faqs: [
      {
        question: "Can the AI handle complex concierge requests?",
        answer:
          "Yes. AI integrates with OpenTable, TheFork, and similar platforms. It books restaurants, shows tickets, arranges car services.",
      },
      {
        question: "Does it work with our PMS?",
        answer:
          "We integrate with all major PMS: Opera, Marriott Bonvoy, IDeaS, and others. Real-time sync prevents overbooking.",
      },
      {
        question: "How many languages can the AI handle?",
        answer:
          "All 100+ languages. Guests choose or AI auto-detects. Perfect for international hotels.",
      },
      {
        question: "Can it upsell based on guest history?",
        answer:
          "Absolutely. AI learns guest preferences over stays. If they always book spa, it proactively offers spa packages.",
      },
      {
        question: "What about after-hours emergencies?",
        answer:
          "AI escalates emergencies to on-call staff immediately. For non-emergencies, it logs requests and alerts staff at start of shift.",
      },
    ],
  },
  restaurants: {
    name: "Restaurants",
    icon: Utensils,
    slug: "restaurants",
    description: "AI automations designed for restaurants and food service",
    headline: "Automations for Restaurants",
    subheading:
      "Never miss a reservation. Fill your tables 24/7 and eliminate manual booking chaos.",
    problems: [
      {
        title: "Missed Reservation Calls",
        items: [
          "Phones ring during service when staff can't answer",
          "Voicemails go unanswered—customers book elsewhere",
          "Peak dinner hours = peak call volume = lost bookings",
        ],
      },
      {
        title: "No-Shows Empty Tables",
        items: [
          "20-30% no-show rate kills profitability",
          "Tables reserved but never filled",
          "Food prep wasted, staff standing idle",
        ],
      },
      {
        title: "Reservation Chaos",
        items: [
          "Multiple booking systems = double bookings and gaps",
          "Manual entry errors and miscommunication",
          "Unhappy customers turned away despite empty tables",
        ],
      },
    ],
    solution: [
      {
        title: "24/7 AI Host Answers Every Call",
        description:
          "Your AI host picks up every call, offers available tables, and books reservations directly into your system. No missed calls. No manual entry.",
      },
      {
        title: "Reminders Reduce No-Shows by 30%",
        description:
          "Smart SMS/WhatsApp reminders 24 hours before and 2 hours before. Customers confirm or reschedule. Full tables, every service.",
      },
      {
        title: "Overbooking Prevention",
        description:
          "Real-time availability updates prevent double-bookings. AI suggests alternative times intelligently.",
      },
    ],
    recommendedAutomations: [
      "receptionist-ai",
      "missed-call-auto-callback",
      "appointment-reminder",
      "smart-pre-check-in",
      "no-show-recovery-fee-capture",
      "smart-waitlist-cancellation-filler",
      "abandoned-booking-follow-up",
      "reactivation-recalls",
      "review-booster",
      "billing-and-invoice",
      "group-event-inquiry-handler",
    ],
    journey: {
      customer: "Carlos",
      steps: [
        {
          stage: "6:30 PM - Incoming Call",
          description:
            "Customer calls to book for Friday at 8 PM. Line is busy—your AI picks up immediately.",
        },
        {
          stage: "6:32 PM - Reservation Booked",
          description:
            "AI confirms party size (6 people), seating preference (window), and special requests (birthday!). SMS confirmation sent.",
        },
        {
          stage: "Friday 7 PM - Reminder Sent",
          description:
            'WhatsApp reminder: "Your table for 6 at 8 PM is ready. Special: Birthday cake available!"',
        },
        {
          stage: "Friday 7:55 PM - Confirmation",
          description:
            "AI sends final reminder. Customer confirms. Kitchen gets 5-minute heads-up for special dessert prep.",
        },
        {
          stage: "Friday 8 PM - Customer Arrives",
          description:
            "Table is perfectly set. Staff knows it's a birthday. Special treatment makes them a loyal regular.",
        },
        {
          stage: "After Dinner - Follow-up",
          description:
            "AI requests review and sends 15% discount code for next visit. Customer books another reservation.",
        },
      ],
    },
    metrics: [
      {
        stat: "40",
        suffix: "%",
        description: "Bookings recovered from missed calls",
        quote:
          "During dinner service, the AI handled 200+ calls that would have gone to voicemail.",
      },
      {
        stat: "30",
        suffix: "%",
        description: "No-show rate reduction",
        quote:
          "Smart reminders and deposit collection eliminated most last-minute cancellations.",
      },
      {
        stat: "22",
        suffix: "%",
        description: "Table turnover efficiency increase",
        quote:
          "Optimized seating and real-time availability updates filled more tables per night.",
      },
    ],
    faqs: [
      {
        question: "Can the AI upsell wine pairings or premium seating?",
        answer:
          "Absolutely. We train the AI with your menu, upsell strategy, and pricing. It learns which tables to suggest based on party size and time.",
      },
      {
        question: "Does it integrate with OpenTable or Resy?",
        answer:
          "Yes! We sync with OpenTable, Resy, Toast, and other major platforms. All bookings flow to one unified calendar.",
      },
      {
        question: "What about restaurant-specific languages?",
        answer:
          "All 100+ languages supported, including regional dialects. AI auto-detects or customers choose their preferred language.",
      },
      {
        question: "Can the AI handle special requests like allergies?",
        answer:
          "Yes. AI asks about allergies and dietary needs, logs them securely, and alerts your kitchen. Customers feel safe and cared for.",
      },
      {
        question: "How do you handle peak hours?",
        answer:
          "The AI handles unlimited concurrent calls. During peak times, it queues and auto-calls back with priority slots.",
      },
    ],
  },
  "real-estate": {
    name: "Real Estate",
    icon: House,
    slug: "real-estate",
    description:
      "AI automations for real estate agents and property management",
    headline: "Automations for Real Estate",
    subheading:
      "Never miss a lead. Automate property inquiries, showings, and follow-up across your portfolio.",
    problems: [
      {
        title: "Missed Calls = Lost Deals",
        items: [
          "Leads call when you're showing property to other clients",
          "By the time you call back, they've contacted 3 competitors",
          "Voicemails accumulate—critical leads buried",
        ],
      },
      {
        title: "Manual Inquiry Management",
        items: [
          "Emails, texts, phone calls scattered across devices",
          "No unified follow-up system = leads fall through cracks",
          "Forgotten property details waste time on every call",
        ],
      },
      {
        title: "Showing Scheduling Chaos",
        items: [
          "Back-and-forth texts to coordinate showing times",
          "No-shows waste hours of your schedule",
          "Manual syncing with property calendars = errors",
        ],
      },
    ],
    solution: [
      {
        title: "AI Handles Inbound Leads 24/7",
        description:
          "Your AI answers every call, qualifies leads, answers property questions, and books showings directly into your calendar.",
      },
      {
        title: "Automated Showing Coordination",
        description:
          "Buyers can instantly book showings online or via voice. AI confirms appointments and sends directions automatically.",
      },
      {
        title: "Follow-up Automation",
        description:
          "After showing, AI sends property details, financing info, and follow-up reminders. No deal falls through cracks.",
      },
    ],
    recommendedAutomations: [
      "receptionist-ai",
      "missed-call-auto-callback",
      "appointment-reminder",
      "smart-pre-check-in",
      "no-show-recovery-fee-capture",
      "smart-waitlist-cancellation-filler",
      "abandoned-booking-follow-up",
      "reactivation-recalls",
      "review-booster",
      "billing-and-invoice",
      "portal-lead-qualification-routing",
      "viewing-follow-up-offer-collector",
      "tenant-onboarding-docs-collection",
    ],
    journey: {
      customer: "Juan",
      steps: [
        {
          stage: "2 PM - Lead Inquiry Call",
          description:
            "Buyer calls interested in your listing. You're showing another property. AI answers, qualifies buyer, describes home, and offers 3 showing times.",
        },
        {
          stage: "2:15 PM - Showing Booked",
          description:
            "Buyer chooses tomorrow at 10 AM. AI confirms appointment, sends property details, financing tips, and calendar invite.",
        },
        {
          stage: "Tomorrow 9:45 AM - Pre-showing",
          description:
            "AI sends reminder with directions and property highlights. Buyer confirms arrival.",
        },
        {
          stage: "Tomorrow 10 AM - Showing",
          description:
            'You show the property. AI follows up with buyer 2 hours later: "What did you think?"',
        },
        {
          stage: "Tomorrow 6 PM - Follow-up",
          description:
            "AI sends comparative market analysis, financing options, and link to similar properties.",
        },
        {
          stage: "Next Day - Deal Path",
          description:
            "Buyer texts interest. AI coordinates offer submission, inspection scheduling, and timeline management.",
        },
      ],
    },
    metrics: [
      {
        stat: "50",
        suffix: "%",
        description: "Leads captured from missed calls",
        quote:
          "Every missed call is a potential deal. AI ensures zero leads slip through.",
      },
      {
        stat: "35",
        suffix: "%",
        description: "Showing booking rate increase",
        quote:
          "Instant scheduling converts interest into confirmed appointments.",
      },
      {
        stat: "28",
        suffix: "%",
        description: "Deal closure rate improvement",
        quote:
          "Automated follow-up keeps buyers engaged through the entire journey.",
      },
    ],
    faqs: [
      {
        question: "Can the AI answer detailed property questions?",
        answer:
          "Yes. We load property details (square footage, HOA fees, tax history, etc.). AI answers questions accurately and schedules viewings.",
      },
      {
        question: "Does it integrate with MLS and CRM systems?",
        answer:
          "We integrate with Zillow, Trulia, Redfin, and major CRMs like Salesforce and Follow Up Boss. Listings stay synced.",
      },
      {
        question: "What about showing coordination across agents?",
        answer:
          "The AI manages showing requests from all agents, prevents double-bookings, and syncs with property calendars in real-time.",
      },
      {
        question: "Can it handle document signing?",
        answer:
          "Yes. AI collects documents, routes them for e-signatures, and stores them securely. Perfect for tenant onboarding.",
      },
      {
        question: "How does it handle international buyers?",
        answer:
          "All 100+ languages supported. AI auto-detects or buyers choose. Helps close international deals seamlessly.",
      },
    ],
  },
};
