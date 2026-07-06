import { useMemo, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from '@/pages/problem-1/utils/sum-to-n';

const RECURSION_SAFE_LIMIT = 10_000;

function runSafely(fn: (n: number) => number, n: number): string {
    try {
        return fn(n).toLocaleString();
    } catch {
        return 'Stack overflow';
    }
}

export function LiveComparison() {
    const [input, setInput] = useState('5');
    const n = Number(input);
    const isValid = input.trim() !== '' && Number.isInteger(n);

    const results = useMemo(() => {
        if (!isValid) return null;

        return [
            { name: 'sum_to_n_a', value: runSafely(sum_to_n_a, n) },
            { name: 'sum_to_n_b', value: runSafely(sum_to_n_b, n) },
            {
                name: 'sum_to_n_c',
                value:
                    Math.abs(n) > RECURSION_SAFE_LIMIT
                        ? 'Skipped (would overflow the stack)'
                        : runSafely(sum_to_n_c, n),
            },
        ];
    }, [n, isValid]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value);

    return (
        <div className='flex flex-col gap-4 rounded-lg border p-4'>
            <div className='flex items-center gap-3'>
                <Label htmlFor='n-input' className='shrink-0'>
                    n =
                </Label>
                <Input
                    id='n-input'
                    type='number'
                    value={input}
                    onChange={handleChange}
                    className='max-w-40'
                    placeholder='e.g. 5 or -3'
                />
            </div>

            {!isValid && <p className='text-sm text-destructive'>Enter an integer.</p>}

            {results && (
                <div className='grid gap-3 sm:grid-cols-3'>
                    {results.map(result => (
                        <div key={result.name} className='rounded-md bg-muted/50 p-3'>
                            <p className='font-mono text-xs text-muted-foreground'>{result.name}(n)</p>
                            <p className='text-lg font-semibold'>{result.value}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
