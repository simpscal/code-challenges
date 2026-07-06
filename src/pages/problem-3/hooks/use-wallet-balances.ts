import type { WalletBalance } from '@/pages/problem-3/types/wallet-page.types';

/**
 * Standing in for a real data hook (context/query) — the original snippet
 * assumed one existed but never defined its shape, which is how `blockchain`
 * went missing from `WalletBalance` in the first place.
 */
export function useWalletBalances(): WalletBalance[] {
    return [
        { currency: 'ETH', amount: 2.5, blockchain: 'Ethereum' },
        { currency: 'OSMO', amount: 140, blockchain: 'Osmosis' },
        { currency: 'ARB', amount: 0, blockchain: 'Arbitrum' },
        { currency: 'ZIL', amount: 12.75, blockchain: 'Zilliqa' },
        { currency: 'NEO', amount: 4, blockchain: 'Neo' },
        { currency: 'DOGE', amount: 300, blockchain: 'Dogechain' },
    ];
}
