import { getEbayAccessToken } from './ebay-auth';

interface InventoryItem {
  product: {
    title: string;
    description: string;
    aspects: Record<string, string[]>;
    imageUrls: string[];
  };
  condition: string;
  packageWeightAndSize: {
    weight: {
      value: number;
      unit: string;
    };
    dimensions: {
      length: number;
      width: number;
      height: number;
      unit: string;
    };
  };
}

interface Offer {
  sku: string;
  marketplaceId: string;
  format: string;
  availableQuantity: number;
  categoryId: string;
  listingDescription: string;
  listingPolicies: {
    fulfillmentPolicyId: string;
    paymentPolicyId: string;
    returnPolicyId: string;
  };
  pricingSummary: {
    price: {
      value: number;
      currency: string;
    };
  };
}

export async function createInventoryItem(sku: string, item: InventoryItem): Promise<void> {
  const token = await getEbayAccessToken();
  
  const response = await fetch(`https://api.sandbox.ebay.com/sell/inventory/v1/inventory_item/${sku}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create inventory item: ${errorText}`);
  }
}

export async function createOffer(offer: Offer): Promise<string> {
  const token = await getEbayAccessToken();
  
  const response = await fetch('https://api.sandbox.ebay.com/sell/inventory/v1/offer', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(offer),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create offer: ${errorText}`);
  }

  const data = await response.json();
  return data.offerId;
}

export async function publishOffer(offerId: string): Promise<void> {
  const token = await getEbayAccessToken();
  
  const response = await fetch(`https://api.sandbox.ebay.com/sell/inventory/v1/offer/${offerId}/publish`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to publish offer: ${errorText}`);
  }
} 