import { sanityClient } from '../../sanity/client';
import { resolveContentImage } from '../../sanity/image';
import type { AboutImages, CareersImages, IngredientsImages, MenuPagesImages } from '../types';
import { type FetchedImage, IMAGE_PROJECTION } from './shared';

type FetchedAboutImages = {
  heroImage?: FetchedImage | null;
  storyImage?: FetchedImage | null;
  sustainabilityImage?: FetchedImage | null;
  vendorsImage?: FetchedImage | null;
};

const ABOUT_IMAGES_QUERY = /* groq */ `
  *[_type == "aboutContent" && _id == "singleton-about"][0] {
    ${IMAGE_PROJECTION('heroImage', 'About Aloha Salads')},
    ${IMAGE_PROJECTION('storyImage', 'Aloha Salads story')},
    ${IMAGE_PROJECTION('sustainabilityImage', 'Aloha Salads sustainability')},
    ${IMAGE_PROJECTION('vendorsImage', 'Aloha Salads vendors')}
  }
`;

export async function getSanityAboutImages(): Promise<AboutImages> {
  const doc = await sanityClient.fetch<FetchedAboutImages | null>(ABOUT_IMAGES_QUERY);

  return {
    hero: resolveContentImage(doc?.heroImage),
    story: resolveContentImage(doc?.storyImage),
    sustainability: resolveContentImage(doc?.sustainabilityImage),
    vendors: resolveContentImage(doc?.vendorsImage),
  };
}

// ─── Careers ──────────────────────────────────────────────────────────────────

const CAREERS_IMAGES_QUERY = /* groq */ `
  *[_type == "careersContent" && _id == "singleton-careers"][0] {
    ${IMAGE_PROJECTION('heroImage', 'Aloha Salads team members holding fresh salads')}
  }
`;

export async function getSanityCareersImages(): Promise<CareersImages> {
  const doc = await sanityClient.fetch<{ heroImage?: FetchedImage | null } | null>(CAREERS_IMAGES_QUERY);

  return { hero: resolveContentImage(doc?.heroImage) };
}

// ─── Ingredients ──────────────────────────────────────────────────────────────

type FetchedIngredientsImages = {
  heroImage?: FetchedImage | null;
  freshLocalProduceImage?: FetchedImage | null;
};

const INGREDIENTS_IMAGES_QUERY = /* groq */ `
  *[_type == "ingredientsContent" && _id == "singleton-ingredients"][0] {
    ${IMAGE_PROJECTION('heroImage', 'Fresh ingredients at Aloha Salads')},
    ${IMAGE_PROJECTION('freshLocalProduceImage', 'Fresh local produce used by Aloha Salads')}
  }
`;

export async function getSanityIngredientsImages(): Promise<IngredientsImages> {
  const doc = await sanityClient.fetch<FetchedIngredientsImages | null>(INGREDIENTS_IMAGES_QUERY);

  return {
    hero: resolveContentImage(doc?.heroImage),
    freshLocalProduce: resolveContentImage(doc?.freshLocalProduceImage),
  };
}

// ─── Menu Pages ───────────────────────────────────────────────────────────────

type FetchedMenuPagesImages = {
  menuHubHeroImage?: FetchedImage | null;
  menuHubIngredientsImage?: FetchedImage | null;
  saladsHeroImage?: FetchedImage | null;
  saladsIngredientsImage?: FetchedImage | null;
  wrapsHeroImage?: FetchedImage | null;
  wrapsIngredientsImage?: FetchedImage | null;
  soupsHeroImage?: FetchedImage | null;
  soupsIngredientsImage?: FetchedImage | null;
  drinksHeroImage?: FetchedImage | null;
  drinksIngredientsImage?: FetchedImage | null;
  veganIngredientsImage?: FetchedImage | null;
  vegetarianHeroImage?: FetchedImage | null;
  vegetarianIngredientsImage?: FetchedImage | null;
  healthyOptionsHeroImage?: FetchedImage | null;
  healthyOptionsIngredientsImage?: FetchedImage | null;
  kidsIngredientsImage?: FetchedImage | null;
  kidsHeroImage?: FetchedImage | null;
  designYourOwnHeroImage?: FetchedImage | null;
  designYourOwnBuildImage?: FetchedImage | null;
  designYourOwnQualityImage?: FetchedImage | null;
};

const MENU_PAGES_IMAGES_QUERY = /* groq */ `
  *[_type == "menuPagesContent" && _id == "singleton-menu-pages"][0] {
    ${IMAGE_PROJECTION('menuHubHeroImage', 'Fresh salad bowls from Aloha Salads')},
    ${IMAGE_PROJECTION('menuHubIngredientsImage', 'Oahu InsideOut magazine cover, May 2012, Family ties, with vine-ripe tomatoes')},
    ${IMAGE_PROJECTION('saladsHeroImage', 'Signature salads at Aloha Salads')},
    ${IMAGE_PROJECTION('saladsIngredientsImage', 'Fresh ingredients for Aloha Salads salads')},
    ${IMAGE_PROJECTION('wrapsHeroImage', 'Wraps and subs at Aloha Salads')},
    ${IMAGE_PROJECTION('wrapsIngredientsImage', 'Fresh ingredients for Aloha Salads wraps')},
    ${IMAGE_PROJECTION('soupsHeroImage', 'Tomato bisque soup at Aloha Salads')},
    ${IMAGE_PROJECTION('soupsIngredientsImage', 'Fresh ingredients for Aloha Salads soups')},
    ${IMAGE_PROJECTION('drinksHeroImage', 'Drinks at Aloha Salads')},
    ${IMAGE_PROJECTION('drinksIngredientsImage', 'Fresh ingredients for Aloha Salads drinks')},
    ${IMAGE_PROJECTION('veganIngredientsImage', 'Fresh plant-based ingredients at Aloha Salads')},
    ${IMAGE_PROJECTION('vegetarianHeroImage', 'Vegetarian options at Aloha Salads')},
    ${IMAGE_PROJECTION('vegetarianIngredientsImage', 'Fresh vegetarian ingredients at Aloha Salads')},
    ${IMAGE_PROJECTION('healthyOptionsHeroImage', 'Healthy menu options at Aloha Salads')},
    ${IMAGE_PROJECTION('healthyOptionsIngredientsImage', 'Fresh healthy ingredients at Aloha Salads')},
    ${IMAGE_PROJECTION('kidsIngredientsImage', 'Fresh keiki meal ingredients at Aloha Salads')},
    ${IMAGE_PROJECTION('kidsHeroImage', 'Keiki with vine-ripe tomatoes at Aloha Salads')},
    ${IMAGE_PROJECTION('designYourOwnHeroImage', 'Custom salad bowl at Aloha Salads')},
    ${IMAGE_PROJECTION('designYourOwnBuildImage', 'How to build your own salad at Aloha Salads')},
    ${IMAGE_PROJECTION('designYourOwnQualityImage', 'Quality ingredients for custom salads at Aloha Salads')}
  }
`;

export async function getSanityMenuPagesImages(): Promise<MenuPagesImages> {
  const doc = await sanityClient.fetch<FetchedMenuPagesImages | null>(MENU_PAGES_IMAGES_QUERY);

  return {
    menuHubHero: resolveContentImage(doc?.menuHubHeroImage),
    menuHubIngredients: resolveContentImage(doc?.menuHubIngredientsImage),
    saladsHero: resolveContentImage(doc?.saladsHeroImage),
    saladsIngredients: resolveContentImage(doc?.saladsIngredientsImage),
    wrapsHero: resolveContentImage(doc?.wrapsHeroImage),
    wrapsIngredients: resolveContentImage(doc?.wrapsIngredientsImage),
    soupsHero: resolveContentImage(doc?.soupsHeroImage),
    soupsIngredients: resolveContentImage(doc?.soupsIngredientsImage),
    drinksHero: resolveContentImage(doc?.drinksHeroImage),
    drinksIngredients: resolveContentImage(doc?.drinksIngredientsImage),
    veganIngredients: resolveContentImage(doc?.veganIngredientsImage),
    vegetarianHero: resolveContentImage(doc?.vegetarianHeroImage),
    vegetarianIngredients: resolveContentImage(doc?.vegetarianIngredientsImage),
    healthyOptionsHero: resolveContentImage(doc?.healthyOptionsHeroImage),
    healthyOptionsIngredients: resolveContentImage(doc?.healthyOptionsIngredientsImage),
    kidsIngredients: resolveContentImage(doc?.kidsIngredientsImage),
    kidsHero: resolveContentImage(doc?.kidsHeroImage),
    designYourOwnHero: resolveContentImage(doc?.designYourOwnHeroImage),
    designYourOwnBuild: resolveContentImage(doc?.designYourOwnBuildImage),
    designYourOwnQuality: resolveContentImage(doc?.designYourOwnQualityImage),
  };
}
