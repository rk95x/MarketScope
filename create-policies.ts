// =============================
// create-policies.ts
// =============================
import {
    createFulfillmentPolicy,
    createPaymentPolicy,
    createReturnPolicy,
  } from './lib/ebay-policies';
  
  import fs from 'fs';
  import path from 'path';
  
  async function main() {
    try {
      console.log('Creating eBay business policies...');
  
      const fulfillmentPolicyId = await createFulfillmentPolicy();
      console.log(`Fulfillment Policy ID: ${fulfillmentPolicyId}`);
  
      const paymentPolicyId = await createPaymentPolicy();
      console.log(`Payment Policy ID: ${paymentPolicyId}`);
  
      const returnPolicyId = await createReturnPolicy();
      console.log(`Return Policy ID: ${returnPolicyId}`);
  
      const policyIds = {
        fulfillmentPolicyId,
        paymentPolicyId,
        returnPolicyId,
      };
  
      fs.writeFileSync(
        path.join(__dirname, 'policy-ids.json'),
        JSON.stringify(policyIds, null, 2)
      );
  
      console.log('\nPolicy IDs have been saved to policy-ids.json');
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  main();
  