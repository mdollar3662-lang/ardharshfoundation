export interface ImpactStats {
  villagesReached: number;
  peopleSupported: number;
  childrenReached: number;
  awarenessPrograms: number;
  womenEmpowered: number;
  volunteers: number;
  lastUpdated: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  bulletPoints: string[];
  imageUrl: string;
  impactHighlight: string;
  beneficiariesCount: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
  location: string;
  date: string;
}

export interface LocationItem {
  id: string;
  name: string;
  type: 'head' | 'regional' | 'additional';
  address: string;
  city: string;
  district: string;
  state: string;
  pincode?: string;
  phone: string;
  email: string;
  lat: number;
  lng: number;
  contactPerson: string;
}

export interface GroundStory {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
  challenge: string;
  foundationAction: string;
  location: string;
  quote: string;
}

export interface HeroFilmSlide {
  id: string;
  youtubeId: string;
  title: string;
  shortLabel: string;
  location: string;
  theme: string;
  posterImage: string;
  description: string;
}

export interface VolunteerSubmission {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  state: string;
  district: string;
  areaOfInterest: string;
  message: string;
  status: 'pending' | 'approved' | 'contacted';
  submittedAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'responded';
  submittedAt: string;
}

export interface DonationRecord {
  id: string;
  receiptNumber: string;
  donorName: string;
  email: string;
  phone?: string;
  cause: string;
  amount: number;
  frequency: 'one-time' | 'monthly';
  panNumber?: string;
  paymentMethod: string;
  createdAt: string;
}
