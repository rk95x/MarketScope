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

export async function getEbayAccessToken(): Promise<string> {
  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new EbayAuthError(
      'Missing eBay credentials',
      400,
      'EBAY_CLIENT_ID or EBAY_CLIENT_SECRET is not set'
    );
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await fetch('https://api.sandbox.ebay.com/identity/v1/oauth2/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'https://api.ebay.com/oauth/api_scope', // ✅ use only this in Sandbox
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new EbayAuthError('Failed to fetch eBay access token', response.status, errorText);
    }

    const data: EbayTokenResponse = await response.json();
    return data.access_token;
  } catch (error) {
    if (error instanceof EbayAuthError) {
      throw error;
    }
    throw new EbayAuthError(
      'Error fetching eBay access token',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}
