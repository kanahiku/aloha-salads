import { interiorPagesA } from './interiorPagesA';
import { interiorPagesB } from './interiorPagesB';
import type { InteriorPageContent } from './interiorShared';

export type { InteriorLink, InteriorItem, InteriorSection, InteriorPageContent } from './interiorShared';

export const interiorPages: Record<string, InteriorPageContent> = { ...interiorPagesA, ...interiorPagesB };

export function getInteriorPage(path: string): InteriorPageContent {
  const page = interiorPages[path];
  if (!page) throw new Error(`Missing interior page for ${path}`);
  return page;
}

export const interiorPaths = Object.keys(interiorPages);
