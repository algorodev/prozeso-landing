"use client";

import LegalContainer from "@/components/Legal/LegalContainer";

export default function CookiesPolicy() {
  const toc = [
    { id: "what-are-cookies", label: "What are cookies?" },
    { id: "how-we-use-cookies", label: "How we use cookies" },
    { id: "types-of-cookies", label: "Types of cookies we use" },
    { id: "manage-cookies", label: "How to manage cookies" },
    { id: "changes", label: "Changes to this policy" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <LegalContainer title="Cookies Policy" updatedAt="Nov 3, 2025" toc={toc}>
      <section id="what-are-cookies">
        <h2 className='font-semibold mb-2'>What are cookies?</h2>
        <p>
          Cookies are small text files placed on your device to store data that can be
          recalled by a web server in the domain that placed the cookie. We use cookies
          and similar technologies to provide and improve our services.
        </p>
      </section>

      <section id="how-we-use-cookies" className='py-8'>
        <h2 className='font-semibold mb-2'>How we use cookies</h2>
        <ul>
          <li>Authentication and session management.</li>
          <li>Remembering your preferences and settings.</li>
          <li>Analytics to understand how our services are used.</li>
          <li>Marketing to deliver relevant content.</li>
        </ul>
      </section>

      <section id="types-of-cookies">
        <h2 className='font-semibold mb-2'>Types of cookies we use</h2>
        <ul>
          <li>Essential cookies — required to operate the site.</li>
          <li>Performance/analytics cookies — help us analyze usage.</li>
          <li>Functional cookies — remember your preferences.</li>
          <li>Advertising cookies — used to deliver relevant ads.</li>
        </ul>
      </section>

      <section id="manage-cookies" className='py-8'>
        <h2 className='font-semibold mb-2'>How to manage cookies</h2>
        <p>
          You can control and manage cookies in your browser settings. Please note that
          removing or blocking cookies may impact your experience and some features may
          no longer be available.
        </p>
      </section>

      <section id="changes">
        <h2 className='font-semibold mb-2'>Changes to this policy</h2>
        <p>
          We may update this Cookies Policy from time to time. We encourage you to
          review this page periodically for any changes.
        </p>
      </section>

      <section id="contact" className='py-8'>
        <h2 className='font-semibold mb-2'>Contact</h2>
        <p>
          For questions about this Cookies Policy, contact us at privacy@prozeso.com.
        </p>
      </section>
    </LegalContainer>
  );
}
