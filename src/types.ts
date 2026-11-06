export interface City {
  id: string;
  name: string;
  enName: string;
}

export type CategoryType = 'physicians' | 'legal' | 'stores' | 'emergency' | 'translators' | 'currency';

export interface CategoryInfo {
  id: CategoryType;
  title: string;
  icon: string;
  description: string;
  color: string;
}

export interface Business {
  id: string;
  name: string;
  category: CategoryType;
  city: string;
  phone: string;
  email?: string;
  address: string;
  rating: number;
  reviewCount: number;
  description: string;
  verified: boolean;
  featured?: boolean;
  avatarLetter: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  step: number;
  category: string;
  completed: boolean;
}

export interface ForumReply {
  id: string;
  author: string;
  content: string;
  upvotes: number;
  date: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  upvotes: number;
  repliesCount: number;
  category: 'students' | 'housing' | 'jobs' | 'general';
  date: string;
  replies: ForumReply[];
}

export interface EventItem {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string;
  category: string;
  price: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  location: string;
  image: string;
  contact: string;
  date: string;
  category: string;
}

export interface DiscountProduct {
  id: string;
  store: 'Billa' | 'Spar' | 'Hofer' | 'Lidl';
  title: string;
  originalPrice: string;
  discountedPrice: string;
  category: string;
  validUntil: string;
  badge: string;
}

export interface Coupon {
  id: string;
  businessName: string;
  validUntil: string;
  isActive: boolean;
  discountCode: string;
  imageUrl?: string;
  description: string;
  title: string;
  discountPercent: number;
  category: "restaurant" | "grocery" | "medical" | "beauty" | "technical" | "financial" | "education" | "service" | "shopping" | "food" | "health";
}

export interface ExchangeRate {
  rateInToman: number;
  rateInRials: number;
  usdRateInToman?: number;
  formattedUsdRate?: string;
  lastUpdated: string;
  formattedRate: string;
  isLive?: boolean;
  source?: string;
  externalUrl?: string;
}
