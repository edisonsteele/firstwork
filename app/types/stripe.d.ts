import { Stripe } from 'stripe';

declare module 'stripe' {
  namespace Stripe {
    interface StripeConfig {
      apiVersion: '2023-10-16' | '2025-05-28.basil';
    }
  }
} 