
export type SocialLink = {
  id: string;
  platform: 'tiktok' | 'instagram' | 'youtube' | 'discord' | 'twitter' | 'github' | 'lynk' | 'other';
  url: string;
};

export type DigitalProduct = {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  link: string;
};

export type ShonenTheme = {
  id: string;
  name: string;
  primaryColor: string;
  accentColor: string;
  bgImage?: string;
  fontClass?: string;
};

export type UserProfile = {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  bannerUrl: string;
  themeId: string;
  socialLinks: SocialLink[];
  products: DigitalProduct[];
};
