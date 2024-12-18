"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_token_account_1 = __importDefault(require("../solana/get-token-account"));
const get_token_balance_1 = __importDefault(require("../solana/get-token-balance"));
const pumpdotfun_sdk_1 = require("pumpdotfun-sdk");
const nodewallet_1 = __importDefault(require("@coral-xyz/anchor/dist/cjs/nodewallet"));
const anchor_1 = require("@coral-xyz/anchor");
const dotenv_1 = require("dotenv");
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
(0, dotenv_1.config)();
class BumpCommand {
    bumperPrivateKey;
    mintAddress;
    walletAddress;
    provider;
    sdk;
    counter = 1;
    SLIPPAGE_BASIS_POINTS = 100n;
    buyTokens = async (sdk, testAccount, mint, solAmount) => {
        const buyResults = await sdk.buy(testAccount, mint, BigInt(solAmount * web3_js_1.LAMPORTS_PER_SOL), this.SLIPPAGE_BASIS_POINTS, {
            unitLimit: 250000,
            unitPrice: 250000
        });
        console.log('Buy results:', buyResults);
        if (buyResults.success) {
            console.log('Buy successful', buyResults);
        }
        else {
            console.log('Buy failed');
        }
    };
    sellTokens = async (sdk, testAccount, mint, tokenAmount) => {
        const sellResults = await sdk.sell(testAccount, mint, BigInt(tokenAmount * Math.pow(10, pumpdotfun_sdk_1.DEFAULT_DECIMALS)), this.SLIPPAGE_BASIS_POINTS, {
            unitLimit: 250000,
            unitPrice: 250000
        });
        if (sellResults.success) {
            console.log('Sell successful');
        }
        else {
            console.log('Sell failed');
        }
    };
    getProvider = () => {
        if (!process.env.RPC_URL) {
            throw new Error('Please set HELIUS_RPC_URL in .env file');
        }
        const connection = new web3_js_1.Connection(process.env.RPC_URL || '');
        const wallet = new nodewallet_1.default(new web3_js_1.Keypair());
        return new anchor_1.AnchorProvider(connection, wallet, { commitment: 'finalized' });
    };
    constructor(privateKey, mintAddress, walletAddress) {
        this.bumperPrivateKey = privateKey;
        this.mintAddress = mintAddress;
        this.walletAddress = walletAddress;
        this.provider = this.getProvider();
        this.sdk = new pumpdotfun_sdk_1.PumpFunSDK(this.provider);
    }
    async main() {
        const tokenAccount = await (0, get_token_account_1.default)(this.walletAddress, this.mintAddress);
        const interval = Number(process.env.BUY_INTERVAL);
        setInterval(async () => {
            await this.bump(tokenAccount);
        }, interval * 1000);
    }
    async bump(tokenAccount) {
        console.log('Bumping token:', tokenAccount);
        const walletPrivateKey = await web3_js_1.Keypair.fromSecretKey(new Uint8Array(bs58_1.default.decode(this.bumperPrivateKey)));
        let solIn = Number(process.env.BUY_AMOUNT);
        try {
            let tokenBalance = 0;
            if (this.counter >= 2) {
                if (tokenAccount) {
                    tokenBalance = await (0, get_token_balance_1.default)(tokenAccount);
                    console.log('Token balance:', tokenBalance);
                    this.counter = 0;
                }
                console.log('Selling token');
                const sellRespponse = await this.sellTokens(this.sdk, walletPrivateKey, new web3_js_1.PublicKey(this.mintAddress), tokenBalance);
                console.log('sold token: ', sellRespponse);
            }
            console.log('Buying token');
            const buyResponse = await this.buyTokens(this.sdk, walletPrivateKey, new web3_js_1.PublicKey(this.mintAddress), solIn);
            console.log('Bump successful: ', buyResponse);
            this.counter++;
        }
        catch (error) {
            console.error('Error in main function:', error);
            this.bump(tokenAccount);
        }
    }
}
exports.default = BumpCommand;
