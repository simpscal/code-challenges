import type { Blockchain } from './wallet-page.types';

const DEFAULT_PRIORITY = -99;

const BLOCKCHAIN_PRIORITY: Partial<Record<Blockchain, number>> = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
};

export function getPriority(blockchain: Blockchain): number {
    return BLOCKCHAIN_PRIORITY[blockchain] ?? DEFAULT_PRIORITY;
}

export function isRecognizedBlockchain(blockchain: Blockchain): boolean {
    return getPriority(blockchain) > DEFAULT_PRIORITY;
}
