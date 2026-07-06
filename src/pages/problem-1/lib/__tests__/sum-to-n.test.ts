import { describe, expect, it } from 'vitest';

import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from '../sum-to-n';

const implementations = [
    ['iterative', sum_to_n_a],
    ['formula', sum_to_n_b],
    ['recursive', sum_to_n_c],
] as const;

describe.each(implementations)('sum_to_n (%s)', (_name, sum_to_n) => {
    it('sums 1..n for positive n', () => {
        expect(sum_to_n(5)).toBe(15);
        expect(sum_to_n(1)).toBe(1);
        expect(sum_to_n(100)).toBe(5050);
    });

    it('returns 0 for n === 0', () => {
        expect(sum_to_n(0)).toBe(0);
    });

    it('sums the descending range to -1 for negative n', () => {
        expect(sum_to_n(-3)).toBe(-6);
        expect(sum_to_n(-1)).toBe(-1);
    });
});

describe('sum_to_n_a and sum_to_n_b (no call-stack limit)', () => {
    it('stay exact for large n', () => {
        expect(sum_to_n_a(10_000)).toBe(50_005_000);
        expect(sum_to_n_b(10_000)).toBe(50_005_000);
        expect(sum_to_n_a(1_000_000)).toBe(sum_to_n_b(1_000_000));
    });
});

describe('sum_to_n_c (recursive)', () => {
    it('stays exact within a safe recursion depth', () => {
        expect(sum_to_n_c(1000)).toBe(500_500);
    });

    it('overflows the call stack for very large n — the trade-off of this approach', () => {
        expect(() => sum_to_n_c(1_000_000)).toThrow(RangeError);
    });
});

describe('sum_to_n implementations agree with each other', () => {
    it.each([-50, -1, 0, 1, 2, 3, 50, 1000])('for n = %i', n => {
        const [a, b, c] = [sum_to_n_a(n), sum_to_n_b(n), sum_to_n_c(n)];
        expect(a).toBe(b);
        expect(b).toBe(c);
    });
});
