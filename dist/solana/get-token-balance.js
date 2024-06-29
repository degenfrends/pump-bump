"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getTokenBalance;
const web3_js_1 = require("@solana/web3.js");
const dotenv_1 = require("dotenv");
const spl_token_1 = require("@solana/spl-token");
(0, dotenv_1.config)();
async function getTokenBalance(tokenAccount) {
    const connection = new web3_js_1.Connection(String(process.env.RPC_URL), 'confirmed');
    const tokenWallet = new web3_js_1.PublicKey(tokenAccount);
    const info = await (0, spl_token_1.getAccount)(connection, tokenWallet);
    const amount = Number(info.amount);
    const mint = await (0, spl_token_1.getMint)(connection, info.mint);
    const balance = amount / 10 ** mint.decimals;
    return balance;
}
