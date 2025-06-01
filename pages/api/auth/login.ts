import { NextApiRequest, NextApiResponse } from 'next';

const EBAY_SANDBOX_AUTH_URL = 'https://auth.sandbox.ebay.com/oauth2/authorize';

const REQUIRED_SCOPES = [
  'https://api.ebay.com/oauth/api_scope',
  'https://api.ebay.com/oauth/api_scope/sell.account.readonly',
  'https://api.ebay.com/oauth/api_scope/sell.inventory.readonly',
];


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const clientId = process.env.EBAY_CLIENT_ID;
  const redirectUri = process.env.EBAY_REDIRECT_URI;

  console.log('--- DEBUG: Starting eBay OAuth login ---');
  console.log('Client ID:', clientId);
  console.log('Redirect URI:', redirectUri);

  if (!clientId || !redirectUri) {
    console.error('Missing required environment variables');
    return res.status(400).json({
      error: 'Missing required environment variables',
      details: {
        EBAY_CLIENT_ID: !clientId ? 'missing' : 'present',
        EBAY_REDIRECT_URI: !redirectUri ? 'missing' : 'present',
      },
    });
  }

  const scopes = REQUIRED_SCOPES.join(' ');
  const state = Math.random().toString(36).substring(7); // Generate random state for security

  const authUrl = new URL(EBAY_SANDBOX_AUTH_URL);
  authUrl.searchParams.append('client_id', clientId);
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('scope', scopes);
  authUrl.searchParams.append('state', state);

  console.log('Generated Auth URL:', authUrl.toString());

  return res.redirect(authUrl.toString());
}
