import { CodeBlock } from '@/components/code-block';
import { SourceLink } from '@/components/source-link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IssueList } from '@/pages/problem-3/components/issue-list';
import { WalletPage as RefactoredWalletPage } from '@/pages/problem-3/components/wallet-page-refactored';
import refactoredSource from '@/pages/problem-3/components/wallet-page-refactored.tsx?raw';
import { ISSUES } from '@/pages/problem-3/lib/issues';
import originalSource from '@/pages/problem-3/lib/original-wallet-page.txt?raw';

const ISSUE_LINES = ISSUES.map(issue => issue.line);

export default function Problem3Page() {
    return (
        <div className='flex flex-col gap-8'>
            <div className='space-y-2'>
                <p className='text-sm font-medium text-primary'>Problem 3</p>
                <h1 className='text-3xl font-semibold tracking-tight'>Refactoring a wallet balance list</h1>
                <p className='max-w-2xl text-muted-foreground'>
                    {ISSUES.length} computational inefficiencies and anti-patterns identified in the original component,
                    each mapped to a line in the highlighted snippet below.
                </p>
                <SourceLink path='src/pages/problem-3' />
            </div>

            <div className='grid gap-6 lg:grid-cols-2'>
                <div className='space-y-3'>
                    <h2 className='text-sm font-medium text-muted-foreground'>Original</h2>
                    <CodeBlock code={originalSource} lang='tsx' highlightLines={ISSUE_LINES} />
                </div>
                <div className='space-y-3'>
                    <h2 className='text-sm font-medium text-muted-foreground'>Refactored</h2>
                    <CodeBlock code={refactoredSource} lang='tsx' />
                </div>
            </div>

            <div className='space-y-3'>
                <h2 className='text-xl font-semibold tracking-tight'>Issues found</h2>
                <IssueList />
            </div>

            <div className='space-y-3'>
                <h2 className='text-xl font-semibold tracking-tight'>The fix, running</h2>
                <Card className='mx-auto w-full max-w-md'>
                    <CardHeader>
                        <CardTitle className='text-base'>Wallet balances</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RefactoredWalletPage />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
