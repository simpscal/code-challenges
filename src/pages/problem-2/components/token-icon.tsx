import { Coins } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

type TokenIconProps = {
    src: string;
    alt: string;
    className?: string;
};

export function TokenIcon({ src, alt, className }: TokenIconProps) {
    const [errored, setErrored] = useState(false);
    const handleError = () => setErrored(true);

    if (errored) {
        return (
            <span className={cn('flex size-5 items-center justify-center rounded-full bg-muted', className)}>
                <Coins className='size-3 text-muted-foreground' />
            </span>
        );
    }

    return <img src={src} alt={alt} className={cn('size-5 rounded-full', className)} onError={handleError} />;
}
