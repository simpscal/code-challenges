import { Compass, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/app/constants/routes.constant';
import { SourceLink } from '@/components/source-link';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
    return (
        <div className='flex min-h-[50vh] flex-col items-center justify-center gap-6 text-center'>
            <Compass className='size-12 text-muted-foreground' />
            <div className='space-y-2'>
                <p className='text-sm font-medium text-muted-foreground'>404</p>
                <h1 className='text-3xl font-semibold tracking-tight'>This page doesn't exist</h1>
                <p className='text-muted-foreground'>The route you tried doesn't match any of the challenge pages.</p>
            </div>
            <Button asChild>
                <Link to={ROUTES.landing}>
                    <Home className='size-4' />
                    Back to overview
                </Link>
            </Button>
            <SourceLink path='src/pages/not-found' />
        </div>
    );
}
