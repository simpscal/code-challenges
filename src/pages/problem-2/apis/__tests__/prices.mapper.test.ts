import { describe, expect, it } from 'vitest';

import { toTokens } from '../prices.mapper';

describe('toTokens', () => {
    it('keeps only the latest-dated entry per currency', () => {
        const tokens = toTokens([
            { currency: 'ETH', date: '2023-01-01T00:00:00.000Z', price: 1000 },
            { currency: 'ETH', date: '2023-06-01T00:00:00.000Z', price: 2000 },
        ]);

        expect(tokens).toEqual([{ currency: 'ETH', price: 2000, iconUrl: expect.stringContaining('ETH.svg') }]);
    });

    it('drops entries with zero or negative price', () => {
        const tokens = toTokens([
            { currency: 'DEAD', date: '2023-01-01T00:00:00.000Z', price: 0 },
            { currency: 'ETH', date: '2023-01-01T00:00:00.000Z', price: 1000 },
        ]);

        expect(tokens.map(t => t.currency)).toEqual(['ETH']);
    });

    it('sorts results alphabetically by currency', () => {
        const tokens = toTokens([
            { currency: 'ETH', date: '2023-01-01T00:00:00.000Z', price: 1000 },
            { currency: 'BTC', date: '2023-01-01T00:00:00.000Z', price: 30000 },
        ]);

        expect(tokens.map(t => t.currency)).toEqual(['BTC', 'ETH']);
    });
});
