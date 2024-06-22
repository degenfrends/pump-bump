import { Connection, PublicKey } from '@solana/web3.js';
import { config } from 'dotenv';
config();
const { getAccount, getMint } = require('@solana/spl-token');

export default async function getTokenBalance(tokenAccount: string) {
    const connection = new Connection(String(process.env.RPC_URL), 'confirmed');
    const tokenWallet = new PublicKey(tokenAccount);

    const info = await getAccount(connection, tokenWallet);
    const amount = Number(info.amount);
    const mint = await getMint(connection, info.mint);
    const balance = amount / 10 ** mint.decimals;
    return balance;
}
