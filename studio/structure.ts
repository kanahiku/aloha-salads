import type { StructureBuilder } from 'sanity/structure';

const SINGLETONS: Record<string, string> = {
  announcementBar: 'singleton-announcement',
  siteNavigation: 'singleton-navigation',
  siteFooter: 'singleton-footer',
  homepageContent: 'singleton-homepage',
  aboutContent: 'singleton-about',
  cateringContent: 'singleton-catering',
  careersContent: 'singleton-careers',
  locationsContent: 'singleton-locations',
  ingredientsContent: 'singleton-ingredients',
  menuHub: 'singleton-menu',
  pressPage: 'singleton-press',
  reviewsPage: 'singleton-reviews',
};

/** One document per legal page, in the order of the footer links. */
const LEGAL_PAGES = [
  { slug: 'privacy-policy', title: 'Privacy Policy' },
  { slug: 'terms', title: 'Terms' },
  { slug: 'accessibility', title: 'Accessibility Statement' },
];

/** One document per catering occasion page. Order = order of the "More catering options" list. */
const CATERING_SUBPAGES = [
  { slug: 'corporate', title: 'Corporate Catering' },
  { slug: 'office-lunches', title: 'Office Lunch Catering' },
  { slug: 'meetings', title: 'Meeting Catering' },
  { slug: 'events', title: 'Event Catering' },
  { slug: 'parties', title: 'Party Catering' },
  { slug: 'schools', title: 'School Catering' },
  { slug: 'large-groups', title: 'Large Group Catering' },
];

/** One document per menu category page, in the order of the category cards. */
const MENU_PAGES = [
  { slug: 'salads', title: 'Signature Salads' },
  { slug: 'design-your-own-salad', title: 'Design Your Own Salad' },
  { slug: 'wraps-subs', title: 'Wraps & Subs' },
  { slug: 'soups', title: 'Soups' },
  { slug: 'drinks', title: 'Drinks' },
  { slug: 'kids', title: 'Keiki / Kids Menu' },
  { slug: 'vegan', title: 'Vegan Options' },
  { slug: 'vegetarian', title: 'Vegetarian Options' },
  { slug: 'healthy-options', title: 'Healthy Food & Options' },
  { slug: 'misc', title: 'Misc Favorites' },
];

/** One document per store, in list order. */
const STORES = [
  { slug: 'kailua', title: 'Kailua' },
  { slug: 'kahala', title: 'Kahala' },
  { slug: 'kaneohe', title: 'Kaneohe (Windward Mall)' },
  { slug: 'kapolei', title: 'Kapolei' },
  { slug: 'mililani', title: 'Mililani' },
  { slug: 'pearlridge', title: 'Pearlridge' },
];

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Announcement bar')
        .child(
          S.document().schemaType('announcementBar').documentId('singleton-announcement').title('Announcement bar')
        ),

      S.listItem()
        .title('Header & navigation')
        .child(
          S.document().schemaType('siteNavigation').documentId('singleton-navigation').title('Header & navigation')
        ),

      S.listItem()
        .title('Footer')
        .child(S.document().schemaType('siteFooter').documentId('singleton-footer').title('Footer')),

      S.listItem()
        .title('Homepage')
        .child(S.document().schemaType('homepageContent').documentId('singleton-homepage').title('Homepage')),

      S.listItem()
        .title('About')
        .child(S.document().schemaType('aboutContent').documentId('singleton-about').title('About')),

      S.listItem()
        .title('Catering')
        .child(
          S.list()
            .title('Catering')
            .items([
              S.listItem()
                .title('Catering menu (main page)')
                .child(
                  S.document().schemaType('cateringContent').documentId('singleton-catering').title('Catering menu')
                ),
              S.divider(),
              ...CATERING_SUBPAGES.map(({ slug, title }) =>
                S.listItem()
                  .title(title)
                  .child(
                    S.document().schemaType('cateringSubpage').documentId(`singleton-catering-${slug}`).title(title)
                  )
              ),
            ])
        ),

      S.listItem()
        .title('Careers')
        .child(S.document().schemaType('careersContent').documentId('singleton-careers').title('Careers')),

      S.listItem()
        .title('Locations')
        .child(
          S.list()
            .title('Locations')
            .items([
              S.listItem()
                .title('Locations page')
                .child(
                  S.document().schemaType('locationsContent').documentId('singleton-locations').title('Locations page')
                ),
              S.divider(),
              ...STORES.map(({ slug, title }) =>
                S.listItem()
                  .title(title)
                  .child(S.document().schemaType('locationPage').documentId(`singleton-location-${slug}`).title(title))
              ),
            ])
        ),

      S.listItem()
        .title('Ingredients')
        .child(S.document().schemaType('ingredientsContent').documentId('singleton-ingredients').title('Ingredients')),

      S.listItem()
        .title('Gift Cards')
        .child(S.document().schemaType('interiorPage').documentId('singleton-interior-gift-cards').title('Gift Cards')),

      S.listItem()
        .title('Nutrition & Allergens')
        .child(
          S.document()
            .schemaType('interiorPage')
            .documentId('singleton-interior-nutrition-allergens')
            .title('Nutrition & Allergens')
        ),

      S.divider(),

      S.listItem()
        .title('Menu')
        .child(
          S.list()
            .title('Menu')
            .items([
              S.listItem()
                .title('Menu page (main)')
                .child(S.document().schemaType('menuHub').documentId('singleton-menu').title('Menu page')),
              S.divider(),
              ...MENU_PAGES.map(({ slug, title }) =>
                S.listItem()
                  .title(title)
                  .child(S.document().schemaType('menuSubpage').documentId(`singleton-menu-${slug}`).title(title))
              ),
              S.divider(),
              S.listItem()
                .title('Dishes')
                .schemaType('menuItem')
                .child(
                  S.documentTypeList('menuItem')
                    .title('Menu items (dishes)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              S.listItem()
                .title('Categories')
                .schemaType('menuCategory')
                .child(
                  S.documentTypeList('menuCategory')
                    .title('Menu categories')
                    .defaultOrdering([
                      { field: 'order', direction: 'asc' },
                      { field: 'title', direction: 'asc' },
                    ])
                ),
            ])
        ),

      S.divider(),

      S.listItem()
        .title('Blog')
        .schemaType('blogPost')
        .child(
          S.documentTypeList('blogPost')
            .title('Blog posts')
            .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
        ),

      S.listItem()
        .title('Press & Media')
        .child(
          S.list()
            .title('Press & Media')
            .items([
              S.listItem()
                .title('Press page (text)')
                .child(S.document().schemaType('pressPage').documentId('singleton-press').title('Press page')),
              S.divider(),
              S.listItem()
                .title('Press cards')
                .schemaType('pressItem')
                .child(
                  S.documentTypeList('pressItem')
                    .title('Press cards')
                    .defaultOrdering([
                      { field: 'order', direction: 'asc' },
                      { field: '_createdAt', direction: 'desc' },
                    ])
                ),
            ])
        ),

      S.listItem()
        .title('Reviews page')
        .child(S.document().schemaType('reviewsPage').documentId('singleton-reviews').title('Reviews page')),

      S.listItem()
        .title('Legal pages')
        .child(
          S.list()
            .title('Legal pages')
            .items(
              LEGAL_PAGES.map(({ slug, title }) =>
                S.listItem()
                  .title(title)
                  .child(S.document().schemaType('legalPage').documentId(`singleton-legal-${slug}`).title(title))
              )
            )
        ),

      S.listItem()
        .title('Testimonials')
        .schemaType('testimonial')
        .child(
          S.documentTypeList('testimonial')
            .title('Testimonials')
            .defaultOrdering([
              { field: 'order', direction: 'asc' },
              { field: 'name', direction: 'asc' },
            ])
        ),
    ]);

export const singletonTypes = new Set(Object.keys(SINGLETONS));
