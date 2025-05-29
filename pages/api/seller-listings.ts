import type { NextApiRequest, NextApiResponse } from 'next';
import { getEbayAccessToken } from '../../lib/ebay-auth';

interface EbayItem {
  itemId: string;
  title: string;
  price: {
    value: string;
    currency: string;
  };
  image: {
    imageUrl: string;
  };
  seller: {
    username: string;
  };
  condition: string;
  itemWebUrl: string;
  quantitySold: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q, seller } = req.query;

  if (!q && !seller) {
    return res.status(400).json({ error: 'Missing search query or seller name' });
  }

  try {
    const token = await getEbayAccessToken();
    let url = 'https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?';


    if (q) {
      url += `q=${encodeURIComponent(q as string)}`;
    } else if (seller) {
      url += `seller=${encodeURIComponent(seller as string)}`;
    }

    url += '&limit=50&filter=conditions:{NEW|USED}';

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_GB',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`eBay API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform the data to match our frontend needs
    const items = data.itemSummaries.map((item: EbayItem) => ({
      id: item.itemId,
      title: item.title,
      price: parseFloat(item.price.value),
      image: item.image?.imageUrl,
      seller: item.seller.username,
      condition: item.condition,
      url: item.itemWebUrl,
      sold: item.quantitySold || 0,
      category: 'eBay', // We'll need to fetch this separately if needed
    }));

    return res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching eBay listings:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch listings',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 