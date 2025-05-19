import type { NextApiRequest, NextApiResponse } from 'next';

const fakeTrends = [
  {
    title: "Silicone Moisturising Socks",
    price: 6.99,
    sold: 240,
    seller: "mmesales",
    category: "Health & Beauty",
    lastSold: "2025-05-17"
  },
  {
    title: "LCD Writing Tablet for Kids",
    price: 5.49,
    sold: 120,
    seller: "mmesales",
    category: "Toys & Games",
    lastSold: "2025-05-15"
  },
  {
    title: "Wireless Earbuds",
    price: 19.99,
    sold: 85,
    seller: "techworld",
    category: "Electronics",
    lastSold: "2025-05-16"
  },
  {
    title: "Reusable Water Bottle",
    price: 8.99,
    sold: 150,
    seller: "greenstore",
    category: "Home & Garden",
    lastSold: "2025-05-14"
  },
  {
    title: "Yoga Mat",
    price: 14.99,
    sold: 60,
    seller: "fitlife",
    category: "Sports & Outdoors",
    lastSold: "2025-05-13"
  },
  {
    title: "Bluetooth Speaker",
    price: 22.5,
    sold: 110,
    seller: "techworld",
    category: "Electronics",
    lastSold: "2025-05-12"
  },
  {
    title: "Stainless Steel Lunch Box",
    price: 12.99,
    sold: 95,
    seller: "greenstore",
    category: "Home & Garden",
    lastSold: "2025-05-11"
  },
  {
    title: "Board Game: Codenames",
    price: 16.99,
    sold: 70,
    seller: "mmesales",
    category: "Toys & Games",
    lastSold: "2025-05-10"
  },
  {
    title: "Resistance Bands Set",
    price: 9.99,
    sold: 130,
    seller: "fitlife",
    category: "Sports & Outdoors",
    lastSold: "2025-05-09"
  },
  {
    title: "Vitamin C Serum",
    price: 11.99,
    sold: 200,
    seller: "mmesales",
    category: "Health & Beauty",
    lastSold: "2025-05-08"
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(fakeTrends);
}
