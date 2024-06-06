"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pumpFunSell = exports.pumpFunBuy = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const utils_1 = require("./utils");
const api_1 = require("./api");
const types_1 = require("./types");
const constants_1 = require("./constants");
async function pumpFunBuy(transactionMode, payerPrivateKey, mintStr, solIn, priorityFeeInSol = 0, slippageDecimal = 0.25) {
    try {
        const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('mainnet-beta'), 'confirmed');
        const coinData = await (0, api_1.getCoinData)(mintStr);
        if (!coinData) {
            console.error('Failed to retrieve coin data...');
            return;
        }
        const payer = await (0, utils_1.getKeyPairFromPrivateKey)(payerPrivateKey);
        const owner = payer.publicKey;
        const mint = new web3_js_1.PublicKey(mintStr);
        const txBuilder = new web3_js_1.Transaction();
        const tokenAccountAddress = await (0, spl_token_1.getAssociatedTokenAddress)(mint, owner, false);
        const tokenAccountInfo = await connection.getAccountInfo(tokenAccountAddress);
        let tokenAccount;
        if (!tokenAccountInfo) {
            txBuilder.add((0, spl_token_1.createAssociatedTokenAccountInstruction)(payer.publicKey, tokenAccountAddress, payer.publicKey, mint));
            tokenAccount = tokenAccountAddress;
        }
        else {
            tokenAccount = tokenAccountAddress;
        }
        const solInLamports = solIn * web3_js_1.LAMPORTS_PER_SOL;
        const tokenOut = Math.floor((solInLamports * coinData['virtual_token_reserves']) / coinData['virtual_sol_reserves']);
        const solInWithSlippage = solIn * (1 + slippageDecimal);
        const maxSolCost = Math.floor(solInWithSlippage * web3_js_1.LAMPORTS_PER_SOL);
        const ASSOCIATED_USER = tokenAccount;
        const USER = owner;
        const BONDING_CURVE = new web3_js_1.PublicKey(coinData['bonding_curve']);
        const ASSOCIATED_BONDING_CURVE = new web3_js_1.PublicKey(coinData['associated_bonding_curve']);
        const keys = [
            { pubkey: constants_1.GLOBAL, isSigner: false, isWritable: false },
            { pubkey: constants_1.FEE_RECIPIENT, isSigner: false, isWritable: true },
            { pubkey: mint, isSigner: false, isWritable: false },
            { pubkey: BONDING_CURVE, isSigner: false, isWritable: true },
            { pubkey: ASSOCIATED_BONDING_CURVE, isSigner: false, isWritable: true },
            { pubkey: ASSOCIATED_USER, isSigner: false, isWritable: true },
            { pubkey: USER, isSigner: false, isWritable: true },
            { pubkey: constants_1.SYSTEM_PROGRAM_ID, isSigner: false, isWritable: false },
            { pubkey: spl_token_1.TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
            { pubkey: constants_1.RENT, isSigner: false, isWritable: false },
            { pubkey: constants_1.PUMP_FUN_ACCOUNT, isSigner: false, isWritable: false },
            { pubkey: constants_1.PUMP_FUN_PROGRAM, isSigner: false, isWritable: false }
        ];
        const data = Buffer.concat([(0, utils_1.bufferFromUInt64)('16927863322537952870'), (0, utils_1.bufferFromUInt64)(tokenOut), (0, utils_1.bufferFromUInt64)(maxSolCost)]);
        const instruction = new web3_js_1.TransactionInstruction({
            keys: keys,
            programId: constants_1.PUMP_FUN_PROGRAM,
            data: data
        });
        txBuilder.add(instruction);
        const transaction = await (0, utils_1.createTransaction)(connection, txBuilder.instructions, payer.publicKey, priorityFeeInSol);
        if (transactionMode == types_1.TransactionMode.Execution) {
            const signature = await (0, utils_1.sendAndConfirmTransactionWrapper)(connection, transaction, [payer]);
            console.log('Buy transaction confirmed:', signature);
        }
        else if (transactionMode == types_1.TransactionMode.Simulation) {
            const simulatedResult = await connection.simulateTransaction(transaction);
            console.log(simulatedResult);
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.pumpFunBuy = pumpFunBuy;
async function pumpFunSell(transactionMode, payerPrivateKey, mintStr, tokenBalance, priorityFeeInSol = 0, slippageDecimal = 0.25) {
    try {
        const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('mainnet-beta'), 'confirmed');
        const coinData = await (0, api_1.getCoinData)(mintStr);
        if (!coinData) {
            console.error('Failed to retrieve coin data...');
            return;
        }
        const payer = await (0, utils_1.getKeyPairFromPrivateKey)(payerPrivateKey);
        const owner = payer.publicKey;
        const mint = new web3_js_1.PublicKey(mintStr);
        const txBuilder = new web3_js_1.Transaction();
        const tokenAccountAddress = await (0, spl_token_1.getAssociatedTokenAddress)(mint, owner, false);
        const tokenAccountInfo = await connection.getAccountInfo(tokenAccountAddress);
        let tokenAccount;
        if (!tokenAccountInfo) {
            txBuilder.add((0, spl_token_1.createAssociatedTokenAccountInstruction)(payer.publicKey, tokenAccountAddress, payer.publicKey, mint));
            tokenAccount = tokenAccountAddress;
        }
        else {
            tokenAccount = tokenAccountAddress;
        }
        const minSolOutput = Math.floor((tokenBalance * (1 - slippageDecimal) * coinData['virtual_sol_reserves']) / coinData['virtual_token_reserves']);
        const keys = [
            { pubkey: constants_1.GLOBAL, isSigner: false, isWritable: false },
            { pubkey: constants_1.FEE_RECIPIENT, isSigner: false, isWritable: true },
            { pubkey: mint, isSigner: false, isWritable: false },
            { pubkey: new web3_js_1.PublicKey(coinData['bonding_curve']), isSigner: false, isWritable: true },
            { pubkey: new web3_js_1.PublicKey(coinData['associated_bonding_curve']), isSigner: false, isWritable: true },
            { pubkey: tokenAccount, isSigner: false, isWritable: true },
            { pubkey: owner, isSigner: false, isWritable: true },
            { pubkey: constants_1.SYSTEM_PROGRAM_ID, isSigner: false, isWritable: false },
            { pubkey: constants_1.ASSOC_TOKEN_ACC_PROG, isSigner: false, isWritable: false },
            { pubkey: spl_token_1.TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
            { pubkey: constants_1.PUMP_FUN_ACCOUNT, isSigner: false, isWritable: false },
            { pubkey: constants_1.PUMP_FUN_PROGRAM, isSigner: false, isWritable: false }
        ];
        const data = Buffer.concat([(0, utils_1.bufferFromUInt64)('12502976635542562355'), (0, utils_1.bufferFromUInt64)(tokenBalance), (0, utils_1.bufferFromUInt64)(minSolOutput)]);
        const instruction = new web3_js_1.TransactionInstruction({
            keys: keys,
            programId: constants_1.PUMP_FUN_PROGRAM,
            data: data
        });
        txBuilder.add(instruction);
        const transaction = await (0, utils_1.createTransaction)(connection, txBuilder.instructions, payer.publicKey, priorityFeeInSol);
        if (transactionMode == types_1.TransactionMode.Execution) {
            const signature = await (0, utils_1.sendAndConfirmTransactionWrapper)(connection, transaction, [payer]);
            console.log('Sell transaction confirmed:', signature);
        }
        else if (transactionMode == types_1.TransactionMode.Simulation) {
            const simulatedResult = await connection.simulateTransaction(transaction);
            console.log(simulatedResult);
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.pumpFunSell = pumpFunSell;
