import { ArrowRight, Calculator, GitCompareArrows, Repeat } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/app/constants/routes.constant';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const PROBLEMS = [
    {
        path: ROUTES.problem1,
        icon: Calculator,
        title: 'Problem 1 — Sum to N',
        description: 'Three distinct JavaScript implementations of summation to n, compared live.',
        tags: ['JavaScript', 'Algorithms'],
    },
    {
        path: ROUTES.problem2,
        icon: Repeat,
        title: 'Problem 2 — Currency Swap',
        description: 'A production-quality token swap form backed by live market prices.',
        tags: ['React', 'Forms', 'Validation'],
    },
    {
        path: ROUTES.problem3,
        icon: GitCompareArrows,
        title: 'Problem 3 — Refactor',
        description: 'Anti-patterns identified and fixed in a React + TypeScript component.',
        tags: ['React', 'TypeScript', 'Code Review'],
    },
] as const;

export default function LandingPage() {
    return (
        <div className='flex flex-col gap-16'>
            <section className='flex flex-col items-center gap-6 pt-8 text-center'>
                <Badge variant='secondary' className='px-3 py-1'>
                    Frontend Code Challenge
                </Badge>
                <h1 className='max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl'>
                    Three problems, solved with production-grade React
                </h1>
                <p className='max-w-xl text-lg text-muted-foreground'>
                    Algorithms, an interactive currency swap form, and a real-world refactor — each built to the same
                    bar as shipped product code.
                </p>
                <Button asChild size='lg'>
                    <Link to={ROUTES.problem1}>
                        Start with Problem 1
                        <ArrowRight className='size-4' />
                    </Link>
                </Button>
            </section>

            <section className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {PROBLEMS.map(problem => (
                    <Card key={problem.path} className='flex flex-col justify-between'>
                        <CardHeader>
                            <problem.icon className='mb-2 size-8 text-primary' />
                            <CardTitle className='text-xl'>{problem.title}</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-1 flex-col gap-4'>
                            <p className='text-sm text-muted-foreground'>{problem.description}</p>
                            <div className='flex flex-wrap gap-2'>
                                {problem.tags.map(tag => (
                                    <Badge key={tag} variant='outline'>
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant='secondary' className='w-full'>
                                <Link to={problem.path}>
                                    View solution
                                    <ArrowRight className='size-4' />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </section>
        </div>
    );
}
