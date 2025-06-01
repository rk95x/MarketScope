export interface MockListing {
  title: string;
  price: number;
  imageUrl: string;
  sellerUsername: string;
  itemId: string;
  salesLast30Days: number;
  soldDate: string; // ISO string for sale date
}

// Helper function to get a random date within the last 30 days
const getRandomDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(now);
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

export const mockListings: MockListing[] = [
  {
    title: "iPhone 13 Pro Max - 256GB - Graphite - Unlocked",
    price: 899.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "tech_gadgets_inc",
    itemId: "mock-1",
    salesLast30Days: 45,
    soldDate: getRandomDate()
  },
  {
    title: "Nike Air Jordan 1 High OG - Size 10 - Chicago",
    price: 299.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "sneaker_king",
    itemId: "mock-2",
    salesLast30Days: 28,
    soldDate: getRandomDate()
  },
  {
    title: "Sony PlayStation 5 Digital Edition - Brand New",
    price: 399.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "game_haven",
    itemId: "mock-3",
    salesLast30Days: 15,
    soldDate: getRandomDate()
  },
  {
    title: "Apple MacBook Pro 14\" M1 Pro - 16GB RAM - 512GB SSD",
    price: 1799.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "tech_gadgets_inc",
    itemId: "mock-4",
    salesLast30Days: 12,
    soldDate: getRandomDate()
  },
  {
    title: "Canon EOS R5 Mirrorless Camera - Body Only",
    price: 3499.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "camera_world",
    itemId: "mock-5",
    salesLast30Days: 8,
    soldDate: getRandomDate()
  },
  {
    title: "LEGO Star Wars Millennium Falcon 75192",
    price: 159.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "toy_collector",
    itemId: "mock-6",
    salesLast30Days: 32,
    soldDate: getRandomDate()
  },
  {
    title: "Samsung Galaxy S21 Ultra 5G - 128GB - Phantom Black",
    price: 799.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "tech_gadgets_inc",
    itemId: "mock-7",
    salesLast30Days: 23,
    soldDate: getRandomDate()
  },
  {
    title: "Nintendo Switch OLED - White - Brand New",
    price: 349.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "game_haven",
    itemId: "mock-8",
    salesLast30Days: 19,
    soldDate: getRandomDate()
  },
  {
    title: "Adidas Ultraboost 22 - Size 9 - Core Black",
    price: 189.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "sneaker_king",
    itemId: "mock-9",
    salesLast30Days: 41,
    soldDate: getRandomDate()
  },
  {
    title: "DJI Mini 3 Pro Drone with RC Controller",
    price: 759.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "camera_world",
    itemId: "mock-10",
    salesLast30Days: 7,
    soldDate: getRandomDate()
  },
  {
    title: "Apple AirPods Pro 2nd Generation",
    price: 249.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "tech_gadgets_inc",
    itemId: "mock-11",
    salesLast30Days: 56,
    soldDate: getRandomDate()
  },
  {
    title: "LEGO Harry Potter Hogwarts Castle 71043",
    price: 399.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "toy_collector",
    itemId: "mock-12",
    salesLast30Days: 14,
    soldDate: getRandomDate()
  }
]; 