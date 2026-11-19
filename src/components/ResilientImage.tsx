import { useState } from 'react';

interface ResilientImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
}

export function ResilientImage({
  src,
  fallbackSrc,
  alt,
  className = 'w-full h-full object-cover',
}: ResilientImageProps) {
  const [activeSrc, setActiveSrc] = useState(src);

  return (
    <img
      src={activeSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => {
        if (fallbackSrc && activeSrc !== fallbackSrc) {
          setActiveSrc(fallbackSrc);
        }
      }}
      className={className}
    />
  );
}
