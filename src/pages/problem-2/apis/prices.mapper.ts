import { tokenIconUrl } from './prices.constant';
import type { Token } from './prices.model';

type PriceEntry = {
    currency: string;
    date: string;
    price: number;
};

/**
 * The feed carries repeated entries per currency over time and some zero/missing
 * prices — keep only the latest-dated entry per currency, and drop non-positive prices
 * since those tokens can't be swapped (no usable exchange rate).
 */
export function toTokens(entries: PriceEntry[]): Token[] {
    const latestByCurrency = new Map<string, PriceEntry>();

    for (const entry of entries) {
        const existing = latestByCurrency.get(entry.currency);
        if (!existing || new Date(entry.date) >= new Date(existing.date)) {
            latestByCurrency.set(entry.currency, entry);
        }
    }

    return Array.from(latestByCurrency.values())
        .filter(entry => entry.price > 0)
        .map(entry => ({
            currency: entry.currency,
            price: entry.price,
            iconUrl: tokenIconUrl(entry.currency),
        }))
        .sort((a, b) => a.currency.localeCompare(b.currency));
}
