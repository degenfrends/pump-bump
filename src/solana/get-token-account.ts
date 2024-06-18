import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { config } from 'dotenv';
config();

export default async function getTokenAccount(walletAddress: string, mintAddress: string) {
    const connection = new Connection(String(process.env.RPC_URL), 'confirmed');
    const wallet = new PublicKey(walletAddress);
    console.log('Wallet:', wallet);

    const account = await connection.getTokenAccountsByOwner(wallet, {
        mint: new PublicKey(mintAddress)
    });
    if (!account.value) {
        return undefined;
    }
    return account.value[0]?.pubkey?.toString() || undefined;
}
