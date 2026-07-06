type WalletRowProps = {
    className?: string;
    amount: number;
    usdValue: number;
    formattedAmount: string;
};

export function WalletRow({ className, amount, usdValue, formattedAmount }: WalletRowProps) {
    return (
        <div className={className ?? 'flex items-center justify-between border-b py-2 text-sm last:border-0'}>
            <span className='font-mono'>{formattedAmount}</span>
            <span className='text-muted-foreground'>{amount === 0 ? '—' : `$${usdValue.toFixed(2)}`}</span>
        </div>
    );
}
