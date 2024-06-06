import { config } from 'dotenv';
config();
import BumpCommand from './command/bump-command';
var argv = require('minimist')(process.argv.slice(2));

const privateKey = argv.privateKey;
const tokenAddress = argv.tokenAddress;
const walletAddress = argv.walletAddress;
const transactionMode = argv.transactionMode;
console.log('Private key:', privateKey);
console.log('Token address:', tokenAddress);
console.log('Wallet address:', walletAddress);
console.log('Transaction mode:', transactionMode);
const bumper = new BumpCommand(privateKey, tokenAddress, walletAddress, transactionMode);
bumper.main();
