// =============================
// lib/ebay-auth.ts
// =============================
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

interface EbayOAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const getEbayAccessToken = async () => {
  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing eBay credentials in environment variables');
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://api.sandbox.ebay.com/identity/v1/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.account',
    }).toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch eBay access token: ${errorText}`);
  }

  const data = await response.json() as EbayOAuthResponse;
  return data.access_token;
};