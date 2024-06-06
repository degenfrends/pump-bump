import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

export default async function getTokenAccount(walletAddress: string, mintAddress: string) {
    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    const wallet = new PublicKey(walletAddress);
    console.log('Wallet:', wallet);

    const account = await connection.getTokenAccountsByOwner(wallet, {
        mint: new PublicKey(mintAddress)
    });
    console.log(account);
    const tokenAccount = account.value[0].pubkey.toString();
    console.log(tokenAccount);
    return tokenAccount;
}
