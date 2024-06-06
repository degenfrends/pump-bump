"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_balance_1 = __importDefault(require("../service/solana/get-balance"));
const get_token_account_1 = __importDefault(require("../service/solana/get-token-account"));
const get_token_balance_1 = __importDefault(require("../service/solana/get-token-balance"));
const swap_1 = require("./../service/pumpfun/swap");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class BumpCommand {
    bumperPrivateKey;
    mintAddress;
    transactionMode;
    walletAddress;
    constructor(privateKey, mintAddress, walletAddress, mode) {
        this.bumperPrivateKey = privateKey;
        this.mintAddress = mintAddress;
        this.walletAddress = walletAddress;
        this.transactionMode = mode;
    }
    async main() {
        const tokenAccount = await (0, get_token_account_1.default)(this.walletAddress, this.mintAddress);
        console.log('Token account:', tokenAccount);
        const interval = Number(process.env.BUY_INTERVAL);
        setInterval(async () => {
            await this.bump(tokenAccount);
        }, interval * 1000);
    }
    async bump(tokenAccount) {
        console.log('Bumping token:', tokenAccount);
        const solIn = Number(process.env.BUY_AMOUNT);
        const slippageDecimal = Number(process.env.SLIPPAGE);
        const priorityFeeInSol = Number(process.env.PRIORITY_FEE);
        const sellThreshold = Number(process.env.SELL_THRESHOLD);
        try {
            const tokenBalance = await (0, get_token_balance_1.default)(tokenAccount);
            const solBalance = await (0, get_balance_1.default)(this.walletAddress);
            if (solBalance < solIn + sellThreshold) {
                console.log('Insufficient balance to perform the transaction');
                await (0, swap_1.pumpFunSell)(this.transactionMode, this.bumperPrivateKey, this.mintAddress, tokenBalance, priorityFeeInSol, slippageDecimal);
            }
            await (0, swap_1.pumpFunBuy)(this.transactionMode, this.bumperPrivateKey, this.mintAddress, solIn, priorityFeeInSol, slippageDecimal);
            console.log('Transaction successful');
        }
        catch (error) {
            console.error('Error in main function:', error);
            this.bump(tokenAccount);
        }
    }
}
exports.default = BumpCommand;
