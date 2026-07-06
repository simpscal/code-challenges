import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { SWAP_ENDPOINT } from '@/app/constants/api.constant';
import { PRICES_URL } from '@/pages/problem-2/apis/prices.constant';
import { SwapForm } from '@/pages/problem-2/components/swap-form';
import { renderWithProviders, screen, waitFor, waitForElementToBeRemoved } from '@/test/render';
import { server } from '@/test/server';

const PRICE_FIXTURE = [
    { currency: 'ETH', date: '2024-01-01T00:00:00.000Z', price: 2000 },
    { currency: 'USDC', date: '2024-01-01T00:00:00.000Z', price: 1 },
];

function mockPrices() {
    server.use(http.get(PRICES_URL, () => HttpResponse.json(PRICE_FIXTURE)));
}

async function selectToken(user: ReturnType<typeof userEvent.setup>, triggerIndex: number, currency: string) {
    const triggers = screen.getAllByRole('combobox');
    await user.click(triggers[triggerIndex]);
    const option = await screen.findByText(currency);
    await user.click(option);
}

describe('SwapForm', () => {
    it('completes a full swap: load prices, pick tokens, compute rate, submit', async () => {
        mockPrices();
        server.use(http.post(SWAP_ENDPOINT, () => HttpResponse.json({ id: 'swap_1', status: 'completed' })));

        const user = userEvent.setup();
        renderWithProviders(<SwapForm />);

        await waitForElementToBeRemoved(() => document.querySelector('[data-slot="skeleton"]'));

        await selectToken(user, 0, 'ETH');
        await selectToken(user, 1, 'USDC');

        const amountInput = screen.getAllByPlaceholderText('0.0')[0];
        await user.type(amountInput, '2');

        expect(await screen.findByText('1 ETH = 2000.000000 USDC')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: /swap/i }));

        await waitFor(() => expect(amountInput).toHaveValue(null));
    });

    it('shows validation errors for an invalid amount', async () => {
        mockPrices();
        const user = userEvent.setup();
        renderWithProviders(<SwapForm />);

        await waitForElementToBeRemoved(() => document.querySelector('[data-slot="skeleton"]'));

        await selectToken(user, 0, 'ETH');
        await selectToken(user, 1, 'USDC');
        await user.click(screen.getByRole('button', { name: /swap/i }));

        expect(await screen.findByText('Enter an amount.')).toBeInTheDocument();
    });
});
