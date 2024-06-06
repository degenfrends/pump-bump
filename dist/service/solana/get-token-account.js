"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
async function getTokenAccount(walletAddress, mintAddress) {
    const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('mainnet-beta'), 'confirmed');
    const wallet = new web3_js_1.PublicKey(walletAddress);
    console.log('Wallet:', wallet);
    const account = await connection.getTokenAccountsByOwner(wallet, {
        mint: new web3_js_1.PublicKey(mintAddress)
    });
    console.log(account);
    const tokenAccount = account.value[0].pubkey.toString();
    console.log(tokenAccount);
    return tokenAccount;
}
exports.default = getTokenAccount;
