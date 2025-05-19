interface EbayTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

class EbayAuthError extends Error {
  status: number;
  details: string;

  constructor(message: string, status: number, details: string) {
    super(message);
    this.name = 'EbayAuthError';
    this.status = status;
    this.details = details;
  }
}

export async function getEbayAccessToken(): Promise<EbayTokenResponse> {
  const credentials = process.env.EBAY_CREDENTIALS;
  if (!credentials) {
    throw new EbayAuthError('Missing eBay credentials', 500, 'EBAY_CREDENTIALS environment variable is not set');
  }

  try {
    const response = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`
      },
      body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope'
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new EbayAuthError('Failed to fetch eBay access token', response.status, errorText);
    }

    const data = await response.json() as EbayTokenResponse;
    return data;
  } catch (error) {
    if (error instanceof EbayAuthError) {
      throw error;
    }
    throw new EbayAuthError('Error fetching eBay access token', 500, error instanceof Error ? error.message : 'Unknown error');
  }
} 