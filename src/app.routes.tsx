import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTES } from '@/app/constants/routes.constant';
import { PageLoader } from '@/components/page-loader';
import { MainLayout } from '@/layouts/main-layout';

const LandingPage = lazy(() => import('@/pages/landing/landing.page'));
const Problem1Page = lazy(() => import('@/pages/problem-1/problem-1.page'));
const Problem2Page = lazy(() => import('@/pages/problem-2/problem-2.page'));
const Problem3Page = lazy(() => import('@/pages/problem-3/problem-3.page'));
const NotFoundPage = lazy(() => import('@/pages/not-found/not-found.page'));

export function AppRoutes() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path={ROUTES.landing} element={<LandingPage />} />
                    <Route path={ROUTES.problem1} element={<Problem1Page />} />
                    <Route path={ROUTES.problem2} element={<Problem2Page />} />
                    <Route path={ROUTES.problem3} element={<Problem3Page />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
}
