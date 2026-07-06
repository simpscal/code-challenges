import { apiClient } from '@/apis/client';
import { SWAP_ENDPOINT } from '@/app/constants/api.constant';

export type SwapRequest = {
    fromCurrency: string;
    toCurrency: string;
    fromAmount: number;
};

export type SwapResponse = {
    id: string;
    status: 'completed';
    rate: number;
    toAmount: number;
};

export function submitSwap(payload: SwapRequest) {
    return apiClient.post<SwapResponse>(SWAP_ENDPOINT, payload);
}
