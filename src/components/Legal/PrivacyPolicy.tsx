"use client";

import LegalContainer from "@/components/Legal/LegalContainer";

export default function PrivacyPolicy() {
  const toc = [
    { id: "overview", label: "Overview" },
    { id: "data-we-collect", label: "Data we collect" },
    { id: "how-we-use-data", label: "How we use data" },
    { id: "sharing", label: "Sharing your information" },
    { id: "data-retention", label: "Data retention" },
    { id: "your-rights", label: "Your rights" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <LegalContainer title="Privacy Policy" updatedAt="Nov 3, 2025" toc={toc}>
      <section id="overview">
        <h2 className='font-semibold mb-2'>Overview</h2>
        <p>
          This Privacy Policy explains how Prozeso ("we", "us", "our") collects,
          uses, and shares information about you when you use our website and
          services.
        </p>
      </section>

      <section id="data-we-collect" className='py-8'>
        <h2 className='font-semibold mb-2'>Data we collect</h2>
        <ul>
          <li>Contact information such as name, email address, and phone number.</li>
          <li>Usage information such as pages visited, features used, and actions taken.</li>
          <li>Device and log information such as IP address, browser type, and settings.</li>
        </ul>
      </section>

      <section id="how-we-use-data">
        <h2 className='font-semibold mb-2'>How we use data</h2>
        <ul>
          <li>To provide, maintain, and improve our services.</li>
          <li>To communicate with you, including marketing and transactional messages.</li>
          <li>To ensure security, prevent fraud, and enforce our policies.</li>
        </ul>
      </section>

      <section id="sharing" className='py-8'>
        <h2 className='font-semibold mb-2'>Sharing your information</h2>
        <p>
          We do not sell your personal information. We may share information with
          service providers who perform services on our behalf, in accordance with
          contracts that protect your data.
        </p>
      </section>

      <section id="data-retention">
        <h2 className='font-semibold mb-2'>Data retention</h2>
        <p>
          We retain personal data only as long as necessary for the purposes described
          in this policy, unless a longer retention period is required by law.
        </p>
      </section>

      <section id="your-rights" className='py-8'>
        <h2 className='font-semibold mb-2'>Your rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct, delete,
          or restrict the processing of your personal data. Contact us to exercise
          these rights.
        </p>
      </section>

      <section id="contact">
        <h2 className='font-semibold mb-2'>Contact</h2>
        <p>
          Questions or requests regarding this policy can be sent to
          privacy@prozeso.com.
        </p>
      </section>
    </LegalContainer>
  );
}
