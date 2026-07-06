import { Badge } from '@/components/ui/badge';

const ROWS = [
    { name: 'sum_to_n_a', approach: 'Iterative loop', time: 'O(n)', space: 'O(1)' },
    { name: 'sum_to_n_b', approach: "Closed-form (Gauss' formula)", time: 'O(1)', space: 'O(1)' },
    { name: 'sum_to_n_c', approach: 'Recursive', time: 'O(n)', space: 'O(n) call stack' },
] as const;

export function ComplexityTable() {
    return (
        <div className='overflow-hidden rounded-lg border'>
            <table className='w-full text-sm'>
                <thead className='bg-muted/50 text-left text-muted-foreground'>
                    <tr>
                        <th className='px-4 py-2 font-medium'>Function</th>
                        <th className='px-4 py-2 font-medium'>Approach</th>
                        <th className='px-4 py-2 font-medium'>Time</th>
                        <th className='px-4 py-2 font-medium'>Space</th>
                    </tr>
                </thead>
                <tbody>
                    {ROWS.map(row => (
                        <tr key={row.name} className='border-t'>
                            <td className='px-4 py-2 font-mono text-xs'>{row.name}</td>
                            <td className='px-4 py-2'>{row.approach}</td>
                            <td className='px-4 py-2'>
                                <Badge variant='outline'>{row.time}</Badge>
                            </td>
                            <td className='px-4 py-2'>
                                <Badge variant='outline'>{row.space}</Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
