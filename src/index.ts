import { config } from 'dotenv';
config();
import BumpCommand from './command/bump-command';
var argv = require('minimist')(process.argv.slice(2));

let privateKey;
if (process.env.PRIVATE_KEY) {
    privateKey = process.env.PRIVATE_KEY;
} else {
    privateKey = argv.privateKey;
}
const tokenAddress = argv.tokenAddress;
const walletAddress = argv.walletAddress;
const transactionMode = argv.transactionMode;
const bumper = new BumpCommand(privateKey, tokenAddress, walletAddress, transactionMode);
bumper.main();
