const { createInventoryItem, createOffer, publishOffer } = require('./lib/ebay-inventory');
const fs = require('fs');
const path = require('path');

async function main() {
  try {
    // Load policy IDs
    const policyIds = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'policy-ids.json'), 'utf-8')
    );

    // Create inventory item
    const sku = 'TEST-ITEM-001';
    const inventoryItem = {
      product: {
        title: 'Test Item',
        description: 'This is a test item created via the eBay API',
        aspects: {
          'Brand': ['Test Brand'],
          'Color': ['Blue'],
          'Size': ['Medium']
        },
        imageUrls: ['https://example.com/test-image.jpg']
      },
      condition: 'NEW',
      packageWeightAndSize: {
        weight: {
          value: 1,
          unit: 'POUND'
        },
        dimensions: {
          length: 10,
          width: 10,
          height: 5,
          unit: 'INCH'
        }
      }
    };

    console.log('Creating inventory item...');
    await createInventoryItem(sku, inventoryItem);
    console.log('Inventory item created successfully!');

    // Create offer
    const offer = {
      sku,
      marketplaceId: 'EBAY_US', // eBay US marketplace
      format: 'FIXED_PRICE',
      availableQuantity: 1,
      categoryId: '9355', // Example category ID for Electronics
      listingDescription: 'This is a test item created via the eBay API',
      listingPolicies: {
        fulfillmentPolicyId: policyIds.fulfillmentPolicyId,
        paymentPolicyId: policyIds.paymentPolicyId,
        returnPolicyId: policyIds.returnPolicyId
      },
      pricingSummary: {
        price: {
          value: 19.99,
          currency: 'USD'
        }
      }
    };

    console.log('Creating offer...');
    const offerId = await createOffer(offer);
    console.log(`Offer created successfully! Offer ID: ${offerId}`);

    // Publish offer
    console.log('Publishing offer...');
    await publishOffer(offerId);
    console.log('Offer published successfully!');

    console.log('\nYour listing should now be visible in the eBay Sandbox.');
    console.log('You can search for it using: https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=test');

  } catch (error) {
    console.error('Error:', error);
  }
}

main(); 