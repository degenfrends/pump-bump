"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
async function getBalance(walletAddress) {
    const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('mainnet-beta'), 'confirmed');
    const wallet = new web3_js_1.PublicKey(walletAddress);
    const info = await connection.getBalance(wallet);
    let lamportBalance = info / web3_js_1.LAMPORTS_PER_SOL;
    return lamportBalance;
}
exports.default = getBalance;
