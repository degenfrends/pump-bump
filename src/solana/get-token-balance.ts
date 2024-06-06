import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from '@solana/web3.js';

const { getAccount, getMint } = require('@solana/spl-token');

export default async function getTokenBalance(tokenAccount: string) {
    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    const tokenWallet = new PublicKey(tokenAccount);

    const info = await getAccount(connection, tokenWallet);
    const amount = Number(info.amount);
    const mint = await getMint(connection, info.mint);
    const balance = amount / 10 ** mint.decimals;
    return balance;
}
