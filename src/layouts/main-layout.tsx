import { ArrowLeft, ArrowRight, CodeXml } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { PROBLEM_NAV_ORDER, ROUTES } from '@/app/constants/routes.constant';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

const PAGE_LABELS: Record<string, string> = {
    [ROUTES.landing]: 'Overview',
    [ROUTES.problem1]: 'Problem 1 — Sum to N',
    [ROUTES.problem2]: 'Problem 2 — Currency Swap',
    [ROUTES.problem3]: 'Problem 3 — Refactor',
};

export function MainLayout() {
    const location = useLocation();
    const currentIndex = PROBLEM_NAV_ORDER.indexOf(location.pathname as (typeof PROBLEM_NAV_ORDER)[number]);
    const previousPath = currentIndex > 0 ? PROBLEM_NAV_ORDER[currentIndex - 1] : undefined;
    const nextPath =
        currentIndex >= 0 && currentIndex < PROBLEM_NAV_ORDER.length - 1
            ? PROBLEM_NAV_ORDER[currentIndex + 1]
            : undefined;

    return (
        <div className='flex min-h-svh flex-col'>
            <header className='border-border/60 sticky top-0 z-10 border-b bg-background/80 backdrop-blur'>
                <div className='mx-auto flex h-14 max-w-5xl items-center justify-between px-4'>
                    <Link to={ROUTES.landing} className='flex items-center gap-2 font-semibold tracking-tight'>
                        <CodeXml className='size-5 text-primary' />
                        Code Challenges
                    </Link>
                    <ThemeToggle />
                </div>
            </header>

            <main className='mx-auto w-full max-w-5xl flex-1 px-4 py-10'>
                <Outlet />
            </main>

            {currentIndex >= 0 && (
                <footer className='border-border/60 border-t'>
                    <div className='mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4'>
                        {previousPath ? (
                            <Button variant='outline' asChild>
                                <Link to={previousPath}>
                                    <ArrowLeft className='size-4' />
                                    {PAGE_LABELS[previousPath]}
                                </Link>
                            </Button>
                        ) : (
                            <span />
                        )}
                        {nextPath ? (
                            <Button variant='outline' asChild>
                                <Link to={nextPath}>
                                    {PAGE_LABELS[nextPath]}
                                    <ArrowRight className='size-4' />
                                </Link>
                            </Button>
                        ) : (
                            <span />
                        )}
                    </div>
                </footer>
            )}
        </div>
    );
}
