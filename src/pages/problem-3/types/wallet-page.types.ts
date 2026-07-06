import type { ComponentProps } from 'react';

export type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo' | (string & {});

export interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: Blockchain;
}

export interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}

export type BoxProps = ComponentProps<'div'>;

export type WalletPageProps = BoxProps;
