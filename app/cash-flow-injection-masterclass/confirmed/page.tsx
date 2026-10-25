import { Suspense } from 'react';
import ConfirmationClient from './ConfirmationClient';

export const metadata = {
  title: 'Registration Confirmed | Cash Flow Injection Strategy Masterclass',
  description: 'Your seat is reserved for the Cash Flow Injection Strategy Masterclass',
};

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationClient />
    </Suspense>
  );
}
