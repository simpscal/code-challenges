import { z } from 'zod';

const MAX_DECIMALS = 8;

export const swapFormSchema = z
    .object({
        fromCurrency: z.string().min(1, 'Select a token to swap from.'),
        toCurrency: z.string().min(1, 'Select a token to swap to.'),
        fromAmount: z
            .string()
            .min(1, 'Enter an amount.')
            .refine(value => !Number.isNaN(Number(value)), 'Enter a valid number.')
            .refine(value => Number(value) > 0, 'Amount must be greater than 0.')
            .refine(value => {
                const decimals = value.split('.')[1]?.length ?? 0;
                return decimals <= MAX_DECIMALS;
            }, `Amount supports at most ${MAX_DECIMALS} decimal places.`),
    })
    .refine(data => data.fromCurrency !== data.toCurrency, {
        message: 'Choose two different tokens.',
        path: ['toCurrency'],
    });

export type SwapFormValues = z.infer<typeof swapFormSchema>;
