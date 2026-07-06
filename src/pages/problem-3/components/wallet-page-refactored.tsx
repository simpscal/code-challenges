import { useMemo } from 'react';

import { WalletRow } from '@/pages/problem-3/components/wallet-row';
import { usePrices } from '@/pages/problem-3/hooks/use-prices';
import { useWalletBalances } from '@/pages/problem-3/hooks/use-wallet-balances';
import type { WalletPageProps } from '@/pages/problem-3/types/wallet-page.types';
import { getPriority, isRecognizedBlockchain } from '@/pages/problem-3/utils/wallet-priority';

export function WalletPage({ className, ...rest }: WalletPageProps) {
    const balances = useWalletBalances();
    const prices = usePrices();

    const sortedBalances = useMemo(() => {
        return balances
            .filter(balance => isRecognizedBlockchain(balance.blockchain) && balance.amount > 0)
            .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
    }, [balances]);

    const rows = useMemo(
        () =>
            sortedBalances.map(balance => {
                const price = prices[balance.currency];
                const usdValue = price !== undefined ? price * balance.amount : 0;

                return (
                    <WalletRow
                        key={`${balance.blockchain}-${balance.currency}`}
                        amount={balance.amount}
                        usdValue={usdValue}
                        formattedAmount={balance.amount.toFixed(2)}
                    />
                );
            }),
        [sortedBalances, prices]
    );

    return (
        <div className={className} {...rest}>
            {rows}
        </div>
    );
}
