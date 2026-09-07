import type { BreadcrumbItem, PageSchema } from './types';

const HOME: BreadcrumbItem = { name: 'Home', path: '/' };
const ROOF_INSPECTIONS: BreadcrumbItem = { name: 'Roof Inspections', path: '/roof-inspections' };
const CLAIMS: BreadcrumbItem = { name: 'Insurance Claim Help', path: '/claims' };
const SERVICES: BreadcrumbItem = { name: 'Services', path: '/services' };
const MATERIALS: BreadcrumbItem = { name: 'Roofing Materials', path: '/services/roofing-materials' };
const ABOUT: BreadcrumbItem = { name: 'About', path: '/about' };

/**
 * Per-page schema.org data. Paths must match live routes (no trailing slash).
 * Swap or extend this list for the next site.
 */
export const pages: PageSchema[] = [
  {
    name: 'Homepage FAQ',
    path: '/',
    schemaType: 'FAQOnly',
    description: null,
    faq: [
      {
        q: 'How do I know if my roof needs repair or replacement?',
        a: 'Start with an inspection. R&C Roofing evaluates the condition and explains whether the problem requires a repair or a full replacement.',
      },
      {
        q: 'What is a HAAG Certified roof inspector?',
        a: 'HAAG certification requires specialized education and testing in roof damage assessment. Robert Pilato holds HAAG certification #201408313.',
      },
      {
        q: 'Can R&C Roofing inspect storm damage?',
        a: 'Yes. We can inspect visible roof damage immediately following a storm and provide documented findings for your records.',
      },
      {
        q: 'Can R&C Roofing help with a roof insurance claim?',
        a: 'We inspect and document roof damage and provide contractor-side information related to the roofing work. We do not act as public adjusters.',
      },
      {
        q: 'What roofing services do you provide?',
        a: 'We provide residential and commercial roof inspections, roof repairs, total roof replacements, new roof installations, and gutter installations.',
      },
      {
        q: 'Where does R&C Roofing provide service?',
        a: 'We are based in Honolulu and serve the entire Oahu area, including the South Shore (Waikiki, Kaimuki), Windward Oahu (Kailua, Kaneohe), Central Oahu (Mililani, Pearl City), and Leeward Oahu (Kapolei, Ewa Beach).',
      },
    ],
    breadcrumb: [HOME],
  },

  {
    name: 'Roof Inspections',
    path: '/roof-inspections',
    schemaType: 'Service',
    serviceType: 'Roof Inspection',
    description:
      'Get the facts before replacing your roof. R&C Roofing provides HAAG-certified inspections on Oahu to determine if you need a repair or a replacement.',
    faq: [
      {
        q: 'Will you automatically recommend a new roof?',
        a: 'No. We recommend a repair if a localized fix can safely address the problem while the surrounding roof remains serviceable.',
      },
      {
        q: 'Do I need to be home during the inspection?',
        a: 'Only if we need to access the interior of your property. We require you to be present if your concern involves a ceiling leak or an attic condition.',
      },
      {
        q: 'Can an inspection help with my insurance claim?',
        a: 'Yes. We document visible roofing conditions and provide contractor side information. R&C Roofing is not a public adjuster and does not negotiate settlements or guarantee claim outcomes.',
      },
      {
        q: 'Can R&C repair the roof after inspecting it?',
        a: 'Yes. We operate under Hawaii Contractor License C-33642. Our crews can execute the necessary repairs or a full replacement if we find damage.',
      },
      {
        q: 'How much does a roof inspection cost?',
        a: 'Pricing depends entirely on the property and the type of inspection requested. Contact us directly to confirm availability and pricing for your specific situation.',
      },
    ],
    breadcrumb: [HOME, ROOF_INSPECTIONS],
  },
  {
    name: 'HAAG Certified Inspection',
    path: '/roof-inspections/haag-certified-inspection',
    schemaType: 'Service',
    serviceType: 'HAAG Certified Roof Inspection',
    description:
      'Schedule a HAAG Certified roof inspection with R&C Roofing Contractors. Get specialized roof damage assessment and documented findings for your Oahu property.',
    faq: [
      {
        q: 'What is a HAAG Certified Inspector?',
        a: "A HAAG Certified Inspector has completed specialized forensic damage assessment training. R&C's Robert Pilato holds HAAG Certification #201408313.",
      },
      {
        q: 'Is this different from a standard roof inspection?',
        a: 'Yes. The inspector applies advanced diagnostic training to distinguish between normal wear and actual structural damage.',
      },
      {
        q: 'Do I need this inspection after every storm?',
        a: 'No. You should request this evaluation if you notice new leaks, displaced materials, or visible changes after severe weather.',
      },
      {
        q: 'Will this report prove my insurance claim is covered?',
        a: 'No. We provide objective contractor documentation of the damage, but your insurance carrier dictates all final coverage decisions.',
      },
      {
        q: 'Can R&C repair the roof after the inspection?',
        a: 'Yes. We operate under Hawaii Contractor License C-33642 and can execute the necessary repairs or full replacement.',
      },
    ],
    breadcrumb: [HOME, ROOF_INSPECTIONS, { name: 'HAAG Certified Inspection', path: '/roof-inspections/haag-certified-inspection' }],
  },
  {
    name: 'Pre-Purchase Roof Inspection',
    path: '/roof-inspections/pre-purchase-roof-inspection',
    schemaType: 'Service',
    serviceType: 'Pre-Purchase Roof Inspection',
    description:
      'Schedule a pre-purchase roof inspection on Oahu with R&C Roofing Contractors. Get a closer look at roof condition before moving forward with a real estate transaction.',
    faq: [
      {
        q: 'Is a roof inspection different from a general home inspection?',
        a: 'Yes. A dedicated roof inspection focuses strictly on the structural integrity of the roofing system rather than a broad property overview.',
      },
      {
        q: 'Can R&C tell me exactly how many years the roof has left?',
        a: 'No. We evaluate visible deterioration to determine if you need immediate repair or replacement rather than predicting an exact failure date.',
      },
      {
        q: 'Can the inspection findings be used during negotiations?',
        a: 'Yes. You can use our objective documentation and repair estimates to inform your discussions with the seller.',
      },
      {
        q: 'Does R&C inspect the attic?',
        a: 'Yes. We review accessible interior attic areas when they are highly relevant to a specific leak or roofing concern.',
      },
      {
        q: 'Can R&C complete repairs after the inspection?',
        a: 'Yes. We operate under Hawaii Contractor License C-33642 and can execute any necessary repairs if you purchase the property.',
      },
    ],
    breadcrumb: [
      HOME,
      ROOF_INSPECTIONS,
      { name: 'Pre-Purchase Roof Inspection', path: '/roof-inspections/pre-purchase-roof-inspection' },
    ],
  },
  {
    name: "Pre-Listing / Seller's Roof Inspection",
    path: '/roof-inspections/pre-listing-roof-inspection',
    schemaType: 'Service',
    serviceType: 'Pre-Listing Roof Inspection',
    description:
      "Selling a home on Oahu? A pre-listing roof inspection from R&C helps you understand visible roof conditions before putting your property on the market.",
    faq: [
      {
        q: 'Do I have to repair everything R&C finds?',
        a: 'No. We outline the physical conditions we find, but you decide whether to repair, replace, or simply disclose the information to potential buyers.',
      },
      {
        q: 'Should I replace an older roof before listing my house?',
        a: 'Not automatically based on age alone. We evaluate the physical condition to determine if targeted repairs are sufficient or if a full replacement is structurally necessary.',
      },
      {
        q: "Is this different from the buyer's home inspection?",
        a: "Yes. This is a dedicated roofing evaluation you order before listing, whereas a buyer's general inspection is a broad property overview ordered later in the transaction.",
      },
      {
        q: 'Can R&C tell me what I am legally required to disclose?',
        a: 'No. We provide technical roofing facts, but you must direct all questions about legal disclosure obligations to your real estate professional.',
      },
      {
        q: 'Can R&C complete repairs before I list the home?',
        a: 'Yes. We operate under Hawaii Contractor License C-33642 and can execute any necessary roofing work prior to your sale.',
      },
    ],
    breadcrumb: [
      HOME,
      ROOF_INSPECTIONS,
      { name: "Pre-Listing / Seller's Roof Inspection", path: '/roof-inspections/pre-listing-roof-inspection' },
    ],
  },
  {
    name: 'Storm & Wind Damage Inspection',
    path: '/roof-inspections/storm-and-wind-damage-inspection',
    schemaType: 'Service',
    serviceType: 'Storm and Wind Damage Roof Inspection',
    description:
      'Schedule a storm damage roof inspection on Oahu with R&C Roofing Contractors. Get HAAG Certified assessment and documentation of visible wind and roof damage.',
    faq: [
      {
        q: 'How do I know if my roof has wind damage?',
        a: 'Visible signs include missing materials, new leaks, or debris impact. Wind uplift often breaks seals without blowing shingles off entirely, which requires a professional inspection to identify.',
      },
      {
        q: 'Should I climb onto my roof after a storm?',
        a: 'No. Wet or damaged roofs create severe safety risks.',
      },
      {
        q: 'Can R&C document storm damage for an insurance claim?',
        a: 'Yes. We inspect accessible areas and provide objective contractor documentation of the visible damage.',
      },
      {
        q: 'Does homeowners insurance cover roof wind damage?',
        a: 'Coverage depends entirely on the terms and exclusions of your individual policy.',
      },
      {
        q: 'Should I have my roof inspected after every storm?',
        a: 'No. You only need an inspection if you notice a new leak, displaced materials, or visible debris impact after severe weather.',
      },
    ],
    breadcrumb: [
      HOME,
      ROOF_INSPECTIONS,
      { name: 'Storm & Wind Damage Inspection', path: '/roof-inspections/storm-and-wind-damage-inspection' },
    ],
  },
  {
    name: 'Annual Maintenance Inspection',
    path: '/roof-inspections/annual-maintenance-inspection',
    schemaType: 'Service',
    serviceType: 'Annual Roof Maintenance Inspection',
    description:
      'Schedule an annual roof maintenance inspection on Oahu with R&C Roofing Contractors. Identify visible wear, document roof conditions, and address developing problems before they become larger repairs.',
    faq: [
      {
        q: 'Does every roof need an annual inspection?',
        a: 'Not every roof has the same maintenance needs. Age, location, and environmental exposure dictate your ideal schedule, but an annual check provides consistent tracking.',
      },
      {
        q: 'Is a maintenance inspection only for older roofs?',
        a: 'No. Newer roofs can still develop localized issues around flashing, penetrations, or drainage areas before the main materials age.',
      },
      {
        q: 'Can R&C inspect multiple buildings for an HOA or commercial property?',
        a: 'Yes. We work with property managers and boards to evaluate multi-unit properties and provide contractor-side recommendations.',
      },
      {
        q: 'Should I schedule another inspection after a storm?',
        a: 'Yes. If you notice missing materials or a new leak after severe weather, request a dedicated storm damage inspection even if your annual check is not due.',
      },
      {
        q: 'Can R&C repair the damage found during maintenance?',
        a: "Yes. We operate under Hawaii Contractor License C-33642 and can execute any targeted repairs necessary to extend your roof's lifespan.",
      },
    ],
    breadcrumb: [
      HOME,
      ROOF_INSPECTIONS,
      { name: 'Annual Maintenance Inspection', path: '/roof-inspections/annual-maintenance-inspection' },
    ],
  },

  {
    name: 'Insurance Claim Help',
    path: '/claims',
    schemaType: 'Service',
    serviceType: 'Roof Insurance Claim Documentation',
    description:
      'Get roof insurance claim help from R&C Roofing Contractors on Oahu. We inspect roof damage, document findings, provide roofing scope information, and complete approved repair work.',
    faq: [
      {
        q: 'Should I call R&C before filing an insurance claim?',
        a: 'Yes. A professional inspection gives you the structural facts you need before deciding whether to file a claim with your carrier.',
      },
      {
        q: 'Can R&C tell me whether my roof damage is covered?',
        a: 'No. We identify the physical damage, but your insurance carrier determines coverage based entirely on the terms of your policy.',
      },
      {
        q: 'Does R&C negotiate with the insurance company?',
        a: 'No. We are not public adjusters. We provide contractor-side documentation and answer technical questions, but we do not negotiate settlements.',
      },
      {
        q: 'What if my insurance claim is denied?',
        a: 'Review your carrier’s explanation alongside your policy documents. If your carrier needs additional physical evidence, we can inspect the property again to document relevant conditions.',
      },
      {
        q: 'Can R&C complete the repair or replacement after the claim?',
        a: 'Yes. We operate under Hawaii Contractor License C-33642 and can execute the agreed-upon repair or full replacement once your project moves forward.',
      },
    ],
    breadcrumb: [HOME, CLAIMS],
  },
  {
    name: 'How the Claim Process Works',
    path: '/claims/how-the-claim-process-works',
    schemaType: 'WebPage',
    description:
      'Learn how the roof insurance claim process works in Hawaii and where R&C Roofing can help with inspections, damage documentation, roofing scopes, and repairs.',
    faq: null,
    breadcrumb: [HOME, CLAIMS, { name: 'How the Claim Process Works', path: '/claims/how-the-claim-process-works' }],
  },
  {
    name: 'Denied or Underpaid Claims',
    path: '/claims/denied-or-underpaid-claims',
    schemaType: 'WebPage',
    description:
      'If your Hawaii roof claim was denied or the approved scope does not match the roofing work needed, R&C can inspect the roof and provide contractor-side documentation.',
    faq: [
      {
        q: 'What should I do if my insurance claim was denied?',
        a: 'Start by reviewing the carrier’s written explanation. If you need clarity on the physical condition of the roof itself, R&C can inspect the property and provide objective contractor-side findings.',
      },
      {
        q: 'Can R&C overturn a denied insurance claim?',
        a: 'No. We do not make insurance coverage decisions and cannot legally force a carrier to change their ruling. We simply provide the physical roof documentation.',
      },
      {
        q: 'What does it mean if the insurance estimate is lower than the contractor estimate?',
        a: 'This usually means the carrier and the contractor are using different scopes of work or project assumptions. We can explain what is required to fix your roof properly, but your carrier decides what costs they will cover.',
      },
      {
        q: 'Should I hire a public adjuster or an attorney?',
        a: 'R&C cannot advise you on legal representation or public adjusting. If you need help interpreting your policy or fighting a disputed denial, you should speak with a licensed insurance professional.',
      },
      {
        q: 'Can R&C complete the repairs if the claim gets reopened?',
        a: 'Yes. We operate under Hawaii Contractor License C-33642 and can execute the approved repair or full replacement once your project is cleared to move forward.',
      },
    ],
    breadcrumb: [HOME, CLAIMS, { name: 'Denied or Underpaid Claims', path: '/claims/denied-or-underpaid-claims' }],
  },

  {
    name: 'My Roof Is Leaking',
    path: '/roof-problems/my-roof-is-leaking',
    schemaType: 'WebPage',
    description:
      'Roof leaking during rain on Oahu? See what to do now, how urgent the leak may be, what could be causing it, and how R&C Roofing finds the source.',
    faq: null,
    breadcrumb: [HOME, { name: 'My Roof Is Leaking', path: '/roof-problems/my-roof-is-leaking' }],
  },
  {
    name: 'Storm Damage on My Roof',
    path: '/roof-problems/storm-damage-on-my-roof',
    schemaType: 'WebPage',
    description:
      'Think a storm damaged your roof on Oahu? Learn what to check safely, what storm damage can look like, and how R&C Roofing determines whether repair, replacement, or insurance documentation may be needed.',
    faq: null,
    breadcrumb: [HOME, { name: 'Storm Damage on My Roof', path: '/roof-problems/storm-damage-on-my-roof' }],
  },
  {
    name: 'My Roof Is at End of Life',
    path: '/roof-problems/my-roof-is-at-end-of-life',
    schemaType: 'WebPage',
    description:
      'Wondering if your roof is at the end of its life? Learn the signs that may point to roof replacement, when repair may still make sense, and how R&C evaluates aging roofs on Oahu.',
    faq: null,
    breadcrumb: [HOME, { name: 'My Roof Is at End of Life', path: '/roof-problems/my-roof-is-at-end-of-life' }],
  },
  {
    name: 'My Insurance Claim Was Denied',
    path: '/roof-problems/my-insurance-claim-was-denied',
    schemaType: 'WebPage',
    description:
      'Was your roof insurance claim denied in Hawaii? Learn what to review next and how R&C can document roof conditions from the contractor side.',
    faq: null,
    breadcrumb: [HOME, { name: 'My Insurance Claim Was Denied', path: '/roof-problems/my-insurance-claim-was-denied' }],
  },
  {
    name: 'Buying or Selling a Home',
    path: '/roof-problems/buying-or-selling-a-home',
    schemaType: 'WebPage',
    description:
      'Buying or selling a home on Oahu? Learn what roof problems to look into before closing and how a roof inspection can clarify repair or replacement needs.',
    faq: null,
    breadcrumb: [HOME, { name: 'Buying or Selling a Home', path: '/roof-problems/buying-or-selling-a-home' }],
  },
  {
    name: 'Preparing for Hurricane Season',
    path: '/roof-problems/preparing-for-hurricane-season',
    schemaType: 'WebPage',
    description:
      'Prepare your Oahu roof for hurricane season. Learn what weather risks to expect, how to inspect for wind vulnerabilities, and how R&C Roofing helps protect your home.',
    faq: null,
    breadcrumb: [HOME, { name: 'Preparing for Hurricane Season', path: '/roof-problems/preparing-for-hurricane-season' }],
  },

  {
    name: 'Our Story & Credentials',
    path: '/about/our-story',
    schemaType: 'AboutPage',
    description:
      'Learn the story behind R&C Roofing Contractors, the experience that shaped our inspection-first approach, and the roofing expertise behind our work on Oahu.',
    faq: null,
    breadcrumb: [HOME, ABOUT, { name: 'Our Story', path: '/about/our-story' }],
  },

  {
    name: 'Roofing Materials',
    path: '/services/roofing-materials',
    schemaType: 'Service',
    serviceType: 'Roofing Material Consultation',
    description:
      'Compare roofing materials for Oahu properties, including metal, asphalt shingles, stone-coated steel, and clay or concrete tile. Explore your options with R&C Roofing.',
    faq: [
      {
        q: 'What roofing materials does R&C install on Oahu?',
        a: 'We work with a variety of proven residential and commercial systems, including metal roofing, asphalt shingles, stone-coated steel, and clay or concrete tile.',
      },
      {
        q: 'What is the best roofing material for a home on Oahu?',
        a: 'There is no single "best" material for every property. The right choice depends on your roof\'s design, neighborhood weather exposure, structural load capacity, and budget.',
      },
      {
        q: 'Does living near the ocean affect my roofing material choice?',
        a: 'Yes. Coastal salt air can accelerate corrosion on certain exposed metal fasteners, flashing, and finishes, making material and component selection critical for oceanfront properties.',
      },
      {
        q: 'Can I change to a different roofing material during a replacement?',
        a: "Often yes, but it depends on your existing roof structure, roof pitch, and weight capacity. We evaluate these factors before recommending a material switch.",
      },
      {
        q: 'Should I choose my roofing material before scheduling an inspection?',
        a: "No. If you are unsure which material fits your property best, we can evaluate your roof's physical condition first and then discuss which options align with your project goals.",
      },
    ],
    breadcrumb: [HOME, SERVICES, MATERIALS],
  },
  {
    name: 'Metal Roofing',
    path: '/services/roofing-materials/metal-roofing',
    schemaType: 'Service',
    serviceType: 'Metal Roofing Installation',
    description:
      'Explore metal roofing for Oahu homes and properties. Learn what to consider for coastal exposure, roof design, cost, installation, and material selection with R&C Roofing.',
    faq: null,
    breadcrumb: [HOME, SERVICES, MATERIALS, { name: 'Metal Roofing', path: '/services/roofing-materials/metal-roofing' }],
  },
  {
    name: 'Asphalt Shingle Roofing',
    path: '/services/roofing-materials/asphalt-shingle-roofing',
    schemaType: 'Service',
    serviceType: 'Asphalt Shingle Roofing Installation',
    description:
      'Explore asphalt shingle roofing for Oahu homes. Compare shingle styles, wind resistance, weather performance, and professional installation with R&C.',
    faq: null,
    breadcrumb: [
      HOME,
      SERVICES,
      MATERIALS,
      { name: 'Asphalt Shingle Roofing', path: '/services/roofing-materials/asphalt-shingle-roofing' },
    ],
  },
  {
    name: 'Stone-Coated Steel Roofing',
    path: '/services/roofing-materials/stone-coated-steel-roofing',
    schemaType: 'Service',
    serviceType: 'Stone-Coated Steel Roofing Installation',
    description:
      'Explore stone-coated steel roofing for Oahu homes. Learn how it differs from other metal roofing, what to consider in Hawaii, and whether it fits your property.',
    faq: null,
    breadcrumb: [
      HOME,
      SERVICES,
      MATERIALS,
      { name: 'Stone-Coated Steel Roofing', path: '/services/roofing-materials/stone-coated-steel-roofing' },
    ],
  },
  {
    name: 'Tile Roofing (Clay & Concrete)',
    path: '/services/roofing-materials/tile-roofing',
    schemaType: 'Service',
    serviceType: 'Clay and Concrete Tile Roofing Installation',
    description:
      'Explore clay and concrete tile roofing for Oahu properties. Compare tile options, structural considerations, Hawaii conditions, costs, and installation with R&C Roofing.',
    faq: null,
    breadcrumb: [
      HOME,
      SERVICES,
      MATERIALS,
      { name: 'Tile Roofing (Clay & Concrete)', path: '/services/roofing-materials/tile-roofing' },
    ],
  },
  {
    name: 'Slate & Rubber Slate Roofing',
    path: '/services/roofing-materials/slate-roofing',
    schemaType: 'Service',
    serviceType: 'Slate and Rubber Slate Roofing Installation',
    description:
      'Explore slate and synthetic rubber slate roofing for Oahu properties. Learn about natural stone durability, lightweight alternatives, and expert installation with R&C.',
    faq: null,
    breadcrumb: [
      HOME,
      SERVICES,
      MATERIALS,
      { name: 'Slate & Rubber Slate Roofing', path: '/services/roofing-materials/slate-roofing' },
    ],
  },

  {
    name: 'Roofing Services',
    path: '/services',
    schemaType: 'Service',
    serviceType: 'Roofing Services',
    description:
      'Explore our complete range of roofing services on Oahu. We provide licensed roof repairs, total replacements, and commercial roofing solutions.',
    faq: [
      {
        q: 'Are you a licensed and insured roofing contractor?',
        a: 'Yes. R&C operates under Hawaii Contractor License C-33642 and carries full general liability and workers’ compensation insurance.',
      },
      {
        q: 'How do I know if I need a repair or a full replacement?',
        a: 'We rely on diagnostic facts gathered during a professional inspection. We recommend a full replacement only when a targeted repair is structurally impossible or financially irresponsible.',
      },
      {
        q: 'Do you handle the building permits for a new roof?',
        a: 'Yes. We manage the entire municipal permitting process for Oahu properties from start to finish.',
      },
      {
        q: 'What types of roofing materials do you install?',
        a: 'We install asphalt shingles, standing seam metal, stone-coated steel, concrete tile, and commercial roofing systems matched to your neighborhood microclimate.',
      },
      {
        q: 'How long does a standard roof replacement take?',
        a: 'Most residential roof replacements are completed in two to three days, while commercial timelines vary based on square footage and building complexity.',
      },
    ],
    breadcrumb: [HOME, SERVICES],
  },
  {
    name: 'Roof Repair',
    path: '/services/roof-repair',
    schemaType: 'Service',
    serviceType: 'Roof Repair',
    description:
      'Need roof repair on Oahu? R&C Roofing Contractors repairs leaks, damaged shingles, flashing problems, and other localized roof issues. Schedule an inspection.',
    faq: null,
    breadcrumb: [HOME, SERVICES, { name: 'Roof Repair', path: '/services/roof-repair' }],
  },
  {
    name: 'Roof Replacement & New Installation',
    path: '/services/roof-replacement-and-new-installation',
    schemaType: 'Service',
    serviceType: 'Roof Replacement and New Installation',
    description:
      'Planning a roof replacement or new roof installation on Oahu? R&C Roofing Contractors installs residential and commercial roofing systems for Hawaii properties.',
    faq: null,
    breadcrumb: [
      HOME,
      SERVICES,
      { name: 'Roof Replacement & New Installation', path: '/services/roof-replacement-and-new-installation' },
    ],
  },
  {
    name: 'Residential Roofing',
    path: '/services/residential-roofing',
    schemaType: 'Service',
    serviceType: 'Residential Roofing',
    description:
      'Explore residential roofing services on Oahu from R&C Roofing Contractors, including roof repair, replacement, inspections, gutters, and roofing material options.',
    faq: null,
    breadcrumb: [HOME, SERVICES, { name: 'Residential Roofing', path: '/services/residential-roofing' }],
  },
  {
    name: 'Commercial Roofing',
    path: '/services/commercial-roofing',
    schemaType: 'Service',
    serviceType: 'Commercial Roofing',
    description:
      'Commercial roofing services on Oahu from R&C Roofing Contractors. We provide roof inspections, repairs, replacement, and roofing support for property owners and project teams.',
    faq: null,
    breadcrumb: [HOME, SERVICES, { name: 'Commercial Roofing', path: '/services/commercial-roofing' }],
  },
  {
    name: 'Gutter Installation & Repair',
    path: '/services/gutter-installation-and-repair',
    schemaType: 'Service',
    serviceType: 'Gutter Installation and Repair',
    description:
      'Need new gutters on Oahu? R&C Roofing Contractors provides gutter installation and gutter services for Hawaii homes and properties. Request an estimate.',
    faq: null,
    breadcrumb: [HOME, SERVICES, { name: 'Gutter Installation & Repair', path: '/services/gutter-installation-and-repair' }],
  },

  {
    name: 'Contact',
    path: '/contact',
    schemaType: 'ContactPage',
    description:
      'Contact R&C Roofing Contractors in Honolulu for roof inspections, repairs, replacements, storm damage, commercial roofing, gutters, and other roofing needs.',
    faq: null,
    breadcrumb: [HOME, { name: 'Contact', path: '/contact' }],
  },
  {
    name: 'Homeowners',
    path: '/who-we-serve/homeowners',
    schemaType: 'WebPage',
    description:
      'Worried about your roof? R&C Roofing Contractors helps Oahu homeowners understand roof problems, compare repair and replacement options, and plan the right next step.',
    faq: [
      {
        q: 'I do not know whether I need a repair or replacement. Where should I start?',
        a: 'Start with an evaluation of the roof. R&C can look at the existing condition and explain whether a localized repair, larger project, or continued monitoring should be considered.',
      },
      {
        q: 'Will R&C recommend replacement if my roof can be repaired?',
        a: 'Recommendations are based strictly on the condition of the roof and the extent of the problem. A localized issue will always call for repair rather than an unnecessary complete replacement.',
      },
      {
        q: 'What roofing services does R&C provide for homeowners?',
        a: 'R&C provides roof inspections, roof repairs, roof replacements and new installations, gutter services, and multiple material options.',
      },
      {
        q: 'Do I need to know what is wrong before scheduling an inspection?',
        a: 'No. You can contact R&C with what you are seeing, and the roof can be evaluated from there.',
      },
    ],
    breadcrumb: [HOME, { name: 'Homeowners', path: '/who-we-serve/homeowners' }],
  },
  {
    name: 'Property Managers & AOAO / HOA Boards',
    path: '/who-we-serve/property-managers-aoao-hoa-boards',
    schemaType: 'WebPage',
    description:
      'Roofing support for Oahu property managers, AOAO and HOA boards. Get roof condition information, repair and replacement planning, project scopes, and multi-building roofing support from R&C Roofing.',
    faq: [
      {
        q: 'Does R&C work with AOAO and HOA boards?',
        a: 'Yes. Property managers and association boards are core customer groups for our commercial and multi-family roofing services.',
      },
      {
        q: 'Can R&C assess multiple buildings?',
        a: 'Multi-building roofing needs can be evaluated under an agreed project scope, helping management identify differences in condition and prioritize.',
      },
      {
        q: 'Can you help us plan which roofs should be addressed first?',
        a: 'R&C provides roofing condition information to help management and boards consider priorities, though final budgeting and capital-planning decisions remain with the association.',
      },
      {
        q: 'Can roofing work be completed in phases?',
        a: 'Potentially. Phasing depends on the roofing system, property configuration, project scope, material availability, and other site-specific factors.',
      },
      {
        q: 'Can R&C help with a reserve study?',
        a: 'R&C does not prepare reserve studies, but we provide condition data, proposed scopes, and pricing that may be useful to your reserve-study professionals.',
      },
    ],
    breadcrumb: [
      HOME,
      { name: 'Property Managers & AOAO / HOA Boards', path: '/who-we-serve/property-managers-aoao-hoa-boards' },
    ],
  },
  {
    name: 'General Contractors',
    path: '/who-we-serve/general-contractors',
    schemaType: 'WebPage',
    description:
      'Need a roofing subcontractor on Oahu? R&C Roofing Contractors works with general contractors on roofing scopes, scheduling, trade coordination, inspections, repairs, replacement, and new installation.',
    faq: [
      {
        q: 'Does R&C work as a roofing subcontractor for general contractors?',
        a: 'Yes. General contractors are a core client group for our commercial and residential subcontractor services.',
      },
      {
        q: 'What roofing work can R&C perform for a GC-led project?',
        a: 'We provide roofing inspections, roof repairs, roof replacements, new roof installation, and multiple material options.',
      },
      {
        q: 'Can R&C coordinate with mechanical and plumbing trades?',
        a: 'Yes. We coordinate roofing work where roof penetrations and other trade interfaces affect the roofing scope, while the GC maintains overall trade sequencing.',
      },
      {
        q: 'Can R&C meet our construction schedule?',
        a: 'We review requested schedules to determine whether roofing work can be coordinated within proposed project requirements before committing to timelines.',
      },
      {
        q: 'Can R&C help with material selection?',
        a: 'Yes, within our roofing scope. Projects requiring specialized architectural engineering or custom specifications should remain coordinated with project designers.',
      },
    ],
    breadcrumb: [HOME, { name: 'General Contractors', path: '/who-we-serve/general-contractors' }],
  },
  {
    name: 'Architects & Specifiers',
    path: '/who-we-serve/architects-and-specifiers',
    schemaType: 'WebPage',
    description:
      'Roofing support for Oahu architects and specifiers. Discuss roofing materials, constructability, product information, roof details, project requirements, and installation considerations with R&C Roofing Contractors.',
    faq: [
      {
        q: 'Can R&C help architects evaluate roofing materials?',
        a: 'Yes. R&C can provide contractor-side information about roofing materials and systems within our current installation capabilities, though final specification remains with project decision-makers.',
      },
      {
        q: 'Can R&C review roofing details before bidding?',
        a: 'Yes. We review available roofing information to identify contractor-side scope or constructability questions prior to bid finalized stages.',
      },
      {
        q: 'Can R&C provide wind-uplift information?',
        a: 'R&C provides available manufacturer and roofing-system information associated with the products we install. Project-specific wind design or structural calculations should remain with the licensed engineer.',
      },
      {
        q: 'Can R&C inspect an existing roof before we complete renovation drawings?',
        a: 'Yes. R&C provides HAAG Certified roof inspection services to help document visible existing roofing conditions for renovation or reroofing projects.',
      },
      {
        q: 'Can R&C suggest an alternative if a specified roofing product is unavailable?',
        a: 'Yes. We can identify available roofing alternatives within our capabilities and provide product information for the design team’s formal substitution approval process.',
      },
    ],
    breadcrumb: [HOME, { name: 'Architects & Specifiers', path: '/who-we-serve/architects-and-specifiers' }],
  },
  {
    name: 'Trustees & Estate Managers',
    path: '/who-we-serve/trustees-and-estate-managers',
    schemaType: 'WebPage',
    description:
      'Roofing assessments and contractor documentation for Oahu trustees and estate managers. Understand roof condition, deferred maintenance, repair priorities, replacement needs, and project costs with R&C Roofing.',
    faq: [
      {
        q: 'Can R&C provide a written assessment of a roof?',
        a: 'Yes. R&C provides roof inspection services and can document observable roofing conditions according to the agreed inspection scope.',
      },
      {
        q: 'Can a roof assessment help with an estate valuation?',
        a: 'Roofing information can help appraisers, trustees, or managers understand known roof conditions and possible expenses. However, R&C does not perform real estate or estate valuations.',
      },
      {
        q: 'Can R&C identify deferred roofing maintenance?',
        a: 'Yes. We can evaluate visible roofing conditions and identify items that may need repair, monitoring, or broader roofing consideration. Legal or fiduciary conclusions remain outside our role.',
      },
      {
        q: 'Do we need to replace an older roof immediately?',
        a: 'Not necessarily. Age alone does not determine the appropriate action. The physical condition of the system should always be evaluated first.',
      },
      {
        q: 'Can R&C work directly with our property manager or attorney?',
        a: 'R&C can coordinate roofing-related communication with authorized property representatives according to your estate’s requirements.',
      },
    ],
    breadcrumb: [HOME, { name: 'Trustees & Estate Managers', path: '/who-we-serve/trustees-and-estate-managers' }],
  },
];
