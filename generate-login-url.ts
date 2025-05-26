import dotenv from 'dotenv';

dotenv.config();

const clientId = process.env.EBAY_CLIENT_ID;
const redirectUri = process.env.EBAY_REDIRECT_URI;

if (!clientId || !redirectUri) {
  console.error('Missing required environment variables: EBAY_CLIENT_ID or EBAY_REDIRECT_URI');
  process.exit(1);
}

const scopes = [
  'https://api.ebay.com/oauth/api_scope/sell.account',
  'https://api.ebay.com/oauth/api_scope/sell.inventory',
  'https://api.ebay.com/oauth/api_scope/sell.fulfillment',
  'https://api.ebay.com/oauth/api_scope/sell.payment',
  'https://api.ebay.com/oauth/api_scope/sell.returns'
].join(' ');

const loginUrl = new URL('https://auth.sandbox.ebay.com/oauth2/authorize');
loginUrl.searchParams.append('client_id', clientId);
loginUrl.searchParams.append('redirect_uri', redirectUri);
loginUrl.searchParams.append('response_type', 'code');
loginUrl.searchParams.append('scope', encodeURIComponent(scopes));

console.log('\nPaste this URL into your browser to begin the eBay OAuth flow:');
console.log(loginUrl.toString()); 