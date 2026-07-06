/** Standing in for the real price feed — DOGE intentionally has no entry to exercise the missing-price case. */
export function usePrices(): Record<string, number> {
    return {
        ETH: 2000,
        OSMO: 0.38,
        ARB: 1.1,
        ZIL: 0.018,
        NEO: 10.25,
    };
}
