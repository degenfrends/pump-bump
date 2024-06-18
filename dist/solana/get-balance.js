"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
async function getBalance(walletAddress) {
    const connection = new web3_js_1.Connection(String(process.env.RPC_URL), 'confirmed');
    const wallet = new web3_js_1.PublicKey(walletAddress);
    const info = await connection.getBalance(wallet);
    let lamportBalance = info / web3_js_1.LAMPORTS_PER_SOL;
    return lamportBalance;
}
exports.default = getBalance;
