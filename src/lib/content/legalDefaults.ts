/**
 * Legal page copy (Accessibility, Privacy Policy, Terms) as originally approved.
 *
 * Two jobs:
 *  1. Seed source — `npm run seed:pages` writes these into Sanity as rich text.
 *  2. Safety net — if Sanity is unreachable, the pages still render this copy instead of going blank.
 *
 * Sanity is the source of truth. Edit copy in the Studio, not here.
 *
 * Writing format (same as what editors see in the Studio):
 *  - A string is one paragraph; an array of strings is one bullet list. A newline is a line break.
 *  - `[label](/path)` is a link; `**bold**` is bold.
 *  - Tokens are replaced with the live business details from src/config:
 *    {business} {host} {email} {phone} {street} {cityLine}
 */

export type LegalBlockSpec = string | string[];

export interface LegalPageSpec {
  slug: 'accessibility' | 'privacy-policy' | 'terms';
  meta: { title: string; description: string };
  heading: string;
  /** Text under the headline. */
  subtitle: string;
  sections: Array<{ heading: string; blocks: LegalBlockSpec[] }>;
  cta: { title: string; subtitle: string };
}

export const LEGAL_PAGE_DEFAULTS: LegalPageSpec[] = [
  {
    slug: 'accessibility',
    meta: {
      title: 'Accessibility Statement | {business}',
      description:
        'Accessibility statement for {host}, including our WCAG 2.1 AA approach and how to request help accessing the site.',
    },
    heading: 'Accessibility Statement',
    subtitle: 'Last reviewed: September 8, 2026',
    sections: [
      {
        heading: 'Our commitment',
        blocks: [
          '{business} is committed to improving the accessibility and usability of {host} for all visitors, including people who use assistive technology. Accessibility is an ongoing effort, and we continue to make improvements to the site over time.',
        ],
      },
      {
        heading: 'Our approach',
        blocks: [
          'As we build and maintain this website, our team works toward the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA as a reference standard. We do not claim full conformance. Steps we take include:',
          [
            'Writing descriptive text for images that carry meaning',
            'Using clear headings and page structure so content is easier to navigate',
            'Aiming for readable text sizes and sufficient contrast',
            'Supporting keyboard navigation where possible',
            'Labeling form fields so they are easier to complete',
            'Respecting reduced motion settings in your browser or operating system',
          ],
        ],
      },
      {
        heading: 'If you need help',
        blocks: [
          'If you have difficulty accessing any part of this website, or if you would like information in a different format, please contact us at {email} or {phone}. Please tell us the page you were on and what you were trying to do.',
        ],
      },
      {
        heading: 'Feedback',
        blocks: ['We welcome feedback on the accessibility of this website. Please send suggestions to {email}.'],
      },
    ],
    cta: {
      title: 'Questions?',
      subtitle: 'If you have questions about this site or about working with {business}, contact us.',
    },
  },
  {
    slug: 'privacy-policy',
    meta: {
      title: 'Privacy Policy | {business}',
      description:
        'How {business} collects, uses, and protects information from the website, contact form, and messaging programs.',
    },
    heading: 'Privacy Policy',
    subtitle:
      '{business} values your privacy and is committed to handling customer information and communications responsibly. This Privacy Policy explains how we collect, use, and protect your information when you visit our website, submit a contact form, or opt into our messaging programs.',
    sections: [
      {
        heading: 'Information We Collect',
        blocks: [
          'When you contact us through our website, we collect personal information that you voluntarily provide. This information includes:',
          ['Name', 'Email address', 'Phone number', 'ZIP code'],
        ],
      },
      {
        heading: 'How We Use Your Information',
        blocks: [
          'The information you provide is used to fulfill your requests and facilitate our services. We use this data to respond to your inquiries, provide estimates, schedule visits, and communicate with you about your project.',
        ],
      },
      {
        heading: 'Cookies and Website Analytics',
        blocks: [
          'Our website uses cookies and standard web analytics tools (including Google Tag Manager when configured) to help us understand how visitors interact with our site. These tools may collect non-identifying information such as your browser type, device information, and page views. You can manage or disable cookies through your web browser settings.',
        ],
      },
      {
        heading: 'Privacy Commitment and Data Sharing',
        blocks: [
          'End-user information, including personal details and phone numbers collected through our website, will not be shared with, sold to, or traded with third parties or affiliates for marketing or promotional purposes. Information is only used for the purposes described in this policy and in connection with the services you request from us.',
        ],
      },
      {
        heading: 'SMS Messaging Consent',
        blocks: [
          'By agreeing to receive SMS messages from {business}, you consent to receive text messages that may include:',
          [
            'Appointment-related communications',
            'Customer service communications',
            'Billing-related communications',
            'Marketing communications',
            'Other communications related to your interaction with {business}',
          ],
          'Message frequency may vary depending on the type of communication and your interaction with us.',
        ],
      },
      {
        heading: 'How to Opt Out of SMS Messages',
        blocks: [
          'You can cancel the SMS messaging service at any time. Reply STOP to the number that sent you the message. After sending STOP, you will receive a confirmation and will no longer receive SMS messages from that messaging program. You may opt in again later through the applicable sign-up process.',
        ],
      },
      {
        heading: 'Carrier and Message Cost Disclosures',
        blocks: [
          'Wireless carriers are not responsible for delayed or undelivered messages. Message and data rates may apply to messages sent to or received from {business}. For questions about your text messaging or data plan, contact your wireless service provider.',
        ],
      },
      {
        heading: 'Questions About Your Privacy',
        blocks: [
          'If you are experiencing an issue with our messaging program, reply HELP to any text message for assistance.',
          'If you have questions about how your information is handled, or need to update your contact preferences, please contact us:',
          '{business}\n{street}\n{cityLine}\nEmail: {email}\nPhone: {phone}',
        ],
      },
    ],
    cta: {
      title: 'Questions?',
      subtitle: 'If you have questions about this policy or about working with {business}, contact us.',
    },
  },
  {
    slug: 'terms',
    meta: { title: 'Terms | {business}', description: 'Terms of Service for {host}, operated by {business}.' },
    heading: 'Terms',
    subtitle: 'Last updated: September 8, 2026',
    sections: [
      {
        heading: '1. Acceptance of these terms',
        blocks: [
          'These Terms of Service govern your use of {host}, operated by {business}, referred to here as "we," "us," or "our." By accessing or using this website, you agree to these terms. If you do not agree, please do not use the site.',
        ],
      },
      {
        heading: '2. About this website',
        blocks: [
          'This website provides general information about our services and allows visitors to contact us. Using this website, submitting a form, or communicating with us through the site does not by itself create a service agreement. A relationship begins only when we and you sign a written agreement.',
        ],
      },
      {
        heading: '3. Use of this website',
        blocks: [
          'You may use this website for lawful purposes. You agree not to:',
          [
            'Use the site in a way that violates any applicable law or regulation',
            'Attempt to gain unauthorized access to the site, its servers, or any connected systems',
            'Introduce malware, or interfere with the normal operation or security of the site',
            'Copy, scrape, or republish site content for commercial purposes without our written permission',
            'Submit false, misleading, or fraudulent information through any form on the site',
          ],
          'We may restrict or suspend access to the site at any time if we reasonably believe use of the site breaches these terms.',
        ],
      },
      {
        heading: '4. Service information, pricing, and estimates',
        blocks: [
          'We try to keep the information on this website accurate, but content may become out of date and may contain errors. Descriptions of services, availability, timelines, and any pricing shown on this site are for general information only and are not binding offers. Any estimate or quote becomes binding only when provided in writing and signed by both parties.',
        ],
      },
      {
        heading: '5. Contact forms and submissions',
        blocks: [
          'When you submit a form on this website, you are asking us to contact you about our services, and you agree that we may respond by email, phone, or text using the details you provide. Please do not submit sensitive personal information, payment details, or confidential documents through the site. Information you send us is handled as described in our [Privacy Policy](/privacy-policy).',
        ],
      },
      {
        heading: '6. Text messages',
        blocks: [
          'If you provide a mobile number and opt in, we may send text messages about your inquiry, appointment, or project. Message and data rates may apply, and message frequency varies. Reply STOP to any message to opt out, or HELP for assistance. Consent to receive text messages is not a condition of purchasing any service.',
        ],
      },
      {
        heading: '7. Third-party links and embedded content',
        blocks: [
          'This website may link to, or embed content from, third-party services such as maps, analytics, and review platforms. We do not control those services and are not responsible for their content, availability, or privacy practices. Your use of a third-party service is governed by that providers own terms.',
        ],
      },
      {
        heading: '8. Cookies',
        blocks: [
          'This website may use cookies and similar technologies to operate the site, remember your preferences, and understand how the site is used. You can control cookies through your browser settings. See our [Privacy Policy](/privacy-policy) for more detail.',
        ],
      },
      {
        heading: '9. Intellectual property',
        blocks: [
          'Unless stated otherwise, the content on this website is owned by {business} or used with permission. You may view and print pages for your own personal or internal business use. You may not reproduce, distribute, or create derivative works from site content without our written permission.',
        ],
      },
      {
        heading: '10. Disclaimer of warranties',
        blocks: [
          'To the maximum extent permitted by applicable law, this website and its content are provided on an "as is" and "as available" basis, without warranties of any kind. Nothing in this section limits any warranty given in a signed agreement for services we perform for you.',
        ],
      },
      {
        heading: '11. Limitation of liability',
        blocks: [
          'To the maximum extent permitted by applicable law, {business} and its owners, employees, and contractors will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of this website. Where liability cannot be excluded, our total liability relating to this website is limited to one hundred United States dollars (USD 100).',
        ],
      },
      {
        heading: '12. Changes to these terms',
        blocks: [
          'We may update these terms from time to time. The current version is always posted on this page. Continued use of the site after an update means you accept the revised terms.',
        ],
      },
      {
        heading: '13. Contact',
        blocks: [
          'Questions about these terms can be sent to:\n\n{business}\n{street}\n{cityLine}\nEmail: {email}\nPhone: {phone}',
        ],
      },
    ],
    cta: {
      title: 'Questions?',
      subtitle: 'If you have questions about these terms or about working with {business}, contact us.',
    },
  },
];
