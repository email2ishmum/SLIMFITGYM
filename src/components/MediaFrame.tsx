import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface MediaFrameProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackTitle?: string;
}

export function MediaFrame({
  src,
  alt,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  fallbackTitle = 'Slim Fit Gym Sanctuary',
}: MediaFrameProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#F5F3F1] ring-1 ring-inset ring-[#161416]/[0.06] ${className}`}
    >
      {!failed ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setFailed(true)}
          className={imgClassName}
        />
      ) : (
        <div className="flex h-full min-h-[220px] w-full flex-col items-center justify-center bg-gradient-to-br from-[#FDF0F4] via-[#FAF8F6] to-[#F5F3F1] p-6 text-center">
          <ShieldCheck className="mb-3 h-7 w-7 text-[#D92662]" aria-hidden="true" />
          <p className="font-display text-sm font-semibold text-[#161416]">{fallbackTitle}</p>
          <p className="mt-1 text-xs text-[#4A4448]">Mirpur-2, Dhaka</p>
        </div>
      )}
    </div>
  );
}
