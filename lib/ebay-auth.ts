interface EbayTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export class EbayAuthError extends Error {
  constructor(message: string, public status?: number, public details?: string) {
    super(message);
    this.name = 'EbayAuthError';
  }
}

export async function getEbayAccessToken(): Promise<string> {
  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new EbayAuthError('Missing eBay credentials in environment variables');
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/buy.browse',
      }).toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to get eBay access token:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      throw new EbayAuthError(
        'Failed to get eBay access token',
        response.status,
        errorText
      );
    }

    const data = await response.json() as EbayTokenResponse;
    return data.access_token;
  } catch (error) {
    if (error instanceof EbayAuthError) {
      throw error;
    }
    throw new EbayAuthError(
      'Unexpected error while getting eBay access token',
      undefined,
      error instanceof Error ? error.message : String(error)
    );
  }
} 