import type { NextApiRequest, NextApiResponse } from 'next';

// 👇 Important: This enables JSON body parsing
export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('✅ eBay Deletion Notification:', {
      timestamp: new Date().toISOString(),
      headers: req.headers,
      payload: req.body,
    });

    return res.status(200).json({ 
      status: 'success',
      message: 'Notification received'
    });
  } catch (error) {
    console.error('❌ Error processing eBay deletion notification:', error);
    return res.status(500).json({ 
      status: 'error',
      message: 'Internal server error'
    });
  }
}
