import { Reward, Transaction } from './types';

export const MOCK_USER = {
  id: 'u1',
  name: 'Rara',
  level: 3,
  title: 'Eco-Warrior',
  points: 12500, // 12.500 DropPoints
  plasticSavedKg: 3.4,
  co2SavedKg: 6.8,
  avatarType: 'fern' as const,
  inventoryCount: 12, // Needs 15 for Eco-Pick
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx1', date: '2023-10-24', items: 3, pointsEarned: 1500, status: 'PENDING', type: 'ECO_BOX' },
  { id: 'tx2', date: '2023-10-15', items: 5, pointsEarned: 2500, status: 'APPROVED', type: 'ECO_PICK' },
  { id: 'tx3', date: '2023-09-28', items: 2, pointsEarned: 1000, status: 'APPROVED', type: 'ECO_BOX' },
];

export const MOCK_REWARDS: Reward[] = [
  { id: 'r1', category: 'hemat', title: 'Saldo GoPay Rp25.000', costPoints: 2500, image: 'https://picsum.photos/200/200?random=1', color: 'bg-fresh-pink/90', brand: 'gopay' },
  { id: 'r2', category: 'lifestyle', title: 'Kopi Kenangan Gratis', costPoints: 1800, image: 'https://picsum.photos/200/200?random=2', color: 'bg-hot-pink/90', brand: 'kopikenangan' },
  { id: 'r3', category: 'beauty', title: 'Voucher Somethinc 20%', costPoints: 3000, image: 'https://picsum.photos/200/200?random=3', color: 'bg-fresh-green/90', brand: 'somethinc' },
  { id: 'r4', category: 'fomo', title: 'Raffle Tumbler Corkcicle', costPoints: 1500, image: 'https://picsum.photos/200/200?random=4', color: 'bg-soldier-green text-warm-fog', brand: 'corkcicle' },
];

export const LEADERBOARD = {
  global: [
    { rank: 1, name: 'Siska E.', points: 45000, avatar: 'https://picsum.photos/100/100?random=10', detail: 'Eco-Legend' },
    { rank: 2, name: 'Rara (Kamu)', points: 12500, avatar: 'https://picsum.photos/100/100?random=11', detail: 'Eco-Warrior' },
    { rank: 3, name: 'Budi T.', points: 9800, avatar: 'https://picsum.photos/100/100?random=12', detail: 'Eco-Guardian' },
    { rank: 4, name: 'Nadia K.', points: 7500, avatar: 'https://picsum.photos/100/100?random=13', detail: 'Eco-Saviour' },
  ],
  sirkel: [
    { rank: 1, name: 'Rara (Kamu)', points: 12500, avatar: 'https://picsum.photos/100/100?random=11', detail: '1st in Sirkel' },
    { rank: 2, name: 'Amanda L.', points: 11000, avatar: 'https://picsum.photos/100/100?random=14', detail: 'Bestie Kos' },
    { rank: 3, name: 'Citra D.', points: 9500, avatar: 'https://picsum.photos/100/100?random=15', detail: 'Satu Geng' },
    { rank: 4, name: 'Farhan M.', points: 8200, avatar: 'https://picsum.photos/100/100?random=16', detail: 'Tetangga Sebelah' },
  ],
  kampus: [
    { rank: 1, name: 'Fakultas Psikologi UI', points: 184000, avatar: 'https://picsum.photos/100/100?random=17', detail: '840 Botol' },
    { rank: 2, name: 'Fakultas Ilmu Komputer UI', points: 152000, avatar: 'https://picsum.photos/100/100?random=18', detail: '710 Botol' },
    { rank: 3, name: 'FISIP UI', points: 129000, avatar: 'https://picsum.photos/100/100?random=19', detail: '590 Botol' },
    { rank: 4, name: 'Fakultas Teknik UI', points: 98000, avatar: 'https://picsum.photos/100/100?random=20', detail: '420 Botol' },
  ]
};
