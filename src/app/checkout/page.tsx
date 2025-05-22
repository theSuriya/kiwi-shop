"use client";

import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [productId, setProductId] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = searchParams.get('productId');
    if (id) {
      setProductId(id);
    }
  }, [searchParams]);

  if (!mounted) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading checkout...</div>;
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutForm productId={productId} />
    </div>
  );
}
