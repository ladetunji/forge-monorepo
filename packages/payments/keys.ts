import { createEnv } from '@t3-oss/env-nextjs';
import { Paystack } from '@paystack/paystack-sdk';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
      STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_').optional(),
      PAYSTACK_SECRET_KEY: z.string().startsWith('sk_'),
      PAYSTACK_WEBHOOK_SECRET: z.string().optional(),
    },
    runtimeEnv: {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
      PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
      PAYSTACK_WEBHOOK_SECRET: process.env.PAYSTACK_WEBHOOK_SECRET,
    },
  });
