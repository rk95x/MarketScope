// =============================
// lib/ebay-policies.ts
// =============================
import fetch from 'node-fetch';
import { getEbayAccessToken } from './ebay-auth';

export const createFulfillmentPolicy = async () => {
  const token = await getEbayAccessToken();
  const policy = {
    name: 'Sandbox Fulfillment Policy',
    marketplaceId: 'EBAY_US',
    handlingTime: { value: 1 },
    shippingOptions: [
      {
        optionType: 'DOMESTIC',
        costType: 'FLAT_RATE',
        shippingServices: [
          {
            shippingServiceCode: 'USPSPriority',
            freeShipping: true,
          },
        ],
      },
    ],
  };

  const response = await fetch('https://api.sandbox.ebay.com/sell/account/v1/fulfillment_policy', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(policy),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create fulfillment policy: ${errorText}`);
  }

  const data = await response.json();
  return data.policyId;
};

export const createPaymentPolicy = async () => {
  const token = await getEbayAccessToken();
  const policy = {
    name: 'Sandbox Payment Policy',
    marketplaceId: 'EBAY_US',
    categoryTypes: [
      {
        name: 'ALL_EXCLUDING_MOTORS_VEHICLES',
        default: true,
      },
    ],
    paymentInstructions: 'PayPal only',
    immediatePay: true,
  };

  const response = await fetch('https://api.sandbox.ebay.com/sell/account/v1/payment_policy', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(policy),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create payment policy: ${errorText}`);
  }

  const data = await response.json();
  return data.policyId;
};

export const createReturnPolicy = async () => {
  const token = await getEbayAccessToken();
  const policy = {
    name: 'Sandbox Return Policy',
    marketplaceId: 'EBAY_US',
    returnsAccepted: true,
    returnMethod: 'EXCHANGE',
    returnShippingCostPayer: 'BUYER',
    refundMethod: 'MONEY_BACK',
    returnPeriod: {
      value: 30,
      unit: 'DAY',
    },
  };

  const response = await fetch('https://api.sandbox.ebay.com/sell/account/v1/return_policy', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(policy),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create return policy: ${errorText}`);
  }

  const data = await response.json();
  return data.policyId;
};
