import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: true,
  },
};

const VERIFICATION_TOKEN = 'MarketScopeVerificationTokenGeneratedForInternalUseOnly2024';
const ENDPOINT_URL = 'https://market-scope-5fqz.vercel.app/api/ebay-deletion-notify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const challengeCode = req.query.challenge_code as string;
    if (!challengeCode) {
      return res.status(400).json({ error: 'Missing challenge_code' });
    }

    const hash = crypto.createHash('sha256');
    hash.update(challengeCode);
    hash.update(VERIFICATION_TOKEN);
    hash.update(ENDPOINT_URL);
    const challengeResponse = hash.digest('hex');

    return res.status(200).json({ challengeResponse });
  }

  if (req.method === 'POST') {
    console.log('✅ eBay Deletion Notification:', {
      timestamp: new Date().toISOString(),
      headers: req.headers,
      payload: req.body,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Notification received',
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
