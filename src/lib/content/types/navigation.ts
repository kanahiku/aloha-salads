import type { ContentImage } from './images';

export interface NavSubLink {
  text: string;
  href: string;
  description?: string;
  image?: ContentImage;
}

export interface NavColumn {
  title: string;
  links: NavSubLink[];
}

export interface NavLink {
  text: string;
  href?: string;
  description?: string;
  image?: ContentImage;
  links?: NavSubLink[];
  columns?: NavColumn[];
}

export interface NavPhone {
  text: string;
  href: string;
}

export interface FooterLink {
  text: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  ariaLabel: string;
  icon: string;
  href: string;
}

/** The thin banner above the header. */
export interface AnnouncementContent {
  enabled: boolean;
  text: string;
  linkLabel?: string;
  linkHref?: string;
}

export interface NavigationContent {
  announcement?: AnnouncementContent;
  header: {
    links: NavLink[];
    actions: { variant?: string; text?: string; href?: string }[];
    phone?: NavPhone;
  };
  footer: {
    links: FooterColumn[];
    secondaryLinks: FooterLink[];
    socialLinks: SocialLink[];
    footNote: string;
  };
}

// ─── Menu ────────────────────────────────────────────────────────────────────
