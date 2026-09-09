import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const publisher = 'Self-published via Lulu';

const ctas = (ebook, paperback) => [
  { _key: 'ebook', _type: 'bookCta', label: 'Buy eBooks $4.99', href: ebook },
  { _key: 'paperback', _type: 'bookCta', label: 'Buy Paperback $9.99', href: paperback },
];

const books = [
  {
    slug: 'healthy-wealthy-wise',
    series: 'textbook',
    order: 0,
    year: 2023,
    title: 'Healthy, Wealthy & Wise',
    subtitle: 'An Integrated Approach to Modern Wellness and Sustainable Success',
    description:
      'Dr. Peterson challenges the conventional siloed approach to health and success, presenting instead a holistic framework that recognizes the deep interdependence of physical vitality, financial well-being, and wisdom-driven decision-making.\n\nThrough compelling case studies and practical frameworks, readers learn to identify and address the hidden costs of imbalanced success.',
    badges: ['Integrated Wellness', 'Performance Optimization', 'Stress Management', 'Longevity Strategy'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/healthy-wealthy-wise/ebook/product-2mn9epg.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/healthy-wealthy-wise/paperback/product-m2vwe49.html?page=1&pageSize=4'
    ),
  },
  {
    slug: 'hair',
    series: 'guidebook',
    order: 1,
    year: 2026,
    title: 'Hair',
    subtitle: 'What Aging Actually Does to Your Hair — and What You Can Do About It',
    description:
      'Explains the biological causes behind graying, thinning, and hair loss — the roles hormones, inflammation, and cellular aging play — and separates which treatments are backed by clinical evidence from those driven by marketing.',
    badges: ['Hair Health', 'Aging Science'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/hair/ebook/product-q6qwzpw.html',
      'https://www.lulu.com/shop/robert-peterson/hair/paperback/product-nvnkm7w.html'
    ),
    podcastHref: '/podcast#hair-wanted-and-unwanted',
  },
  {
    slug: 'brain',
    series: 'guidebook',
    order: 2,
    year: 2026,
    title: 'Brain',
    subtitle: "Why Cognitive Decline Isn't as Inevitable as You've Been Told",
    description:
      "Draws on clinical experience in functional medicine, neuroscience, and longevity research to explain what's really behind memory loss, brain fog, and fatigue — and what can be done to protect cognitive resilience.",
    badges: ['Brain Health', 'Cognitive Aging'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/brain/ebook/product-zmnjkz4.html',
      'https://www.lulu.com/shop/robert-peterson/brain/paperback/product-w4gjzr9.html'
    ),
    podcastHref: '/podcast#brain',
  },
  {
    slug: 'eyes',
    series: 'guidebook',
    order: 3,
    year: 2026,
    title: 'Eyes',
    subtitle: 'The Science Behind Age-Related Vision Loss',
    description:
      'Blends ophthalmology, longevity science, and emerging technologies to explain how vision changes with age and what current research shows about preserving it.',
    badges: ['Vision Health', 'Aging Science'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/eyes/ebook/product-9574zrd.html',
      'https://www.lulu.com/shop/robert-peterson/eyes/paperback/product-e7qmddp.html'
    ),
    podcastHref: '/podcast#eyes',
  },
  {
    slug: 'ears',
    series: 'guidebook',
    order: 4,
    year: 2026,
    title: 'Ears',
    subtitle: 'Protecting Your Hearing and Balance as You Age',
    description:
      "Covers how the inner ear changes over time and why hearing decline has consequences well beyond hearing itself — including cognition and balance — plus what's actually proven to help.",
    badges: ['Hearing Health', 'Balance'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/ears/ebook/product-kvg29qz.html',
      'https://www.lulu.com/shop/robert-peterson/ears/paperback/product-65kn9vd.html'
    ),
    podcastHref: '/podcast#ears',
  },
  {
    slug: 'throat',
    series: 'guidebook',
    order: 5,
    year: 2026,
    title: 'Throat',
    subtitle: 'Voice, Swallowing, and the Overlooked Gateway to Health',
    description:
      'Explains how the throat, vocal cords, and swallowing mechanics change with age — and why protecting them matters for nutrition, speech, and quality of life.',
    badges: ['Voice', 'Swallowing', 'ENT Health'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/throat/ebook/product-84qryjg.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/throat/paperback/product-gj58d94.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#throat',
  },
  {
    slug: 'nose',
    series: 'guidebook',
    order: 6,
    year: 2026,
    title: 'Nose',
    subtitle: 'What a Fading Sense of Smell Is Really Telling You',
    description:
      "Explains how the sense of smell changes with age and why it's often one of the earliest, most overlooked signals of broader neurological change.",
    badges: ['Sense of Smell', 'Neurological Health'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/nose/ebook/product-57q5g2n.html',
      'https://www.lulu.com/shop/robert-peterson/nose/paperback/product-454286v.html'
    ),
    podcastHref: '/podcast#nose',
  },
  {
    slug: 'teeth-mouth',
    series: 'guidebook',
    order: 7,
    year: 2026,
    title: 'Teeth & Mouth',
    subtitle: 'The Overlooked Link Between Oral Health and Aging Well',
    description:
      'Draws on dentistry, microbiology, and longevity science to explain how the mouth changes with age — and its underappreciated role in long-term, whole-body health.',
    badges: ['Oral Health', 'Whole-Body Health'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/teeth-and-mouth/ebook/product-84m8kvn.html',
      'https://www.lulu.com/shop/robert-peterson/teeth-mouth/paperback/product-rmknrwy.html'
    ),
    podcastHref: '/podcast#teeth-and-mouth',
  },
  {
    slug: 'face-neck',
    series: 'guidebook',
    order: 8,
    year: 2026,
    title: 'Face & Neck',
    subtitle: 'The Structural Truth Behind Facial Aging',
    description:
      "Goes beyond the cosmetic to explain the anatomical and dermatological shifts behind facial and neck aging — and what's known about preserving structure and function, not just appearance.",
    badges: ['Facial Aging', 'Skin & Structure'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/face-and-neck/ebook/product-dy4qmk8.html',
      'https://www.lulu.com/shop/robert-peterson/face-neck/paperback/product-zmn2rrn.html'
    ),
    podcastHref: '/podcast#face-and-neck',
  },
  {
    slug: 'lungs',
    series: 'guidebook',
    order: 9,
    year: 2026,
    title: 'Lungs',
    subtitle: 'Protecting the Capacity Behind an Active, Independent Life',
    description:
      "Blends pulmonary medicine, physiology, and longevity science to explain how lung function declines with age and what's proven to help preserve it.",
    badges: ['Lung Health', 'Respiratory Function'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/lungs/ebook/product-zmnjk2q.html',
      'https://www.lulu.com/shop/robert-peterson/lungs/paperback/product-w4gj7qr.html'
    ),
    podcastHref: '/podcast#lungs',
  },
  {
    slug: 'heart',
    series: 'guidebook',
    order: 10,
    year: 2026,
    title: 'Heart',
    subtitle: 'Understanding and Protecting Cardiovascular Health as You Age',
    description:
      'Draws on cardiology, physiology, and longevity science to explain how the heart changes with age and how its decline can often be influenced rather than simply accepted.',
    badges: ['Heart Health', 'Cardiovascular Aging'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/heart/ebook/product-7kzn94p.html',
      'https://www.lulu.com/shop/robert-peterson/heart/paperback/product-45428jv.html'
    ),
    podcastHref: '/podcast#heart-and-blood-vessels',
  },
  {
    slug: 'liver-gallbladder-spleen',
    series: 'guidebook',
    order: 11,
    year: 2026,
    title: 'Liver, Gallbladder & Spleen',
    subtitle: 'Detoxification, Digestion, and Immune Resilience as You Age',
    description:
      "Surveys the liver's central role in metabolism and detoxification, the gallbladder's contribution to digestion, and the spleen's immune function — and how each changes with age.",
    badges: ['Liver Health', 'Digestion', 'Immune Health'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/liver-gallbladder-spleen/ebook/product-2mg5ngv.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/liver-gallbladder-and-spleen/paperback/product-nv5wnw8.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#liver-and-spleen',
  },
  {
    slug: 'kidney-urinary',
    series: 'guidebook',
    order: 12,
    year: 2026,
    title: 'Kidney & Urinary System',
    subtitle: 'Protecting Filtration, Fluid Balance, and Long-Term Vitality',
    description:
      'Explains how kidney function declines with age, why early changes often go unnoticed, and what can be done to support filtration, blood pressure, and metabolic health.',
    badges: ['Kidney Health', 'Urinary Health', 'Metabolic Health'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/kidney-urinary-system/ebook/product-84qkmq5.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/kidneys-urinary-system/paperback/product-zmvkn8j.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#kidneys-and-urinary-system',
  },
  {
    slug: 'digestive-system',
    series: 'guidebook',
    order: 13,
    year: 2026,
    title: 'Digestive System',
    subtitle: 'How Gut Health Shapes Aging, Immunity, and Metabolism',
    description:
      'Explores how the digestive tract changes with age and why gut health is central to nutrient absorption, immune function, inflammation, and metabolic resilience.',
    badges: ['Gut Health', 'Metabolism', 'Immunity'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/digestive-system/ebook/product-kv49gg9.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/digestive-system/paperback/product-nv5wnwd.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#digestive-system',
  },
  {
    slug: 'fat',
    series: 'guidebook',
    order: 14,
    year: 2026,
    title: 'Fat',
    subtitle: 'The Hidden Organ That Drives Energy, Hormones, and Longevity',
    description:
      'Reframes body fat as a dynamic endocrine organ, explaining how adipose tissue influences hormones, inflammation, metabolism, and the pace of aging.',
    badges: ['Metabolic Health', 'Hormones', 'Body Composition'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/fat/ebook/product-zmvknv2.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/fat/paperback/product-w48vgvy.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#fat',
  },
  {
    slug: 'breasts',
    series: 'guidebook',
    order: 15,
    year: 2026,
    title: 'Breasts',
    subtitle: 'Tissue Changes, Screening, and Long-Term Breast Health',
    description:
      'Covers how breast tissue changes across the decades, what screening evidence actually supports, and how hormones and body composition shape long-term risk.',
    badges: ['Breast Health', 'Screening', 'Hormones'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/breasts/ebook/product-rm286w4.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/breasts/paperback/product-yvqjygn.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#breasts',
  },
  {
    slug: 'reproductive-system-female',
    series: 'guidebook',
    order: 16,
    year: 2026,
    title: 'Reproductive System — Female',
    subtitle: 'Ovaries, Uterus, Cervix, and Lifelong Sexual Health',
    description:
      'A clear, evidence-based guide to how the female reproductive system changes across the lifespan — from menstrual health and fertility to perimenopause, menopause, and long-term pelvic wellness.',
    badges: ["Women's Health", 'Reproductive Health', 'Hormones'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/reproductive-system-female/ebook/product-v8n4m4k.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/reproductive-system-female/paperback/product-57ne84m.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#reproductive-sexual-health-female',
  },
  {
    slug: 'reproductive-system-male',
    series: 'guidebook',
    order: 17,
    year: 2026,
    title: 'Reproductive System — Male',
    subtitle: 'Testes, Prostate, and Lifelong Sexual Health',
    description:
      'Explains how male reproductive anatomy and hormones change with age, what prostate and sexual health screenings actually show, and how to preserve vitality and function over the long term.',
    badges: ["Men's Health", 'Reproductive Health', 'Hormones'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/reproductive-system-male/ebook/product-84qrykv.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/reproductive-system-male/paperback/product-658r94d.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#reproductive-sexual-health-male',
  },
  {
    slug: 'bones-joints',
    series: 'guidebook',
    order: 18,
    year: 2026,
    title: 'Bones & Joints',
    subtitle: 'Keeping Your Skeleton Strong and Mobile as You Age',
    description:
      'Covers the biology of bone remodeling, cartilage wear, and joint health — and what the evidence shows about preserving strength, flexibility, and independence.',
    badges: ['Bone Health', 'Joint Health', 'Mobility'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/bones-joints/ebook/product-yvqnegv.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/bones-joints/paperback/product-rm2ekm5.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#bones-and-joints',
  },
  {
    slug: 'muscle-connective-tissue',
    series: 'guidebook',
    order: 19,
    year: 2026,
    title: 'Muscle & Connective Tissue',
    subtitle: 'Why Strength and Flexibility Are Non-Negotiable for Longevity',
    description:
      'Details how muscle mass, fascia, tendons, and ligaments change with age and why preserving strength and connective tissue integrity is foundational to healthy aging.',
    badges: ['Muscle Health', 'Strength', 'Mobility'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/muscle-connective-tissue/ebook/product-45em44e.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/muscle-connective-tissue/paperback/product-yvqnejv.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#muscles-tendons-ligaments',
  },
  {
    slug: 'skin-nails',
    series: 'guidebook',
    order: 20,
    year: 2026,
    title: 'Skin & Nails',
    subtitle: 'What Your Largest Organ Reveals About Aging and Health',
    description:
      'Examines how skin and nails change with age, what those changes signal about broader health, and which strategies are supported by dermatology and longevity science.',
    badges: ['Skin Health', 'Dermatology', 'Aging Science'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/skin-nails/ebook/product-57ngqyy.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/skin-nails/paperback/product-je8nmv6.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#skin-and-nails',
  },
  {
    slug: 'hands-feet',
    series: 'guidebook',
    order: 21,
    year: 2026,
    title: 'Hands & Feet',
    subtitle: 'Grip, Gait, and the Extremities That Predict Longevity',
    description:
      'Grip strength and gait speed are among the strongest predictors of healthy lifespan. This guide covers how hands and feet age and what keeps them capable.',
    badges: ['Grip Strength', 'Mobility', 'Function'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/hands-feet/ebook/product-yvqjg9m.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/hands-feet/paperback/product-q675gj9.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#hands-and-feet',
  },
  {
    slug: 'nerves-senses-reflexes',
    series: 'guidebook',
    order: 22,
    year: 2026,
    title: 'Nerves, Senses & Reflexes',
    subtitle: 'How the Nervous System Ages and How to Keep It Sharp',
    description:
      'Explores nerve conduction, sensory decline, and reflex changes with age — and the evidence-based strategies that preserve coordination and responsiveness.',
    badges: ['Neurology', 'Senses', 'Reflexes'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/nerves-senses-reflexes/ebook/product-q675gzk.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/nerves-senses-reflexes/paperback/product-658rvjy.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#peripheral-nervous-system',
  },
  {
    slug: 'blood',
    series: 'guidebook',
    order: 23,
    year: 2026,
    title: 'Blood',
    subtitle: 'Circulation, Clotting, and the Fluid That Carries Your Health',
    description:
      'Examines how blood composition, clotting tendency, and vascular flow shift over time, and which markers genuinely matter for longevity.',
    badges: ['Hematology', 'Circulation', 'Biomarkers'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/blood/ebook/product-658r9qd.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/blood/paperback/product-84qryzr.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#blood',
  },
  {
    slug: 'hormones-cellular-communication',
    series: 'guidebook',
    order: 24,
    year: 2026,
    title: 'Hormones & Cellular Communication',
    subtitle: 'The Signalling Systems That Set the Pace of Aging',
    description:
      "A clear look at endocrine decline, receptor sensitivity, and cell signalling — plus what hormone science supports and what it doesn't.",
    badges: ['Endocrinology', 'Hormones', 'Cell Signalling'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/hormones/ebook/product-m2vqzwv.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/hormones-cellular-communication/paperback/product-m2vqyjp.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#hormones-and-cellular-communication',
  },
  {
    slug: 'immune-system',
    series: 'guidebook',
    order: 25,
    year: 2026,
    title: 'Immune System',
    subtitle: 'Immunity, Inflammation, and Resilience Across the Decades',
    description:
      'Covers immunosenescence, chronic low-grade inflammation, and the habits and interventions that keep immune defence responsive.',
    badges: ['Immunity', 'Inflammation', 'Resilience'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/immune-system/ebook/product-gj58dgm.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/immune-system/paperback/product-95vk8m8.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#immune-system-and-lymphatic-system',
  },
  {
    slug: 'extracellular-matrix',
    series: 'guidebook',
    order: 26,
    year: 2026,
    title: 'Extracellular Matrix',
    subtitle: 'The Scaffolding That Holds You Together',
    description:
      'Collagen, elastin, and the matrix between cells shape how tissues age. This guide explains the biology and what actually influences it.',
    badges: ['Collagen', 'Tissue Health', 'Cell Biology'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/extracellular-matrix/ebook/product-658r9r6.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/extracellular-matrix/paperback/product-yvqjgv9.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#extracellular-matrix',
  },
  {
    slug: 'mitochondria-metabolism',
    series: 'guidebook',
    order: 27,
    year: 2026,
    title: 'Mitochondria & Metabolism',
    subtitle: 'Energy Production at the Root of Healthy Aging',
    description:
      'How mitochondrial function and metabolic flexibility drive energy, endurance, and the pace of biological aging — and what improves them.',
    badges: ['Mitochondria', 'Metabolism', 'Energy'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/mitochondria-metabolism/ebook/product-dy7jdj6.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/mitochondria-metabolism/paperback/product-gj58dvn.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#mitochondria-and-energy-metabolism',
  },
  {
    slug: 'drugs-pharmacokinetics',
    series: 'guidebook',
    order: 28,
    year: 2026,
    title: 'Drugs & Pharmacokinetics',
    subtitle: 'How Medication Behaves Differently in an Aging Body',
    description:
      'Absorption, metabolism, and clearance all change with age. This guide covers polypharmacy risks and how to think clearly about medication.',
    badges: ['Pharmacology', 'Medication Safety', 'Polypharmacy'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/drugs-pharmacokinetics/ebook/product-gj58dd4.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/drugs-pharmacokinetics/paperback/product-w48e77r.html?page=1&pageSize=4'
    ),
    podcastHref: '/podcast#drugs-and-pharmacokinetics',
  },
  {
    slug: 'black-swan',
    series: 'bargaining',
    order: 29,
    year: 2025,
    title: 'Black Swan',
    subtitle: 'Preparing for Rare Health Events in an Era of Medical Uncertainty',
    description:
      "Inspired by Nassim Taleb's work on unpredictable high-impact events, Dr. Peterson applies black swan thinking to personal health strategy.\n\nRather than offering false reassurance, Dr. Peterson provides a framework for building genuine resilience through strategic preparation, metabolic flexibility, and immune system optimization.",
    badges: ['Risk Management', 'Immune Health', 'Resilience Building', 'Preventive Medicine'],
    ctas: ctas(
      'https://www.lulu.com/shop/robert-peterson/black-swan/ebook/product-v82dqpr.html?page=1&pageSize=4',
      'https://www.lulu.com/shop/robert-peterson/black-swan/paperback/product-w48vgez.html?page=1&pageSize=4'
    ),
  },
];

const keepIds = new Set(books.map((book) => `book.${book.slug}`));
const docs = books.map((book) => ({
  _id: `book.${book.slug}`,
  _type: 'book',
  title: book.title,
  slug: { _type: 'slug', current: book.slug },
  subtitle: book.subtitle,
  description: book.description,
  badges: book.badges,
  publisher: { name: publisher, year: book.year },
  ctas: book.ctas,
  podcastHref: book.podcastHref,
  series: book.series,
  order: book.order,
}));

const existing = await client.fetch(`*[_type == "book"]{_id,"slug": slug.current}`);
const stale = existing.filter((doc) => !keepIds.has(doc._id));

let tx = docs.reduce((transaction, doc) => transaction.createOrReplace(doc), client.transaction());
for (const doc of stale) {
  tx = tx.delete(doc._id);
  if (doc._id && !doc._id.startsWith('drafts.')) {
    tx = tx.delete(`drafts.${doc._id}`);
  }
}

const result = await tx.commit();
console.log(
  JSON.stringify({
    upserted: docs.length,
    deleted: stale.map((doc) => doc.slug || doc._id),
    mutations: result.results?.length,
  })
);
