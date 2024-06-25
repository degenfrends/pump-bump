"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getTokenAccount;
const web3_js_1 = require("@solana/web3.js");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
async function getTokenAccount(walletAddress, mintAddress) {
    const connection = new web3_js_1.Connection(String(process.env.RPC_URL), 'confirmed');
    const wallet = new web3_js_1.PublicKey(walletAddress);
    const account = await connection.getTokenAccountsByOwner(wallet, {
        mint: new web3_js_1.PublicKey(mintAddress)
    });
    if (!account.value) {
        return undefined;
    }
    return account.value[0]?.pubkey?.toString() || undefined;
}
