import 'server-only';
import Stripe from 'stripe';
import { Paystack } from '@paystack/paystack-sdk';
import { keys } from './keys';

export const stripe = new Stripe(keys().STRIPE_SECRET_KEY, {
  apiVersion: '2025-04-30.basil',
});

export const paystack = new Paystack(keys().PAYSTACK_SECRET_KEY);

export type { Stripe } from 'stripe';