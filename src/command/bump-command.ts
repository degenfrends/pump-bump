import getBalance from '../service/solana/get-balance';
import getTokenAccount from '../service/solana/get-token-account';
import getTokenBalance from '../service/solana/get-token-balance';
import { pumpFunBuy, pumpFunSell } from './../service/pumpfun/swap';
import { TransactionMode } from './../service/pumpfun/types';
import { config } from 'dotenv';
config();

export default class BumpCommand {
    private bumperPrivateKey: string;
    private mintAddress: string;
    private transactionMode: TransactionMode;
    private walletAddress: string;

    constructor(privateKey: string, mintAddress: string, walletAddress: string, mode: TransactionMode) {
        this.bumperPrivateKey = privateKey;
        this.mintAddress = mintAddress;
        this.walletAddress = walletAddress;
        this.transactionMode = mode;
    }
    async main() {
        const tokenAccount = await getTokenAccount(this.walletAddress, this.mintAddress);
        console.log('Token account:', tokenAccount);
        const interval = Number(process.env.BUY_INTERVAL);
        setInterval(async () => {
            await this.bump(tokenAccount);
        }, interval * 1000);
    }
    async bump(tokenAccount: string) {
        console.log('Bumping token:', tokenAccount);
        const solIn = Number(process.env.BUY_AMOUNT);
        const slippageDecimal = Number(process.env.SLIPPAGE);
        const priorityFeeInSol = Number(process.env.PRIORITY_FEE);
        const sellThreshold = Number(process.env.SELL_THRESHOLD);
        try {
            const tokenBalance = await getTokenBalance(tokenAccount);
            const solBalance = await getBalance(this.walletAddress);
            if (solBalance < solIn + sellThreshold) {
                console.log('Insufficient balance to perform the transaction');
                await pumpFunSell(this.transactionMode, this.bumperPrivateKey, this.mintAddress, tokenBalance, priorityFeeInSol, slippageDecimal);
            }
            await pumpFunBuy(this.transactionMode, this.bumperPrivateKey, this.mintAddress, solIn, priorityFeeInSol, slippageDecimal);
            console.log('Transaction successful');
        } catch (error) {
            console.error('Error in main function:', error);
            this.bump(tokenAccount);
        }
    }
}
