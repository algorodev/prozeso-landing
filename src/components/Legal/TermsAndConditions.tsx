"use client";

import LegalContainer from "@/components/Legal/LegalContainer";

export default function TermsAndConditions() {
  const toc = [
    { id: "agreement", label: "Agreement to terms" },
    { id: "intellectual-property", label: "Intellectual property rights" },
    { id: "user-representations", label: "User representations" },
    { id: "prohibited-activities", label: "Prohibited activities" },
    { id: "limitation-of-liability", label: "Limitation of liability" },
    { id: "governing-law", label: "Governing law" },
    { id: "contact-us", label: "Contact us" },
  ];

  return (
    <LegalContainer title="Terms & Conditions" updatedAt="Nov 3, 2025" toc={toc}>
      <section id="agreement">
        <h2 className='font-semibold mb-2'>Agreement to terms</h2>
        <p>
          These Terms constitute a legally binding agreement made between you and
          Prozeso regarding your access to and use of this website and any related
          services. By accessing the site, you agree that you have read, understood,
          and agreed to be bound by all of these Terms.
        </p>
      </section>

      <section id="intellectual-property" className='py-8'>
        <h2 className='font-semibold mb-2'>Intellectual property rights</h2>
        <p>
          Unless otherwise indicated, the Site and all source code, databases,
          functionality, software, website designs, audio, video, text, photographs,
          and graphics on the Site are owned or controlled by us and are protected by
          copyright and trademark laws.
        </p>
      </section>

      <section id="user-representations">
        <h2 className='font-semibold mb-2'>User representations</h2>
        <p>
          By using the Site, you represent and warrant that all registration
          information you submit will be true, accurate, current, and complete;
          you will maintain the accuracy of such information and promptly update
          such information as necessary.
        </p>
      </section>

      <section id="prohibited-activities" className='py-8'>
        <h2 className='font-semibold mb-2'>Prohibited activities</h2>
        <ul>
          <li>Systematically retrieve data or content to create a collection or database.</li>
          <li>Trick, defraud, or mislead us and other users.</li>
          <li>Circumvent, disable, or interfere with security-related features.</li>
        </ul>
      </section>

      <section id="limitation-of-liability">
        <h2 className='font-semibold mb-2'>Limitation of liability</h2>
        <p>
          In no event shall we or our suppliers be liable for any damages (including,
          without limitation, damages for loss of data or profit, or due to business
          interruption) arising out of the use or inability to use the Site.
        </p>
      </section>

      <section id="governing-law" className='py-8'>
        <h2 className='font-semibold mb-2'>Governing law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of the
          jurisdiction where Prozeso is established, without regard to its conflict of
          law provisions.
        </p>
      </section>

      <section id="contact-us">
        <h2 className='font-semibold mb-2'>Contact us</h2>
        <p>
          If you have questions or comments about these Terms, please contact us at
          support@prozeso.com.
        </p>
      </section>
    </LegalContainer>
  );
}
