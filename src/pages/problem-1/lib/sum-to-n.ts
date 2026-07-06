/**
 * n is "any integer" per the spec, not just positive — for negative n this
 * sums the descending range from n up to -1 (e.g. sum_to_n(-3) === -3 + -2 + -1 === -6),
 * the mirror image of the positive case. All three implementations agree on this.
 */

/** Iterative — O(n) time, O(1) space. */
export const sum_to_n_a = function (n: number): number {
    let total = 0;
    if (n >= 0) {
        for (let i = 1; i <= n; i++) total += i;
    } else {
        for (let i = n; i <= -1; i++) total += i;
    }
    return total;
};

/**
 * Closed-form (Gauss' formula) — O(1) time, O(1) space.
 * Triangular-number formula applied to |n|, sign-restored for negative n.
 */
export const sum_to_n_b = function (n: number): number {
    const magnitude = Math.abs(n);
    const triangular = (magnitude * (magnitude + 1)) / 2;
    return n >= 0 ? triangular : -triangular;
};

/** Recursive — O(n) time, O(n) call-stack space. */
export const sum_to_n_c = function (n: number): number {
    if (n === 0) return 0;
    if (n > 0) return n + sum_to_n_c(n - 1);
    return n + sum_to_n_c(n + 1);
};
