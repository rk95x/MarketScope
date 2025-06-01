export interface MockListing {
  title: string;
  price: number;
  imageUrl: string;
  sellerUsername: string;
  itemId: string;
  salesLast30Days: number;
}

export const mockListings: MockListing[] = [
  {
    title: "iPhone 13 Pro Max - 256GB - Graphite - Unlocked",
    price: 899.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "tech_gadgets_inc",
    itemId: "mock-1",
    salesLast30Days: 45
  },
  {
    title: "Nike Air Jordan 1 High OG - Size 10 - Chicago",
    price: 299.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "sneaker_king",
    itemId: "mock-2",
    salesLast30Days: 28
  },
  {
    title: "Sony PlayStation 5 Digital Edition - Brand New",
    price: 399.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "game_haven",
    itemId: "mock-3",
    salesLast30Days: 15
  },
  {
    title: "Apple MacBook Pro 14\" M1 Pro - 16GB RAM - 512GB SSD",
    price: 1799.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "tech_gadgets_inc",
    itemId: "mock-4",
    salesLast30Days: 12
  },
  {
    title: "Canon EOS R5 Mirrorless Camera - Body Only",
    price: 3499.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "camera_world",
    itemId: "mock-5",
    salesLast30Days: 8
  },
  {
    title: "LEGO Star Wars Millennium Falcon 75192",
    price: 159.99,
    imageUrl: "https://i.ebayimg.com/images/g/1~kAAOSw~y1jK5Yt/s-l1600.jpg",
    sellerUsername: "toy_collector",
    itemId: "mock-6",
    salesLast30Days: 32
  }
]; 