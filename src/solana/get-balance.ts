import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { config } from 'dotenv';
config();
export default async function getBalance(walletAddress: string) {
    const connection = new Connection(String(process.env.RPC_URL), 'confirmed');
    const wallet = new PublicKey(walletAddress);
    const info = await connection.getBalance(wallet);
    let lamportBalance = info / LAMPORTS_PER_SOL;

    return lamportBalance;
}
