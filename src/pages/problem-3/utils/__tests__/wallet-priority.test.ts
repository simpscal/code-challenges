import { describe, expect, it } from 'vitest';

import { getPriority, isRecognizedBlockchain } from '../wallet-priority';

describe('getPriority', () => {
    it('ranks known blockchains', () => {
        expect(getPriority('Osmosis')).toBe(100);
        expect(getPriority('Ethereum')).toBe(50);
        expect(getPriority('Neo')).toBe(getPriority('Zilliqa'));
    });

    it('falls back to the default priority for unknown blockchains', () => {
        expect(getPriority('Dogechain')).toBe(-99);
    });
});

describe('isRecognizedBlockchain', () => {
    it('is true only for blockchains above the default priority', () => {
        expect(isRecognizedBlockchain('Ethereum')).toBe(true);
        expect(isRecognizedBlockchain('Dogechain')).toBe(false);
    });
});
