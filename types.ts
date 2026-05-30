export interface User {
  id: string;
  name: string;
  level: number;
  title: string;
  points: number; // Reverted back to points (DropPoints)
  plasticSavedKg: number;
  co2SavedKg: number;
  avatarType: 'cactus' | 'fern';
  inventoryCount: number;
  profilePicture?: string; // Base64 or URL for custom profile picture
  phone?: string;
  address?: string;
  campus?: string; // Selected campus
}

export interface Transaction {
  id: string;
  date: string;
  items: number;
  pointsEarned: number; // Reverted back to points
  status: 'PENDING' | 'APPROVED';
  type: 'ECO_BOX' | 'ECO_PICK';
}

export interface Reward {
  id: string;
  category: 'hemat' | 'lifestyle' | 'beauty' | 'fomo';
  title: string;
  costPoints: number; // Reverted back to points
  image: string;
  color: string;
  brand: 'gopay' | 'kopikenangan' | 'somethinc' | 'corkcicle';
}

export interface ScanResult {
  brand: string;
  productName: string;
  material: string;
  pointsEarned: number; // Reverted back to points
}

export type TabType = 'home' | 'scan' | 'market' | 'social' | 'profile';
