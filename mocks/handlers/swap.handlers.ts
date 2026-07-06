import { delay, http, HttpResponse } from 'msw';

import { SWAP_ENDPOINT } from '@/app/constants/api.constant';

export const swapHandlers = [
    http.post(SWAP_ENDPOINT, async ({ request }) => {
        await delay(1200);

        const body = (await request.json()) as { fromAmount?: number };

        if (!body.fromAmount || body.fromAmount <= 0) {
            return HttpResponse.json({ message: 'Invalid swap amount.' }, { status: 400 });
        }

        return HttpResponse.json({
            id: crypto.randomUUID(),
            status: 'completed',
        });
    }),
];
