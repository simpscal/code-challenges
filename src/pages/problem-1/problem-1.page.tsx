import { CodeBlock } from '@/components/code-block';
import { SourceLink } from '@/components/source-link';
import { ComplexityTable } from '@/pages/problem-1/components/complexity-table';
import { LiveComparison } from '@/pages/problem-1/components/live-comparison';
import sumToNSource from '@/pages/problem-1/utils/sum-to-n.ts?raw';

export default function Problem1Page() {
    return (
        <div className='flex flex-col gap-8'>
            <div className='space-y-2'>
                <p className='text-sm font-medium text-primary'>Problem 1</p>
                <h1 className='text-3xl font-semibold tracking-tight'>Sum to n</h1>
                <p className='max-w-2xl text-muted-foreground'>
                    Three implementations of the same summation, each with a different time/space trade-off. n is
                    treated as any integer — negative n sums the descending range up to -1.
                </p>
                <SourceLink path='src/pages/problem-1' />
            </div>

            <ComplexityTable />

            <CodeBlock code={sumToNSource} lang='ts' />

            <div className='space-y-3'>
                <h2 className='text-xl font-semibold tracking-tight'>Try it</h2>
                <LiveComparison />
            </div>
        </div>
    );
}
