export interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

export interface ChatData {
  selectedService?: string;
  websiteType?: string;
  budget?: string;
  timeline?: string;
  features?: string[];
  additionalInfo?: string;
  // Service-specific questions
  productCount?: string; // For e-commerce
  pageCount?: string; // For corporate sites
  productType?: string; // For landing pages
  appFunctions?: string; // For web apps
  currentWebsite?: string; // For SEO/Support
  designStyle?: string; // For UI/UX
  hostingNeeds?: string; // For hosting
  paymentSystems?: string; // For payment integration
  automationType?: string; // For automation
  // Contact info
  name?: string;
  email?: string;
  phone?: string;
  // Question step tracking
  questionStep?: number;
  // Discount fields
  discountEligible?: boolean;
  discountPercentage?: number;
}

export type ChatStep = 'service' | 'details' | 'contact';
