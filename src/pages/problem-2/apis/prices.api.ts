import { PRICES_URL } from './prices.constant';
import { toTokens } from './prices.mapper';
import type { Token } from './prices.model';

export const PRICES_QUERY_KEY = ['prices'] as const;

export async function getTokens(): Promise<Token[]> {
    const response = await fetch(PRICES_URL);

    if (!response.ok) {
        throw new Error('Failed to load token prices.');
    }

    const entries = await response.json();
    return toTokens(entries);
}
