'use client'
import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
const ResetSearchButton = () => {
  const handleReset = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevent default navigation behavior
    e.preventDefault();
    
    // Reset the form
    const form = document.querySelector('.search-form') as HTMLFormElement;
    if(form) form.reset();
    
    // Navigate to home page after form reset
    window.location.href = '/';
  };

  return (
    <Button variant="ghost" className="search-btn text-white p-0" asChild>
      <Link href="/" onClick={handleReset}>
        <X />
      </Link>
    </Button>
  );
};

export default ResetSearchButton;
