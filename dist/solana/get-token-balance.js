"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { getAccount, getMint } = require('@solana/spl-token');
async function getTokenBalance(tokenAccount) {
    const connection = new web3_js_1.Connection(String(process.env.RPC_URL), 'confirmed');
    const tokenWallet = new web3_js_1.PublicKey(tokenAccount);
    const info = await getAccount(connection, tokenWallet);
    const amount = Number(info.amount);
    const mint = await getMint(connection, info.mint);
    const balance = amount / 10 ** mint.decimals;
    return balance;
}
exports.default = getTokenBalance;
