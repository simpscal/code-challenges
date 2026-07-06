import { delay, http, HttpResponse } from 'msw';

import { SWAP_ENDPOINT } from '@/app/constants/api.constant';
import { getTokens } from '@/pages/problem-2/apis/prices.api';

type SwapRequestBody = {
    fromCurrency?: string;
    toCurrency?: string;
    fromAmount?: number;
};

export const swapHandlers = [
    http.post(SWAP_ENDPOINT, async ({ request }) => {
        await delay(1200);

        const body = (await request.json()) as SwapRequestBody;

        if (!body.fromAmount || body.fromAmount <= 0) {
            return HttpResponse.json({ message: 'Invalid swap amount.' }, { status: 400 });
        }

        // The rate is computed here, against the backend's own price source — the
        // client never sends (or is trusted for) a rate, only the two currencies
        // and an amount.
        const tokens = await getTokens();
        const fromToken = tokens.find(token => token.currency === body.fromCurrency);
        const toToken = tokens.find(token => token.currency === body.toCurrency);

        if (!fromToken || !toToken) {
            return HttpResponse.json({ message: 'Unknown token.' }, { status: 400 });
        }

        const rate = fromToken.price / toToken.price;

        return HttpResponse.json({
            id: crypto.randomUUID(),
            status: 'completed',
            rate,
            toAmount: body.fromAmount * rate,
        });
    }),
];
