"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const { getAccount, getMint } = require('@solana/spl-token');
async function getTokenBalance(tokenAccount) {
    const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('mainnet-beta'), 'confirmed');
    const tokenWallet = new web3_js_1.PublicKey(tokenAccount);
    const info = await getAccount(connection, tokenWallet);
    const amount = Number(info.amount);
    const mint = await getMint(connection, info.mint);
    const balance = amount / 10 ** mint.decimals;
    return balance;
}
exports.default = getTokenBalance;
