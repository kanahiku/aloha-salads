import type { BreadcrumbItem, PageSchema } from './types';
import { interiorPages } from '~/data/pages/interior';

const HOME: BreadcrumbItem = { name: 'Home', path: '/' };

function crumbsFor(path: string, name: string): BreadcrumbItem[] {
  const parts = path.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [HOME];
  let acc = '';
  for (let i = 0; i < parts.length; i++) {
    acc += `/${parts[i]}`;
    const isLast = i === parts.length - 1;
    const page = interiorPages[acc];
    items.push({
      name: isLast ? name : (page?.title ?? parts[i]),
      path: acc,
    });
  }
  return items;
}

const interiorSchemas: PageSchema[] = Object.values(interiorPages).map((page) => ({
  name: page.title,
  path: page.path,
  schemaType: page.path === '/about' ? 'AboutPage' : 'WebPage',
  description: page.metaDescription,
  faq: [],
  breadcrumb: crumbsFor(page.path, page.title),
}));

/** Catering occasion pages whose copy comes from Sanity and so are not in `interiorPages`. */
const cateringOccasionSchemas: PageSchema[] = [
  {
    name: 'Party Catering',
    path: '/catering/parties',
    schemaType: 'Service',
    serviceType: 'Party catering',
    description:
      'Order fresh party catering for your next event. Salad trays and wrap platters for birthdays, graduations, baby showers, and sports banquets across our seven Oahu locations.',
    faq: [],
    breadcrumb: crumbsFor('/catering/parties', 'Party Catering'),
  },
  {
    name: 'School Catering',
    path: '/catering/schools',
    schemaType: 'Service',
    serviceType: 'School catering',
    description:
      'Order fresh school catering for your campus. Salad trays, wrap platters, fresh soups, and beverages for pickup across our seven Oahu locations.',
    faq: [],
    breadcrumb: crumbsFor('/catering/schools', 'School Catering'),
  },
];

/**
 * Per-page schema.org data. Add an entry when Figma MCP creates a new route.
 * System routes below ship with every site (contact, reviews, blog, legal).
 */
export const pages: PageSchema[] = [
  {
    name: 'Home',
    path: '/',
    schemaType: 'WebPage',
    description: null,
    faq: [],
    breadcrumb: [HOME],
  },
  ...interiorSchemas,
  ...cateringOccasionSchemas,
  {
    name: 'Contact',
    path: '/contact',
    schemaType: 'ContactPage',
    description: null,
    faq: [],
    breadcrumb: [HOME, { name: 'Contact', path: '/contact' }],
  },
  {
    name: 'Reviews',
    path: '/reviews',
    schemaType: 'WebPage',
    description: null,
    faq: [],
    breadcrumb: [HOME, { name: 'Reviews', path: '/reviews' }],
  },
  {
    name: 'Blog',
    path: '/blog',
    schemaType: 'WebPage',
    description: null,
    faq: [],
    breadcrumb: [HOME, { name: 'Blog', path: '/blog' }],
  },
  {
    name: 'Privacy Policy',
    path: '/privacy-policy',
    schemaType: 'WebPage',
    description: null,
    faq: [],
    breadcrumb: [HOME, { name: 'Privacy Policy', path: '/privacy-policy' }],
  },
  {
    name: 'Terms',
    path: '/terms',
    schemaType: 'WebPage',
    description: null,
    faq: [],
    breadcrumb: [HOME, { name: 'Terms', path: '/terms' }],
  },
  {
    name: 'Accessibility',
    path: '/accessibility',
    schemaType: 'WebPage',
    description: null,
    faq: [],
    breadcrumb: [HOME, { name: 'Accessibility', path: '/accessibility' }],
  },
];
