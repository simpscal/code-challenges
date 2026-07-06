import { SourceLink } from '@/components/source-link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SwapForm } from '@/pages/problem-2/components/swap-form';

export default function Problem2Page() {
    return (
        <div className='flex flex-col gap-8'>
            <div className='space-y-2'>
                <p className='text-sm font-medium text-primary'>Problem 2</p>
                <h1 className='text-3xl font-semibold tracking-tight'>Currency swap</h1>
                <p className='max-w-2xl text-muted-foreground'>
                    Swap between tokens at live market rates. Prices are fetched from a public price feed; submitting a
                    swap is simulated with a short network delay.
                </p>
                <SourceLink path='src/pages/problem-2' />
            </div>

            <Card className='mx-auto w-full max-w-md'>
                <CardHeader>
                    <CardTitle>Swap tokens</CardTitle>
                </CardHeader>
                <CardContent>
                    <SwapForm />
                </CardContent>
            </Card>
        </div>
    );
}
