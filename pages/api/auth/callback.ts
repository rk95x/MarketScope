// pages/api/auth/callback.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('🔁 eBay OAuth callback received');
    console.log('Query params:', req.query);

    const code = req.query.code as string;
    const clientId = process.env.EBAY_CLIENT_ID;
    const clientSecret = process.env.EBAY_CLIENT_SECRET;
    const redirectUri = process.env.EBAY_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      console.error('❌ Missing required environment variables');
      return res.status(400).json({
        error: 'Missing required environment variables',
        details: {
          EBAY_CLIENT_ID: !!clientId,
          EBAY_CLIENT_SECRET: !!clientSecret,
          EBAY_REDIRECT_URI: !!redirectUri,
        },
      });
    }

    if (!code) {
      console.error('❌ Missing authorization code from eBay');
      return res.status(400).json({ error: 'Missing "code" query parameter' });
    }

    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch('https://api.sandbox.ebay.com/identity/v1/oauth2/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Failed to fetch access token:', data);
      return res.status(500).json({ error: 'Failed to get access token', details: data });
    }

    console.log('✅ eBay Access Token Response:', data);
    return res.status(200).json({ message: 'OAuth flow completed successfully', data });
  } catch (error: any) {
    console.error('💥 Unexpected error during callback handling:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message || error });
  }
}
