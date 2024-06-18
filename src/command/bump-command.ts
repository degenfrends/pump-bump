import PumpFunTrader from '@degenfrends/solana-pumpfun-trader';
import getBalance from '../solana/get-balance';
import getTokenAccount from '../solana/get-token-account';
import getTokenBalance from '../solana/get-token-balance';
import { config } from 'dotenv';
config();

export default class BumpCommand {
    private bumperPrivateKey: string;
    private mintAddress: string;
    private isSimulation: boolean;
    private walletAddress: string;
    private pumpFunTrader: PumpFunTrader;
    constructor(privateKey: string, mintAddress: string, walletAddress: string, isSimulation: boolean = true) {
        this.bumperPrivateKey = privateKey;
        this.mintAddress = mintAddress;
        this.walletAddress = walletAddress;
        this.isSimulation = isSimulation;
        this.pumpFunTrader = new PumpFunTrader();
        this.pumpFunTrader.setSolanaRpcUrl(String(process.env.RPC_URL));
    }
    async main() {
        const tokenAccount = await getTokenAccount(this.walletAddress, this.mintAddress);
        console.log('Token account:', tokenAccount);
        const interval = Number(process.env.BUY_INTERVAL);
        setInterval(async () => {
            await this.bump(tokenAccount);
        }, interval * 1000);
    }
    async bump(tokenAccount: string | undefined) {
        console.log('Bumping token:', tokenAccount);
        const solIn = Number(process.env.BUY_AMOUNT);
        const slippageDecimal = Number(process.env.SLIPPAGE);
        const priorityFeeInSol = Number(process.env.PRIORITY_FEE);
        const sellThreshold = Number(process.env.SELL_THRESHOLD);
        try {
            let tokenBalance = 0;

            if (tokenAccount) {
                tokenBalance = await getTokenBalance(tokenAccount);
            }
            const solBalance = await getBalance(this.walletAddress);
            if (solBalance < solIn + sellThreshold) {
                console.log('Insufficient balance to perform the transaction');
                await this.pumpFunTrader.sell(
                    this.bumperPrivateKey,
                    this.mintAddress,
                    tokenBalance * 1000000,
                    priorityFeeInSol,
                    slippageDecimal,
                    this.isSimulation
                );
            }
            await this.pumpFunTrader.buy(this.bumperPrivateKey, this.mintAddress, solIn, priorityFeeInSol, slippageDecimal, this.isSimulation);
            console.log('Transaction successful');
        } catch (error) {
            console.error('Error in main function:', error);
            this.bump(tokenAccount);
        }
    }
}
