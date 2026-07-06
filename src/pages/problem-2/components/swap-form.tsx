import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowDownUp, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { getTokens, PRICES_QUERY_KEY } from '@/pages/problem-2/apis/prices.api';
import { submitSwap } from '@/pages/problem-2/apis/swap.api';
import { TokenSelect } from '@/pages/problem-2/components/token-select';
import { swapFormSchema, type SwapFormValues } from '@/pages/problem-2/lib/swap-schema';

type SwapReceipt = {
    fromAmount: number;
    fromCurrency: string;
    toCurrency: string;
    toAmount: number;
    rate: number;
};

export function SwapForm() {
    const { data: tokens, isLoading, isError } = useQuery({ queryKey: PRICES_QUERY_KEY, queryFn: getTokens });
    const [receipt, setReceipt] = useState<SwapReceipt | null>(null);

    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<SwapFormValues>({
        resolver: zodResolver(swapFormSchema),
        defaultValues: { fromCurrency: '', toCurrency: '', fromAmount: '' },
    });

    const swapMutation = useMutation({
        mutationFn: submitSwap,
        onSuccess: (response, variables) => {
            setReceipt({
                fromAmount: variables.fromAmount,
                fromCurrency: variables.fromCurrency,
                toCurrency: variables.toCurrency,
                toAmount: response.toAmount,
                rate: response.rate,
            });
            toast.success('Swap submitted successfully.');
            reset({ fromCurrency: variables.fromCurrency, toCurrency: variables.toCurrency, fromAmount: '' });
        },
    });

    const [fromCurrency, toCurrency] = watch(['fromCurrency', 'toCurrency']);

    const handleSwapDirection = () => {
        setValue('fromCurrency', toCurrency);
        setValue('toCurrency', fromCurrency);
    };

    const onSubmit = (values: SwapFormValues) => {
        setReceipt(null);
        swapMutation.mutate({
            fromCurrency: values.fromCurrency,
            toCurrency: values.toCurrency,
            fromAmount: Number(values.fromAmount),
        });
    };

    if (isLoading) {
        return (
            <div className='space-y-4'>
                <Skeleton className='h-24 w-full' />
                <Skeleton className='h-24 w-full' />
                <Skeleton className='h-10 w-full' />
            </div>
        );
    }

    if (isError || !tokens) {
        return (
            <Alert variant='destructive'>
                <AlertDescription>Could not load token prices. Please refresh and try again.</AlertDescription>
            </Alert>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <div className='space-y-2 rounded-lg border p-4'>
                <Label>From</Label>
                <div className='flex gap-2'>
                    <Input type='number' step='any' placeholder='0.0' className='flex-1' {...register('fromAmount')} />
                    <Controller
                        control={control}
                        name='fromCurrency'
                        render={({ field }) => (
                            <div className='w-40'>
                                <TokenSelect tokens={tokens} value={field.value} onChange={field.onChange} />
                            </div>
                        )}
                    />
                </div>
                {errors.fromAmount && <p className='text-sm text-destructive'>{errors.fromAmount.message}</p>}
                {errors.fromCurrency && <p className='text-sm text-destructive'>{errors.fromCurrency.message}</p>}
            </div>

            <div className='flex justify-center'>
                <Button type='button' variant='outline' size='icon' onClick={handleSwapDirection}>
                    <ArrowDownUp className='size-4' />
                </Button>
            </div>

            <div className='space-y-2 rounded-lg border p-4'>
                <Label>To</Label>
                <div className='flex gap-2'>
                    <Input type='text' readOnly placeholder='Computed when you swap' className='flex-1' value='' />
                    <Controller
                        control={control}
                        name='toCurrency'
                        render={({ field }) => (
                            <div className='w-40'>
                                <TokenSelect tokens={tokens} value={field.value} onChange={field.onChange} />
                            </div>
                        )}
                    />
                </div>
                {errors.toCurrency && <p className='text-sm text-destructive'>{errors.toCurrency.message}</p>}
            </div>

            <Button type='submit' size='lg' disabled={swapMutation.isPending}>
                {swapMutation.isPending && <Loader2 className='size-4 animate-spin' />}
                {swapMutation.isPending ? 'Submitting...' : 'Swap'}
            </Button>

            {receipt && (
                <div className='rounded-lg border bg-muted/30 p-4 text-center text-sm'>
                    <p className='font-medium'>
                        Swapped {receipt.fromAmount} {receipt.fromCurrency} for {receipt.toAmount.toFixed(6)}{' '}
                        {receipt.toCurrency}
                    </p>
                    <p className='text-muted-foreground'>
                        Rate: 1 {receipt.fromCurrency} = {receipt.rate.toFixed(6)} {receipt.toCurrency}
                    </p>
                </div>
            )}
        </form>
    );
}
