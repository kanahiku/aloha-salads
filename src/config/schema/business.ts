import type { BusinessSchema } from './types';

/**
 * Client-specific business entity for schema.org JSON-LD.
 * Swap this file for the next site; keep `idFragment` unique per vertical
 * (e.g. "roofingcontractor", "legalservice").
 */
export const business: BusinessSchema = {
  idFragment: 'roofingcontractor',
  name: 'R&C Roofing Contractors',
  businessType: 'RoofingContractor',
  telephone: '+1-808-888-2524',
  email: 'info@safehomeservice.com',
  priceRange: '$$',
  address: {
    streetAddress: '3302 Campbell Ave',
    addressLocality: 'Honolulu',
    addressRegion: 'HI',
    postalCode: '96815',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '16:30',
    },
  ],
  description:
    'Licensed Honolulu roofing contractor (License C-33642) specializing in HAAG-certified roof inspections and insurance claim documentation, serving Oahu homeowners, property managers, general contractors, architects, and trustees.',
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: 'Hawaii Contractor License C-33642',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'HAAG Certified Inspector - Robert Pilato, Certification #201408313',
      recognizedBy: { '@type': 'Organization', name: 'HAAG Engineering' },
    },
  ],
  memberOf: { '@type': 'Organization', name: 'Building Industry Association of Hawaii (BIA Hawaii)' },
  award: ["Hawaii's Best 2023 - First Place", '2017 BBB Torch Awards Finalist'],
  sameAs: [
    'https://www.facebook.com/RCEnterprises808',
    'https://www.linkedin.com/company/hawaiiroofingcontractors',
    'https://www.yelp.com/biz/r-and-c-roofing-contractors-honolulu',
    'https://members.biahawaii.org/list/member/r-c-roofing-contractors-42902548',
  ],
  areaServed: { '@type': 'AdministrativeArea', name: 'Oahu, Hawaii' },
};
