//import PumpFunTrader from '@degenfrends/solana-pumpfun-trader';
import getBalance from '../solana/get-balance';
import getTokenAccount from '../solana/get-token-account';
import getTokenBalance from '../solana/get-token-balance';
import { DEFAULT_DECIMALS, PumpFunSDK } from 'pumpdotfun-sdk';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { AnchorProvider } from '@coral-xyz/anchor';
import { config } from 'dotenv';
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
config();

export default class BumpCommand {
    private bumperPrivateKey: string;
    private mintAddress: string;
    private isSimulation: boolean;
    private walletAddress: string;
    //private pumpFunTrader: PumpFunTrader;
    private provider: any;
    private sdk: PumpFunSDK;
    private connection: Connection;
    SLIPPAGE_BASIS_POINTS = 100n;
    buyTokens = async (sdk: PumpFunSDK, testAccount: Keypair, mint: PublicKey, solAmount: number) => {
        const buyResults = await sdk.buy(testAccount, mint, BigInt(solAmount * LAMPORTS_PER_SOL), this.SLIPPAGE_BASIS_POINTS, {
            unitLimit: 250000,
            unitPrice: 250000
        });

        if (buyResults.success) {
            console.log('Buy successful');
        } else {
            console.log('Buy failed');
        }
    };
    sellTokens = async (sdk: PumpFunSDK, testAccount: Keypair, mint: PublicKey, tokenAmount: number) => {
        const sellResults = await sdk.sell(testAccount, mint, BigInt(tokenAmount * Math.pow(10, DEFAULT_DECIMALS)), this.SLIPPAGE_BASIS_POINTS, {
            unitLimit: 250000,
            unitPrice: 250000
        });

        if (sellResults.success) {
            console.log('Sell successful');
        } else {
            console.log('Sell failed');
        }
    };
    getProvider = () => {
        if (!process.env.RPC_URL) {
            throw new Error('Please set HELIUS_RPC_URL in .env file');
        }

        const connection = new Connection(process.env.RPC_URL || '');
        const wallet = new NodeWallet(new Keypair());
        return new AnchorProvider(connection, wallet, { commitment: 'finalized' });
    };
    constructor(privateKey: string, mintAddress: string, walletAddress: string, isSimulation: boolean = true) {
        this.bumperPrivateKey = privateKey;
        this.mintAddress = mintAddress;
        this.walletAddress = walletAddress;
        this.isSimulation = isSimulation;
        this.provider = this.getProvider();
        this.sdk = new PumpFunSDK(this.provider);
        this.connection = this.provider.connection;
    }
    async main() {
        const tokenAccount = await getTokenAccount(this.walletAddress, this.mintAddress);
        const interval = Number(process.env.BUY_INTERVAL);
        setInterval(async () => {
            await this.bump(tokenAccount);
        }, interval * 1000);
    }
    async bump(tokenAccount: string | undefined) {
        console.log('Bumping token:', tokenAccount);
        const solIn = Number(process.env.BUY_AMOUNT);
        console.log('Sol in:', solIn);
        const slippageDecimal = Number(process.env.SLIPPAGE);
        console.log('Slippage:', slippageDecimal);
        const priorityFeeInSol = Number(process.env.PRIORITY_FEE);
        console.log('Priority fee:', priorityFeeInSol);
        const sellThreshold = Number(process.env.SELL_THRESHOLD);
        console.log('Sell threshold:', sellThreshold);
        const walletPrivateKey = await Keypair.fromSecretKey(new Uint8Array(bs58.decode(this.bumperPrivateKey)));

        try {
            let tokenBalance = 0;

            if (tokenAccount) {
                tokenBalance = await getTokenBalance(tokenAccount);
            }
            console.log('Token balance:', tokenBalance);
            const solBalance = await getBalance(this.walletAddress);
            console.log('Sol balance:', solBalance);
            if (solBalance < solIn + sellThreshold && tokenBalance > 0) {
                console.log('Selling token');
                const sellRespponse = await this.sellTokens(this.sdk, walletPrivateKey, new PublicKey(this.mintAddress), tokenBalance);
                console.log('sold token: ', sellRespponse);
            }
            console.log('Buying token');
            const buyResponse = await this.buyTokens(this.sdk, walletPrivateKey, new PublicKey(this.mintAddress), solIn);
            console.log('Bump successful: ', buyResponse);
        } catch (error) {
            console.error('Error in main function:', error);
            this.bump(tokenAccount);
        }
    }
}
