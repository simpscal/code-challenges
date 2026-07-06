export type Issue = {
    line: number;
    title: string;
    explanation: string;
};

export const ISSUES: Issue[] = [
    {
        line: 39,
        title: 'Undefined variable',
        explanation:
            "`lhsPriority` doesn't exist — the computed value is `balancePriority` (line 38). This throws a ReferenceError the moment the filter runs.",
    },
    {
        line: 38,
        title: 'Missing field on the type',
        explanation:
            '`balance.blockchain` is read here, but `WalletBalance` never declares a `blockchain` property. `getPriority(blockchain: any)` silently swallows the type error instead of surfacing it.',
    },
    {
        line: 40,
        title: 'Inverted filter condition',
        explanation:
            'The filter keeps balances where `amount <= 0` — backwards. The evident intent is to keep balances with a recognized blockchain and a positive amount, i.e. `amount > 0`.',
    },
    {
        line: 48,
        title: 'Non-exhaustive sort comparator',
        explanation:
            'No `return 0` when `leftPriority === rightPriority` — the comparator falls through returning `undefined`, leaving relative order of equal-priority items unspecified.',
    },
    {
        line: 54,
        title: 'Unnecessary useMemo dependency',
        explanation:
            '`prices` is listed as a dependency but never read inside the memo — every price refresh forces a needless resort of the balance list.',
    },
    {
        line: 56,
        title: 'Dead code, and a type mismatch it hides',
        explanation:
            '`formattedBalances` is computed but never used — `rows` re-maps `sortedBalances` (typed `WalletBalance[]`) as `FormattedWalletBalance[]` and reads `balance.formatted`, a property that was never actually attached to these objects.',
    },
    {
        line: 64,
        title: 'Unsafe price lookup',
        explanation:
            '`prices[balance.currency]` is `undefined` for any currency without a price entry, so `usdValue` silently becomes `NaN` instead of a handled fallback.',
    },
    {
        line: 68,
        title: 'Array index as React key',
        explanation:
            'Using `index` after the list has been filtered and sorted causes React to misattribute state/DOM across re-renders when the order or membership changes.',
    },
    {
        line: 19,
        title: 'Re-created every render, untyped input',
        explanation:
            '`getPriority` is redefined on every render and takes `blockchain: any`. It should be a stable, typed lookup (module-level map or `useCallback`) keyed by a proper `Blockchain` type.',
    },
    {
        line: 15,
        title: 'Unused destructured prop',
        explanation:
            '`children` is pulled off `props` but never rendered — dead prop that misleads readers about the component API.',
    },
];
