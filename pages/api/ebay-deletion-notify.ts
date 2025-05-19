import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Log the request body for debugging
    console.log('eBay Deletion Notification:', {
      timestamp: new Date().toISOString(),
      payload: req.body
    });

    // Return 200 OK to acknowledge receipt
    return res.status(200).json({ 
      status: 'success',
      message: 'Notification received'
    });
  } catch (error) {
    console.error('Error processing eBay deletion notification:', error);
    return res.status(500).json({ 
      status: 'error',
      message: 'Internal server error'
    });
  }
} 