import { Badge } from '@/components/ui/badge';
import { ISSUES } from '@/pages/problem-3/constants/issues';

export function IssueList() {
    return (
        <ol className='flex flex-col gap-4'>
            {ISSUES.map((issue, index) => (
                <li key={issue.line} className='flex gap-3 rounded-lg border p-3'>
                    <span className='flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium'>
                        {index + 1}
                    </span>
                    <div className='space-y-1'>
                        <div className='flex items-center gap-2'>
                            <p className='font-medium'>{issue.title}</p>
                            <Badge variant='outline' className='font-mono text-xs'>
                                line {issue.line}
                            </Badge>
                        </div>
                        <p className='text-sm text-muted-foreground'>{issue.explanation}</p>
                    </div>
                </li>
            ))}
        </ol>
    );
}
