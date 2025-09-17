'use client';

import { useState } from 'react';
import Button from './Button';

interface CopyIframeButtonProps {
  slug: string;
  className?: string;
  color?: string;
}

export default function CopyIframeButton({ slug, className = '', color }: CopyIframeButtonProps) {
  const [copied, setCopied] = useState(false);
  
  const getEmbedUrl = () => {
    // In production, this would be your actual domain
    // For now, we'll use a placeholder that users can replace
    const baseUrl = typeof window !== 'undefined' 
      ? `${window.location.protocol}//${window.location.host}`
      : 'https://your-site.netlify.app';
    
    const url = `${baseUrl}/embed/${slug}`;
    return color ? `${url}?color=${color}` : url;
  };
  
  const getIframeCode = () => {
    const embedUrl = getEmbedUrl();
    return `<iframe src="${embedUrl}" width="100%" height="400" frameborder="0" title="Calculator"></iframe>`;
  };
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getIframeCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = getIframeCode();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <Button
      onClick={handleCopy}
      variant="outline"
      size="sm"
      className={className}
    >
      {copied ? '✓ Copied!' : '📋 Copy Embed Code'}
    </Button>
  );
}
