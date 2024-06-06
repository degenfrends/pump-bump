import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from '@solana/web3.js';

export default async function getBalance(walletAddress: string) {
    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    const wallet = new PublicKey(walletAddress);
    const info = await connection.getBalance(wallet);
    let lamportBalance = info / LAMPORTS_PER_SOL;

    return lamportBalance;
}
